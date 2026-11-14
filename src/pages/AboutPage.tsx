import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Scale,
  FileCheck,
  Eye,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Container,
  Button,
  Card,
  Badge,
  SectionWrapper,
  SectionHeading,
  CurvedHeroTransition,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  TextReveal,
  AmbientGlow,
} from '@/components/common'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useParallax } from '@/hooks/useParallax'

export const AboutPage: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion()
  const { x: heroBgX, y: heroBgY } = useParallax(12)
  const { x: glowX, y: glowY } = useParallax(-16)
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20would%20like%20to%20learn%20more%20about%20your%20Google%20review%20removal%20assistance.'

  // Section 3: Three Approach Pillars
  const approachPillars = [
    {
      number: '01',
      title: 'Policy First',
      description:
        'We focus strictly on platform policies and distinguish potentially policy-violating content from genuine customer feedback.',
      details: [
        'Objective review auditing against published Google content guidelines',
        'Identification of clear conflict of interest and competitor attacks',
        'Distinguishing actionable platform violations from customer dissatisfaction',
      ],
      icon: <Scale className="w-6 h-6 text-teal" />,
    },
    {
      number: '02',
      title: 'Transparency',
      description:
        'We explain the available options, limitations and realistic expectations before proceeding.',
      details: [
        'Clear upfront case evaluation without speculative promises',
        'No secret methods or opaque algorithms — complete procedural visibility',
        'Direct advice on when constructive public response is the correct route',
      ],
      icon: <Eye className="w-6 h-6 text-teal" />,
    },
    {
      number: '03',
      title: 'Professional Guidance',
      description:
        'We help organize relevant information and navigate the appropriate reporting and appeal procedures.',
      details: [
        'Systematic assembly of operational logs and transaction records',
        'Cross-referencing evidence against specific Google policy clauses',
        'Step-by-step guidance through official Business Profile appeal workflows',
      ],
      icon: <Layers className="w-6 h-6 text-teal" />,
    },
  ]

  // Section 4: What We Stand For
  const principles = [
    {
      title: 'Honesty over unrealistic promises.',
      description:
        'We never make false guarantees or claim proprietary access to Google moderators. If a review represents genuine customer dissatisfaction, we explain why removal is inappropriate and advise on constructive public responses.',
      icon: <ShieldCheck className="w-6 h-6 text-teal" />,
      tag: 'Integrity First',
    },
    {
      title: 'Evidence over assumptions.',
      description:
        'Platform policy appeals succeed on demonstrable facts, not emotional assertions. We help business owners assemble clear audit trails, point-of-sale logs, employee rosters, and verifiable correspondence.',
      icon: <FileCheck className="w-6 h-6 text-teal" />,
      tag: 'Factual Rigor',
    },
    {
      title: 'Policy compliance over shortcuts.',
      description:
        'We operate strictly within published platform guidelines and legal parameters. We never engage in review astroturfing, fake counter-reviews, bot manipulation, or deceptive suppression schemes.',
      icon: <Lock className="w-6 h-6 text-teal" />,
      tag: 'Ethical Standard',
    },
    {
      title: 'Clear communication throughout the process.',
      description:
        'You always know what stage your case is in, which policy clause has been cited, and what official options remain available. We maintain direct, prompt communication without confusing jargon.',
      icon: <MessageCircle className="w-6 h-6 text-teal" />,
      tag: 'Transparency',
    },
  ]

  return (
    <div className="flex flex-col text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. PAGE OPENING — TWO-COLUMN EDITORIAL SPLIT WITH 3D GLASS SHIELD
          ========================================================================= */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 overflow-hidden">
        <Container size="xl" className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn direction="up" delay={0.05} duration={0.6}>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill-ocean text-xs font-semibold text-ocean shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
                  <span className="tracking-wide text-xs">
                    About RepuShield
                  </span>
                  <span className="text-ocean/40">•</span>
                  <span className="font-script text-base text-ocean font-normal tracking-wide">
                    Policy Focused
                  </span>
                </div>
              </FadeIn>

              <TextReveal
                lines={[
                  { text: 'About' },
                  { text: 'RepuShield.', highlight: true },
                ]}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy leading-[1.12]"
                delay={0.12}
              />

              <FadeIn direction="up" delay={0.25} duration={0.65}>
                <p className="text-base sm:text-xl text-secondary font-normal leading-relaxed max-w-2xl">
                  A transparent, policy-focused approach to negative Google review assistance.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.35} duration={0.6}>
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <Button
                    variant="teal"
                    size="lg"
                    shine
                    glow
                    to="/contact"
                    className="px-7 py-3.5 text-sm font-bold shadow-lg shadow-teal/20"
                  >
                    <span>Get Help With Negative Reviews</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    shine
                    to="/services"
                    className="px-7 py-3.5 text-sm font-semibold glass-card-public border-white/80 text-navy hover:bg-white"
                  >
                    <span>Explore Our Services</span>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right Decorative 3D Glass Shield Composition (Strictly Decorative) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <FadeIn direction="up" delay={0.2} duration={0.7} className="w-full">
                <div className="relative mx-auto max-w-sm sm:max-w-md w-full aspect-square flex items-center justify-center">
                  {/* Subtle Ambient Radial Lighting with Parallax */}
                  <motion.div
                    style={prefersReduced ? undefined : { x: glowX, y: glowY }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-64 h-64 rounded-full bg-teal/20 blur-3xl" />
                    <div className="w-48 h-48 rounded-full bg-ocean/20 blur-2xl" />
                  </motion.div>

                  {/* Layered Decorative Elements with Parallax */}
                  <motion.div
                    style={prefersReduced ? undefined : { x: heroBgX, y: heroBgY }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    {/* Center Glass Shield Container */}
                    <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl glass-card-public border-white/90 shadow-xl shadow-ocean/10 flex flex-col items-center justify-center relative overflow-hidden p-6 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-teal/10 pointer-events-none" />
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-navy to-ocean text-white flex items-center justify-center shadow-lg shadow-ocean/30 relative">
                        <ShieldCheck className="w-12 h-12 sm:w-14 sm:h-14 text-teal stroke-[2]" />
                      </div>
                      <div className="mt-4 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                        <span className="w-12 h-1 rounded-full bg-ocean/30" />
                      </div>
                    </div>

                    {/* Satellite Floating Glass Tile 1: Scale */}
                    <div className="absolute top-4 left-4 sm:left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass-card-public border-white/90 shadow-md flex items-center justify-center text-teal icon-floating">
                      <Scale className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </div>

                    {/* Satellite Floating Glass Tile 2: FileCheck */}
                    <div
                      className="absolute bottom-6 left-6 sm:left-8 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass-card-public border-white/90 shadow-md flex items-center justify-center text-ocean icon-floating"
                      style={{ animationDelay: '1.2s' }}
                    >
                      <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </div>

                    {/* Satellite Floating Glass Tile 3: Eye */}
                    <div
                      className="absolute top-8 right-4 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass-card-public border-white/90 shadow-md flex items-center justify-center text-teal icon-floating"
                      style={{ animationDelay: '2.4s' }}
                    >
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </div>

                    {/* Satellite Floating Glass Tile 4: Lock */}
                    <div
                      className="absolute bottom-8 right-6 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass-card-public border-white/90 shadow-md flex items-center justify-center text-ocean icon-floating"
                      style={{ animationDelay: '1.8s' }}
                    >
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. WHO WE ARE SECTION
          ========================================================================= */}
      <SectionWrapper variant="transparent" className="py-16 sm:py-24">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn direction="up">
                <Badge variant="ocean" scriptNote="Our Purpose">
                  Who We Are
                </Badge>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-navy leading-tight">
                  Helping Businesses Navigate{' '}
                  <span className="text-ocean">Online Reputation Challenges</span>
                </h2>
              </FadeIn>

              <FadeIn direction="up" delay={0.18}>
                <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal">
                  RepuShield provides independent online reputation management assistance to businesses dealing with reviews they believe may violate platform policies. Our approach focuses on understanding the concern, reviewing available information and guiding businesses through appropriate reporting and appeal processes.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.25}>
                <p className="text-sm sm:text-base text-secondary leading-relaxed font-normal">
                  In today's digital economy, potential customers check Google ratings before making purchasing decisions. A single malicious 1-star attack, competitor smear, or fake review can unfairly distort your business's reputation. We provide business owners with an objective, experienced partner who understands Google's policies and official appeal procedures.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.32}>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="font-semibold text-navy uppercase tracking-wider text-[11px]">
                    What We Focus On:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-secondary">
                    <span className="px-3 py-1 rounded-full bg-bg-soft border border-slate-200">
                      1-Star Review Audits
                    </span>
                    <span className="px-3 py-1 rounded-full bg-bg-soft border border-slate-200">
                      Fake & Spam Detection
                    </span>
                    <span className="px-3 py-1 rounded-full bg-bg-soft border border-slate-200">
                      Official Escalation Dossiers
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Architectural Summary Card */}
            <div className="lg:col-span-5">
              <FadeIn direction="up" delay={0.2}>
                <div className="glass-card-public rounded-3xl p-8 sm:p-9 space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                    <div className="w-12 h-12 rounded-2xl bg-navy text-teal flex items-center justify-center shadow-xs">
                      <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy">
                        Why Policy Compliance Matters
                      </h3>
                      <p className="text-xs text-secondary">
                        Protecting Your Google Profile
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal/15 text-navy flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          Avoid Account Penalties
                        </p>
                        <p className="text-xs text-secondary mt-0.5">
                          Unethical tactics like buying fake reviews or review-bombing backfire. We operate strictly within official Google channels.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal/15 text-navy flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          Evidence-Based Submissions
                        </p>
                        <p className="text-xs text-secondary mt-0.5">
                          Google moderators require factual verification. We assemble point-of-sale logs, employee rosters, and operational timelines.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal/15 text-navy flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          Realistic Expectations
                        </p>
                        <p className="text-xs text-secondary mt-0.5">
                          We never guarantee review deletion. If a review cannot be removed, we guide you on constructive public responses.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean hover:text-navy transition-colors"
                    >
                      <span>Explore our review assistance services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. OUR APPROACH SECTION (THREE PILLARS) — DARK NAVY BAND
          ========================================================================= */}
      <div className="relative">
        <CurvedHeroTransition position="top" fillColor="navy" height={75} />
        <section className="bg-gradient-to-b from-[#0F2C3D] via-[#0B212E] to-[#07131B] text-white py-16 sm:py-24 relative overflow-hidden">
          <AmbientGlow className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-ocean/20 opacity-50" />
          <Container size="xl" className="relative z-10">
            <SectionHeading
              badge={
                <Badge variant="teal" scriptNote="Three Pillars">
                  Our Methodology
                </Badge>
              }
              title="A Principled, Three-Pillar Approach to"
              accent="Review Assistance"
              subtitle="We provide clear, honest guidance built on published platform policies. We never promise guaranteed removals or cut corners with dishonest methods."
              className="[&_h2]:text-white [&_p]:text-slate-300"
            />

            <StaggerContainer
              className="grid md:grid-cols-3 gap-8 mt-14"
              staggerChildren={0.15}
            >
              {approachPillars.map((pillar) => (
                <StaggerItem key={pillar.number}>
                  <Card
                    variant="glass"
                    hoverLift
                    spotlight
                    tilt
                    className="glass-card-dark h-full flex flex-col justify-between p-8 sm:p-9 text-white"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 text-teal flex items-center justify-center border border-white/15 icon-floating">
                          {pillar.icon}
                        </div>
                        <span className="text-3xl font-extrabold text-teal font-mono">
                          {pillar.number}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {pillar.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>

                      <div className="space-y-2.5 pt-2 border-t border-white/10">
                        {pillar.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10">
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:text-white transition-colors"
                      >
                        <span>View related service options</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
        <CurvedHeroTransition position="bottom" fillColor="soft" height={75} />
      </div>

      {/* =========================================================================
          4. WHAT WE STAND FOR SECTION (FOUR PRINCIPLES)
          ========================================================================= */}
      <SectionWrapper variant="transparent" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="teal" scriptNote="Our Standards">
                Core Principles
              </Badge>
            }
            title="The Standards That Guide"
            accent="Every Consultation"
            subtitle="Our work is grounded in ethical reputation management, transparency, and strict adherence to official platform policies."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 gap-6 lg:gap-8 mt-14"
            staggerChildren={0.12}
          >
            {principles.map((principle) => (
              <StaggerItem key={principle.title}>
                <Card
                  variant="glass"
                  hoverLift
                  spotlight
                  tilt
                  className="h-full p-8 sm:p-9 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center icon-floating">
                        {principle.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-bg-soft text-slate-600 border border-slate-200">
                        {principle.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-navy tracking-tight">
                      {principle.title}
                    </h3>

                    <p className="text-sm text-secondary leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          5. INDEPENDENCE NOTICE SECTION
          ========================================================================= */}
      <SectionWrapper variant="transparent" className="py-16 sm:py-24">
        <Container size="lg">
          <FadeIn direction="up">
            <div className="glass-card-public rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-ocean via-teal to-ocean" />

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0 border border-ocean/20 shadow-xs">
                  <AlertTriangle className="w-7 h-7 stroke-[2]" />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    <HelpCircle className="w-3.5 h-3.5 text-ocean" />
                    <span>Official Platform Disclaimer</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                    Independent Service Provider Notice
                  </h3>

                  <p className="text-base text-secondary leading-relaxed">
                    <strong className="text-navy font-semibold">RepuShield</strong> is an independent service provider and is <strong className="text-navy font-semibold">not affiliated with, endorsed by, or officially connected to Google LLC</strong>. Google Maps, Google Business Profile, and Google Reviews are registered trademarks of Google LLC.
                  </p>

                  <p className="text-sm text-secondary leading-relaxed">
                    Google LLC independently determines whether reported content violates its policies and whether any action is taken. RepuShield does not possess internal access to Google moderation systems, does not control appeal timelines, and cannot guarantee the removal of any review.
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-ocean">
                    <ShieldCheck className="w-4 h-4 text-teal" />
                    <span>Ethical, policy-compliant consulting dedicated to business transparency.</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          6. FINAL CTA SECTION
          ========================================================================= */}
      <section className="relative bg-navy text-white py-20 sm:py-28 overflow-hidden">
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

        <Container size="lg" className="relative z-10 text-center space-y-7">
          <FadeIn direction="up">
            <Badge variant="glass" scriptNote="Take Action">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal" />
              <span>Next Steps</span>
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Let's Discuss Your{' '}
              <span className="text-teal">Reputation Concerns</span>
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Share the disputed reviews affecting your business for an objective, policy-focused assessment. We explain your available options with honesty and transparency.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="pt-3 flex flex-wrap justify-center gap-4 sm:gap-5">
              <Button
                variant="teal"
                size="lg"
                shine
                glow
                to="/contact"
                className="px-8 py-4 text-sm font-bold shadow-lg shadow-teal/20"
              >
                <span>Request Assistance</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappUrl}
                isExternal
                className="px-7 py-4 text-sm font-semibold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto pt-2">
              Confidential and policy-compliant case assessment.
            </p>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}

export default AboutPage
