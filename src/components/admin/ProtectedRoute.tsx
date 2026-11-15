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
      <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-r from-[#091722]/95 via-[#0F2C3D]/80 to-[#091722]/40 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-b from-[#091722]/85 via-transparent to-[#07131B]/95 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin shadow-lg shadow-teal/20" />
          <p className="text-sm font-medium text-slate-300">Authenticating RiseRepute Administrator...</p>
        </div>
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
      <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4 relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-r from-[#091722]/95 via-[#0F2C3D]/80 to-[#091722]/40 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-b from-[#091722]/85 via-transparent to-[#07131B]/95 pointer-events-none" />
        <div className="w-full max-w-md p-8 sm:p-9 rounded-3xl glass-card-dark border border-white/15 text-white shadow-2xl flex flex-col items-center space-y-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-950/20">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Unauthorized Administrator Account</h2>
          <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
            The account <span className="font-mono text-rose-300 font-semibold">{user.email}</span> is not on the authorized RiseRepute administrator allowlist.
          </p>
          <button
            onClick={() => signOut()}
            className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/25 backdrop-blur-md transition-all active:scale-[0.97] shadow-sm"
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

