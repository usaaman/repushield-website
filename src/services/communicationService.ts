import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Communication } from '@/types/database.types'

export const communicationService = {
  async getCommunications(): Promise<Communication[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('communications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching communications:', error)
      return []
    }
    return (data as Communication[]) || []
  },

  async logCommunication(commData: Omit<Communication, 'id' | 'created_at'>): Promise<Communication | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('communications')
      .insert([commData])
      .select()
      .single()

    if (error) {
      console.error('Error logging communication:', error)
      throw error
    }
    return data as Communication
  },
}

