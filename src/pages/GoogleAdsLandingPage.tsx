import React, { useState } from 'react'
import {
  Target,
  ShieldCheck,
  Check,
  MessageCircle,
  Send,
  Lock,
  Scale,
  FileSearch,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import {
  Container,
  Button,
  Card,
  Badge,
  SectionWrapper,
  SectionHeading,
  CurvedHeroTransition,
  FadeIn,
  AmbientGlow,
  Accordion,
} from '@/components/common'
import { leadService, isValidEmail } from '@/services/leadService'
import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/useParallax'

export const GoogleAdsLandingPage: React.FC = () => {
  const { x: glowX, y: glowY } = useParallax(-16)
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RiseRepute.%20I%20came%20from%20your%20Google%20Ad%20and%20need%20urgent%20help%20with%20negative%20reviews.'

  const formspreeEndpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    import.meta.env.VITE_FORM_ENDPOINT_URL ||
    ''

  // FAQ Data tailored specifically for Google Ads high-intent traffic
  const adsFaqData = [
    {
      question: 'Can RiseRepute guarantee that a Google review will be removed?',
      answer:
        'No. RiseRepute does not and cannot guarantee review removal. Google LLC holds exclusive authority over content on Google Maps and Google Business Profiles. Our role is strictly advisory: we audit disputed reviews against Google’s published guidelines, build factual evidence dossiers, and guide your business through official reporting and appeal mechanisms.',
    },
    {
      question: 'Which types of Google reviews can be reported?',
      answer:
        'You can report reviews that violate Google’s published Prohibited and Restricted Content policies. Common qualifying issues include competitor attacks and former employee reviews (Conflicts of Interest), unverified non-customer ratings (Fake Content), automated spam or bot bursts, harassment of specific employees, and off-topic complaints regarding third-party couriers.',
    },
    {
      question: 'How long does the review reporting or appeal process take?',
      answer:
        'We review your inquiry and assess eligibility promptly upon submission. Once a formal report or appeal dossier is lodged through official Google Business Profile channels, Google’s internal moderation queues typically take between 3 and 14 business days to examine the case and render an administrative decision.',
    },
    {
      question: 'What information do I need to get started?',
      answer:
        'To begin, simply provide your business name, Google Business Profile or Maps link, the specific URL(s) of the disputed reviews, and a brief description explaining why you believe the review violates Google policy (such as no record of customer transaction, employee conflict, or promotional spam).',
    },
    {
      question: 'Is RiseRepute officially affiliated with Google?',
      answer:
        'No. RiseRepute is an independent service provider and is not affiliated with, endorsed by, or connected to Google LLC. We assist business owners in understanding and utilizing Google’s own publicly published review reporting and appeal channels effectively.',
    },
  ]

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    profileUrl: '',
    reviewCount: '1',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null)

  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    const target = document.getElementById('lead-form')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    // Client-side validation
    if (!formData.businessName.trim() || !formData.contactName.trim() || !formData.details.trim()) {
      setErrorMessage('Please fill in all required fields marked with *.')
      return
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)
    setSubmissionNotice(null)

    try {
      const result = await leadService.submitPublicLead(
        {
          businessName: formData.businessName,
          contactName: formData.contactName,
          email: formData.email,
          profileUrl: formData.profileUrl,
          reviewCount: formData.reviewCount,
          details: formData.details,
          serviceRequired: 'Google Review Policy Assessment',
          source: 'Google Ads Landing Page',
        },
        formspreeEndpoint
      )

      if (result.success) {
        setSubmitted(true)
        if (result.warning) {
          setSubmissionNotice(result.warning)
        }
      } else {
        setErrorMessage(result.message)
      }
    } catch {
      setErrorMessage(
        'A connection error occurred while submitting. Please check your network or reach out directly on WhatsApp (+92 340 6523353) or email (usamahameedahmadani@gmail.com).'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setErrorMessage(null)
    setSubmissionNotice(null)
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      profileUrl: '',
      reviewCount: '1',
      details: '',
    })
  }

  return (
    <div className="flex flex-col text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. HIGH-CONVERSION ADS HERO WITH EMBEDDED FORM
          ========================================================================= */}
      <section className="relative min-h-[85vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/95 via-navy/90 to-[#07131B]/95 pointer-events-none" />
        <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 pointer-events-none">
          <AmbientGlow className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-ocean/20 opacity-60" />
          <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />
        </motion.div>
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="xl" className="relative z-10 my-auto py-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Direct Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill-hero text-slate-100 text-xs font-semibold">
                  <Target className="w-3.5 h-3.5 text-teal" />
                  <span>Google Review Assistance Campaign</span>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  Need Help With{' '}
                  <span className="text-teal">Negative Google Reviews?</span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal">
                  RiseRepute helps businesses assess and report fake, spam and other potentially policy-violating Google reviews through official reporting and appeal channels.
                </p>
              </FadeIn>

              {/* Core Feature Checklist */}
              <FadeIn direction="up" delay={0.3}>
                <div className="grid sm:grid-cols-2 gap-3 text-sm pt-2">
                  {[
                    '1-Star & Fake Review Policy Audits',
                    'Factual Evidence Dossier Assembly',
                    'Official Google Appeal Guidance',
                    'Direct WhatsApp & Email Support',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-teal/20 text-teal flex items-center justify-center shrink-0 border border-teal/30">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Instant WhatsApp Action */}
              <FadeIn direction="up" delay={0.4}>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Button
                    variant="whatsapp"
                    size="lg"
                    href={whatsappUrl}
                    isExternal
                    className="px-7 py-3.5 text-sm font-semibold flex items-center gap-2 shadow-lg shadow-green-900/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Consultation</span>
                  </Button>
                  <span className="text-xs text-slate-400">
                    Confidential & Direct
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: High-Converting Compact Lead Form */}
            <div className="lg:col-span-5 scroll-mt-28" id="lead-form">
              <div className="glass-card-public rounded-3xl p-7 sm:p-9 text-navy shadow-2xl relative">
                {submitted ? (
                  <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-teal/20 text-teal flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-navy">Review Details Received</h3>
                    <p className="text-xs text-secondary leading-relaxed">
                      Our review specialists will audit your disputed link(s) against published Google content policies.
                    </p>
                    {submissionNotice && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-[11px] text-left flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-amber-800">Dispatch Status</p>
                          <p className="text-secondary leading-relaxed">{submissionNotice}</p>
                        </div>
                      </div>
                    )}
                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <Button variant="whatsapp" size="sm" href={whatsappUrl} isExternal className="w-full">
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span>Chat With Us on WhatsApp</span>
                      </Button>
                      <Button variant="secondary" size="sm" onClick={handleReset} className="w-full text-xs">
                        <span>Submit Another</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-bold text-navy">Request a Free Policy Evaluation</h3>
                      <p className="text-xs text-secondary">
                        Submit your business details for an objective review audit.
                      </p>
                    </div>

                    {/* Error Alert Display */}
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="font-semibold text-amber-800">Submission Notice</p>
                          <p className="text-secondary leading-relaxed">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label htmlFor="ads-business-name" className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Business Name *
                      </label>
                      <input
                        id="ads-business-name"
                        type="text"
                        required
                        placeholder="e.g. Metro Clinic"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-navy"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="ads-contact-name" className="text-[11px] font-bold text-navy uppercase tracking-wider">
                          Your Name *
                        </label>
                        <input
                          id="ads-contact-name"
                          type="text"
                          required
                          placeholder="Contact Name"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-navy"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="ads-email" className="text-[11px] font-bold text-navy uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          id="ads-email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-navy"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ads-profile-url" className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Google Maps / Business Profile Link
                      </label>
                      <input
                        id="ads-profile-url"
                        type="url"
                        placeholder="https://maps.google.com/..."
                        value={formData.profileUrl}
                        onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-navy"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ads-review-count" className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Number of Reviews
                      </label>
                      <select
                        id="ads-review-count"
                        value={formData.reviewCount}
                        onChange={(e) => setFormData({ ...formData, reviewCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-navy"
                      >
                        <option value="1">1 Negative Review</option>
                        <option value="2-5">2 to 5 Reviews</option>
                        <option value="6-10">6 to 10 Reviews</option>
                        <option value="10+">More than 10 Reviews</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ads-details" className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Brief Problem Description *
                      </label>
                      <textarea
                        id="ads-details"
                        required
                        rows={3}
                        placeholder="Describe the issue (e.g. competitor attack, non-customer spam, harassment)..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-navy"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="teal"
                      size="md"
                      shine
                      glow
                      disabled={isSubmitting}
                      className="w-full font-bold shadow-md shadow-teal/20 text-xs"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                          <span>Submitting details...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          <span>Get Help With Negative Reviews</span>
                        </>
                      )}
                    </Button>

                    <p className="text-[10px] text-muted text-center leading-tight">
                      We operate strictly through official Google reporting channels. No false guarantees.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>

        <CurvedHeroTransition fillColor="white" height={90} />
      </section>

      {/* =========================================================================
          2. CORE CAMPAIGN HIGHLIGHTS
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-16 sm:py-20">
        <Container size="xl">
          <SectionHeading
            badge={<Badge variant="teal">Proven Approach</Badge>}
            title="Policy-Based Negative"
            accent="Review Assistance"
            subtitle="Don't risk account suspensions with unverified removal tricks. We follow published Google policies diligently."
          />

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <Card variant="glass" hoverLift spotlight tilt className="p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal/15 text-navy flex items-center justify-center icon-floating">
                <FileSearch className="w-5 h-5 text-teal" />
              </div>
              <h3 className="text-base font-bold text-navy">Policy Identification</h3>
              <p className="text-xs text-secondary leading-relaxed">
                We locate the exact clauses under Google’s Prohibited Content policies that the disputed review violates.
              </p>
            </Card>

            <Card variant="glass" hoverLift spotlight tilt className="p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center icon-floating">
                <Scale className="w-5 h-5 text-ocean" />
              </div>
              <h3 className="text-base font-bold text-navy">Structured Evidence</h3>
              <p className="text-xs text-secondary leading-relaxed">
                We help compile transaction receipts, communication logs, and employee records to prove the violation.
              </p>
            </Card>

            <Card variant="glass" hoverLift spotlight tilt className="p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center icon-floating">
                <Lock className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-base font-bold text-navy">Official Escalation</h3>
              <p className="text-xs text-secondary leading-relaxed">
                We guide you through formal Google Business Profile appeal routing for secondary administrative evaluation.
              </p>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. HIGH-INTENT CAMPAIGN FAQ SECTION
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-16 sm:py-24">
        <Container size="lg">
          <SectionHeading
            badge={<Badge variant="ocean">Quick Answers</Badge>}
            title="Frequently Asked"
            accent="Questions"
            subtitle="Common questions regarding our policy-focused Google review assistance process."
          />

          <div className="mt-12">
            <Accordion items={adsFaqData} defaultOpenIndex={0} />
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          4. STRONG FINAL CONVERSION CTA SECTION
          ========================================================================= */}
      <section className="relative bg-navy text-white py-20 sm:py-28 overflow-hidden">
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal/15 opacity-50" />
        <AmbientGlow className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-ocean/20 opacity-40" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

        <Container size="lg" className="relative z-10 text-center space-y-7">
          <FadeIn direction="up">
            <Badge variant="glass" scriptNote="Take Action">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal" />
              <span>Review Assessment</span>
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to Take a Closer Look at Your{' '}
              <span className="text-teal">Google Reviews?</span>
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Get professional guidance on identifying potential policy violations and understanding the appropriate reporting or appeal options.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="pt-3 flex flex-wrap justify-center gap-4 sm:gap-5">
              <Button
                variant="teal"
                size="lg"
                shine
                glow
                href="#lead-form"
                onClick={scrollToForm}
                className="px-8 py-4 text-sm font-bold shadow-lg shadow-teal/20 flex items-center gap-2"
              >
                <span>Request Assistance</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappUrl}
                isExternal
                className="px-7 py-4 text-sm font-semibold flex items-center gap-2 shadow-lg shadow-green-900/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto pt-2">
              Strictly policy-compliant case assessment. We never make false guarantees.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================================
          5. INDEPENDENCE NOTICE
          ========================================================================= */}
      <section className="bg-[#091722] text-white py-12 border-t border-slate-800">
        <Container size="lg" className="text-center space-y-3">
          <p className="text-xs text-dark-muted max-w-2xl mx-auto leading-relaxed">
            <strong className="text-white">RiseRepute</strong> is an independent service provider and is not affiliated with, endorsed by, or officially connected to Google LLC. Google independently determines whether reported reviews violate its policies and whether any action is taken.
          </p>
        </Container>
      </section>
    </div>
  )
}

export default GoogleAdsLandingPage
