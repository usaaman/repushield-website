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
  Check,
  Sparkles,
  HelpCircle,
  AlertTriangle,
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
import { useParallax } from '@/hooks/useParallax'

export const HomePage: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion()
  const { x: heroBgX, y: heroBgY } = useParallax(12)
  const { x: glowX, y: glowY } = useParallax(-16)

  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RiseRepute.%20I%20need%20help%20with%20negative%20Google%20reviews%20affecting%20my%20business.'

  // Core Services Data (5 Targeted Services)
  const services = [
    {
      icon: <ShieldAlert className="w-6 h-6 text-teal" />,
      title: '1-Star Google Review Removal Assistance',
      description:
        'Help businesses assess and report eligible 1-star reviews that may violate Google’s published policies.',
      points: [
        'Detailed violation audit against Google guidelines',
        'Identification of non-customer rating spikes',
        'Guidance on official reporting documentation',
      ],
      linkTo: '/services',
    },
    {
      icon: <FileSearch className="w-6 h-6 text-teal" />,
      title: 'Fake & Spam Review Reporting',
      description:
        'Assistance with identifying and reporting fake, spam, promotional, or completely irrelevant reviews.',
      points: [
        'Off-topic and promotional content flags',
        'Spam and automated rating pattern analysis',
        'Submitting structured evidence through Google channels',
      ],
      linkTo: '/services',
    },
    {
      icon: <Scale className="w-6 h-6 text-teal" />,
      title: 'Policy-Violating Review Assistance',
      description:
        'Help businesses understand whether reviews containing harassment, prohibited content, or conflicts of interest may be reportable.',
      points: [
        'Former employee and competitor review audits',
        'Defamation, harassment, and profanity flags',
        'Cross-referencing specific Google policy clauses',
      ],
      linkTo: '/services',
    },
    {
      icon: <Compass className="w-6 h-6 text-teal" />,
      title: 'Google Review Appeal Assistance',
      description:
        'Guidance through the available official appeal process when an initial review report does not result in the expected outcome.',
      points: [
        'Official Google Business Profile appeal routing',
        'Secondary administrative review evidence assembly',
        'Procedural documentation and rebuttal clarity',
      ],
      linkTo: '/services',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-teal" />,
      title: 'Online Reputation Protection',
      description:
        'Practical guidance to help businesses maintain a trustworthy online presence while addressing problematic reviews.',
      points: [
        'Professional review response guidance for legitimate complaints',
        'Reputation crisis de-escalation strategies',
        'Proactive monitoring recommendations for business profiles',
      ],
      linkTo: '/services',
    },
  ]

  // Four-Step Process Data
  const steps = [
    {
      number: '01',
      title: 'Share Your Negative Review',
      description:
        'Send us the Google review URL and basic business information so we can understand the dispute.',
      tag: 'Initial Intake',
    },
    {
      number: '02',
      title: 'Review Assessment',
      description:
        'We examine the review and assess whether it may violate relevant Google content guidelines.',
      tag: 'Policy Evaluation',
    },
    {
      number: '03',
      title: 'Reporting Assistance',
      description:
        'We help organize relevant information and guide the appropriate official reporting process.',
      tag: 'Dossier Assembly',
    },
    {
      number: '04',
      title: 'Follow-Up & Appeal Guidance',
      description:
        'We explain available next steps based on Google’s response, including official escalation options.',
      tag: 'Appeal Support',
    },
  ]

  // Why Choose RiseRepute Data
  const whyChoosePoints = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal" />,
      title: 'Focused on Google Review Issues',
      description:
        'We specialize specifically in negative, fake, and policy-violating Google reviews, not generic PR theory.',
    },
    {
      icon: <Scale className="w-6 h-6 text-teal" />,
      title: 'Policy-Based Approach',
      description:
        'Every case is assessed strictly against Google’s published Prohibited and Restricted Content policies.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-teal" />,
      title: 'Transparent Communication',
      description:
        'Direct, clear communication via WhatsApp and email. You always know what steps are being taken.',
    },
    {
      icon: <FileText className="w-6 h-6 text-teal" />,
      title: 'Professional Reporting Assistance',
      description:
        'We help assemble factual evidence, customer logs, and specific policy citations into clean reporting packages.',
    },
    {
      icon: <Lock className="w-6 h-6 text-teal" />,
      title: 'No Fake Reviews or Manipulation',
      description:
        'We operate strictly within platform rules. We never post fake counter-reviews, buy ratings, or use bots.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-teal" />,
      title: 'Honest Expectations',
      description:
        'We never make false removal guarantees. If a negative review is legitimate customer feedback, we explain why honestly.',
    },
  ]

  // Industries Supported Data
  const industries = [
    {
      title: 'Restaurants & Cafes',
      icon: <Utensils className="w-5 h-5 text-teal" />,
      image: '/images/industries/restaurant.jpg',
      description:
        'Defending dining establishments against competitor sabotage, coordinated negative review campaigns, and claims by non-patrons.',
    },
    {
      title: 'Medical & Dental Clinics',
      icon: <Stethoscope className="w-5 h-5 text-teal" />,
      image: '/images/industries/clinic.jpg',
      description:
        'Protecting medical, dental, and healthcare practices against defamatory attacks, non-patient spam, and privacy-violating comments.',
    },
    {
      title: 'Hotels & Hospitality',
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

  // Homepage FAQ Preview Data (6 Core Questions)
  const faqItems = [
    {
      question: 'Can you help remove negative 1-star Google reviews?',
      answer:
        'Yes. We assist businesses with 1-star reviews that violate Google’s published Prohibited and Restricted Content policies. While Google holds the sole authority to delete any review, we evaluate the review, identify applicable policy breaches, and guide you through official reporting and appeal channels.',
    },
    {
      question: 'Can fake Google reviews be reported?',
      answer:
        'Yes. Google’s policies strictly prohibit fake content, deceptive reviews, and content not based on a real business experience. We help assemble evidence (such as lack of customer transaction records or suspicious review bursts) to support an official policy report.',
    },
    {
      question: 'What types of reviews may violate Google’s policies?',
      answer:
        'Common policy violations include conflicts of interest (reviews left by competitors or former employees), harassment, hate speech, offensive or sexually explicit language, off-topic rants, advertising spam, and impersonation.',
    },
    {
      question: 'Can every negative Google review be removed?',
      answer:
        'No. Google’s policies protect honest customer feedback. If a customer had a genuine negative experience and expresses their opinion without violating platform rules, Google will not remove it. In those cases, we advise on professional public response strategies.',
    },
    {
      question: 'What happens if Google rejects a review report?',
      answer:
        'If an initial automated report is denied, an official appeal option is often available through the Google Business Profile management portal. We assist in preparing a secondary appeal dossier citing specific policy clauses and verifiable facts for human re-evaluation.',
    },
    {
      question: 'How do I get started with RiseRepute?',
      answer:
        'Simply share the disputed review link and business details through our contact form or directly on WhatsApp. We provide an initial policy assessment and explain the available reporting options.',
    },
  ]

  return (
    <div className="flex flex-col text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. HERO SECTION — HIGH-CONVERSION FULL BACKGROUND PHOTOGRAPHY
          ========================================================================= */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-0">
        {/* Full-Bleed High-Quality Background Photograph with Desktop Parallax */}
        <motion.div
          initial={prefersReduced ? { scale: 1, opacity: 0.85 } : { scale: 1.05, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.85 }}
          style={{
            x: heroBgX,
            y: heroBgY,
            backgroundImage: "url('/images/hero-reputation-counsel.webp'), url('/images/hero-reputation-counsel.jpg')",
          }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center lg:bg-right-center bg-no-repeat pointer-events-none"
          aria-hidden="true"
        />

        {/* Sophisticated Dark Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091722]/95 via-[#0F2C3D]/80 to-[#091722]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/85 via-transparent to-[#07131B]/95 pointer-events-none" />

        {/* Subtle Ambient Radial Lighting with Inverse Parallax */}
        <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 pointer-events-none">
          <AmbientGlow className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 opacity-60" />
          <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />
        </motion.div>

        {/* Tactile Fine Film Grain */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        {/* Clean, Left-Aligned Minimal Hero Content */}
        <Container size="xl" className="relative z-10 my-auto py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-7">
            {/* Eyebrow Badge */}
            <FadeIn direction="up" delay={0.05} duration={0.6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill-hero text-xs font-semibold text-slate-100 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
                <span className="tracking-wide text-xs">
                  Independent Google Review Removal Assistance
                </span>
              </div>
            </FadeIn>

            {/* Main Headline */}
            <TextReveal
              lines={[
                { text: 'Negative Google Reviews' },
                { text: 'Hurting Your Business?', highlight: true },
              ]}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              delay={0.12}
            />

            {/* Supporting Copy */}
            <FadeIn direction="up" delay={0.25} duration={0.65}>
              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
                Don't let suspicious or policy-violating reviews damage the trust you've built. RiseRepute helps businesses identify and report eligible negative Google reviews through official policy-based reporting and appeal processes.
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
                  shine
                  glow
                  to="/contact"
                  className="px-8 py-4 text-sm font-bold shadow-lg shadow-teal/20"
                >
                  <span>Get Help With Negative Reviews</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </StaggerItem>

              <StaggerItem>
                <Button
                  variant="luxury-ghost"
                  size="lg"
                  shine
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
          2. THE PROBLEM SECTION — ONE NEGATIVE REVIEW IMPACT
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="ocean" scriptNote="The Reality">
                The Impact on Business
              </Badge>
            }
            title="One Negative Review Can"
            accent="Change a Customer's Decision."
            subtitle="Potential customers check online reviews before choosing a business. Unfair, fake or policy-violating reviews can create a misleading impression and cost you customer trust."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            <Card variant="glass" hoverLift spotlight tilt className="h-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center icon-floating">
                <ShieldAlert className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-navy">1-Star Rating Attacks</h3>
              <p className="text-sm text-secondary leading-relaxed">
                A sudden wave of 1-star ratings without comments often signals coordinated attacks or competitor sabotage rather than genuine customer experiences.
              </p>
            </Card>

            <Card variant="glass" hoverLift spotlight tilt className="h-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center icon-floating">
                <FileSearch className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-navy">Fake & Spam Reviews</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Off-topic promotional spam, mistaken identity reviews, or bot ratings mislead prospective customers who rely on authentic feedback.
              </p>
            </Card>

            <Card variant="glass" hoverLift spotlight tilt className="h-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal/15 text-navy flex items-center justify-center icon-floating">
                <Scale className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-navy">Conflict of Interest</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Disgruntled former employees or direct business rivals may post defamatory reviews that explicitly violate Google's conflict of interest guidelines.
              </p>
            </Card>

            <Card variant="glass" hoverLift spotlight tilt className="h-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center icon-floating">
                <HelpCircle className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-navy">Procedural Confusion</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Most business owners simply click "Flag as inappropriate" and wait. Without structured evidence and policy cross-referencing, eligible reports are frequently overlooked.
              </p>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. THE SOLUTION SECTION — FAIR ONLINE REPUTATION
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="teal" scriptNote="Legitimate Relief">
                The RiseRepute Solution
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy leading-tight">
                Your Business Deserves a{' '}
                <span className="text-ocean">Fair Online Reputation.</span>
              </h2>
              <p className="text-base sm:text-lg text-secondary leading-relaxed">
                You’ve invested years delivering exceptional products and services. When an illegitimate, fake, or policy-breaching review appears, you don't have to simply accept the damage.
              </p>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                RiseRepute provides structured, professional assistance to evaluate disputed reviews against Google’s published guidelines, build verifiable documentation dossiers, and guide your business through official reporting and appeal pathways.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button variant="primary" size="md" to="/contact">
                  <span>Get Help With Negative Reviews</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="secondary" size="md" to="/services">
                  <span>View All Services</span>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card-public rounded-3xl p-8 space-y-5">
                <h3 className="text-lg font-bold text-navy border-b border-slate-200 pb-4">
                  What We Provide
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">Review Policy Assessment</p>
                      <p className="text-xs text-secondary">Thorough evaluation against Google's published Prohibited Content policies.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">Negative Review Reporting Assistance</p>
                      <p className="text-xs text-secondary">Structuring evidence and customer logs into official reporting dossiers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">Fake & Spam Review Reporting</p>
                      <p className="text-xs text-secondary">Documenting non-patron spam and off-topic reviews for platform escalation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">Google Appeal Guidance</p>
                      <p className="text-xs text-secondary">Step-by-step assistance through secondary administrative appeal workflows.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          4. SERVICES SECTION — CLEAR CUSTOMER-FOCUSED CARDS
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={<Badge variant="teal">What We Do</Badge>}
            title="Specialized Google Review"
            accent="Assistance Services"
            subtitle="Clear, customer-focused services built to address negative, fake, and policy-violating reviews through sanctioned Google channels."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14"
            staggerChildren={0.12}
          >
            {services.map((service, index) => (
              <StaggerItem key={service.title} className={index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <Card variant="glass" hoverLift spotlight tilt className="h-full flex flex-col justify-between p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal/15 text-navy flex items-center justify-center icon-floating">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-navy tracking-tight">{service.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{service.description}</p>
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {service.points.map((point) => (
                        <div key={point} className="flex items-start gap-2 text-xs text-secondary">
                          <Check className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean hover:text-navy transition-colors"
                    >
                      <span>Get assistance with this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          5. HOW IT WORKS SECTION — GETTING HELP IS SIMPLE (DARK NAVY BAND)
          ========================================================================= */}
      <div className="relative bg-gradient-to-b from-[#0F2C3D] via-[#0B212E] to-[#07131B]">
        <CurvedHeroTransition position="top" fillColor="soft" height={75} />
        <section className="text-white py-16 sm:py-24 relative overflow-hidden">
          <AmbientGlow className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-ocean/20 opacity-50" />
          <Container size="xl" className="relative z-10">
            <SectionHeading
              badge={
                <Badge variant="teal" scriptNote="Structured Workflow">
                  How It Works
                </Badge>
              }
              title="Getting Help Is"
              accent="Simple."
              subtitle="Four straightforward steps to assess, document, and report disputed Google reviews through official channels."
              className="[&_h2]:text-white [&_p]:text-slate-300"
            />

            <StaggerContainer
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
              staggerChildren={0.12}
            >
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <Card
                    variant="glass"
                    hoverLift
                    spotlight
                    tilt
                    className="glass-card-dark h-full flex flex-col justify-between p-7 text-white"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-3xl font-extrabold text-teal font-mono">{step.number}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-teal-light border border-white/15">
                          {step.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/15 text-center max-w-2xl mx-auto">
              <p className="text-xs text-slate-300">
                <strong className="text-white font-semibold">Important:</strong> RiseRepute does not control Google’s internal moderation systems or guarantee outcomes. All reports and appeals are independently decided by Google LLC.
              </p>
            </div>
          </Container>
        </section>
        <CurvedHeroTransition position="bottom" fillColor="soft" height={75} />
      </div>

      {/* =========================================================================
          6. WHY CHOOSE RISEREPUTE SECTION
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={<Badge variant="teal">Our Commitments</Badge>}
            title="Why Businesses Trust"
            accent="RiseRepute"
            subtitle="Genuine business value grounded in published policies, transparent communication, and ethical practices."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14"
            staggerChildren={0.1}
          >
            {whyChoosePoints.map((point) => (
              <StaggerItem key={point.title}>
                <Card variant="glass" hoverLift spotlight tilt className="h-full p-8 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center icon-floating">
                    {point.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy">{point.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{point.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          7. TARGET INDUSTRIES SECTION
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="xl">
          <SectionHeading
            badge={
              <Badge variant="ocean" scriptNote="Tailored Guidance">
                Who We Serve
              </Badge>
            }
            title="Protecting Businesses Across"
            accent="Key Industries"
            subtitle="Different businesses face unique review challenges. Here is how policy-violating feedback affects different sectors."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {industries.map((ind) => (
              <Card key={ind.title} variant="glass" hoverLift spotlight tilt className="overflow-hidden p-0">
                <div className="h-44 w-full relative overflow-hidden bg-navy-dark">
                  <picture>
                    <source srcSet={ind.image.replace('.jpg', '.webp')} type="image/webp" />
                    <img
                      src={ind.image}
                      alt={`${ind.title} Google review protection and reputation assistance`}
                      width="800"
                      height="533"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-lg bg-teal/20 backdrop-blur-md flex items-center justify-center border border-teal/40">
                      {ind.icon}
                    </div>
                    <span className="font-bold text-sm tracking-tight">{ind.title}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          8. GOOGLE LLC INDEPENDENCE & TRUST SECTION
          ========================================================================= */}
      <div className="relative bg-navy">
        <CurvedHeroTransition position="top" fillColor="soft" height={65} />
        <section className="text-white py-16 sm:py-24 overflow-hidden relative">
          <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal/15 opacity-40" />
          <Container size="lg" className="relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold mx-auto">
            <AlertTriangle className="w-4 h-4 text-teal" />
            <span>Platform Independence Notice</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Independent Review Removal Assistance
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 text-dark-muted text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-white">RiseRepute is an independent service provider and is not affiliated with, endorsed by, or officially connected to Google LLC.</strong> Google Maps, Google Business Profile, and Google Reviews are trademarks of Google LLC.
            </p>
            <p>
              Google independently determines whether reported reviews violate its policies and whether any action is taken. We assist business owners with policy-compliant evidence documentation and official dispute routing. We do not claim guaranteed removals or proprietary deletion tools.
            </p>
          </div>
        </Container>
      </section>
      <CurvedHeroTransition position="bottom" fillColor="soft" height={65} />
    </div>

      {/* =========================================================================
          9. FREQUENTLY ASKED QUESTIONS PREVIEW
          ========================================================================= */}
      <SectionWrapper variant="soft" className="py-20 sm:py-28">
        <Container size="lg">
          <SectionHeading
            badge={<Badge variant="amber">Help & Clarity</Badge>}
            title="Frequently Asked"
            accent="Questions"
            subtitle="Straightforward, honest answers to common questions about negative Google reviews and our assistance service."
          />

          <div className="mt-12">
            <Accordion items={faqItems} defaultOpenIndex={0} />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-ocean hover:text-navy transition-colors"
            >
              <span>View all frequently asked questions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          10. FINAL CONSULTATION CTA SECTION
          ========================================================================= */}
      <section className="relative bg-navy text-white py-20 sm:py-28 overflow-hidden">
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal/15 opacity-50" />
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
              Ready to Address{' '}
              <span className="text-teal">Unfair Google Reviews?</span>
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Tell us about the reviews affecting your business. Our team can help you understand the available reporting and appeal options.
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
                <span>Get Help With Your Reviews</span>
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
            <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-300">
              <a
                href="https://wa.me/923406523353"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-teal" />
                <span>+92 340 6523353</span>
              </a>
              <span className="text-white/20">•</span>
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
