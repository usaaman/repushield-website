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
    <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col font-sans selection:bg-teal selection:text-white">
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
