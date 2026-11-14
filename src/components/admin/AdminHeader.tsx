import React from 'react'
import {
  Menu,
  Database,
  Calendar,
  LogOut,
  User as UserIcon,
} from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'

interface AdminHeaderProps {
  onToggleMobileMenu: () => void
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleMobileMenu }) => {
  const { user, signOut, isConfigured } = useAdminAuth()

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

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
            onClick={() => signOut()}
            title="Sign out of Admin BMS"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

