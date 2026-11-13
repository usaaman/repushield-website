import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  ShieldAlert,
  FileSearch,
  FileText,
  Compass,
  MessageSquare,
  ArrowRight,
  MessageCircle,
  Mail,
  Scale,
  Lock,
  Building2,
  Utensils,
  Stethoscope,
  Hotel,
  ShoppingBag,
  Briefcase,
  HelpCircle,
  AlertCircle,
  Check,
  Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Button,
  Container,
  Badge,
  Card,
  CurvedHeroTransition,
  SectionWrapper,
  SectionHeading,
  Accordion,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  TextReveal,
  AmbientGlow,
} from '@/components/common'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export const HomePage: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion()

  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20would%20like%20to%20request%20assistance%20with%20a%20Google%20review%20policy%20assessment.'

  // Core Services Data
  const services = [
    {
      icon: <FileSearch className="w-6 h-6 text-teal" />,
      title: 'Google Review Policy Assessment',
      description:
        'In-depth forensic audit of disputed reviews against published Google content guidelines to identify actionable policy violations such as conflicts of interest, spam, or harassment.',
      points: [
        'Conflict of interest & employee review audits',
        'Profanity, harassment & defamatory flags',
        'Non-customer / off-topic engagement checks',
      ],
      linkTo: '/services',
    },
    {
      icon: <FileText className="w-6 h-6 text-teal" />,
      title: 'Review Reporting Assistance',
      description:
        'Guidance on assembling verifiable business facts, customer record timelines, and clear policy citations into structured reporting packages ready for platform submission.',
      points: [
        'Factual operational timeline assembly',
        'Specific policy clause cross-referencing',
        'Standard escalation channel preparation',
      ],
      linkTo: '/services',
    },
    {
      icon: <Compass className="w-6 h-6 text-teal" />,
      title: 'Appeal Process Guidance',
      description:
        'Procedural step-by-step assistance navigating the Google Business Profile appeal and escalation pathways when initial automated reporting flags are overlooked.',
      points: [
        'Official Google Business Profile appeal routing',
        'Secondary administrative review assistance',
        'Procedural documentation & status tracking',
      ],
      linkTo: '/services',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-teal" />,
      title: 'Online Reputation Consultation',
      description:
        'Professional advice on public review response formulation, internal resolution strategies, and long-term brand reputation health for small and mid-sized enterprises.',
      points: [
        'Ethical, de-escalating review responses',
        'Proactive profile reputation defense',
        'Operational feedback management guidance',
      ],
      linkTo: '/services',
    },
  ]

  // Four-Step Process Data
  const steps = [
    {
      number: '01',
      title: 'Submit Your Request',
      description:
        'Share links to the contested Google reviews along with brief operational context and reasons why the content is believed to breach platform guidelines.',
      tag: 'Initial Intake',
    },
    {
      number: '02',
      title: 'Review Assessment',
      description:
        'Our specialists analyze the reviews objectively against Google’s published Prohibited and Restricted Content policies to verify qualification.',
      tag: 'Policy Audit',
    },
    {
      number: '03',
      title: 'Policy-Based Guidance',
      description:
        'We prepare structured evidence documentation and guide your authorized business representative through formal platform reporting mechanisms.',
      tag: 'Dossier Assembly',
    },
    {
      number: '04',
      title: 'Follow-Up Support',
      description:
        'We monitor case milestones and provide ongoing procedural advice for secondary appeal escalation if initial automated reports are denied.',
      tag: 'Ongoing Guidance',
    },
  ]

  // Why Choose RepuShield Data
  const whyChoosePoints = [
    {
      icon: <Scale className="w-6 h-6 text-teal" />,
      title: 'Transparent Process',
      description:
        'No mysterious black-box methods. You know exactly which Google policies are being cited, what evidence is assembled, and what steps are taken.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal" />,
      title: 'Policy-Focused Approach',
      description:
        'We operate strictly within official platform guidelines. We never use bots, fake positive reviews, or unethical removal schemes.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-teal" />,
      title: 'Clear Communication',
      description:
        'Direct, confidential communication via WhatsApp and email with realistic turnaround expectations and prompt, honest assessments.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-teal" />,
      title: 'Business-Oriented Support',
      description:
        'Built specifically for small and medium businesses, medical clinics, restaurants, hotels, and professional practices across the USA, Canada, and Pakistan.',
    },
  ]

  // Industries Supported Data
  const industries = [
    {
      title: 'Restaurants & Dining',
      icon: <Utensils className="w-5 h-5 text-teal" />,
      image: '/images/industries/restaurant.jpg',
      description:
        'Defending dining establishments against competitor sabotage, coordinated negative review campaigns, and claims by non-patrons.',
    },
    {
      title: 'Healthcare & Clinics',
      icon: <Stethoscope className="w-5 h-5 text-teal" />,
      image: '/images/industries/clinic.jpg',
      description:
        'Protecting medical, dental, and wellness practices against defamatory attacks, non-patient spam, and privacy-violating comments.',
    },
    {
      title: 'Hospitality & Hotels',
      icon: <Hotel className="w-5 h-5 text-teal" />,
      image: '/images/industries/hospitality.jpg',
      description:
        'Safeguarding guest accommodations and resorts from extortionate review threats, third-party booking confusion, and false guest claims.',
    },
    {
      title: 'Retail & Boutiques',
      icon: <ShoppingBag className="w-5 h-5 text-teal" />,
      image: '/images/industries/retail.jpg',
      description:
        'Resolving unverified transaction disputes, off-topic courier complaints, and targeted negative rating spikes on store locations.',
    },
    {
      title: 'Professional Services',
      icon: <Briefcase className="w-5 h-5 text-teal" />,
      image: '/images/industries/professional.jpg',
      description:
        'Supporting legal firms, financial advisors, and corporate consultancies facing defamatory, conflict-of-interest, or former employee reviews.',
    },
  ]

  // Homepage FAQ Preview Data
  const faqItems = [
    {
      question: 'Does RepuShield promise or guarantee review removals?',
      answer:
        'No. RepuShield does not and cannot promise or guarantee review removal. Google LLC holds exclusive authority over all content hosted on Google Maps and Google Business Profiles. Our role is strictly advisory: we identify demonstrable violations of published policies, assemble objective evidence files, and guide business owners through formal reporting and appeal mechanisms.',
    },
    {
      question: 'What types of Google reviews violate platform policy?',
      answer:
        'Google’s Prohibited and Restricted Content policies strictly forbid reviews that contain conflicts of interest (e.g. competitors or former employees), spam, fraudulent/fake customer feedback, harassment, hate speech, offensive language, or content that does not represent a genuine business experience.',
    },
    {
      question: 'Can legitimate negative customer feedback be removed?',
      answer:
        'No. Google’s platform policies are specifically designed to protect honest consumer feedback. RepuShield does not seek the removal of genuine negative customer experiences. In those situations, we provide professional guidance on public review response strategies and customer resolution best practices.',
    },
    {
      question: 'What regions and markets does RepuShield support?',
      answer:
        'We assist small and medium enterprises, clinics, hospitality businesses, and professional service providers primarily located in the United States, Canada, and Pakistan, adhering to applicable regional guidelines and business standards.',
    },
    {
      question: 'How long does the Google review appeal process take?',
      answer:
        'Our initial policy assessment is typically completed within 24 to 48 hours. Once a formal report or appeal dossier is submitted, Google’s internal review queues generally take between 3 and 14 business days to evaluate and render an administrative decision.',
    },
  ]

  return (
    <div className="flex flex-col bg-bg-soft text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. HERO SECTION — MINIMAL LUXURY EDITORIAL (FULL BACKGROUND PHOTOGRAPHY)
          ========================================================================= */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-0">
        {/* Full-Bleed High-Quality Background Photograph */}
        <motion.div
          initial={prefersReduced ? { scale: 1, opacity: 0.85 } : { scale: 1.05, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center lg:bg-right-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: "url('/images/hero-reputation-counsel.jpg')",
          }}
          aria-hidden="true"
        />

        {/* Sophisticated Dark Navy Gradient Overlay:
            Horizontal: High contrast dark navy on left for readability, tapering toward right so twilight architectural photography remains visible.
            Vertical: Darker at the top beneath the navigation and at the base transitioning into the curved sweep. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091722]/95 via-[#0F2C3D]/80 to-[#091722]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/85 via-transparent to-[#07131B]/95 pointer-events-none" />

        {/* Subtle Ambient Radial Lighting */}
        <AmbientGlow className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 opacity-60" />
        <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />

        {/* Tactile Fine Film Grain */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        {/* Clean, Left-Aligned Minimal Hero Content */}
        <Container size="xl" className="relative z-10 my-auto py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-7">
            {/* Eyebrow Badge */}
            <FadeIn direction="up" delay={0.05} duration={0.6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-slate-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
                <span className="tracking-wide text-xs">
                  Independent Online Reputation Assistance
                </span>
              </div>
            </FadeIn>

            {/* Main Headline */}
            <TextReveal
              lines={[
                { text: 'Your Online Reputation' },
                { text: 'Deserves Protection.', highlight: true },
              ]}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              delay={0.12}
            />

            {/* Supporting Copy */}
            <FadeIn direction="up" delay={0.25} duration={0.65}>
              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
                Build trust in your business with transparent, policy-focused assistance for reporting and appealing Google reviews that may violate platform policies.
              </p>
            </FadeIn>

            {/* Primary & Secondary CTAs */}
            <StaggerContainer
              delayChildren={0.35}
              staggerChildren={0.1}
              className="pt-2 flex flex-wrap gap-4 items-center"
            >
              <StaggerItem>
                <Button
                  variant="teal"
                  size="lg"
                  to="/contact"
                  className="px-8 py-4 text-sm font-bold shadow-lg shadow-teal/20"
                >
                  <span>Request Assistance</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </StaggerItem>

              <StaggerItem>
                <Button
                  variant="luxury-ghost"
                  size="lg"
                  to="/services"
                  className="px-7 py-4 text-sm font-semibold"
                >
                  <span>Explore Our Services</span>
                </Button>
              </StaggerItem>
            </StaggerContainer>

            {/* Understated Target Markets Strip */}
            <FadeIn direction="up" delay={0.45} duration={0.6}>
              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Serving Businesses In:
                </span>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    United States
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Canada
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    Pakistan
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* Smooth Organic Wave Transition into the Light Section */}
        <CurvedHeroTransition fillColor="soft" height={100} />
      </section>

      {/* =========================================================================
          2. TRUST AND TRANSPARENCY SECTION
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="ocean" scriptNote="Transparent Counsel">
                Our Foundation
              </Badge>
            }
            title="A Principled Approach to"
            accent="Reputation Management"
            subtitle="We provide clear, honest guidance built on published platform policies. We never promise guaranteed removals or cut corners with dishonest methods."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
            staggerChildren={0.12}
          >
            <StaggerItem>
              <Card variant="white" hoverLift className="h-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center">
                  <Scale className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-navy">Policy-Focused Assistance</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Every case is assessed strictly against Google’s published Prohibited and Restricted Content policies. We focus only on reviews that clearly breach published rules.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="white" hoverLift className="h-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal/15 text-teal flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-navy">Transparent Communication</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  We give you honest, upfront answers. If a negative review represents genuine customer dissatisfaction, we explain why it cannot be removed and advise on constructive public responses.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="white" hoverLift className="h-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center">
                  <FileText className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-navy">Professional Guidance</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  We help compile verifiable business records, transaction logs, and factual timelines into clear documentation ready for Google Business Profile appeal channels.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="white" hoverLift className="h-full space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Lock className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-navy">Realistic Expectations</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Google independently reviews all reports and holds sole decision-making authority. We explain realistic timeframes without making false claims or fabricated guarantees.
                </p>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. SERVICES OVERVIEW SECTION
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-24 sm:py-32 border-y border-slate-200/70">
        <Container size="xl">
          <SectionHeading
            badge={<Badge variant="teal">What We Do</Badge>}
            title="Core Reputation Assistance"
            accent="Services"
            subtitle="Targeted advisory services designed to help business owners identify policy violations, compile evidence, and navigate platform appeal channels."
          />

          <StaggerContainer className="grid md:grid-cols-2 gap-8 mt-16" staggerChildren={0.12}>
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-bg-soft/70 border border-slate-200/90 hover:border-ocean/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        {service.icon}
                      </div>
                      <span className="font-mono text-sm font-bold text-muted">0{index + 1}</span>
                    </div>

                    <h3 className="text-xl font-bold text-navy group-hover:text-ocean transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-secondary leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-slate-200/60 text-xs text-secondary">
                      {service.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                    <Link
                      to={service.linkTo}
                      className="text-xs font-bold text-ocean hover:text-navy inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Learn More About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-muted">Policy Compliant</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn direction="up" delay={0.3}>
            <div className="mt-12 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-secondary max-w-2xl mx-auto">
              <span className="font-semibold text-navy">Important Service Note:</span> RepuShield does not guarantee review removals. All determinations are made independently by Google LLC under its published policies.
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          4. HOW IT WORKS (FOUR-STEP PROCESS)
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-24 sm:py-32">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="ocean" scriptNote="Structured Workflow">
                Simple &amp; Clear
              </Badge>
            }
            title="How RepuShield"
            accent="Works"
            subtitle="A four-step collaborative process built around official Google reporting channels and verifiable operational evidence."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 relative">
            {steps.map((step, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1} duration={0.6}>
                <div className="h-full p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between relative group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-3xl font-extrabold text-ocean/30 group-hover:text-ocean transition-colors">
                        {step.number}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-navy">{step.title}</h3>

                    <p className="text-sm text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-teal flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Step {step.number} Complete</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={0.4}>
            <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200/80 max-w-3xl mx-auto flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs text-secondary leading-relaxed">
                <h4 className="text-sm font-bold text-navy">
                  Google&apos;s Independent Adjudication Authority
                </h4>
                <p>
                  RepuShield assists you in preparing and presenting the strongest possible factual dossier under published rules. Google independently reviews all reports and decides whether any content violates its policies and whether removal action is taken.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          5. WHY CHOOSE REPUSHIELD
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-24 sm:py-32 border-y border-slate-200/70">
        <Container size="xl">
          <SectionHeading
            badge={<Badge variant="teal">Our Commitments</Badge>}
            title="Why Choose"
            accent="RepuShield"
            subtitle="We provide clear, honest, and policy-grounded assistance designed for businesses that value their integrity as much as their reputation."
          />

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16" staggerChildren={0.12}>
            {whyChoosePoints.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full p-8 rounded-3xl bg-bg-soft/70 border border-slate-200 hover:border-ocean/40 hover:bg-white hover:shadow-lg transition-all duration-300 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-navy text-teal flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          6. INDUSTRIES WE SUPPORT
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-24 sm:py-32">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="ocean" scriptNote="Tailored Guidance">
                Market Sectors
              </Badge>
            }
            title="Industries We"
            accent="Support"
            subtitle="Online reviews affect businesses in different ways. We understand the specific policy challenges and review dynamics facing each sector."
          />

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16" staggerChildren={0.12}>
            {industries.map((ind, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                  {/* Industry Image */}
                  <div className="relative h-48 overflow-hidden bg-navy-dark">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-xl bg-navy/80 backdrop-blur-md text-teal flex items-center justify-center border border-white/20">
                        {ind.icon}
                      </div>
                      <span className="text-sm font-bold tracking-tight">{ind.title}</span>
                    </div>
                  </div>

                  {/* Industry Description */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-sm text-secondary leading-relaxed">
                      {ind.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-ocean font-semibold">
                      <span>Policy Assessment Available</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* General Small & Medium Business Card */}
            <StaggerItem>
              <div className="h-full rounded-3xl bg-navy text-white p-8 flex flex-col justify-between shadow-xl border border-slate-700/60 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal/15 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-teal flex items-center justify-center border border-white/15">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Small &amp; Medium Enterprises
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed">
                    Whether you operate a local auto repair shop, a contracting company, or a boutique consultancy, unfair review attacks damage real revenue. We help you assert your rights under published platform policies.
                  </p>
                </div>

                <div className="pt-6 relative z-10">
                  <Button variant="teal" size="sm" to="/contact" className="w-full">
                    <span>Discuss Your Case</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn direction="up" delay={0.3}>
            <p className="mt-8 text-center text-xs text-muted max-w-xl mx-auto">
              Note: The sectors listed represent industries where policy guidance is offered. RepuShield does not publish fictional client lists or unverified endorsements.
            </p>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          7. TRANSPARENCY AND GOOGLE INDEPENDENCE SECTION
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-navy text-white relative overflow-hidden">
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal/15 opacity-40" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

        <Container size="lg" className="relative z-10">
          <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-8 sm:p-12 lg:p-14 backdrop-blur-xl shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-teal/20 text-teal flex items-center justify-center mx-auto border border-teal/30 shadow-sm">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal">
                Important Transparency Statement
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
                Independent Advisory Notice &amp; Platform Clarification
              </h2>
            </div>

            {/* Exact Required Disclaimer */}
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              &ldquo;RepuShield is an independent service provider and is not affiliated with, endorsed by, or officially connected to Google LLC. Google independently determines whether reported reviews violate its policies and whether any action is taken.&rdquo;
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto text-xs text-dark-muted">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-teal shrink-0" />
                <span>No Guaranteed Removal</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-teal shrink-0" />
                <span>No Fake Reviews or Bots</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-teal shrink-0" />
                <span>Honest Turnaround Times</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          8. FAQ PREVIEW SECTION
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-24 sm:py-32">
        <Container size="md">
          <SectionHeading
            badge={<Badge variant="amber">Help &amp; Clarity</Badge>}
            title="Frequently Asked"
            accent="Questions"
            subtitle="Straightforward answers about our review policy assistance, qualification criteria, and what to expect."
          />

          <div className="mt-14">
            <Accordion items={faqItems} defaultOpenIndex={0} />
          </div>

          <div className="mt-10 text-center">
            <Button variant="secondary" size="md" to="/faq" className="text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 mr-1.5" />
              <span>Read Full FAQ Page</span>
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          9. FINAL CALL TO ACTION SECTION
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-navy-midnight text-white relative overflow-hidden">
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="lg" className="relative z-10 text-center space-y-8">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-teal font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Protect Your Online Reputation</span>
            </div>
          </FadeIn>

          {/* Exact Required Final Headline */}
          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl mx-auto tracking-tight leading-[1.12]">
              Let&apos;s Take a Closer Look at Your{' '}
              <span className="text-teal">Online Reputation</span>.
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Speak with our team today for an honest, confidential case review. We evaluate contested reviews against official Google guidelines and guide you on the right path forward.
            </p>
          </FadeIn>

          {/* Primary CTA & WhatsApp Buttons */}
          <FadeIn direction="up" delay={0.3}>
            <div className="pt-4 flex flex-wrap justify-center gap-4 sm:gap-5">
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
                variant="whatsapp"
                size="lg"
                href={whatsappUrl}
                isExternal
                className="px-8 py-4 text-sm font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </Button>
            </div>
          </FadeIn>

          {/* Confirmed Direct Contact Details */}
          <FadeIn direction="up" delay={0.4}>
            <div className="pt-8 border-t border-white/10 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-dark-muted">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-teal" />
                <span>+92 340 6523353 (WhatsApp)</span>
              </a>

              <span className="hidden sm:inline text-white/20">•</span>

              <a
                href="mailto:usamahameedahmadani@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-teal" />
                <span>usamahameedahmadani@gmail.com</span>
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto">
              Confidential and policy-compliant case assessment.
            </p>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}

export default HomePage
