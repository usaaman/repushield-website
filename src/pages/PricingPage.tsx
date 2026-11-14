import React from 'react'
import {
  Tag,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Scale,
  FileSearch,
  Layers,
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
  StaggerContainer,
  StaggerItem,
  TextReveal,
  AmbientGlow,
} from '@/components/common'

export const PricingPage: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20would%20like%20to%20request%20a%20quote%20for%20Google%20review%20assistance.'

  // Factors that determine custom quotes
  const quoteFactors = [
    {
      icon: <Layers className="w-6 h-6 text-teal" />,
      title: 'Number of Disputed Reviews',
      description:
        'Whether your business faces an isolated 1-star attack or a coordinated raid of multiple fake reviews affects the scope of evidence required.',
    },
    {
      icon: <Scale className="w-6 h-6 text-teal" />,
      title: 'Applicable Policy Clauses',
      description:
        'Different Google guidelines (conflicts of interest, harassment, spam, off-topic) require different documentation dossiers and proof.',
    },
    {
      icon: <FileSearch className="w-6 h-6 text-teal" />,
      title: 'Procedural Case History',
      description:
        'Whether this is a first-time submission through Google Business Profile or a complex secondary appeal for a previously rejected flag.',
    },
  ]

  // The 3-Step Quote Process
  const steps = [
    {
      number: '01',
      title: 'Share Your Reviews',
      description:
        'Provide the links to the contested Google reviews along with brief business context and reasons you believe they violate policy.',
    },
    {
      number: '02',
      title: 'Initial Assessment',
      description:
        'Our specialists analyze the reviews objectively against Google’s published guidelines to evaluate eligibility and scope.',
    },
    {
      number: '03',
      title: 'Transparent Custom Quote',
      description:
        'We deliver an honest, itemized quote detailing the recommended reporting and appeal strategy without hidden fees or false promises.',
    },
  ]

  // What every engagement includes
  const includedItems = [
    'Comprehensive review audit against Google’s published Prohibited Content policies',
    'Evidence file and operational timeline compilation (receipts, correspondence, rosters)',
    'Formal citation of specific Google policy clauses for optimal moderator clarity',
    'Step-by-step guidance through official Google Business Profile appeal channels',
    'Honest appraisal of review eligibility with zero false guarantees',
    'Direct communication via WhatsApp and email throughout the process',
  ]

  return (
    <div className="flex flex-col bg-bg-soft text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. PAGE HERO
          ========================================================================= */}
      <section className="relative min-h-[70vh] lg:min-h-[78vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-0">
        {/* Subtle Ambient Radial Lighting & Grain */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/95 via-navy/90 to-[#07131B]/95 pointer-events-none" />
        <AmbientGlow className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 opacity-60" />
        <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="xl" className="relative z-10 my-auto py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <FadeIn direction="up" delay={0.05} duration={0.6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill-hero text-xs font-semibold text-slate-100 shadow-sm">
                <Tag className="w-4 h-4 text-teal shrink-0" />
                <span className="tracking-wide text-xs">
                  Transparent Pricing
                </span>
                <span className="text-white/40">•</span>
                <span className="font-script text-base text-teal-light font-normal tracking-wide">
                  Quote-Based
                </span>
              </div>
            </FadeIn>

            <TextReveal
              lines={[
                { text: 'Every Review Situation' },
                { text: 'Is Different.', highlight: true },
              ]}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              delay={0.12}
            />

            <FadeIn direction="up" delay={0.25} duration={0.65}>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                Share your review concerns with us to discuss the appropriate assistance for your business. We provide honest, custom quotes based on the specific circumstances of your case.
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
                  className="px-8 py-4 text-sm font-bold shadow-lg shadow-teal/20"
                >
                  <span>Request a Quote</span>
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
          </div>
        </Container>

        <CurvedHeroTransition fillColor="white" height={95} />
      </section>

      {/* =========================================================================
          2. WHY QUOTE-BASED PRICING MATTERS
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={<Badge variant="ocean" scriptNote="No Gimmicks">Honest Evaluation</Badge>}
            title="Why We Provide"
            accent="Tailored Quotes"
            subtitle="Fixed 'per-review' package counters or one-size-fits-all prices are fundamentally misleading. Every business situation requires a specific procedural strategy."
          />

          <StaggerContainer
            className="grid md:grid-cols-3 gap-8 mt-14"
            staggerChildren={0.15}
          >
            {quoteFactors.map((factor) => (
              <StaggerItem key={factor.title}>
                <Card variant="glass" hoverLift spotlight className="h-full p-8 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal/15 text-navy flex items-center justify-center">
                    {factor.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy tracking-tight">{factor.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{factor.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. HOW TO GET A QUOTE (3 STEPS)
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={<Badge variant="teal">Simple Process</Badge>}
            title="How to Get"
            accent="Your Custom Quote"
            subtitle="Fast, straightforward, and completely confidential. Here is how we evaluate your case."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {steps.map((step) => (
              <Card key={step.number} variant="glass" hoverLift spotlight className="h-full p-8 space-y-4">
                <span className="text-3xl font-extrabold text-teal font-mono">{step.number}</span>
                <h3 className="text-xl font-bold text-navy">{step.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="primary" size="lg" shine to="/contact">
              <span>Request Your Quote Today</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          4. WHAT EVERY QUOTE INCLUDES
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="lg">
          <div className="glass-card-public rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="space-y-3">
              <Badge variant="ocean">Complete Transparency</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
                What Every RepuShield Engagement Includes
              </h2>
              <p className="text-sm sm:text-base text-secondary">
                We don’t cut corners or rely on automated scripts. Every quoted engagement provides comprehensive procedural support:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {includedItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-secondary font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <ShieldCheck className="w-4 h-4 text-teal" />
                <span>Zero fake reviews. Zero automated bots. Strictly official channels.</span>
              </div>
              <Button variant="teal" size="sm" shine glow to="/contact">
                <span>Request a Quote</span>
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          5. INDEPENDENCE NOTICE & FINAL CTA
          ========================================================================= */}
      <section className="relative bg-navy text-white py-20 sm:py-28 overflow-hidden">
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

        <Container size="lg" className="relative z-10 text-center space-y-7">
          <FadeIn direction="up">
            <Badge variant="glass" scriptNote="No Obligation">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal" />
              <span>Get Your Quote</span>
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to Discuss Your{' '}
              <span className="text-teal">Review Situation?</span>
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Send us the links to the contested reviews. We will review them against Google’s published policies and provide an honest, quote-based assessment.
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
                <span>Request a Quote</span>
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
              RepuShield is an independent provider not affiliated with Google LLC. Google independently decides on review removals.
            </p>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}

export default PricingPage
