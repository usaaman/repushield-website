import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Lead, LeadStatus } from '@/types/database.types'

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

