import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../common/Container'
import { Button } from '../common/Button'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
    '/google-ads',
  ].includes(location.pathname)
  const isOverHero = hasDarkHero && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Ads Landing', href: '/google-ads' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isOverHero
          ? 'bg-[#091722]/55 backdrop-blur-md border-b border-white/15 text-white shadow-xs'
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs text-navy'
      }`}
    >
      <Container size="xl">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Refined Typography & Shield Mark */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                isOverHero
                  ? 'bg-white/10 border border-white/20 text-teal shadow-xs'
                  : 'bg-navy text-teal shadow-xs'
              }`}
            >
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors duration-200 ${
                  isOverHero ? 'text-white' : 'text-navy'
                }`}
              >
                Repu
                <span className={isOverHero ? 'text-teal' : 'text-ocean'}>
                  Shield
                </span>
              </span>
              <span
                className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wider -mt-1 transition-colors duration-200 ${
                  isOverHero ? 'text-slate-300' : 'text-muted'
                }`}
              >
                Reputation Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href

              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={`relative text-xs uppercase tracking-wider font-semibold px-3.5 py-2 rounded-full transition-colors duration-200 ${
                    isOverHero
                      ? isActive
                        ? 'text-white font-bold bg-white/15'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-navy font-bold bg-slate-100/90'
                        : 'text-navy/70 hover:text-navy hover:bg-slate-100/60'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && !prefersReduced && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 inset-x-3.5 h-[2px] bg-teal rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                </NavLink>
              )
            })}

            {/* Admin Prototype Badge */}
            <Link
              to="/admin"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 ml-1.5 ${
                isOverHero
                  ? 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>Admin Prototype</span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 ${isOverHero ? 'text-teal' : 'text-muted'}`}
              />
            </Link>
          </nav>

          {/* Single Clear Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              variant={isOverHero ? 'teal' : 'primary'}
              size="sm"
              shine
              glow
              to="/contact"
              className="px-5 py-2.5 text-xs font-bold shadow-sm"
            >
              <span>Get Help With Reviews</span>
            </Button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isOverHero
                ? 'text-white hover:bg-white/10'
                : 'text-navy hover:bg-slate-100'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`lg:hidden rounded-2xl mb-4 p-4 shadow-xl border ${
                isOverHero
                  ? 'bg-[#091722]/98 backdrop-blur-xl border-white/15 text-white'
                  : 'bg-white/98 backdrop-blur-xl border-slate-200 text-navy'
              }`}
            >
              <div className="grid grid-cols-2 gap-1.5 pb-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href
                  return (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs uppercase tracking-wider font-semibold px-3 py-2 rounded-xl transition-colors ${
                        isOverHero
                          ? isActive
                            ? 'text-teal font-bold bg-white/10'
                            : 'text-slate-200 hover:text-white hover:bg-white/5'
                          : isActive
                            ? 'text-ocean font-bold bg-ocean/10'
                            : 'text-navy/80 hover:text-navy hover:bg-slate-100'
                      }`}
                    >
                      {link.label}
                    </NavLink>
                  )
                })}
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl col-span-2 flex items-center justify-between transition-colors ${
                    isOverHero
                      ? 'bg-white/10 text-slate-200 hover:bg-white/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Admin Prototype Workspace</span>
                  <ArrowUpRight
                    className={`w-4 h-4 ${isOverHero ? 'text-teal' : 'text-muted'}`}
                  />
                </Link>
              </div>

              <div
                className={`pt-3 border-t ${
                  isOverHero ? 'border-white/15' : 'border-slate-200'
                }`}
              >
                <Button
                  variant={isOverHero ? 'teal' : 'primary'}
                  size="md"
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-xs font-bold"
                >
                  <span>Get Help With Reviews</span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  )
}
