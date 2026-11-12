import React, { useState } from 'react'
import {
  ShieldCheck,
  FileSearch,
  FileCheck2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Lock,
  Scale,
  Send,
  Check,
  X as XIcon,
  Mail,
  Clock,
  Compass,
  Building2,
  FileText,
} from 'lucide-react'
import {
  Button,
  Container,
  CurvedHeroTransition,
  Accordion,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/common'
import {
  InputField,
  SelectField,
  TextAreaField,
  FormStatusAlert,
} from '@/components/forms'

export const HomePage: React.FC = () => {
  // Interactive Inquiry Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [service, setService] = useState('assessment')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = 'Full name is required'
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid corporate or personal email is required'
    if (!businessName.trim()) newErrors.businessName = 'Business or entity name is required'
    if (!message.trim()) newErrors.message = 'Please provide brief context regarding contested reviews'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setFormStatus('error')
    } else {
      setErrors({})
      setFormStatus('success')
    }
  }

  const editorialFaqs = [
    {
      question: 'Does RepuShield promise or guarantee review removals?',
      answer:
        'No. RepuShield does not and cannot guarantee that Google will remove any review. Google LLC holds exclusive, sovereign authority over all content published on its platform. Our role is strictly advisory and forensic: we identify verifiable breaches of Google’s Prohibited and Restricted Content policies, assemble structured evidence dossiers, and guide clients through legitimate administrative appeal channels.',
    },
    {
      question: 'What specific categories of Google reviews violate policy?',
      answer:
        'Reviews eligible for policy-based challenge include those exhibiting conflict of interest (e.g. competitors, current or former employees), fraudulent or non-customer engagement, unverified transactional claims, harassment, hate speech, defamation, or content that fails to reflect an actual customer experience under Google’s published standards.',
    },
    {
      question: 'Can authentic negative feedback from a real customer be removed?',
      answer:
        'No. Google’s policies are intentionally designed to preserve genuine customer discourse. If an unfavorable review stems from an authentic consumer experience without violating explicit content rules, RepuShield will not attempt to seek its removal. Instead, we counsel leadership on dignified public response strategies and internal resolution protocols.',
    },
    {
      question: 'How is client confidentiality and business reputation protected?',
      answer:
        'We adhere to strict institutional confidentiality standards. We never disclose client identities, publish unredacted case details without explicit prior authorization, or expose business records. Your initial review and all evidentiary files remain strictly privileged.',
    },
    {
      question: 'What is the typical timeframe for a Google policy appeal?',
      answer:
        'Initial forensic assessment of your contested reviews is completed within 24 to 48 hours. Once a formal evidence dossier is submitted to Google, platform adjudication intervals generally range from 3 to 14 business days, depending on platform review queue volumes.',
    },
  ]

  const whatsappInquiryUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20would%20like%20to%20request%20a%20confidential%20Google%20review%20policy%20assessment.'

  return (
    <div className="flex flex-col bg-bg-soft text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. HERO SECTION — CINEMATIC EDITORIAL EXPERIENCE
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-24 sm:pt-32 pb-0">
        {/* Full-Width High-Resolution Cinematic Architectural Photography */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform motion-safe:transition-transform motion-safe:duration-1000 opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
          }}
          aria-hidden="true"
        />

        {/* Multi-Layered Dark Navy Gradients for Flawless Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-midnight/95 via-navy-deep/85 to-navy-dark/98" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-deep/75 to-navy-midnight/90" />
        
        {/* Subtle Ambient Radial Lighting & Depth */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-ocean/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-teal/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Tactile Film Grain / Noise Texture */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-40" />

        {/* Main Editorial Hero Content */}
        <Container size="xl" className="relative z-10 my-auto py-8 sm:py-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-12 sm:mb-16">
            {/* Left Column: Hero Narrative */}
            <div className="lg:col-span-7 space-y-8">
              {/* Prestige Eyebrow Pill */}
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-xs tracking-widest uppercase font-medium text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                  <span>Independent Digital Reputation Advisory</span>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span className="hidden sm:inline font-script text-teal-light lowercase text-base tracking-normal">
                    discretion &amp; precision
                  </span>
                </div>
              </FadeIn>

              {/* Editorial Headline with Refined Cormorant Garamond Typography */}
              <FadeIn direction="up" delay={0.1}>
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] sm:leading-[1.05]">
                  Where Corporate Discretion Meets{' '}
                  <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-teal to-ocean-light">
                    Policy-First
                  </span>{' '}
                  Reputation Defense.
                </h1>
              </FadeIn>

              {/* Refined Supporting Paragraph */}
              <FadeIn direction="up" delay={0.2}>
                <p className="text-base sm:text-xl text-dark-muted font-normal max-w-2xl leading-relaxed">
                  We assist discerning enterprises across North America and South Asia with forensic review policy assessments and formal appeal submissions. Grounded strictly in Google&apos;s regulatory guidelines — with zero false promises.
                </p>
              </FadeIn>

              {/* Premium Editorial CTAs */}
              <FadeIn direction="up" delay={0.3}>
                <div className="pt-2 flex flex-wrap gap-4 sm:gap-5 items-center">
                  <Button
                    variant="luxury-primary"
                    size="lg"
                    to="/contact"
                    className="group px-8 py-4 text-sm uppercase tracking-wider font-semibold"
                  >
                    <span>Initiate Case Assessment</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>

                  <Button
                    variant="luxury-ghost"
                    size="lg"
                    href={whatsappInquiryUrl}
                    isExternal
                    className="px-7 py-4 text-sm font-medium tracking-wide flex items-center gap-2.5"
                  >
                    <MessageCircle className="w-4 h-4 text-teal" />
                    <span>Confidential WhatsApp</span>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Hero Visual Asset (Relevant Reputation Defense Photography) */}
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.25}>
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  {/* Subtle Radiant Backlight Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-teal/30 via-ocean/20 to-transparent rounded-[2.5rem] blur-2xl opacity-60 pointer-events-none" />

                  {/* Outer Luxury Frame */}
                  <div className="relative rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 to-white/5 p-2 sm:p-2.5 backdrop-blur-xl shadow-2xl shadow-navy-midnight/80 group overflow-hidden">
                    {/* Image Container with Aspect Ratio */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[14/11] lg:aspect-[4/5] bg-navy-deep">
                      <img
                        src="/images/hero-reputation-counsel.jpg"
                        alt="RepuShield Executive Online Reputation Defense & Policy Advisory"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="eager"
                      />

                      {/* Rich Dark Vignette Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight/95 via-navy-midnight/25 to-transparent" />

                      {/* Floating Glass Policy Assessment Card */}
                      <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 glass-luxury rounded-2xl p-4 sm:p-4.5 border border-white/20 shadow-xl space-y-2.5 backdrop-blur-xl">
                        <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-teal/20 text-teal flex items-center justify-center border border-teal/40">
                              <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white tracking-tight">Google Policy Verification</p>
                              <p className="text-[10px] text-teal font-medium">Forensic Evidence Dossier</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal/20 text-teal text-[10px] font-semibold border border-teal/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                            <span>ACTIVE</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-teal shrink-0" />
                            <span>Conflict Audited</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-teal shrink-0" />
                            <span>Policy Cited</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-dark-muted border-t border-white/10 pt-2 leading-tight">
                          Strictly aligned with Google Content Policies. Zero fabricated removal promises.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Strategic Trust Pillars Ledger */}
          <FadeIn direction="up" delay={0.4}>
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-xs text-dark-muted">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Scale className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Regulatory Precision</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Strict adherence to published platform policies.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Lock className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Absolute Discretion</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Confidential dossiers &amp; non-disclosure protocols.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Building2 className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>USA • Canada • Pakistan</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Multi-jurisdictional business representation.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Zero False Guarantees</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Google solely decides removal determinations.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>

        {/* Sophisticated Organic Multi-Layered SVG Transition */}
        <CurvedHeroTransition fillColor="soft" height={120} />
      </section>

      {/* =========================================================================
          2. THE EDITORIAL MANIFESTO (PHILOSOPHY & POSITIONING)
          ========================================================================= */}
      <section className="py-20 sm:py-28 relative">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Big Editorial Statement */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-ocean">
                I. The Institutional Reality
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy tracking-tight leading-tight">
                Authentic reputation is earned over decades — but can be attacked in seconds.
              </h2>
              <div className="w-16 h-0.5 bg-teal mt-6" />
            </div>

            {/* Right Column: Editorial Commentary */}
            <div className="lg:col-span-7 space-y-6 text-secondary text-base sm:text-lg leading-relaxed pt-2">
              <p>
                In an era of weaponized online ratings, business leaders are increasingly targeted by fraudulent review rings, competitors operating in bad faith, and disgruntled non-customers seeking leverage. These digital smears directly harm corporate valuation, patient trust, and commercial pipeline.
              </p>
              <p className="text-navy font-medium">
                RepuShield operates on an uncompromising principle: <span className="underline decoration-teal underline-offset-4">We are not deletion brokers.</span> We do not use bots, backroom claims, or unethical tactics.
              </p>
              <p className="text-sm text-secondary">
                Instead, we act as forensic policy advocates. We systematically examine contested reviews against Google’s published guidelines, build unimpeachable evidence files, and escalate cases through formal channels where platform teams must evaluate objective facts.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. CORE ADVISORY PRACTICES (REFINED EDITORIAL CARDS)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-white border-y border-slate-200/70 relative">
        <Container size="xl">
          {/* Section Header */}
          <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-ocean">
              II. Core Practice Areas
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-navy tracking-tight leading-tight">
              Forensic Services Built on Regulatory Standards.
            </h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Every case engagement is anchored in platform policy. We provide structured analytical clarity and complete evidence compilation.
            </p>
          </div>

          {/* 4 Architectural Practice Cards Grid */}
          <StaggerContainer className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Practice 01 */}
            <StaggerItem>
              <div className="h-full p-8 sm:p-10 rounded-2xl bg-bg-soft/60 border border-slate-200/80 hover:border-ocean/40 hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-slate-200/70 pb-4">
                    <span className="font-mono text-2xl font-bold text-ocean/40 group-hover:text-ocean transition-colors">
                      01
                    </span>
                    <FileSearch className="w-5 h-5 text-muted group-hover:text-teal transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-normal text-navy tracking-tight">
                      Policy Violation Assessment
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Rigorous diagnostic evaluation of contested reviews against Google&apos;s Prohibited and Restricted Content criteria, identifying actionable breaches such as conflict of interest, harassment, or off-topic spam.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-secondary pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Competitor &amp; former employee conflict audits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Absence-of-transaction verification analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Defamatory and harassment language flags</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-200/60">
                  <Button
                    variant="ghost"
                    to="/services"
                    className="p-0 text-xs font-semibold text-ocean hover:text-navy flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Assessment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </StaggerItem>

            {/* Practice 02 */}
            <StaggerItem>
              <div className="h-full p-8 sm:p-10 rounded-2xl bg-bg-soft/60 border border-slate-200/80 hover:border-ocean/40 hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-slate-200/70 pb-4">
                    <span className="font-mono text-2xl font-bold text-ocean/40 group-hover:text-ocean transition-colors">
                      02
                    </span>
                    <FileCheck2 className="w-5 h-5 text-muted group-hover:text-teal transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-normal text-navy tracking-tight">
                      Evidentiary Dossier Preparation
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Structuring objective timelines, business transactional proof, and cited policy clauses into a formal documentation dossier ready for presentation to platform appeal reviewers.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-secondary pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Factual timeline compilation &amp; audit trail</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Policy clause cross-referencing &amp; citation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Complete evidence packet ready for review</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-200/60">
                  <Button
                    variant="ghost"
                    to="/services"
                    className="p-0 text-xs font-semibold text-ocean hover:text-navy flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Dossier Methodology</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </StaggerItem>

            {/* Practice 03 */}
            <StaggerItem>
              <div className="h-full p-8 sm:p-10 rounded-2xl bg-bg-soft/60 border border-slate-200/80 hover:border-ocean/40 hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-slate-200/70 pb-4">
                    <span className="font-mono text-2xl font-bold text-ocean/40 group-hover:text-ocean transition-colors">
                      03
                    </span>
                    <Compass className="w-5 h-5 text-muted group-hover:text-teal transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-normal text-navy tracking-tight">
                      Appeal Process Guidance
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Navigating multi-stage escalation and review workflows through official Google Business Profile appeal mechanisms, ensuring procedural timing and requirements are meticulously met.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-secondary pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Official Google Business Profile appeal routing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Secondary escalation guidance for overlooked flags</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Status tracking &amp; documentation archiving</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-200/60">
                  <Button
                    variant="ghost"
                    to="/services"
                    className="p-0 text-xs font-semibold text-ocean hover:text-navy flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Appeal Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </StaggerItem>

            {/* Practice 04 */}
            <StaggerItem>
              <div className="h-full p-8 sm:p-10 rounded-2xl bg-bg-soft/60 border border-slate-200/80 hover:border-ocean/40 hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-slate-200/70 pb-4">
                    <span className="font-mono text-2xl font-bold text-ocean/40 group-hover:text-ocean transition-colors">
                      04
                    </span>
                    <Building2 className="w-5 h-5 text-muted group-hover:text-teal transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-normal text-navy tracking-tight">
                      Executive Crisis Consultation
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Specialized counsel for multi-location groups, law firms, and medical practices undergoing coordinated reputation attacks, providing structured crisis mitigation protocols.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-secondary pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Coordinated review attack incident management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Public response messaging &amp; brand shielding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Future review vulnerability assessment</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-200/60">
                  <Button
                    variant="ghost"
                    to="/contact"
                    className="p-0 text-xs font-semibold text-ocean hover:text-navy flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inquire About Enterprise Counsel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* =========================================================================
          4. THE METHODOLOGY (PREMIUM DARK EDITORIAL TIMELINE)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-navy text-white relative overflow-hidden">
        {/* Subtle Ambient Lighting */}
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-ocean/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

        <Container size="xl" className="relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-teal">
              III. The Advisory Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
              A Systematic, Three-Stage Method.
            </h2>
            <p className="text-base sm:text-lg text-dark-muted leading-relaxed">
              We replace subjective frustration with structured, evidentiary presentation. Here is how genuine policy violations are addressed.
            </p>
          </div>

          {/* 3-Step Editorial Process */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-teal/40 transition-all duration-300 space-y-6">
              <span className="font-mono text-3xl font-extrabold text-teal">
                Phase I
              </span>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-normal text-white tracking-tight">
                  Diagnostic Case Screening
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed">
                  You confidentially submit the disputed reviews and relevant operational context. Within 24–48 hours, we perform an objective audit against Google content guidelines to determine actionable violation grounds.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-teal font-medium flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>24–48 Hour Analysis</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-teal/40 transition-all duration-300 space-y-6">
              <span className="font-mono text-3xl font-extrabold text-teal">
                Phase II
              </span>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-normal text-white tracking-tight">
                  Evidence File Preparation
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed">
                  We draft a comprehensive evidentiary dossier. This articulates specific platform rule violations, documents chronological inconsistencies, and provides verifiable facts for platform adjudicators.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-teal font-medium flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Empirical Documentation</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-teal/40 transition-all duration-300 space-y-6">
              <span className="font-mono text-3xl font-extrabold text-teal">
                Phase III
              </span>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-normal text-white tracking-tight">
                  Escalation &amp; Support
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed">
                  We guide your designated team members through formal Google appeal mechanisms, tracking procedural milestones and structuring supplementary documentation if secondary escalation is warranted.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-teal font-medium flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Procedural Compliance</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. THE TRANSPARENCY LEDGER (ETHICAL STANDARDS)
          ========================================================================= */}
      <section className="py-24 sm:py-32 relative">
        <Container size="xl">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-ocean">
              IV. The Transparency Ledger
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-navy tracking-tight leading-tight">
              Clear Boundaries. Absolute Integrity.
            </h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              We believe online reputation management must be conducted with absolute ethical transparency. Here is exactly what we do — and what we will never do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The RepuShield Standard (What We Do) */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-emerald-500/20 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-navy">
                    The RepuShield Standard
                  </h3>
                  <p className="text-xs text-secondary">Our institutional commitments</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-secondary">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">Strict policy grounding:</strong> Every action cites published Google Prohibited Content rules.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">Empirical evidence:</strong> We document verifiable operational facts and transactional absence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">Complete confidentiality:</strong> Strict non-disclosure protection for every inquiry and dossier.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">Honest expectations:</strong> Transparent turnaround guidance without fabricated guarantees.
                  </span>
                </li>
              </ul>
            </div>

            {/* Prohibited Practices (What We Never Do) */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-rose-500/20 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-navy">
                    Prohibited Practices
                  </h3>
                  <p className="text-xs text-secondary">What we will never do under any circumstance</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-secondary">
                <li className="flex items-start gap-3">
                  <XIcon className="w-4 h-4 text-rose-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">Zero removal guarantees:</strong> We will never falsely promise guaranteed review deletion.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XIcon className="w-4 h-4 text-rose-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">No genuine review suppression:</strong> Authentic negative customer experiences are never targeted.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XIcon className="w-4 h-4 text-rose-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">No fake reviews or bots:</strong> We never generate fabricated ratings or engage in manipulation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XIcon className="w-4 h-4 text-rose-600 shrink-0 mt-1" />
                  <span>
                    <strong className="text-navy font-semibold">No Google affiliation claims:</strong> We operate strictly as an independent consultancy.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          6. CONFIDENTIAL ADVISORY INQUIRY (ACCESSIBLE INTERACTIVE FORM)
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-white border-y border-slate-200/70 relative">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Communication Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold text-ocean">
                  V. Confidential Engagement
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-navy tracking-tight leading-tight">
                  Request an Objective Case Evaluation.
                </h2>
                <p className="text-base text-secondary leading-relaxed">
                  Submit contested review links and operational background. All inquiries are reviewed confidentially by an experienced policy specialist.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-bg-soft border border-slate-200 hover:border-[#25D366] transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                      Direct WhatsApp Channel
                    </p>
                    <p className="text-base font-semibold text-navy group-hover:text-[#1ea850] transition-colors">
                      +92 340 6523353
                    </p>
                    <p className="text-xs text-muted">Direct messaging with our lead consultant</p>
                  </div>
                </a>

                <a
                  href="mailto:usamahameedahmadani@gmail.com"
                  className="p-5 rounded-2xl bg-bg-soft border border-slate-200 hover:border-ocean transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-ocean text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                      Formal Dossier Email
                    </p>
                    <p className="text-sm font-semibold text-navy group-hover:text-ocean transition-colors break-all">
                      usamahameedahmadani@gmail.com
                    </p>
                    <p className="text-xs text-muted">For confidential files &amp; legal correspondence</p>
                  </div>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-bg-soft border border-slate-200 text-xs text-secondary flex items-center gap-3">
                <Clock className="w-4 h-4 text-teal shrink-0" />
                <span>Typical preliminary response window: <strong>2 to 6 hours</strong>.</span>
              </div>
            </div>

            {/* Right Column: Accessible Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-bg-soft/70 border border-slate-200/90 shadow-lg shadow-navy/5 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-navy tracking-tight">
                    Submit Case for Policy Review
                  </h3>
                  <p className="text-xs text-secondary mt-1">
                    Please provide sufficient detail for preliminary Google guideline analysis.
                  </p>
                </div>

                {formStatus === 'success' && (
                  <FormStatusAlert
                    type="success"
                    title="Inquiry Successfully Logged"
                    message="Thank you. Your case details have been registered for preliminary policy screening. A consultant will review your submission shortly."
                    onClose={() => setFormStatus('idle')}
                  />
                )}

                {formStatus === 'error' && (
                  <FormStatusAlert
                    type="error"
                    title="Required Information Missing"
                    message="Please complete all required fields below before submitting your inquiry."
                    onClose={() => setFormStatus('idle')}
                  />
                )}

                <form onSubmit={handleInquirySubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="Contact Name"
                      required
                      placeholder="e.g. Richard Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                    />

                    <InputField
                      label="Business Email"
                      type="email"
                      required
                      placeholder="richard@sterlinglaw.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="Business / Practice Name"
                      required
                      placeholder="Sterling Legal Group, LLC"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      error={errors.businessName}
                    />

                    <SelectField
                      label="Assistance Requested"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      options={[
                        { value: 'assessment', label: 'Policy Violation Assessment' },
                        { value: 'dossier', label: 'Evidentiary Dossier Preparation' },
                        { value: 'guidance', label: 'Appeal Navigation Support' },
                        { value: 'enterprise', label: 'Enterprise Crisis Consultation' },
                      ]}
                    />
                  </div>

                  <TextAreaField
                    label="Contested Review Summary & Links"
                    required
                    rows={4}
                    placeholder="Provide review URLs, date of posting, and why you believe the review breaches Google policies (e.g. competitor post, fake engagement, harassment)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={errors.message}
                    helperText="Never include private credentials, passwords, or sensitive medical patient records."
                  />

                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Button
                      variant="luxury-primary"
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto uppercase tracking-wider text-xs font-semibold px-8 py-3.5"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>Submit For Review</span>
                    </Button>
                    <span className="text-[11px] text-muted flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span>Encrypted &amp; Privileged Consultation</span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          7. EDITORIAL FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ========================================================================= */}
      <section className="py-24 sm:py-32 relative">
        <Container size="md">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-ocean">
              VI. Frequently Addressed Matters
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-navy tracking-tight leading-tight">
              Honest Clarifications on Platform Policy.
            </h2>
            <p className="text-base text-secondary leading-relaxed">
              Clear answers regarding Google review eligibility, realistic timeframes, and institutional compliance standards.
            </p>
          </div>

          <Accordion items={editorialFaqs} defaultOpenIndex={0} />

          <div className="mt-12 text-center">
            <Button variant="secondary" to="/faq" className="text-xs uppercase tracking-wider font-semibold">
              <HelpCircle className="w-4 h-4 mr-2" />
              <span>Read Comprehensive FAQ Ledger</span>
            </Button>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          8. HEROIC FINAL EDITORIAL CTA
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-navy-midnight text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="lg" className="relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            <span>Protecting Legitimate Business Reputations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white max-w-3xl mx-auto tracking-tight leading-[1.12]">
            Let Us Examine Your Case Under the Light of{' '}
            <span className="italic font-light text-teal-light">Official Policy</span>.
          </h2>

          <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
            Speak directly with an experienced digital reputation advisor. Receive clear, confidential, and objective guidance on contested Google reviews.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 sm:gap-5">
            <Button
              variant="luxury-primary"
              size="lg"
              to="/contact"
              className="px-9 py-4 text-xs uppercase tracking-wider font-semibold"
            >
              <span>Initiate Case Assessment</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="luxury-ghost"
              size="lg"
              href={whatsappInquiryUrl}
              isExternal
              className="px-8 py-4 text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-teal" />
              <span>Direct WhatsApp Advisory</span>
            </Button>
          </div>

          <div className="pt-10 max-w-xl mx-auto border-t border-white/10 text-[11px] text-dark-muted leading-relaxed">
            <p>
              <strong className="text-white">Regulatory Notice:</strong> RepuShield is an independent online reputation consultancy and is not affiliated with, endorsed by, or partnered with Google LLC or Alphabet Inc. Google holds sole discretionary authority over whether content violates published policies and whether it is removed.
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomePage
