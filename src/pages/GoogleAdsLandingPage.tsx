import React from 'react'
import { Target, ShieldCheck, Check, MessageCircle, ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const GoogleAdsLandingPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <div className="bg-navy rounded-3xl p-8 sm:p-14 text-white shadow-2xl border border-slate-700/60 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/20 border border-teal/30 text-teal text-xs font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>Direct Campaign Landing Page</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Facing Policy-Violating Google Reviews? <span className="text-teal">Get Expert Assistance</span>.
            </h1>

            <p className="text-base sm:text-lg text-dark-muted leading-relaxed">
              We help business owners prepare formal evidence-based reporting dossiers for fake, defamatory, or conflict-of-interest reviews under official Google policies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              'Policy-Compliant Review Audits',
              'Fast Evidence File Preparation',
              'Official Google Appeal Support',
              'Direct WhatsApp Consultation',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 text-slate-200">
                <div className="w-5 h-5 rounded-full bg-teal/20 text-teal flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-dark-muted flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
            <span>
              <strong>Notice:</strong> We do not offer guaranteed removals or delete genuine feedback. We assist you with proper policy adherence and appeal procedures.
            </span>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <Button
              variant="whatsapp"
              size="lg"
              href="https://wa.me/923406523353"
              isExternal
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp Review Check</span>
            </Button>
            <Button variant="teal" size="lg" to="/contact">
              <span>Submit Case Details</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

