import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { BusinessSettings } from '@/types/database.types'

export const defaultSettings: BusinessSettings = {
  id: 'default_settings',
  business_name: 'RepuShield',
  contact_email: 'usamahameedahmadani@gmail.com',
  whatsapp_number: '+92 340 6523353',
  address: 'USA, Canada & Pakistan Operations',
  default_currency: 'USD',
  notification_preferences: {
    email_on_new_lead: true,
    email_on_case_update: true,
    email_on_payment_received: true,
  },
  updated_at: new Date().toISOString(),
}

export const settingsService = {
  async getSettings(): Promise<BusinessSettings> {
    if (!isSupabaseConfigured()) return defaultSettings

    const { data, error } = await supabase
      .from('business_settings')
      .select('*')
      .eq('id', 'default_settings')
      .single()

    if (error || !data) {
      return defaultSettings
    }
    return data as BusinessSettings
  },

  async updateSettings(updates: Partial<BusinessSettings>): Promise<BusinessSettings> {
    if (!isSupabaseConfigured()) {
      return { ...defaultSettings, ...updates }
    }

    const { data, error } = await supabase
      .from('business_settings')
      .upsert({
        ...defaultSettings,
        ...updates,
        id: 'default_settings',
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error || !data) {
      console.error('Error updating settings:', error)
      return { ...defaultSettings, ...updates }
    }
    return data as BusinessSettings
  },
}

