import React from 'react'
import {
  Lock,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
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
  TextReveal,
  AmbientGlow,
} from '@/components/common'

import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/useParallax'

export const CaseStudiesPage: React.FC = () => {
  const { x: glowX, y: glowY } = useParallax(-16)
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20would%20like%20to%20discuss%20a%20confidential%20Google%20review%20case.'

  // Educational Policy Framework Scenarios (How policies apply in real life without inventing client names)
  const policyFrameworks = [
    {
      title: 'Conflict of Interest & Former Employees',
      category: 'Employee / Competitor Policy',
      scenario:
        'A business receives negative reviews from disgruntled former staff or direct competitors attempting to undermine customer trust.',
      policyCitation: 'Google Maps User Generated Content Policy — Conflict of Interest (Section 3.2)',
      proceduralResolution:
        'Documenting employee rosters, termination dates, or competitor business registries to substantiate that the reviewer holds a direct financial or retaliatory interest.',
    },
    {
      title: 'Coordinated Spam & Bot Rating Attacks',
      category: 'Spam & Fake Engagement Policy',
      scenario:
        'A business listing experiences an unnatural burst of multiple 1-star ratings within hours, often from accounts with no review history or local presence.',
      policyCitation: 'Google Prohibited Content — Fake Engagement and Spam (Section 1.1)',
      proceduralResolution:
        'Analyzing POS transaction timestamps against review timestamps to demonstrate that no corresponding transactions took place, establishing a pattern of inorganic activity.',
    },
    {
      title: 'Off-Topic & Third-Party Delivery Disputes',
      category: 'Off-Topic Content Policy',
      scenario:
        'A customer leaves a scathing 1-star review on a restaurant profile complaining exclusively about a third-party courier app’s delivery driver delay.',
      policyCitation: 'Google Content Guidelines — Off-Topic and Irrelevant Content (Section 2.4)',
      proceduralResolution:
        'Highlighting that the dispute concerns an independent third-party logistics platform rather than the merchant’s own facility, making the review eligible for off-topic re-evaluation.',
    },
    {
      title: 'Harassment & Defamatory Accusations',
      category: 'Harassment & Defamation Policy',
      scenario:
        'A review names individual frontline staff members, uses abusive language, or makes serious unsubstantiated legal accusations.',
      policyCitation: 'Google Policy — Harassment, Hate Speech & Personal Information (Section 4.1)',
      proceduralResolution:
        'Flagging direct policy violations regarding private employee identity exposure and unsubstantiated defamatory claims for expedited platform moderation.',
    },
  ]

  return (
    <div className="flex flex-col text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. PAGE HERO
          ========================================================================= */}
      <section className="relative min-h-[70vh] lg:min-h-[78vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/95 via-navy/90 to-[#07131B]/95 pointer-events-none" />
        <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 pointer-events-none">
          <AmbientGlow className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 opacity-60" />
          <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />
        </motion.div>
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="xl" className="relative z-10 my-auto py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <FadeIn direction="up" delay={0.05} duration={0.6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill-hero text-xs font-semibold text-slate-100 shadow-sm">
                <Lock className="w-4 h-4 text-teal shrink-0" />
                <span className="tracking-wide text-xs">
                  Strict Confidentiality
                </span>
                <span className="text-white/40">•</span>
                <span className="font-script text-base text-teal-light font-normal tracking-wide">
                  Verified Only
                </span>
              </div>
            </FadeIn>

            <TextReveal
              lines={[
                { text: 'Client Confidentiality &' },
                { text: 'Verified Case Studies.', highlight: true },
              ]}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              delay={0.12}
            />

            <FadeIn direction="up" delay={0.25} duration={0.65}>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                We treat every client reputation matter with absolute discretion. Verified case studies illustrating our policy appeal workflow will be published here with explicit client consent.
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
                  <span>Discuss Your Case Confidentially</span>
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
          2. ETHICAL STANDARDS NOTICE
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="lg">
          <div className="glass-card-public rounded-3xl p-8 sm:p-12 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
              <div className="w-12 h-12 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy">
                  Why We Do Not Fabricate Case Studies
                </h2>
                <p className="text-xs text-secondary">
                  Integrity & Authentic Client Protection
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-secondary leading-relaxed">
              <p>
                Many reputation agencies publish simulated before-and-after star rating meters, generic stock photo testimonials, or invented customer logos. <strong className="text-navy font-semibold">RepuShield strictly rejects these deceptive practices.</strong>
              </p>
              <p>
                When a business owner comes to us with disputed reviews, they trust us with sensitive operational realities. We never broadcast client disputes or expose businesses to retaliatory attacks. Verified, client-authorized case briefs will be published as formal documentation clearances are granted.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <p className="font-bold text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  Zero Stock Testimonials
                </p>
                <p className="text-secondary">We never purchase or fabricate client quotes.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <p className="font-bold text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  Strict NDA Privacy
                </p>
                <p className="text-secondary">Your disputes remain strictly confidential.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <p className="font-bold text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  Verified Evidence
                </p>
                <p className="text-secondary">Case notes will only reflect audited Google cases.</p>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. EDUCATIONAL POLICY FRAMEWORKS — DARK NAVY BAND
          ========================================================================= */}
      <div className="relative">
        <CurvedHeroTransition position="top" fillColor="navy" height={75} />
        <section className="bg-gradient-to-b from-[#0F2C3D] via-[#0B212E] to-[#07131B] text-white py-16 sm:py-24 relative overflow-hidden">
          <AmbientGlow className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-ocean/20 opacity-50" />
          <Container size="xl" className="relative z-10">
            <SectionHeading
              badge={<Badge variant="teal">Policy Frameworks</Badge>}
              title="How Google Review"
              accent="Policies Apply"
              subtitle="To understand how eligible negative reviews can be addressed, examine these real-world policy scenarios and reporting procedures."
              className="[&_h2]:text-white [&_p]:text-slate-300"
            />

            <div className="grid md:grid-cols-2 gap-8 mt-14">
              {policyFrameworks.map((fw, idx) => (
                <Card
                  key={idx}
                  variant="glass"
                  hoverLift
                  spotlight
                  tilt
                  className="glass-card-dark h-full p-8 space-y-5 text-white"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-teal-light border border-white/15">
                      {fw.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                      {fw.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">The Situation</p>
                    <p className="text-sm text-slate-300 leading-relaxed bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20">
                      {fw.scenario}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-teal">Google Policy Clause</p>
                    <p className="text-xs text-teal font-mono bg-white/5 p-2.5 rounded-lg border border-white/15">
                      {fw.policyCitation}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-light">Procedural Resolution Strategy</p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {fw.proceduralResolution}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
        <CurvedHeroTransition position="bottom" fillColor="soft" height={75} />
      </div>

      {/* =========================================================================
          4. FINAL CTA
          ========================================================================= */}
      <section className="relative bg-navy text-white py-20 sm:py-28 overflow-hidden">
        <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

        <Container size="lg" className="relative z-10 text-center space-y-7">
          <FadeIn direction="up">
            <Badge variant="glass" scriptNote="Private Consultation">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal" />
              <span>Confidential Inquiry</span>
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Have a Disputed Review{' '}
              <span className="text-teal">To Evaluate?</span>
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Every review inquiry is handled under strict client confidentiality. Contact us directly to review your specific situation.
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
                <span>Discuss Your Specific Case</span>
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

export default CaseStudiesPage
