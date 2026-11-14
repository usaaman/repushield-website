import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { usePageSEO } from '@/hooks/usePageSEO'

const AdminLayoutInner: React.FC = () => {
  usePageSEO()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col font-sans selection:bg-teal selection:text-white relative overflow-hidden">
      {/* Dark Navy Overlays matching Public Hero */}
      <div className="fixed inset-0 bg-gradient-to-r from-[#091722]/95 via-[#0F2C3D]/80 to-[#091722]/40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#091722]/85 via-transparent to-[#07131B]/95 pointer-events-none z-0" />

      {/* Subtle Ambient Radial Lighting with Teal & Ocean Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 rounded-full blur-[120px] opacity-50" />
        <div className="absolute -top-20 left-1/3 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] opacity-40" />
        {/* Tactile Fine Film Grain */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />
      </div>

      {/* Main Admin Shell */}
      <div className="flex-1 flex relative z-10">
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
