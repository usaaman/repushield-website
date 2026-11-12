import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'

export const PublicLayout: React.FC = () => {
  useScrollToTop()

  return (
    <div className="flex flex-col min-h-screen bg-bg-soft text-navy">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

