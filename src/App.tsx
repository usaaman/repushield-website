import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layouts
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'

// Public Pages (Standard Eager Loading for Fast TTFB)
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { PricingPage } from '@/pages/PricingPage'
import { CaseStudiesPage } from '@/pages/CaseStudiesPage'
import { ContactPage } from '@/pages/ContactPage'
import { FAQPage } from '@/pages/FAQPage'
import { GoogleAdsLandingPage } from '@/pages/GoogleAdsLandingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

// Lazy-Loaded Admin Route (Chart and Dashboard bundles are isolated)
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))

// Fallback loader for lazy-loaded admin route
const AdminLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-slate-300">
    <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
    <p className="text-sm font-medium">Loading Admin Prototype Workspace...</p>
    <span className="text-xs text-slate-500 font-mono">Simulated Sample Environment</span>
  </div>
)

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes (Shared Public Layout with Header & Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/google-ads" element={<GoogleAdsLandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Dashboard Prototype Route (Separate Layout & Lazy-Loaded) */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={
              <Suspense fallback={<AdminLoader />}>
                <AdminDashboardPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

