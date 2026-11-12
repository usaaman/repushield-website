import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { ShieldCheck, ArrowLeft, AlertTriangle } from 'lucide-react'

export const AdminLayout: React.FC = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#0A1922] text-slate-100 flex flex-col font-sans">
      {/* Prototype Disclaimer Bar */}
      <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-amber-300 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span className="font-medium">
            <strong>Frontend Visual Prototype Only:</strong> All metrics, inquiries, and records shown are simulated sample data for UI demonstration purposes.
          </span>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Website</span>
        </Link>
      </div>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 glass-admin px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center text-navy shadow-sm">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">
                RepuShield <span className="text-teal font-normal text-xs uppercase tracking-wider ml-1 px-1.5 py-0.5 rounded bg-teal/15 border border-teal/30">Dashboard Prototype</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">Active Route: {location.pathname}</span>
            <Link
              to="/"
              className="text-xs font-medium text-teal hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </header>

        {/* Admin Body Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

