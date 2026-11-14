import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { ReviewCase, CaseReview, CaseEvidence, CaseStatusHistory, CaseStatus } from '@/types/database.types'

export const caseService = {
  async getCases(): Promise<ReviewCase[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('review_cases')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching review cases:', error)
      return []
    }
    return (data as ReviewCase[]) || []
  },

  async getCaseById(id: string): Promise<ReviewCase | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('review_cases')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching case by id:', error)
      return null
    }
    return data as ReviewCase
  },

  async createCase(caseData: Omit<ReviewCase, 'id' | 'created_at' | 'updated_at'>): Promise<ReviewCase | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('review_cases')
      .insert([caseData])
      .select()
      .single()

    if (error) {
      console.error('Error creating review case:', error)
      throw error
    }
    return data as ReviewCase
  },

  async updateCaseStatus(id: string, newStatus: CaseStatus, previousStatus: CaseStatus, notes?: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false

    // 1. Update case status
    const { error: updateError } = await supabase
      .from('review_cases')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating case status:', updateError)
      return false
    }

    // 2. Record status history
    await supabase.from('case_status_history').insert([
      {
        case_id: id,
        previous_status: previousStatus,
        new_status: newStatus,
        notes: notes || 'Status updated via Admin Panel',
      },
    ])

    return true
  },

  async getCaseReviews(caseId: string): Promise<CaseReview[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('case_reviews')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching reviews for case:', error)
      return []
    }
    return (data as CaseReview[]) || []
  },

  async addCaseReview(reviewData: Omit<CaseReview, 'id' | 'created_at' | 'updated_at'>): Promise<CaseReview | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('case_reviews')
      .insert([reviewData])
      .select()
      .single()

    if (error) {
      console.error('Error adding review to case:', error)
      throw error
    }
    return data as CaseReview
  },

  async getCaseEvidence(caseId: string): Promise<CaseEvidence[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('case_evidence')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching evidence for case:', error)
      return []
    }
    return (data as CaseEvidence[]) || []
  },

  async getCaseHistory(caseId: string): Promise<CaseStatusHistory[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('case_status_history')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching case history:', error)
      return []
    }
    return (data as CaseStatusHistory[]) || []
  },
}

