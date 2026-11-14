import React from 'react'
import { NavLink, Link } from 'react-router-dom'
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
  ShieldCheck,
  X,
} from 'lucide-react'

interface AdminSidebarProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
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
    <div className="flex flex-col h-full bg-[#0A1A24] border-r border-white/10 text-slate-200">
      {/* Brand Header */}
      <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal text-navy flex items-center justify-center font-bold shadow-md shadow-teal/20">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white">
              Rise<span className="text-teal">Repute</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-teal-light -mt-0.5">
              BMS Operations
            </span>
          </div>
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Management Modules
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-teal text-navy font-bold shadow-sm shadow-teal/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Exit to Public Website */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-teal" />
          <span>Exit to Public Website</span>
        </Link>
        <div className="px-3 text-[10px] text-slate-400">
          Single Admin System • v1.0
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
            className="fixed inset-0 bg-[#07131B]/80 backdrop-blur-sm"
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

