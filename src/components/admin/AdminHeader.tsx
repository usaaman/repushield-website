import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu,
  Database,
  Calendar,
  LogOut,
  User as UserIcon,
} from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { Modal } from '@/components/admin/Modal'

interface AdminHeaderProps {
  onToggleMobileMenu: () => void
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleMobileMenu }) => {
  const { user, signOut, isConfigured } = useAdminAuth()
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
      setShowLogoutModal(false)
      navigate('/admin/login', { replace: true })
    } catch (err) {
      console.error('Error signing out:', err)
      setShowLogoutModal(false)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="h-20 bg-[#0A1A24]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile Toggle & Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-teal" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Right: Backend State Indicator & Admin Account */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Backend State Indicator */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
            isConfigured
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {isConfigured ? 'Database Connected' : 'Database Setup Checkpoint'}
          </span>
          <span className="md:hidden">{isConfigured ? 'Online' : 'Setup Req.'}</span>
        </div>

        {/* Admin User Profile & Logout */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal/20 text-teal flex items-center justify-center font-bold text-xs border border-teal/30">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                {user?.email || 'Administrator'}
              </span>
              <span className="text-[10px] text-teal">Single Admin Access</span>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            title="Sign out of Admin BMS"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/40"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => !isLoggingOut && setShowLogoutModal(false)}
        title="Confirm Logout"
        maxWidth="md"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 pt-0.5">
              <p className="text-sm font-medium text-slate-200 leading-relaxed">
                Are you sure you want to sign out of your RepuShield admin account?
              </p>
              {user?.email && (
                <p className="text-xs text-slate-400">
                  Current session: <span className="text-slate-300 font-mono font-medium">{user.email}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              disabled={isLoggingOut}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              disabled={isLoggingOut}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-500/50 disabled:opacity-60"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing Out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Confirm Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </header>
  )
}

