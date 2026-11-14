import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { AUTHORIZED_ADMIN_EMAILS } from '@/lib/supabase'
import { ShieldAlert, LogOut } from 'lucide-react'

export { AUTHORIZED_ADMIN_EMAILS }

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, signOut } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#07131B] via-[#091722] to-[#0A1A24] text-slate-100 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin shadow-lg shadow-teal/20" />
        <p className="text-sm font-medium text-slate-300">Authenticating RiseRepute Administrator...</p>
      </div>
    )
  }

  // Mandatory Authentication: User MUST be signed in to access any admin route
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  // Defense-in-depth: Verify authenticated account is on the explicit admin allowlist
  const isAuthorized = AUTHORIZED_ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#07131B] via-[#091722] to-[#0A1A24] text-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4 relative">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0B1E28]/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col items-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-950/20">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Unauthorized Administrator Account</h2>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            The account <span className="font-mono text-rose-300 font-semibold">{user.email}</span> is not on the authorized RiseRepute administrator allowlist.
          </p>
          <button
            onClick={() => signOut()}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-teal/30"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Sign Out & Switch Account</span>
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

