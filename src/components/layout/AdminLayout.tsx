import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { usePageSEO } from '@/hooks/usePageSEO'
import { AlertTriangle, KeyRound } from 'lucide-react'

const AdminLayoutInner: React.FC = () => {
  usePageSEO()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isConfigured } = useAdminAuth()

  return (
    <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col font-sans selection:bg-teal selection:text-white">
      {/* Database Setup Checkpoint Banner (When credentials not yet supplied) */}
      {!isConfigured && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2.5 text-amber-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Database Setup Checkpoint:</strong> Supabase environment variables are currently unconfigured. The BMS interface is fully built and ready for your project URL and Anon key.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-200">
              <KeyRound className="w-3 h-3" />
              <span>Pending .env</span>
            </span>
          </div>
        </div>
      )}

      {/* Main Admin Shell */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <AdminSidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <AdminHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export const AdminLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <AdminLayoutInner />
    </ProtectedRoute>
  )
}
