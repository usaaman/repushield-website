import React from 'react'
import { Info, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/10 text-ocean text-xs font-semibold">
            <Info className="w-4 h-4" />
            <span>About RepuShield</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Transparent, Policy-First Reputation Assistance
          </h1>

          <p className="text-secondary text-base leading-relaxed">
            RepuShield was founded to provide transparent, legitimate assistance for business owners facing illegitimate Google review attacks. We do not make false guarantees or invent company histories. We follow official Google review policies diligently.
          </p>

          <div className="p-4 rounded-2xl bg-bg-soft border border-slate-200/80 text-sm text-secondary">
            <p className="font-semibold text-navy mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal" />
              Route Placeholder: /about
            </p>
            <p className="text-xs">Full content structure will be completed in Phase 4.</p>
          </div>

          <div className="pt-2">
            <Button variant="primary" to="/services">
              Explore Our Services
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

