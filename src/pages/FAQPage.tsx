import React from 'react'
import { HelpCircle, ChevronRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const FAQPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/10 text-ocean text-xs font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Transparent Answers to Your Questions
          </h1>

          <p className="text-secondary text-base leading-relaxed">
            Everything you need to know about Google review policies, what qualifies for appeal, realistic turnaround expectations, and how we assist.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Does RepuShield guarantee review removal?',
              'What types of Google reviews violate policy?',
              'How long does the Google review appeal process take?',
              'Can legitimate negative customer reviews be removed?',
            ].map((q) => (
              <div
                key={q}
                className="p-4 rounded-2xl bg-bg-soft border border-slate-200/80 flex items-center justify-between text-sm font-semibold text-navy hover:border-ocean/40 transition-colors cursor-pointer"
              >
                <span>{q}</span>
                <ChevronRight className="w-4 h-4 text-muted" />
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-bg-soft border border-slate-200/80 text-xs text-secondary">
            Route Placeholder: /faq (Interactive accessible accordion component will be completed in Phase 3/4)
          </div>

          <div className="pt-2">
            <Button variant="primary" to="/contact">
              Have More Questions? Ask Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

