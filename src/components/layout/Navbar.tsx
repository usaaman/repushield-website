import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShieldCheck, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react'
import { Container } from '../common/Container'
import { Button } from '../common/Button'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors px-3 py-1.5 rounded-full ${
      isActive
        ? 'text-ocean font-semibold bg-ocean/10'
        : 'text-navy/80 hover:text-navy hover:bg-slate-100'
    }`

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <Container size="xl">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-teal shadow-md transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-navy">
                Repu<span className="text-ocean">Shield</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted -mt-1">
                Reputation Assistance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} to={link.href} className={activeClass}>
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/admin"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1 ml-1"
            >
              <span>Admin Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="whatsapp"
              size="sm"
              href="https://wa.me/923406523353"
              isExternal
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </Button>
            <Button variant="primary" size="sm" to="/contact">
              Request Assistance
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-navy hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5 pb-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={activeClass}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 col-span-2 flex items-center justify-between"
              >
                <span>Admin Prototype</span>
                <ArrowUpRight className="w-4 h-4 text-muted" />
              </Link>
            </div>
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <Button
                variant="whatsapp"
                size="md"
                href="https://wa.me/923406523353"
                isExternal
                className="w-full"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </Button>
              <Button
                variant="primary"
                size="md"
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                Request Assistance
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

