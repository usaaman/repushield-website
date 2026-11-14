import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { ShieldAlert, LogOut } from 'lucide-react'

export const AUTHORIZED_ADMIN_EMAILS = [
  'musmannazir97@gmail.com',
  'usamahameedahmadani@gmail.com',
]

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isConfigured, signOut } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-300">Authenticating RepuShield Administrator...</p>
      </div>
    )
  }

  // If Supabase is fully configured but user is not signed in, redirect to login
  if (isConfigured && !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // Defense-in-depth: Verify authenticated account is on the explicit admin allowlist
  if (isConfigured && user) {
    const isAuthorized = AUTHORIZED_ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')
    if (!isAuthorized) {
      return (
        <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">Unauthorized Administrator Account</h2>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            The account <span className="font-mono text-rose-300 font-semibold">{user.email}</span> is not on the authorized RepuShield administrator allowlist.
          </p>
          <button
            onClick={() => signOut()}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Sign Out & Switch Account</span>
          </button>
        </div>
      )
    }
  }

  return <>{children}</>
}

