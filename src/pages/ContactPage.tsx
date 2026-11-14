import React, { useState } from 'react'
import {
  Phone,
  MessageCircle,
  Mail,
  Send,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Building,
  User,
  Layers,
  AlertTriangle,
  MapPin,
} from 'lucide-react'
import {
  Container,
  Button,
  Card,
  Badge,
  SectionWrapper,
  CurvedHeroTransition,
  FadeIn,
  AmbientGlow,
} from '@/components/common'

export const ContactPage: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hello%20RepuShield.%20I%20would%20like%20to%20request%20assistance%20with%20negative%20Google%20reviews.'

  const formspreeEndpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    import.meta.env.VITE_FORM_ENDPOINT_URL ||
    ''

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    country: '',
    service: '',
    profileUrl: '',
    reviewCount: '1',
    reviewUrls: '',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formspreeEndpoint) {
      setErrorMessage(
        'Form submission endpoint is not configured yet. Please configure VITE_FORMSPREE_ENDPOINT in your environment or contact us directly on WhatsApp (+92 340 6523353) or email (usamahameedahmadani@gmail.com).'
      )
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          contactName: formData.contactName,
          email: formData.email,
          country: formData.country,
          service: formData.service,
          profileUrl: formData.profileUrl,
          reviewCount: formData.reviewCount,
          reviewUrls: formData.reviewUrls,
          details: formData.details,
          _subject: `New RepuShield Review Inquiry from ${formData.businessName || formData.contactName} (${formData.country || 'Not specified'})`,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const errorData = await response.json().catch(() => null)
        const message =
          errorData?.errors?.[0]?.message ||
          errorData?.error ||
          'Submission could not be completed. Please try again or reach out directly via WhatsApp or email.'
        setErrorMessage(message)
      }
    } catch (err: any) {
      setErrorMessage(
        'Network error occurred while submitting. Please check your connection or reach out directly on WhatsApp (+92 340 6523353) or email (usamahameedahmadani@gmail.com).'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setErrorMessage(null)
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      country: '',
      service: '',
      profileUrl: '',
      reviewCount: '1',
      reviewUrls: '',
      details: '',
    })
  }

  return (
    <div className="flex flex-col bg-bg-soft text-navy selection:bg-teal selection:text-white">
      {/* =========================================================================
          1. PAGE HERO
          ========================================================================= */}
      <section className="relative min-h-[60vh] lg:min-h-[68vh] flex flex-col justify-between bg-navy-midnight text-white overflow-hidden pt-28 sm:pt-36 pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/95 via-navy/90 to-[#07131B]/95 pointer-events-none" />
        <AmbientGlow className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/20 opacity-60" />
        <AmbientGlow className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-teal/15 opacity-50" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-25" />

        <Container size="xl" className="relative z-10 my-auto py-12 sm:py-16">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            <FadeIn direction="up" delay={0.05} duration={0.6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-slate-200 shadow-sm">
                <Phone className="w-4 h-4 text-teal shrink-0" />
                <span className="tracking-wide text-xs">
                  Direct Inquiries
                </span>
                <span className="text-white/40">•</span>
                <span className="font-script text-base text-teal-light font-normal tracking-wide">
                  Fast Support
                </span>
              </div>
            </FadeIn>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Get Help With{' '}
              <span className="text-teal">Negative Google Reviews.</span>
            </h1>

            <FadeIn direction="up" delay={0.25} duration={0.65}>
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                Tell us about the disputed reviews affecting your business. Reach out directly on WhatsApp or submit your details below for an objective policy evaluation.
              </p>
            </FadeIn>
          </div>
        </Container>

        <CurvedHeroTransition fillColor="white" height={95} />
      </section>

      {/* =========================================================================
          2. CONTACT FORM & DIRECT CHANNELS
          ========================================================================= */}
      <SectionWrapper variant="white" className="py-20 sm:py-28">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Contact Info & Support Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <Badge variant="ocean">Direct Channels</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                  Speak With Our Team
                </h2>
                <p className="text-sm sm:text-base text-secondary leading-relaxed">
                  Have an urgent 1-star attack or policy-violating review? We are available via WhatsApp and email to assess your situation.
                </p>
              </div>

              {/* Quick Contact Cards */}
              <div className="space-y-4">
                <a
                  href="https://wa.me/923406523353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors flex items-start gap-4 group shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-600">WhatsApp Inquiry</p>
                    <p className="text-base font-bold text-navy group-hover:text-[#1da851] transition-colors mt-0.5">
                      +92 340 6523353
                    </p>
                    <p className="text-xs text-muted mt-1">Direct message for fast case reviews</p>
                  </div>
                </a>

                <a
                  href="mailto:usamahameedahmadani@gmail.com"
                  className="p-6 rounded-2xl bg-ocean/10 border border-ocean/20 hover:border-ocean/40 transition-colors flex items-start gap-4 group shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-ocean text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-600">Official Case Email</p>
                    <p className="text-sm sm:text-base font-bold text-navy group-hover:text-ocean transition-colors mt-0.5 break-all">
                      usamahameedahmadani@gmail.com
                    </p>
                    <p className="text-xs text-muted mt-1">For detailed review links & evidence files</p>
                  </div>
                </a>
              </div>

              {/* Markets Served Badge */}
              <div className="p-5 rounded-2xl bg-bg-soft border border-slate-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal" />
                  Markets Supported
                </p>
                <p className="text-xs text-secondary leading-relaxed">
                  We assist small and medium businesses, medical clinics, hotels, and professional firms across the <strong className="text-navy">United States</strong>, <strong className="text-navy">Canada</strong>, and <strong className="text-navy">Pakistan</strong>.
                </p>
              </div>

              {/* Confidentiality Commitment */}
              <div className="p-5 rounded-2xl bg-bg-soft border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                <p className="text-xs text-secondary leading-relaxed">
                  <strong className="text-navy font-semibold">Strict Confidentiality:</strong> Your inquiry, business identity, and review details are handled with complete privacy and never shared publicly.
                </p>
              </div>
            </div>

            {/* Right Column: Full Inquiry Form */}
            <div className="lg:col-span-7">
              <Card variant="white" className="p-8 sm:p-12 border border-slate-200 shadow-md">
                {submitted ? (
                  <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-teal/20 text-teal flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy">Inquiry Received Successfully</h3>
                    <p className="text-secondary text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for submitting your review details. Our specialists will examine the disputed links against Google’s published guidelines and follow up at <strong className="text-navy">{formData.email}</strong> with an objective assessment.
                    </p>
                    <div className="pt-4 flex justify-center gap-4">
                      <Button variant="whatsapp" href={whatsappUrl} isExternal size="sm">
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span>Follow Up on WhatsApp</span>
                      </Button>
                      <Button variant="secondary" size="sm" onClick={handleReset}>
                        <span>Submit Another Inquiry</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-navy">Submit Review Details for Assessment</h3>
                      <p className="text-xs text-secondary">
                        Fill out the information below so our policy specialists can review your situation.
                      </p>
                    </div>

                    {/* Error Alert Display */}
                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold text-amber-800">Submission Notice</p>
                          <p className="text-secondary leading-relaxed">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Business Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-business-name"
                          className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <Building className="w-3.5 h-3.5 text-ocean" />
                          Business Name *
                        </label>
                        <input
                          id="contact-business-name"
                          type="text"
                          required
                          placeholder="e.g. Apex Dental Care"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                        />
                      </div>

                      {/* Contact Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <User className="w-3.5 h-3.5 text-ocean" />
                          Contact Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-ocean" />
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                        />
                      </div>

                      {/* Google Business Profile / Website */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-profile-url"
                          className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <Globe className="w-3.5 h-3.5 text-ocean" />
                          Website or Google Maps URL
                        </label>
                        <input
                          id="contact-profile-url"
                          type="url"
                          placeholder="https://maps.google.com/..."
                          value={formData.profileUrl}
                          onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                        />
                      </div>
                    </div>

                    {/* Country & Service Required */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Country */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-country"
                          className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-ocean" />
                          Country *
                        </label>
                        <select
                          id="contact-country"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                        >
                          <option value="">Select your country</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Service Required */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-service"
                          className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-ocean" />
                          Service Required *
                        </label>
                        <select
                          id="contact-service"
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                        >
                          <option value="">Select service required</option>
                          <option value="Google Review Policy Assessment">Google Review Policy Assessment</option>
                          <option value="Fake & Spam Review Reporting">Fake & Spam Review Reporting</option>
                          <option value="1-Star Review Assistance">1-Star Review Assistance</option>
                          <option value="Google Review Appeal Guidance">Google Review Appeal Guidance</option>
                          <option value="Online Reputation Consultation">Online Reputation Consultation</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Number of Reviews */}
                    <div className="space-y-2">
                      <span id="contact-review-count-label" className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-ocean" />
                        Number of Reviews You Want Help With
                      </span>
                      <div className="grid grid-cols-4 gap-2.5" role="radiogroup" aria-labelledby="contact-review-count-label">
                        {['1 Review', '2–5 Reviews', '6–10 Reviews', '10+ Reviews'].map((count) => {
                          const value = count.split(' ')[0]
                          const isSelected = formData.reviewCount === value
                          return (
                            <button
                              type="button"
                              key={count}
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setFormData({ ...formData, reviewCount: value })}
                              className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                                isSelected
                                  ? 'bg-navy text-white border-navy shadow-xs'
                                  : 'bg-bg-soft text-secondary border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {count}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Review URL(s) */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-review-urls"
                        className="text-xs font-bold text-navy uppercase tracking-wider"
                      >
                        Disputed Review Link(s)
                      </label>
                      <textarea
                        id="contact-review-urls"
                        rows={2}
                        placeholder="Paste link(s) to the disputed review(s) here..."
                        value={formData.reviewUrls}
                        onChange={(e) => setFormData({ ...formData, reviewUrls: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                      />
                    </div>

                    {/* Message / Details */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-details"
                        className="text-xs font-bold text-navy uppercase tracking-wider"
                      >
                        Details of Your Concern *
                      </label>
                      <textarea
                        id="contact-details"
                        required
                        rows={4}
                        placeholder="Explain why you believe the review violates Google policy (e.g. competitor attack, former employee, fake non-patron, harassment)..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-soft border border-slate-200 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="teal"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full font-bold shadow-md shadow-teal/20"
                    >
                      {isSubmitting ? (
                        <span>Submitting details...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          <span>Submit Review Details for Evaluation</span>
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-muted text-center">
                      We operate strictly within official platform guidelines. We do not provide guaranteed review deletions.
                    </p>
                  </form>
                )}
              </Card>
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

export default ContactPage
