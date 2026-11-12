import React from 'react'
import { Tag, HelpCircle } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const PricingPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/10 text-ocean text-xs font-semibold">
            <Tag className="w-4 h-4" />
            <span>Pricing & Quotes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Transparent, Quote-Based Assistance
          </h1>

          <p className="text-secondary text-base leading-relaxed">
            Every case involves a unique number of reviews, violation categories, and procedural history. In accordance with RepuShield policy, we provide transparent custom quotes after an initial case assessment.
          </p>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm text-navy space-y-1">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Quote-Based Assessment</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              No fictitious price tags or deceptive discount countdowns. Every inquiry receives a realistic scope evaluation.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="primary" to="/contact">
              Request a Custom Quote
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

