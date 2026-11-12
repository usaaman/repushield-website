import React from 'react'
import { Layers, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const ServicesPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 text-navy text-xs font-semibold">
            <Layers className="w-4 h-4 text-teal" />
            <span>Policy-Focused Services</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Our Assistance Services
          </h1>

          <p className="text-secondary text-base leading-relaxed">
            We assist with policy violation audits, formal Google reporting preparation, appeal evidence dossiers, and ongoing reputation defense guidance.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {[
              'Policy Violation Assessment',
              'Reporting Assistance',
              'Appeal Process Guidance',
              'Reputation Consultation',
            ].map((service) => (
              <div key={service} className="p-3.5 rounded-xl bg-bg-soft border border-slate-200 flex items-center gap-2.5 text-sm font-medium text-navy">
                <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-bg-soft border border-slate-200/80 text-xs text-secondary">
            Route Placeholder: /services (Ready for Phase 4 design expansion)
          </div>

          <div className="pt-2">
            <Button variant="teal" to="/contact">
              Inquire About Services
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

