import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

// Layouts
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdsLandingLayout } from '@/components/layout/AdsLandingLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { AdminAuthProvider } from '@/context/AdminAuthContext'

// Scoped provider shell ensuring unified AdminAuthProvider across all admin views
const AdminAuthScope: React.FC = () => (
  <AdminAuthProvider>
    <Outlet />
  </AdminAuthProvider>
)

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

// Lazy-Loaded Admin Routes (Chart and BMS modules isolated from public bundle)
const AdminOverviewPage = lazy(() => import('@/pages/admin/AdminOverviewPage'))
const AdminLeadsPage = lazy(() => import('@/pages/admin/AdminLeadsPage'))
const AdminCustomersPage = lazy(() => import('@/pages/admin/AdminCustomersPage'))
const AdminCasesPage = lazy(() => import('@/pages/admin/AdminCasesPage'))
const AdminTasksPage = lazy(() => import('@/pages/admin/AdminTasksPage'))
const AdminCommunicationsPage = lazy(() => import('@/pages/admin/AdminCommunicationsPage'))
const AdminInvoicesPage = lazy(() => import('@/pages/admin/AdminInvoicesPage'))
const AdminReportsPage = lazy(() => import('@/pages/admin/AdminReportsPage'))
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage'))
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'))
const AdminForgotPasswordPage = lazy(() => import('@/pages/admin/AdminForgotPasswordPage'))

// Fallback loader for lazy-loaded admin routes
const AdminLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-slate-300">
    <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
    <p className="text-sm font-medium">Loading RepuShield BMS Module...</p>
    <span className="text-xs text-slate-500 font-mono">Single Admin Business System</span>
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Google Ads Landing Page (Dedicated Conversion-Focused Minimal Layout) */}
        <Route element={<AdsLandingLayout />}>
          <Route path="/google-ads" element={<GoogleAdsLandingPage />} />
        </Route>

        {/* Admin Section (Unified AdminAuthProvider Scope) */}
        <Route element={<AdminAuthScope />}>
          {/* Admin Authentication Routes (Independent Shell) */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<AdminLoader />}>
                <AdminLoginPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/forgot-password"
            element={
              <Suspense fallback={<AdminLoader />}>
                <AdminForgotPasswordPage />
              </Suspense>
            }
          />

          {/* Admin Business Management System (Protected Layout Shell) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminOverviewPage />
                </Suspense>
              }
            />
            <Route
              path="leads"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminLeadsPage />
                </Suspense>
              }
            />
            <Route
              path="customers"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminCustomersPage />
                </Suspense>
              }
            />
            <Route
              path="cases"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminCasesPage />
                </Suspense>
              }
            />
            <Route
              path="tasks"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminTasksPage />
                </Suspense>
              }
            />
            <Route
              path="communications"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminCommunicationsPage />
                </Suspense>
              }
            />
            <Route
              path="invoices"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminInvoicesPage />
                </Suspense>
              }
            />
            <Route
              path="reports"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminReportsPage />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminSettingsPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

