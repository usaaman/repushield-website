import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { usePageSEO } from '@/hooks/usePageSEO'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export const PublicLayout: React.FC = () => {
  useScrollToTop()
  usePageSEO()
  const location = useLocation()
  const prefersReduced = usePrefersReducedMotion()
  const hasDarkHero = [
    '/',
    '/about',
    '/services',
    '/pricing',
    '/case-studies',
    '/contact',
    '/faq',
  ].includes(location.pathname)

  return (
    <div className="flex flex-col min-h-screen bg-bg-soft text-navy">
      <Navbar />
      <main className={`flex-1 ${hasDarkHero ? 'pt-0' : 'pt-20'}`}>
        {prefersReduced ? (
          <Outlet />
        ) : (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  )
}

