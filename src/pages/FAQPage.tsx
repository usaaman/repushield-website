import React, { useState } from 'react'
import {
  HelpCircle,
  MessageCircle,
} from 'lucide-react'
import {
  Container,
  Button,
  SectionWrapper,
  CurvedHeroTransition,
  Accordion,
  FadeIn,
  AmbientGlow,
} from '@/components/common'
import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/useParallax'

export const FAQPage: React.FC = () => {
  const { x: glowX, y: glowY } = useParallax(-16)
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20have%20questions%20about%20a%20Google%20review%20issue.'

  // Category Filter State
  const [activeCategory, setActiveCategory] = useState<'all' | 'basics' | 'fake' | 'policies' | 'appeals' | 'repushield'>('all')

  const faqData = [
    // Category: basics
    {
      category: 'basics',
      question: 'Can you help remove negative 1-star Google reviews?',
      answer:
        'Yes. We assist businesses with 1-star reviews that breach Google’s published content policies. While Google alone decides whether content is deleted, our specialists examine the review, pinpoint specific guideline violations, assemble supporting business facts, and guide your business through official reporting and appeal mechanisms.',
    },
    {
      category: 'basics',
      question: 'Can every negative Google review be removed?',
      answer:
        'No. Google’s platform policies are specifically designed to protect honest consumer feedback. A review will not be removed simply because it is negative, unfavorable, or critical. Google only takes action on reviews that violate published rules (such as spam, conflicts of interest, harassment, or fake engagement). For genuine customer complaints, we advise on professional public response strategies.',
    },
    {
      category: 'basics',
      question: 'What makes a 1-star review eligible for Google policy removal?',
      answer:
        'A 1-star review is eligible for removal if it breaches Google’s Prohibited and Restricted Content policies. Examples include non-patron ratings, reviews left by direct competitors, former employee retaliatory posts, reviews containing offensive or defamatory language, off-topic rants about third-party delivery services, or automated bot rating bursts.',
    },

    // Category: fake
    {
      category: 'fake',
      question: 'Can fake Google reviews be reported?',
      answer:
        'Yes. Google’s guidelines explicitly prohibit fake engagement, deceptive content, and ratings not based on a real customer experience. When a business receives suspicious reviews from accounts with no transaction history or from coordinated spam accounts, we help compile verifiable operational records to support an official fake-content report.',
    },
    {
      category: 'fake',
      question: 'How do you prove a reviewer was never a customer?',
      answer:
        'We help business owners systematically cross-reference customer management records, appointment calendars, POS receipts, and communication logs. While Google does not expect you to upload private customer data, demonstrating an absence of operational records during the alleged dispute window provides compelling evidence for administrative review.',
    },
    {
      category: 'fake',
      question: 'What should I do if my business listing is hit by a sudden review bomb?',
      answer:
        'Do not panic and do not respond aggressively in public comments. Document every review timestamp, screenshot the accounts, and avoid purchasing fake positive reviews to counteract the rating. Contact RepuShield immediately so we can compile a coordinated spam pattern dossier for submission through Google’s official business support channels.',
    },

    // Category: policies
    {
      category: 'policies',
      question: 'What types of Google reviews violate platform policies?',
      answer:
        'Key policy violations include: (1) Conflicts of Interest — reviews by current or former employees, or direct competitors; (2) Harassment & Hate Speech — attacks targeting individual staff members; (3) Fake Content & Spam — commercial promotions or automated ratings; (4) Off-Topic Content — disputes concerning general social commentary or third-party couriers; and (5) Obscene or Defamatory Language.',
    },
    {
      category: 'policies',
      question: 'Can a review posted by a former employee be removed?',
      answer:
        'Yes. Google’s Maps User Contributed Content Policy explicitly classifies reviews left by current or former employees as a Conflict of Interest. If an ex-staff member posts a negative customer review to retaliate, we guide you on providing factual documentation (such as employment termination records) to demonstrate the conflict.',
    },
    {
      category: 'policies',
      question: 'Can competitor reviews be reported and removed?',
      answer:
        'Yes. Google strictly forbids posting negative reviews about a competitor to manipulate ratings or harm their reputation. When a competing business owner or their staff leaves negative feedback, we help cross-reference publicly verifiable business registries to substantiate the conflict of interest.',
    },

    // Category: appeals
    {
      category: 'appeals',
      question: 'Why is clicking "Flag as inappropriate" usually not enough?',
      answer:
        'The standard "Flag" button triggers an automated algorithm that checks for obvious profanity or automated spam filters. Complex violations — such as employee conflicts of interest, off-topic delivery issues, or subtle harassment — require human context and specific policy citations that an automated flag cannot communicate.',
    },
    {
      category: 'appeals',
      question: 'What happens if Google rejects an initial review report?',
      answer:
        'If an automated flag is dismissed, eligible cases can be escalated through the official Google Business Profile appeal tool. This initiates a secondary administrative review by a human policy specialist. We assist in preparing a detailed appeal dossier outlining the exact policy clauses breached.',
    },
    {
      category: 'appeals',
      question: 'How long does Google’s review and appeal process typically take?',
      answer:
        'Our initial case assessment is completed promptly after receiving your review links. Once a structured report or appeal dossier is submitted through official Google Business Profile channels, Google’s internal moderation queues generally take between 3 and 14 business days to evaluate and render a decision.',
    },

    // Category: repushield
    {
      category: 'repushield',
      question: 'Does RepuShield guarantee review removal?',
      answer:
        'No. We do not and cannot guarantee review removal. Google LLC holds exclusive legal authority over content hosted on Google Maps and Google Business Profiles. Our role is strictly advisory: we identify legitimate policy breaches, assemble objective evidence files, and guide you through formal platform reporting mechanisms.',
    },
    {
      category: 'repushield',
      question: 'How does RepuShield’s pricing work?',
      answer:
        'We operate on a transparent, quote-based model. Because every situation differs in terms of the number of reviews, violation categories, and procedural history, we assess your reviews first and provide a clear, itemized quote with no hidden fees or false promises.',
    },
    {
      category: 'repushield',
      question: 'Is RepuShield affiliated with Google LLC?',
      answer:
        'No. RepuShield is an independent service provider and is not affiliated with, endorsed by, or connected to Google LLC. We assist business owners in properly understanding and utilizing Google’s own publicly published review reporting and appeal channels.',
    },
    {
      category: 'repushield',
      question: 'How do I get started with RepuShield?',
      answer:
        'Simply share your disputed review link and business details through our contact form or send a message on WhatsApp. We will perform an initial review against Google policies and explain your options.',
    },
  ]

  const filteredFaqs =
    activeCategory === 'all'
      ? faqData
      : faqData.filter((item) => item.category === activeCategory)

  return (
    <div className="flex flex-col text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. PAGE HERO
          ========================================================================= */}
      <section className="relative min-h-[60vh] lg:min-h-[68vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/95 via-navy/90 to-[#07131B]/95 pointer-events-none" />
        <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 pointer-events-none">
          <AmbientGlow className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 opacity-60" />
          <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />
        </motion.div>
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="xl" className="relative z-10 my-auto py-12 sm:py-16">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <FadeIn direction="up" delay={0.05} duration={0.6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill-hero text-xs font-semibold text-slate-100 shadow-sm">
                <HelpCircle className="w-4 h-4 text-teal shrink-0" />
                <span className="tracking-wide text-xs">
                  Knowledge Base
                </span>
                <span className="text-white/40">•</span>
                <span className="font-script text-base text-teal-light font-normal tracking-wide">
                  Honest Answers
                </span>
              </div>
            </FadeIn>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Frequently Asked{' '}
              <span className="text-teal">Questions.</span>
            </h1>

            <FadeIn direction="up" delay={0.25} duration={0.65}>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                Straightforward, honest answers about negative Google reviews, 1-star ratings, policy violations, reporting workflows, and realistic expectations.
              </p>
            </FadeIn>
          </div>
        </Container>

        <CurvedHeroTransition fillColor="white" height={95} />
      </section>

      {/* =========================================================================
          2. INTERACTIVE CATEGORY FILTER & ACCORDION
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="lg">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'basics', label: '1-Star & Negative Reviews' },
              { id: 'fake', label: 'Fake & Spam Reviews' },
              { id: 'policies', label: 'Google Review Policies' },
              { id: 'appeals', label: 'Appeals & Timelines' },
              { id: 'repushield', label: 'Working With RepuShield' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-navy text-white shadow-md shadow-navy/20'
                    : 'glass-card-public text-secondary hover:text-navy hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Accordion */}
          <div className="space-y-4">
            <Accordion
              items={filteredFaqs.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
              }))}
              defaultOpenIndex={0}
            />
          </div>

          {/* Additional Help Callout — Dark Navy Gradient Card */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0F2C3D] via-[#0B212E] to-[#07131B] text-white border border-white/15 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <AmbientGlow className="absolute -top-12 -right-12 w-48 h-48 bg-teal/20" />
            <div className="space-y-1 text-center sm:text-left relative z-10">
              <h3 className="text-xl font-bold text-white">Have a Question Not Answered Here?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Speak directly with our team on WhatsApp or send us your disputed review links.
              </p>
            </div>
            <div className="flex gap-3 relative z-10">
              <Button variant="teal" size="sm" shine glow to="/contact">
                <span>Contact Us</span>
              </Button>
              <Button variant="whatsapp" size="sm" href={whatsappUrl} isExternal>
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* =========================================================================
          3. INDEPENDENCE NOTICE
          ========================================================================= */}
      <section className="bg-navy text-white py-14 border-t border-slate-800">
        <Container size="lg" className="text-center space-y-4">
          <p className="text-xs text-dark-muted max-w-2xl mx-auto leading-relaxed">
            <strong className="text-white">RepuShield</strong> is an independent service provider and is not affiliated with, endorsed by, or officially connected to Google LLC. Google independently determines whether reported reviews violate its policies and whether any action is taken.
          </p>
        </Container>
      </section>
    </div>
  )
}

export default FAQPage
