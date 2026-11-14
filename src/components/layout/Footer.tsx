import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, MessageCircle, AlertCircle, ArrowUpRight } from 'lucide-react'
import { Container } from '../common/Container'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-slate-800">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg transition-transform duration-200 hover:opacity-95"
              aria-label="RiseRepute Home"
            >
              <img
                src="/logo/riserepute-stacked-light.png"
                alt="RiseRepute"
                width={180}
                height={119}
                loading="lazy"
                className="w-[180px] h-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>
            <p className="text-sm text-dark-muted leading-relaxed max-w-sm">
              Assisting legitimate businesses in the USA, Canada, and Pakistan with policy-focused Google review reporting and appeals.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-dark-muted">
              <a
                href="https://wa.me/923406523353"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-teal" />
                <span>+92 340 6523353 (WhatsApp)</span>
              </a>
              <a
                href="mailto:usamahameedahmadani@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-teal" />
                <span>usamahameedahmadani@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          {/* Support & Campaign */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm text-dark-muted">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/google-ads" className="hover:text-white transition-colors">Ads Landing Page</Link></li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors inline-flex items-center gap-1 text-teal">
                  <span>Admin Prototype</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance Card */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Policy Notice</h4>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-dark-muted leading-relaxed">
              We operate strictly within Google's published review policies. We do not offer guaranteed removals or delete genuine customer feedback.
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
            <p className="text-xs text-dark-muted leading-relaxed">
              <strong className="text-white font-semibold">Important Disclaimer:</strong> RepuShield is an independent reputation assistance consultancy and is not affiliated with, endorsed by, or partnered with Google LLC or Alphabet Inc. All product names, trademarks, and registered trademarks are property of their respective owners. Google solely holds final authority over review determinations and removal actions under its policies.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dark-muted">
          <p>© {new Date().getFullYear()} RepuShield. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Independent Policy-Focused Online Reputation Management Assistance.
          </p>
        </div>
      </Container>
    </footer>
  )
}

