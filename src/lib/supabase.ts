import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const AUTHORIZED_ADMIN_EMAILS: readonly string[] = [
  'musmannazir97@gmail.com',
  'usamahameedahmadani@gmail.com',
]

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('placeholder') &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  )
}

// Initialize real Supabase client if configured, otherwise create a mock-safe instance
export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : (createClient('https://placeholder.supabase.co', 'placeholder-anon-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }) as SupabaseClient)

