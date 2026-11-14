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
    <div className="flex flex-col min-h-screen relative selection:bg-teal selection:text-white text-navy">
      {/* =========================================================================
          FIXED AMBIENT BACKGROUND CANVAS LAYER
          Light vertical Mist-to-teal gradient with max 3 slowly drifting blurred orbs
          ========================================================================= */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-b from-[#EAF4F7] via-[#F4F9FA] to-[#E3F0F4]"
        aria-hidden="true"
      >
        {/* Orb 1: Ocean Teal (Top Right) */}
        <div className="ambient-orb ambient-orb-1 absolute -top-[12%] -right-[8%] w-[50vw] max-w-[680px] h-[50vw] max-h-[680px] rounded-full bg-[#0A789B]/24 blur-[110px]" />

        {/* Orb 2: Accent Teal (Center Left) */}
        <div className="ambient-orb ambient-orb-2 absolute top-[36%] -left-[12%] w-[52vw] max-w-[720px] h-[52vw] max-h-[720px] rounded-full bg-[#14B8A6]/20 blur-[115px]" />

        {/* Orb 3: Soft Navy Ambient (Bottom Right) */}
        <div className="ambient-orb ambient-orb-3 absolute -bottom-[10%] right-[6%] w-[42vw] max-w-[620px] h-[42vw] max-h-[620px] rounded-full bg-[#0F2C3D]/14 blur-[125px]" />
      </div>

      <Navbar />
      <main className={`flex-1 relative z-10 ${hasDarkHero ? 'pt-0' : 'pt-20'}`}>
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
