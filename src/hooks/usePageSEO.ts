import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export interface RouteSEO {
  title: string
  description: string
}

export const SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'RepuShield — Negative Google Review Removal Assistance & Reputation Protection',
    description:
      'Professional negative Google review removal assistance for businesses. We help identify, document, and report fake, 1-star, and policy-violating Google reviews through official reporting and appeal channels.',
  },
  '/about': {
    title: 'About RepuShield — Policy-Focused Online Reputation Assistance',
    description:
      'Learn about RepuShield’s principled approach to negative Google review assessment, factual dossier assembly, and business reputation protection.',
  },
  '/services': {
    title: 'Services — 1-Star, Fake & Negative Google Review Removal | RepuShield',
    description:
      'Specialized Google review assistance: 1-star review audits, fake review reporting, policy violation checks, and official appeal escalation.',
  },
  '/pricing': {
    title: 'Pricing & Custom Quotes — Transparent Review Assessment | RepuShield',
    description:
      'Every review dispute is unique. Request a transparent, quote-based evaluation for negative Google review removal and appeal guidance.',
  },
  '/case-studies': {
    title: 'Case Studies & Policy Frameworks — Client Confidentiality | RepuShield',
    description:
      'Discover how Google review policies apply to real-world disputes including competitor attacks, former employee conflicts, and off-topic spam.',
  },
  '/contact': {
    title: 'Contact Us — Get Help With Negative Google Reviews | RepuShield',
    description:
      'Submit your disputed Google review details or contact us directly on WhatsApp for an objective, confidential policy evaluation.',
  },
  '/faq': {
    title: 'FAQ — Google Review Removal & Appeal Questions Answered | RepuShield',
    description:
      'Honest, straightforward answers about negative Google reviews, 1-star ratings, policy qualification, timelines, and appeal procedures.',
  },
  '/google-ads': {
    title: 'Negative Google Reviews Hurting Your Business? Get Expert Help | RepuShield',
    description:
      'Fast, policy-compliant assistance for businesses facing fake, spam, or 1-star Google reviews. Submit your case for review today.',
  },
  '/admin': {
    title: 'RepuShield BMS — Business Management System & Operations',
    description:
      'Internal business management system for RepuShield: leads, customer profiles, Google review cases, and billing.',
  },
  '/admin/login': {
    title: 'Admin Sign In | RepuShield Business Management System',
    description: 'Secure authentication portal for RepuShield administrators.',
  },
  '/admin/forgot-password': {
    title: 'Password Recovery | RepuShield Business Management System',
    description: 'Administrative password recovery for RepuShield.',
  },
}

export function usePageSEO(): void {
  const location = useLocation()

  useEffect(() => {
    const seo = SEO_MAP[location.pathname] || {
      title: 'Page Not Found (404) | RepuShield',
      description: 'The requested page could not be found.',
    }

    document.title = seo.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title)
    }

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute('content', seo.description)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute(
        'content',
        `https://repushield.com${location.pathname === '/' ? '/' : location.pathname}`
      )
    }
  }, [location.pathname])
}
