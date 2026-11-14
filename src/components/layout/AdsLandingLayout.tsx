import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { Container } from '../common/Container'
import { Button } from '../common/Button'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { usePageSEO } from '@/hooks/usePageSEO'

export const AdsLandingLayout: React.FC = () => {
  useScrollToTop()
  usePageSEO()

  const [isScrolled, setIsScrolled] = useState(false)
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RiseRepute.%20I%20came%20from%20your%20Google%20Ad%20and%20need%20urgent%20help%20with%20negative%20reviews.'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('lead-form')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative text-navy selection:bg-teal selection:text-white" id="top">
      {/* Fixed Ambient Background Canvas Layer */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-b from-[#EAF4F7] via-[#F4F9FA] to-[#E3F0F4]"
        aria-hidden="true"
      >
        <div className="ambient-orb ambient-orb-1 absolute -top-[12%] -right-[8%] w-[50vw] max-w-[680px] h-[50vw] max-h-[680px] rounded-full bg-[#0A789B]/24 blur-[110px]" />
        <div className="ambient-orb ambient-orb-2 absolute top-[36%] -left-[12%] w-[52vw] max-w-[720px] h-[52vw] max-h-[720px] rounded-full bg-[#14B8A6]/20 blur-[115px]" />
        <div className="ambient-orb ambient-orb-3 absolute -bottom-[10%] right-[6%] w-[42vw] max-w-[620px] h-[42vw] max-h-[620px] rounded-full bg-[#0F2C3D]/14 blur-[125px]" />
      </div>
      {/* =========================================================================
          SIMPLIFIED ADS HEADER (FOCUSED, ZERO DISTRACTIONS)
          ========================================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs text-navy'
            : 'bg-[#091722]/55 backdrop-blur-md border-b border-white/15 text-white shadow-xs'
        }`}
      >
        <Container size="xl">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo Link */}
            <Link
              to="/"
              className="flex items-center group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg transition-transform duration-200 hover:opacity-95"
              aria-label="RiseRepute Home"
            >
              <div className="relative h-10 sm:h-[44px] w-[180px] sm:w-[198px] flex items-center">
                <img
                  src="/logo/riserepute-horizontal-light.png"
                  alt="RiseRepute"
                  width={198}
                  height={44}
                  loading="eager"
                  fetchPriority="high"
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                    isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                />
                <img
                  src="/logo/riserepute-horizontal-dark.png"
                  alt="RiseRepute"
                  width={198}
                  height={44}
                  loading="eager"
                  fetchPriority="high"
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                    isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
              </div>
            </Link>

            {/* Direct Conversion Actions (Strictly No Multi-Page Navigation Links) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="whatsapp"
                size="sm"
                href={whatsappUrl}
                isExternal
                className="px-3 sm:px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>

              <Button
                variant="teal"
                size="sm"
                shine
                glow
                href="#lead-form"
                onClick={scrollToForm}
                className="px-3.5 sm:px-5 py-2 text-xs font-bold shadow-md shadow-teal/20 flex items-center gap-1"
              >
                <span>Request Assistance</span>
                <ArrowRight className="w-3 h-3 hidden sm:inline" />
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Landing Page Content */}
      <main id="main-content" tabIndex={-1} className="flex-1 pt-0 focus:outline-none">
        <Outlet />
      </main>

      {/* =========================================================================
          SIMPLIFIED ADS FOOTER (MINIMAL DISTRACTIONS)
          ========================================================================= */}
      <footer className="bg-navy text-white py-12 border-t border-slate-800">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-center md:text-left">
            <Link
              to="/"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg transition-transform duration-200 hover:opacity-95"
              aria-label="RiseRepute Home"
            >
              <img
                src="/logo/riserepute-stacked-light.png"
                alt="RiseRepute"
                width={160}
                height={105}
                loading="lazy"
                className="w-[160px] h-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-dark-muted">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-teal" />
                <span>+92 340 6523353 (WhatsApp)</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <a
                href="mailto:usamahameedahmadani@gmail.com"
                className="hover:text-white transition-colors"
              >
                usamahameedahmadani@gmail.com
              </a>
            </div>

            <div>
              <Button
                variant="luxury-ghost"
                size="sm"
                href="#lead-form"
                onClick={scrollToForm}
                className="text-xs"
              >
                <span>Back to Form</span>
              </Button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-dark-muted">
            <p>© {new Date().getFullYear()} RiseRepute. All rights reserved.</p>
            <p className="text-center sm:text-right">
              Independent Policy-Focused Online Reputation Management Assistance.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}

