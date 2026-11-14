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
  ShieldAlert,
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
  AmbientGlow,
  PageIntro,
} from '@/components/common'

export const ServicesPage: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RiseRepute.%20I%20would%20like%20to%20learn%20more%20about%20your%20Google%20review%20removal%20assistance.'

  // Section 2: Five Core Negative Review Services
  const mainServices = [
    {
      id: 'one-star',
      icon: <ShieldAlert className="w-6 h-6 text-teal" />,
      title: '1-Star Google Review Removal Assistance',
      problem:
        'A wave of sudden 1-star ratings without text or explanation can drag down your aggregate rating and drive customers to competitors.',
      howWeHelp:
        'We analyze rating patterns, identify non-customer spikes, and build formal dossiers referencing Google’s spam and conflict policies.',
      involves: [
        'Review content and profile audit',
        'Verification against internal transaction and booking logs',
        'Submission through official Business Profile reporting tools',
      ],
      expectation:
        'Google evaluates whether the review demonstrates genuine customer engagement. Eligible policy breaches are submitted for removal.',
      badge: '1-Star Defense',
    },
    {
      id: 'fake-spam',
      icon: <FileSearch className="w-6 h-6 text-teal" />,
      title: 'Fake & Spam Review Reporting',
      problem:
        'Automated bot ratings, promotional advertising, or mistaken identity reviews clutter your listing with misleading information.',
      howWeHelp:
        'We help business owners document clear evidence that the reviewer was never a patron and that the content breaches Google’s spam guidelines.',
      involves: [
        'Off-topic and promotional link identification',
        'Suspicious account pattern documentation',
        'Direct policy citation under Google’s Fake Content clauses',
      ],
      expectation:
        'Google’s moderation team investigates the reviewer profile and removes content found to be promotional, fake, or automated.',
      badge: 'Spam Detection',
    },
    {
      id: 'policy-violating',
      icon: <FileText className="w-6 h-6 text-teal" />,
      title: 'Policy-Violating Review Assistance',
      problem:
        'Reviews containing defamatory allegations, harassment, hate speech, vulgarity, or personal employee attacks cause immediate reputational harm.',
      howWeHelp:
        'We cross-reference the review text against specific clauses in Google’s Prohibited and Restricted Content policies to assemble an airtight complaint.',
      involves: [
        'Former employee and competitor conflict of interest checks',
        'Harassment, profanity, and privacy violation flags',
        'Structuring verifiable operational timelines for escalation',
      ],
      expectation:
        'Content with demonstrable platform policy violations is flagged for expedited review through official Google channels.',
      badge: 'Policy Audit',
    },
    {
      id: 'appeal',
      icon: <Compass className="w-6 h-6 text-teal" />,
      title: 'Google Review Appeal Assistance',
      problem:
        'When an initial automated review flag is ignored or dismissed by Google’s automated filters, business owners feel they have hit a dead end.',
      howWeHelp:
        'We guide you through the official Google Business Profile appeal tool, compiling secondary rebuttal evidence for human moderator review.',
      involves: [
        'Case ID retrieval and formal appeal routing',
        'Comprehensive evidence dossier assembly (receipts, correspondence)',
        'Clear, factual written rebuttals focused strictly on Google guidelines',
      ],
      expectation:
        'A human Google policy specialist re-evaluates the case. While outcomes cannot be guaranteed, appeals present your strongest factual case.',
      badge: 'Official Appeal',
    },
    {
      id: 'protection',
      icon: <MessageSquare className="w-6 h-6 text-teal" />,
      title: 'Online Reputation Protection',
      problem:
        'Legitimate customer complaints cannot be removed simply for being negative, but poorly worded responses can worsen the situation.',
      howWeHelp:
        'We provide professional guidance on de-escalating genuine negative feedback and crafting diplomatic public responses that restore trust.',
      involves: [
        'De-escalation strategy for genuine customer dissatisfaction',
        'Constructive, brand-safe public response drafting',
        'Best practices for encouraging authentic positive customer feedback',
      ],
      expectation:
        'Demonstrates transparency and customer care to prospective clients, turning difficult interactions into demonstrations of professional integrity.',
      badge: 'Trust Building',
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
    <div className="flex flex-col text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. PAGE INTRO — LIGHT LEFT-ALIGNED INTRO FLOW WITH QUICK-JUMP CHIPS
          ========================================================================= */}
      <PageIntro
        layout="left"
        badge={
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card-light-page text-xs font-semibold text-ocean shadow-xs">
            <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
            <span className="tracking-wide text-xs">
              RiseRepute Review Services
            </span>
            <span className="text-ocean/40">•</span>
            <span className="font-script text-base text-ocean font-normal tracking-wide">
              Policy Focused
            </span>
          </div>
        }
        title={
          <>
            Our Reputation <span className="text-ocean">Assistance Services.</span>
          </>
        }
        subtitle="Practical, transparent guidance for businesses reviewing potentially policy-violating Google reviews."
        chips={
          <div className="mt-8 pt-5 border-t border-slate-200/70">
            <div className="flex flex-wrap gap-2.5 items-center">
              {mainServices.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold glass-card-light-page border-white/80 hover:border-ocean/40 text-navy hover:text-ocean transition-all duration-200 hover:shadow-xs group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal group-hover:scale-125 transition-transform" />
                  <span>{service.title}</span>
                </a>
              ))}
            </div>
          </div>
        }
      >
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
          href="#services-list"
          className="px-7 py-3.5 text-sm font-semibold glass-card-light-page border-white/80 text-navy hover:bg-white"
        >
          <span>Explore All Services</span>
        </Button>
      </PageIntro>

      {/* =========================================================================
          2. MAIN SERVICES SECTION (DETAILED PROBLEM/SOLUTION SERVICE CARDS)
          ========================================================================= */}
      <SectionWrapper id="services-list" variant="transparent" className="py-16 sm:py-24">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="teal" scriptNote="Targeted Solutions">
                What We Offer
              </Badge>
            }
            title="Comprehensive Google Review"
            accent="Assistance Services"
            subtitle="Clear, customer-focused services built specifically to resolve negative, fake, and policy-violating Google reviews through official channels."
          />

          <div className="space-y-8 mt-14">
            {mainServices.map((service) => (
              <div key={service.id} id={service.id} className="scroll-mt-28">
                <Card
                  variant="glass"
                  hoverLift
                  spotlight
                  tilt
                  className="p-8 sm:p-10"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Problem & RiseRepute Solution */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-teal/15 text-navy flex items-center justify-center icon-floating">
                          {service.icon}
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-bg-soft text-slate-700 border border-slate-200">
                            {service.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight mt-1">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          The Problem
                        </p>
                        <p className="text-sm text-secondary leading-relaxed bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/15">
                          {service.problem}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-ocean flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                          How RiseRepute Helps
                        </p>
                        <p className="text-sm text-secondary leading-relaxed">
                          {service.howWeHelp}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Service Inclusions & Realistic Expectations */}
                    <div className="lg:col-span-5 glass-card-public p-6 rounded-2xl space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-3">
                        <p className="text-xs uppercase font-bold text-navy tracking-wider">
                          What This Service Involves:
                        </p>
                        <div className="space-y-2">
                          {service.involves.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                              <Check className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-slate-200">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">
                            Realistic Expectations:
                          </p>
                          <p className="text-xs text-secondary leading-relaxed">
                            {service.expectation}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                        <Button variant="teal" size="sm" to="/contact">
                          <span>Request Assistance</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                        <span className="text-[11px] text-muted">Policy Compliant</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. HOW OUR SERVICE WORKS (FOUR-STEP PROCESS) — DARK NAVY BAND
          ========================================================================= */}
      <div className="relative">
        <CurvedHeroTransition position="top" fillColor="navy" height={75} />
        <section className="bg-gradient-to-b from-[#0F2C3D] via-[#0B212E] to-[#07131B] text-white py-16 sm:py-24 relative overflow-hidden">
          <AmbientGlow className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-ocean/20 opacity-50" />
          <Container size="xl" className="relative z-10">
            <SectionHeading
              badge={
                <Badge variant="teal" scriptNote="Clear Workflow">
                  How It Works
                </Badge>
              }
              title="A Systematic Four-Step"
              accent="Service Process"
              subtitle="We maintain an organized, step-by-step workflow so you always understand where your case stands and what actions are taking place."
              className="[&_h2]:text-white [&_p]:text-slate-300"
            />

            <StaggerContainer
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
              staggerChildren={0.12}
            >
              {processSteps.map((step) => (
                <StaggerItem key={step.step}>
                  <Card
                    variant="glass"
                    hoverLift
                    spotlight
                    tilt
                    className="glass-card-dark h-full p-7 sm:p-8 flex flex-col justify-between text-white"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-3xl font-extrabold text-teal font-mono">
                          {step.step}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-teal-light border border-white/15">
                          {step.tag}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {step.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn direction="up" delay={0.4}>
              <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/15 text-center max-w-2xl mx-auto">
                <p className="text-xs text-slate-300">
                  <strong className="text-white font-semibold">Important note:</strong> RiseRepute does not control Google’s internal decision-making or guarantee review removals. All reporting and appeals are evaluated independently by Google LLC.
                </p>
              </div>
            </FadeIn>
          </Container>
        </section>
        <CurvedHeroTransition position="bottom" fillColor="#DCEFF0" height={75} />
      </div>

      {/* =========================================================================
          4. WHAT WE CAN AND CANNOT DO (COMPARISON MATRIX)
          ========================================================================= */}
      <SectionWrapper variant="transparent" className="py-20 sm:py-28">
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
              <div className="h-full rounded-3xl glass-card-public border border-teal/30 p-8 sm:p-10 flex flex-col justify-between space-y-6">
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
              <div className="h-full rounded-3xl glass-card-public border border-slate-300/80 p-8 sm:p-10 flex flex-col justify-between space-y-6">
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
                    <strong className="text-navy font-semibold">RiseRepute</strong> is an independent service provider and is <strong className="text-navy font-semibold">not affiliated with, endorsed by, or officially connected to Google LLC</strong>. Google independently determines whether reported reviews violate its policies and whether any action is taken.
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
                shine
                glow
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
