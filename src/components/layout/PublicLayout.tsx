import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'

export const PublicLayout: React.FC = () => {
  useScrollToTop()
  const location = useLocation()
  const hasDarkHero = ['/', '/about', '/services'].includes(location.pathname)

  return (
    <div className="flex flex-col min-h-screen bg-bg-soft text-navy">
      <Navbar />
      <main className={`flex-1 ${hasDarkHero ? 'pt-0' : 'pt-20'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

