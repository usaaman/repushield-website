import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export interface RouteSEO {
  title: string
  description: string
  keywords?: string
  noindex?: boolean
  ogType?: 'website' | 'article'
  ogImage?: string
  breadcrumbName?: string
  structuredData?: Record<string, any> | Record<string, any>[]
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://riserepute.com').replace(/\/$/, '')
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-reputation-counsel.jpg`

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'RiseRepute',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_IMAGE,
  description:
    'Professional negative Google review removal assistance for businesses. We help identify, document, and report fake, 1-star, and policy-violating reviews through official reporting channels.',
  email: 'usamahameedahmadani@gmail.com',
  telephone: '+923406523353',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'Pakistan' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  sameAs: ['https://wa.me/923406523353'],
}

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'RiseRepute',
  url: `${SITE_URL}/`,
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
}

const createBreadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
})

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can you help remove negative 1-star Google reviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We assist businesses with 1-star reviews that breach Google’s published content policies. While Google alone decides whether content is deleted, our specialists examine the review, pinpoint specific guideline violations, assemble supporting business facts, and guide your business through official reporting and appeal mechanisms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can every negative Google review be removed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Google’s platform policies are specifically designed to protect honest consumer feedback. A review will not be removed simply because it is negative, unfavorable, or critical. Google only takes action on reviews that violate published rules (such as spam, conflicts of interest, harassment, or fake engagement).',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a 1-star review eligible for Google policy removal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 1-star review is eligible for removal if it breaches Google’s Prohibited and Restricted Content policies. Examples include non-patron ratings, reviews left by direct competitors, former employee retaliatory posts, reviews containing offensive or defamatory language, or automated bot rating bursts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can fake Google reviews be reported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Google’s guidelines explicitly prohibit fake engagement, deceptive content, and ratings not based on a real customer experience. When a business receives suspicious reviews from accounts with no transaction history or from coordinated spam accounts, we help compile verifiable operational records to support an official fake-content report.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a review posted by a former employee be removed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Google’s Maps User Contributed Content Policy explicitly classifies reviews left by current or former employees as a Conflict of Interest. If an ex-staff member posts a negative customer review to retaliate, we guide you on providing factual documentation to demonstrate the conflict.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is RiseRepute officially affiliated with Google?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. RiseRepute is an independent service provider and is not affiliated with, endorsed by, or connected to Google LLC. We assist business owners in understanding and utilizing Google’s own publicly published review reporting and appeal channels effectively.',
      },
    },
  ],
}

const ADS_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can RiseRepute guarantee that a Google review will be removed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. RiseRepute does not and cannot guarantee review removal. Google LLC holds exclusive authority over content on Google Maps and Google Business Profiles. Our role is strictly advisory: we audit disputed reviews against Google’s published guidelines, build factual evidence dossiers, and guide your business through official reporting and appeal mechanisms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which types of Google reviews can be reported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can report reviews that violate Google’s published Prohibited and Restricted Content policies. Common qualifying issues include competitor attacks, former employee reviews, unverified non-customer ratings, automated spam or bot bursts, harassment of specific employees, and off-topic complaints regarding third-party couriers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the review reporting or appeal process take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We review your inquiry and assess eligibility promptly upon submission. Once a formal report or appeal dossier is lodged through official Google Business Profile channels, Google’s internal moderation queues typically take between 3 and 14 business days to examine the case and render an administrative decision.',
      },
    },
  ],
}

export const SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'RiseRepute — Negative Google Review Removal Assistance & Reputation Protection',
    description:
      'Professional negative Google review removal assistance for businesses. We help identify, document, and report fake, 1-star, and policy-violating Google reviews through official reporting and appeal channels.',
    keywords:
      'Google review removal assistance, negative Google review help, 1-star Google review appeal, fake Google review reporting, online business reputation protection',
    breadcrumbName: 'Home',
    structuredData: [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA],
  },
  '/about': {
    title: 'About RiseRepute — Policy-Focused Online Reputation Assistance',
    description:
      'Learn about RiseRepute’s principled approach to negative Google review assessment, factual dossier assembly, and business reputation protection.',
    keywords: 'about RiseRepute, reputation counsel, Google review policy specialists, business review assistance',
    breadcrumbName: 'About Us',
    structuredData: [
      ORGANIZATION_SCHEMA,
      createBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
      ]),
    ],
  },
  '/services': {
    title: 'Services — 1-Star, Fake & Negative Google Review Removal | RiseRepute',
    description:
      'Specialized Google review assistance: 1-star review audits, fake review reporting, policy violation checks, and official appeal escalation.',
    keywords:
      '1-star review audit, fake review reporting, conflict of interest reviews, Google review appeal guidance, negative review removal assistance',
    breadcrumbName: 'Services',
    structuredData: [
      ORGANIZATION_SCHEMA,
      createBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ],
  },
  '/pricing': {
    title: 'Pricing & Custom Quotes — Transparent Review Assessment | RiseRepute',
    description:
      'Every review dispute is unique. Request a transparent, quote-based evaluation for negative Google review removal and appeal guidance.',
    keywords: 'Google review assistance pricing, custom quote reputation management, review removal evaluation cost',
    breadcrumbName: 'Pricing',
    structuredData: [
      ORGANIZATION_SCHEMA,
      createBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' },
      ]),
    ],
  },
  '/case-studies': {
    title: 'Case Studies & Policy Frameworks — Client Confidentiality | RiseRepute',
    description:
      'Discover how Google review policies apply to real-world disputes including competitor attacks, former employee conflicts, and off-topic spam.',
    keywords: 'Google review case studies, review policy frameworks, review disputes real world, competitor attack removal',
    breadcrumbName: 'Case Studies',
    structuredData: [
      ORGANIZATION_SCHEMA,
      createBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Case Studies', path: '/case-studies' },
      ]),
    ],
  },
  '/contact': {
    title: 'Contact Us — Get Help With Negative Google Reviews | RiseRepute',
    description:
      'Submit your disputed Google review details or contact us directly on WhatsApp for an objective, confidential policy evaluation.',
    keywords: 'contact RiseRepute, submit review for evaluation, negative Google review consultation, WhatsApp reputation help',
    breadcrumbName: 'Contact',
    structuredData: [
      ORGANIZATION_SCHEMA,
      createBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  },
  '/faq': {
    title: 'FAQ — Google Review Removal & Appeal Questions Answered | RiseRepute',
    description:
      'Honest, straightforward answers about negative Google reviews, 1-star ratings, policy qualification, timelines, and appeal procedures.',
    keywords: 'Google review FAQ, can you remove 1-star reviews, fake review questions, how long does Google review appeal take',
    breadcrumbName: 'FAQ',
    structuredData: [
      FAQ_SCHEMA,
      createBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
    ],
  },
  '/google-ads': {
    title: 'Negative Google Reviews Hurting Your Business? Get Expert Help | RiseRepute',
    description:
      'Fast, policy-compliant assistance for businesses facing fake, spam, or 1-star Google reviews. Submit your case for review today.',
    keywords: 'negative Google reviews help, remove fake review fast, Google Ads reputation assessment',
    breadcrumbName: 'Request Assistance',
    structuredData: [
      ADS_FAQ_SCHEMA,
      createBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Request Assistance', path: '/google-ads' },
      ]),
    ],
  },
  // Private Admin Routes (Strictly noindex, nofollow)
  '/admin': {
    title: 'RiseRepute BMS — Business Management System & Operations',
    description: 'Internal business management system for RiseRepute administrators.',
    noindex: true,
  },
  '/admin/login': {
    title: 'Admin Sign In | RiseRepute Business Management System',
    description: 'Secure authentication portal for RiseRepute administrators.',
    noindex: true,
  },
  '/admin/forgot-password': {
    title: 'Password Recovery | RiseRepute Business Management System',
    description: 'Administrative password recovery for RiseRepute.',
    noindex: true,
  },
}

export function usePageSEO(): void {
  const location = useLocation()

  useEffect(() => {
    const isUnderAdmin = location.pathname.startsWith('/admin')

    const seo: RouteSEO = SEO_MAP[location.pathname] || {
      title: isUnderAdmin
        ? 'RiseRepute BMS — Business Management System'
        : 'Page Not Found (404) | RiseRepute',
      description: isUnderAdmin
        ? 'Internal administrative portal for RiseRepute operations.'
        : 'The requested page could not be found.',
      noindex: isUnderAdmin,
    }

    // 1. Page Title
    document.title = seo.title

    // 2. Meta Helper
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 3. Primary Meta Tags
    setMeta('name', 'description', seo.description)
    if (seo.keywords) {
      setMeta('name', 'keywords', seo.keywords)
    }

    // 4. Indexing Rules (Strictly noindex for admin / private routes)
    const shouldNoindex = Boolean(seo.noindex || isUnderAdmin)
    setMeta('name', 'robots', shouldNoindex ? 'noindex, nofollow' : 'index, follow')

    // 5. Canonical URL
    const canonicalPath = location.pathname === '/' ? '/' : location.pathname
    const canonicalUrl = `${SITE_URL}${canonicalPath}`

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // 6. Open Graph Tags
    setMeta('property', 'og:site_name', 'RiseRepute')
    setMeta('property', 'og:type', seo.ogType || 'website')
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', seo.ogImage || DEFAULT_IMAGE)

    // 7. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', seo.ogImage || DEFAULT_IMAGE)

    // 8. JSON-LD Structured Data
    let scriptTag = document.getElementById('riserepute-schema-jsonld') as HTMLScriptElement | null
    if (seo.structuredData && !shouldNoindex) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'riserepute-schema-jsonld'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(seo.structuredData)
    } else if (scriptTag) {
      scriptTag.remove()
    }
  }, [location.pathname])
}
