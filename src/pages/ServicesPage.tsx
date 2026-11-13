import React from 'react'
import {
  FileSearch,
  FileText,
  Compass,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  MessageCircle,
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

export const ServicesPage: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion()
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20would%20like%20to%20learn%20more%20about%20your%20reputation%20services.'

  // Section 2: Four Core Services
  const mainServices = [
    {
      id: 'assessment',
      icon: <FileSearch className="w-6 h-6 text-teal" />,
      title: 'Google Review Policy Assessment',
      description:
        'We help businesses examine disputed Google reviews against relevant platform policies and identify whether there may be grounds for reporting.',
      items: [
        'Review content assessment against published guidelines',
        'Identification of potentially relevant policy concerns (e.g. conflicts of interest, spam, offensive language)',
        'Initial guidance on available options and realistic procedural expectations',
      ],
      badge: 'Core Audit',
    },
    {
      id: 'reporting',
      icon: <FileText className="w-6 h-6 text-teal" />,
      title: 'Review Reporting Assistance',
      description:
        'We help businesses organize relevant information and understand the appropriate process for submitting reports through official platform channels.',
      items: [
        'Review URL and information organization into structured files',
        'Relevant evidence documentation (transaction records, correspondence logs)',
        'Guidance on official reporting procedures through Google Business Profile tools',
      ],
      badge: 'Structured Dossier',
    },
    {
      id: 'appeal',
      icon: <Compass className="w-6 h-6 text-teal" />,
      title: 'Appeal Process Guidance',
      description:
        'We provide guidance to businesses navigating available appeal procedures when they believe a review or reporting decision deserves further consideration.',
      items: [
        'Explanation of available appeal steps and administrative workflows',
        'Evidence organization and rebuttal clarity for secondary review',
        'Guidance on official appeal channels and formal dispute routing',
      ],
      badge: 'Administrative Escalation',
    },
    {
      id: 'consultation',
      icon: <MessageSquare className="w-6 h-6 text-teal" />,
      title: 'Online Reputation Consultation',
      description:
        'We help businesses understand how to respond professionally to online feedback and approach reputation-related concerns responsibly.',
      items: [
        'Professional review response guidance for genuine customer feedback',
        'Reputation management recommendations and crisis de-escalation',
        'Long-term communication practices that build customer trust and brand resilience',
      ],
      badge: 'Strategic Advisory',
    },
  ]

  // Section 3: Four-Step Process
  const processSteps = [
    {
      step: '01',
      title: 'Share Your Concern',
      description:
        'Provide the disputed review URL and relevant business context so we understand the specific background of the dispute.',
      tag: 'Initial Intake',
    },
    {
      step: '02',
      title: 'Initial Assessment',
      description:
        'We examine the available information and relevant platform policies to evaluate whether legitimate policy violations exist.',
      tag: 'Policy Evaluation',
    },
    {
      step: '03',
      title: 'Guidance and Documentation',
      description:
        'We explain potential next steps and help organize relevant information into a clear, factual dossier ready for submission.',
      tag: 'Dossier Assembly',
    },
    {
      step: '04',
      title: 'Follow-Up Guidance',
      description:
        'We explain available next steps based on the platform’s response, including secondary appeal options if available.',
      tag: 'Procedural Support',
    },
  ]

  // Section 4: What We Can and Cannot Do
  const canDoPoints = [
    'Assess reviews against relevant platform policies and published criteria.',
    'Help organize supporting information, transaction logs, and operational timelines.',
    'Guide businesses through official reporting and appeal procedures.',
    'Provide professional reputation management and public response guidance.',
  ]

  const cannotDoPoints = [
    'Removal of every negative review simply because it is unfavorable.',
    'Removal of genuine customer feedback that reflects an authentic experience.',
    'A specific decision or guaranteed timeline from Google LLC.',
    'Control over Google’s independent review moderation and appeal decisions.',
  ]

  return (
    <div className="flex flex-col bg-bg-soft text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. PAGE HERO — EXECUTIVE EDITORIAL VISUAL TREATMENT
          ========================================================================= */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-0">
        {/* Full-Bleed Executive Background Photograph */}
        <motion.div
          initial={prefersReduced ? { scale: 1, opacity: 0.85 } : { scale: 1.05, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center lg:bg-right-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: "url('/images/hero-executive-reputation.jpg')",
          }}
          aria-hidden="true"
        />

        {/* Sophisticated Dark Navy Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091722]/95 via-[#0F2C3D]/85 to-[#091722]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/85 via-transparent to-[#07131B]/95 pointer-events-none" />

        {/* Subtle Ambient Radial Lighting */}
        <AmbientGlow className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 opacity-60" />
        <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />

        {/* Tactile Noise Grain */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        {/* Hero Content Container */}
        <Container size="xl" className="relative z-10 my-auto py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <FadeIn direction="up" delay={0.05} duration={0.6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
                <span className="tracking-wide text-xs">
                  RepuShield Services
                </span>
                <span className="text-white/40">•</span>
                <span className="font-script text-base text-teal-light font-normal tracking-wide">
                  Policy Focused
                </span>
              </div>
            </FadeIn>

            <TextReveal
              lines={[
                { text: 'Our Reputation' },
                { text: 'Assistance Services.', highlight: true },
              ]}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              delay={0.12}
            />

            <FadeIn direction="up" delay={0.25} duration={0.65}>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                Practical, transparent guidance for businesses reviewing potentially policy-violating Google reviews.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.35} duration={0.6}>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Button
                  variant="teal"
                  size="lg"
                  to="/contact"
                  className="px-7 py-3.5 text-sm font-bold shadow-lg shadow-teal/20"
                >
                  <span>Request Assistance</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  variant="luxury-ghost"
                  size="lg"
                  href="#services-list"
                  className="px-7 py-3.5 text-sm font-semibold"
                >
                  <span>Explore All Services</span>
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* Smooth Organic Wave Transition into Section 2 */}
        <CurvedHeroTransition fillColor="white" height={95} />
      </section>

      {/* =========================================================================
          2. MAIN SERVICES SECTION (FOUR DETAILED SERVICES)
          ========================================================================= */}
      <SectionWrapper id="services-list" variant="white" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="teal" scriptNote="Structured Assistance">
                What We Offer
              </Badge>
            }
            title="Comprehensive, Policy-Aligned"
            accent="Assistance Options"
            subtitle="Every service is designed to bring procedural clarity, objective evidence organization, and ethical advocacy to your online reputation challenges."
          />

          <StaggerContainer
            className="grid md:grid-cols-2 gap-8 mt-14"
            staggerChildren={0.15}
          >
            {mainServices.map((service) => (
              <StaggerItem key={service.id}>
                <Card
                  variant="white"
                  hoverLift
                  className="h-full p-8 sm:p-9 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal/15 text-navy flex items-center justify-center">
                        {service.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-bg-soft text-slate-700 border border-slate-200">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-secondary leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <p className="text-xs uppercase font-bold text-navy tracking-wider">
                        Key Service Components:
                      </p>
                      {service.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary">
                          <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <Button variant="ghost" size="sm" to="/contact" className="text-xs font-bold text-ocean hover:text-navy px-0">
                      <span>Inquire about this service</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                    <span className="text-[11px] text-muted">
                      Policy-Compliant
                    </span>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. HOW OUR SERVICE WORKS (FOUR-STEP PROCESS)
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="ocean" scriptNote="Clear Workflow">
                How It Works
              </Badge>
            }
            title="A Systematic Four-Step"
            accent="Service Process"
            subtitle="We maintain an organized, step-by-step workflow so you always understand where your case stands and what actions are taking place."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
            staggerChildren={0.12}
          >
            {processSteps.map((step) => (
              <StaggerItem key={step.step}>
                <Card
                  variant="white"
                  hoverLift
                  className="h-full p-7 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-3xl font-extrabold text-teal font-mono">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-bg-soft text-slate-600 border border-slate-200">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-navy tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-sm text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn direction="up" delay={0.4}>
            <div className="mt-10 p-4 rounded-2xl bg-white border border-slate-200 text-center max-w-2xl mx-auto">
              <p className="text-xs text-secondary">
                <strong className="text-navy font-semibold">Important note:</strong> RepuShield does not control Google’s internal decision-making or guarantee review removals. All reporting and appeals are evaluated independently by Google LLC.
              </p>
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          4. WHAT WE CAN AND CANNOT DO (COMPARISON MATRIX)
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="teal" scriptNote="Setting Expectations">
                Clarity & Transparency
              </Badge>
            }
            title="What We Can and"
            accent="Cannot Do"
            subtitle="Honesty is central to our reputation counsel. We define clear boundaries upfront so you know exactly what to expect from our assistance."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {/* Column 1: What We Can Do */}
            <FadeIn direction="up" delay={0.1}>
              <div className="h-full rounded-3xl bg-teal/5 border border-teal/20 p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/15 text-navy text-xs font-bold border border-teal/30">
                    <Check className="w-4 h-4 text-teal" />
                    <span>What We Can Do</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-navy tracking-tight">
                    Professional, Policy-Focused Capabilities
                  </h3>

                  <div className="space-y-3.5 pt-2">
                    {canDoPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-secondary">
                        <div className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-teal/20">
                  <p className="text-xs text-secondary font-medium">
                    Strictly grounded in published Google policies and verifiable evidence.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Column 2: What We Cannot Guarantee */}
            <FadeIn direction="up" delay={0.2}>
              <div className="h-full rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300">
                    <X className="w-4 h-4 text-slate-600" />
                    <span>What We Cannot Guarantee</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-navy tracking-tight">
                    Realistic Limits & Independent Decisions
                  </h3>

                  <div className="space-y-3.5 pt-2">
                    {cannotDoPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-secondary">
                        <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-muted font-medium">
                    We never make deceptive promises or claim guaranteed review removal.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          5. GOOGLE POLICY DISCLAIMER SECTION
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-16 sm:py-24">
        <Container size="lg">
          <FadeIn direction="up">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-ocean via-teal to-ocean" />

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0 border border-ocean/20 shadow-xs">
                  <AlertTriangle className="w-7 h-7 stroke-[2]" />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    <HelpCircle className="w-3.5 h-3.5 text-ocean" />
                    <span>Important Policy Notice</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                    Google LLC Independence Disclaimer
                  </h3>

                  <p className="text-base text-secondary leading-relaxed">
                    <strong className="text-navy font-semibold">RepuShield</strong> is an independent service provider and is <strong className="text-navy font-semibold">not affiliated with, endorsed by, or officially connected to Google LLC</strong>. Google independently determines whether reported reviews violate its policies and whether any action is taken.
                  </p>

                  <p className="text-sm text-secondary leading-relaxed">
                    Our role is strictly limited to assisting business representatives with policy identification, factual evidence structuring, and navigating official reporting workflows. We make no representations regarding the outcome or processing timeline of any dispute.
                  </p>
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
        {/* Ambient Glow & Film Grain */}
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

        <Container size="lg" className="relative z-10 text-center space-y-7">
          <FadeIn direction="up">
            <Badge variant="glass" scriptNote="Policy Review">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal" />
              <span>Get Started</span>
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Need Guidance With a{' '}
              <span className="text-teal">Disputed Review?</span>
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Tell us about your concern and we will help you understand the appropriate next steps.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="pt-3 flex flex-wrap justify-center gap-4 sm:gap-5">
              <Button
                variant="teal"
                size="lg"
                to="/contact"
                className="px-8 py-4 text-sm font-bold shadow-lg shadow-teal/20"
              >
                <span>Request Assistance</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <Button
                variant="luxury-ghost"
                size="lg"
                to="/contact"
                className="px-8 py-4 text-sm font-semibold"
              >
                <span>Contact Us</span>
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

export default ServicesPage
