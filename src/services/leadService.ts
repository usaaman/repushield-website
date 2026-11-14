import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Lead, LeadStatus } from '@/types/database.types'

export interface PublicLeadInput {
  businessName: string
  contactName: string
  email: string
  phone?: string
  country?: string
  serviceRequired?: string
  profileUrl?: string
  reviewCount?: string
  reviewUrls?: string
  details: string
  source: string
}

export interface LeadSubmissionResult {
  success: boolean
  supabaseSuccess: boolean
  formspreeAttempted: boolean
  formspreeSuccess: boolean
  message: string
  warning?: string
  error?: string
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return emailRegex.test(email.trim())
}

export const isFormspreeConfigured = (endpoint?: string): boolean => {
  const target = (
    endpoint ||
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    import.meta.env.VITE_FORM_ENDPOINT_URL ||
    ''
  ).trim()

  if (!target) return false
  if (target.includes('your_form_id') || target.includes('placeholder')) {
    return false
  }

  try {
    const parsed = new URL(target)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export const leadService = {
  async getLeads(): Promise<Lead[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      return []
    }
    return (data as Lead[]) || []
  },

  async getLeadById(id: string): Promise<Lead | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching lead by id:', error)
      return null
    }
    return data as Lead
  },

  async createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'status'> & { status?: LeadStatus }): Promise<Lead | null> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured yet. Lead recorded in client memory only.')
      return null
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          ...leadData,
          status: leadData.status || 'new',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating lead in database:', error)
      throw error
    }
    return data as Lead
  },

  async submitPublicLead(
    input: PublicLeadInput,
    customFormspreeEndpoint?: string
  ): Promise<LeadSubmissionResult> {
    // 1. Client-Side Input Validation
    const cleanBusiness = input.businessName.trim()
    const cleanContact = input.contactName.trim()
    const cleanEmail = input.email.trim().toLowerCase()
    const cleanDetails = input.details.trim()

    if (!cleanBusiness || !cleanContact || !cleanDetails) {
      return {
        success: false,
        supabaseSuccess: false,
        formspreeAttempted: false,
        formspreeSuccess: false,
        message: 'Please complete all required fields.',
      }
    }

    if (!isValidEmail(cleanEmail)) {
      return {
        success: false,
        supabaseSuccess: false,
        formspreeAttempted: false,
        formspreeSuccess: false,
        message: 'Please provide a valid email address.',
      }
    }

    const formspreeEndpoint = (
      customFormspreeEndpoint ||
      import.meta.env.VITE_FORMSPREE_ENDPOINT ||
      import.meta.env.VITE_FORM_ENDPOINT_URL ||
      ''
    ).trim()

    const hasFormspree = isFormspreeConfigured(formspreeEndpoint)
    const hasSupabase = isSupabaseConfigured()

    if (!hasSupabase && !hasFormspree) {
      return {
        success: false,
        supabaseSuccess: false,
        formspreeAttempted: false,
        formspreeSuccess: false,
        message:
          'Inquiry system is currently offline. Please contact us directly on WhatsApp (+92 340 6523353) or email (usamahameedahmadani@gmail.com).',
      }
    }

    let supabaseSuccess = false
    let formspreeAttempted = false
    let formspreeSuccess = false

    // 2. Primary: Insert into Supabase public.leads (Uses anon INSERT-only permission)
    if (hasSupabase) {
      try {
        const { error: dbError } = await supabase.from('leads').insert([
          {
            source: input.source || 'Website Contact',
            business_name: cleanBusiness,
            contact_name: cleanContact,
            email: cleanEmail,
            phone: input.phone?.trim() || null,
            country: input.country?.trim() || null,
            service_required: input.serviceRequired?.trim() || null,
            profile_url: input.profileUrl?.trim() || null,
            review_count: input.reviewCount?.trim() || '1',
            disputed_urls: input.reviewUrls?.trim() || null,
            details: cleanDetails,
            status: 'new',
          },
        ])

        if (dbError) {
          // Log only error code/message without exposing PII
          console.error('Database lead insert error:', dbError.message)
          supabaseSuccess = false
        } else {
          supabaseSuccess = true
        }
      } catch {
        console.error('Database network error during lead submission')
        supabaseSuccess = false
      }
    }

    // 3. Secondary: Dual submission to Formspree (if endpoint configured)
    if (hasFormspree) {
      formspreeAttempted = true
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            source: input.source,
            businessName: cleanBusiness,
            contactName: cleanContact,
            email: cleanEmail,
            phone: input.phone?.trim() || 'Not specified',
            country: input.country?.trim() || 'Not specified',
            service: input.serviceRequired?.trim() || 'Not specified',
            profileUrl: input.profileUrl?.trim() || 'Not provided',
            reviewCount: input.reviewCount?.trim() || '1',
            reviewUrls: input.reviewUrls?.trim() || 'Not provided',
            details: cleanDetails,
            _subject: `New RepuShield Review Inquiry from ${cleanBusiness} (${input.country?.trim() || input.source})`,
          }),
        })

        formspreeSuccess = response.ok
      } catch {
        formspreeSuccess = false
      }
    }

    // 4. Determine overall result & clear transparent messaging
    if (supabaseSuccess && formspreeSuccess) {
      return {
        success: true,
        supabaseSuccess: true,
        formspreeAttempted: true,
        formspreeSuccess: true,
        message:
          'Inquiry received successfully! Your review details have been logged in our system and dispatched to our policy team.',
      }
    }

    if (supabaseSuccess && !formspreeAttempted) {
      return {
        success: true,
        supabaseSuccess: true,
        formspreeAttempted: false,
        formspreeSuccess: false,
        message:
          'Inquiry received successfully! Our specialists will review your disputed reviews and follow up with an objective assessment.',
      }
    }

    if (supabaseSuccess && formspreeAttempted && !formspreeSuccess) {
      return {
        success: true,
        supabaseSuccess: true,
        formspreeAttempted: true,
        formspreeSuccess: false,
        message:
          'Inquiry received successfully! Your case is logged in our database, though instant notification dispatch was delayed.',
        warning:
          'Your inquiry was saved in our secure database. Our team reviews all incoming database submissions directly.',
      }
    }

    if (!supabaseSuccess && formspreeSuccess) {
      return {
        success: true,
        supabaseSuccess: false,
        formspreeAttempted: true,
        formspreeSuccess: true,
        message:
          'Inquiry received! Your message was delivered via email notification to our specialists.',
        warning:
          'Your inquiry was delivered via notification, but database logging encountered a temporary delay.',
      }
    }

    return {
      success: false,
      supabaseSuccess: false,
      formspreeAttempted,
      formspreeSuccess: false,
      message:
        'Submission could not be completed at this time. Please try again or reach out directly on WhatsApp (+92 340 6523353) or email (usamahameedahmadani@gmail.com).',
    }
  },

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating lead:', error)
      throw error
    }
    return data as Lead
  },

  async deleteLead(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false

    const { error } = await supabase.from('leads').delete().eq('id', id)
    if (error) {
      console.error('Error deleting lead:', error)
      return false
    }
    return true
  },
}

