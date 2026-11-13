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
} from '@/components/common'

export const GoogleAdsLandingPage: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20came%20from%20your%20Google%20Ad%20and%20need%20urgent%20help%20with%20negative%20reviews.'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <div className="flex flex-col bg-bg-soft text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. HIGH-CONVERSION ADS HERO WITH EMBEDDED FORM
          ========================================================================= */}
      <section className="relative min-h-[85vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/95 via-navy/90 to-[#07131B]/95 pointer-events-none" />
        <AmbientGlow className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-ocean/20 opacity-60" />
        <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="xl" className="relative z-10 my-auto py-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Direct Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/20 border border-teal/30 text-teal text-xs font-semibold">
                  <Target className="w-3.5 h-3.5" />
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
                  RepuShield helps businesses assess and report fake, spam and other potentially policy-violating Google reviews through official reporting and appeal channels.
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
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-7 sm:p-9 text-navy shadow-2xl border border-slate-200 relative">
                {submitted ? (
                  <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-teal/20 text-teal flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-navy">Review Details Received</h3>
                    <p className="text-xs text-secondary leading-relaxed">
                      Our review specialists will audit your disputed link(s) against published Google content policies.
                    </p>
                    <div className="pt-2">
                      <Button variant="whatsapp" size="sm" href={whatsappUrl} isExternal className="w-full">
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span>Chat With Us on WhatsApp</span>
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

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Metro Clinic"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-soft border border-slate-200 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-navy uppercase tracking-wider">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contact Name"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-bg-soft border border-slate-200 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-navy uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-bg-soft border border-slate-200 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Google Maps / Business Profile Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://maps.google.com/..."
                        value={formData.profileUrl}
                        onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-soft border border-slate-200 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Number of Reviews
                      </label>
                      <select
                        value={formData.reviewCount}
                        onChange={(e) => setFormData({ ...formData, reviewCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg-soft border border-slate-200 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                      >
                        <option value="1">1 Negative Review</option>
                        <option value="2-5">2 to 5 Reviews</option>
                        <option value="6-10">6 to 10 Reviews</option>
                        <option value="10+">More than 10 Reviews</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-navy uppercase tracking-wider">
                        Brief Problem Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Describe the issue (e.g. competitor attack, non-customer spam, harassment)..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-bg-soft border border-slate-200 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="teal"
                      size="md"
                      disabled={isSubmitting}
                      className="w-full font-bold shadow-md shadow-teal/20 text-xs"
                    >
                      {isSubmitting ? (
                        <span>Submitting details...</span>
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
            <Card variant="white" hoverLift className="p-7 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal/15 text-navy flex items-center justify-center">
                <FileSearch className="w-5 h-5 text-teal" />
              </div>
              <h3 className="text-base font-bold text-navy">Policy Identification</h3>
              <p className="text-xs text-secondary leading-relaxed">
                We locate the exact clauses under Google’s Prohibited Content policies that the disputed review violates.
              </p>
            </Card>

            <Card variant="white" hoverLift className="p-7 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center">
                <Scale className="w-5 h-5 text-ocean" />
              </div>
              <h3 className="text-base font-bold text-navy">Structured Evidence</h3>
              <p className="text-xs text-secondary leading-relaxed">
                We help compile transaction receipts, communication logs, and employee records to prove the violation.
              </p>
            </Card>

            <Card variant="white" hoverLift className="p-7 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
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
          3. INDEPENDENCE NOTICE
          ========================================================================= */}
      <section className="bg-navy text-white py-12 border-t border-slate-800">
        <Container size="lg" className="text-center space-y-3">
          <p className="text-xs text-dark-muted max-w-2xl mx-auto leading-relaxed">
            <strong className="text-white">RepuShield</strong> is an independent service provider and is not affiliated with, endorsed by, or officially connected to Google LLC. Google independently determines whether reported reviews violate its policies and whether any action is taken.
          </p>
        </Container>
      </section>
    </div>
  )
}

export default GoogleAdsLandingPage
