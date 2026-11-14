import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured, AUTHORIZED_ADMIN_EMAILS } from '@/lib/supabase'

interface AdminAuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isConfigured: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const isConfigured = isSupabaseConfigured()

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false)
      return
    }

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const email = session?.user?.email?.toLowerCase() || ''
      const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
        (adminEmail) => adminEmail.toLowerCase() === email
      )

      if (session?.user && !isAuthorized) {
        supabase.auth.signOut()
        setSession(null)
        setUser(null)
      } else {
        setSession(session)
        setUser(session?.user ?? null)
      }
      setLoading(false)
    })

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const email = session?.user?.email?.toLowerCase() || ''
      const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
        (adminEmail) => adminEmail.toLowerCase() === email
      )

      if (session?.user && !isAuthorized) {
        await supabase.auth.signOut()
        setSession(null)
        setUser(null)
      } else {
        setSession(session)
        setUser(session?.user ?? null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [isConfigured])

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      return {
        error: new Error(
          'Supabase backend credentials not configured in .env yet. Please follow the setup instructions.'
        ),
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { error }
    }

    // Verify authenticated user's email against authorized allowlist
    const authenticatedEmail = data.user?.email?.toLowerCase() || ''
    const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
      (adminEmail) => adminEmail.toLowerCase() === authenticatedEmail
    )

    if (!isAuthorized) {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      return {
        error: new Error(
          `Access Denied: The account "${data.user?.email}" is not authorized to access the RiseRepute Business Management System.`
        ),
      }
    }

    setUser(data.user)
    setSession(data.session)
    return { error: null }
  }

  const signOut = async () => {
    if (isConfigured) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setSession(null)
  }

  const resetPassword = async (email: string) => {
    if (!isConfigured) {
      return {
        error: new Error(
          'Supabase backend credentials not configured in .env yet.'
        ),
      }
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    return { error }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

