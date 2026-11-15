import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Inbox,
  Users,
  ShieldAlert,
  CheckSquare,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  ArrowLeft,
  X,
} from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface AdminSidebarProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const prefersReduced = usePrefersReducedMotion()
  const navItems = [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Leads & Inquiries', to: '/admin/leads', icon: Inbox },
    { label: 'Customers', to: '/admin/customers', icon: Users },
    { label: 'Review Cases', to: '/admin/cases', icon: ShieldAlert },
    { label: 'Tasks & Follow-ups', to: '/admin/tasks', icon: CheckSquare },
    { label: 'Communications', to: '/admin/communications', icon: MessageSquare },
    { label: 'Invoices & Payments', to: '/admin/invoices', icon: CreditCard },
    { label: 'Reports & Analytics', to: '/admin/reports', icon: BarChart3 },
    { label: 'Settings', to: '/admin/settings', icon: Settings },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#091722]/85 backdrop-blur-xl border-r border-white/15 text-slate-200 shadow-2xl">
      {/* Brand Header */}
      <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg">
          <div className="h-9 w-auto flex items-center">
            <img
              src="/logo/riserepute-horizontal-light.png"
              alt="RiseRepute"
              width={150}
              height={34}
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal/15 text-teal border border-teal/30">
            BMS
          </span>
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Management Modules
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors duration-200 ${
                isActive
                  ? 'text-white font-bold bg-white/15'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-4 h-4 shrink-0 text-teal" />
                <span className="relative z-10">{item.label}</span>
                {isActive && !prefersReduced && (
                  <motion.div
                    layoutId="activeAdminNavIndicator"
                    className="absolute bottom-1 inset-x-4 h-[2px] bg-teal rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Exit to Public Website */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 text-teal" />
          <span>Exit to Public Website</span>
        </Link>
        <div className="px-4 text-[10px] text-slate-500 font-mono">
          RiseRepute BMS • v1.0
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#07131B]/85 backdrop-blur-md"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}

