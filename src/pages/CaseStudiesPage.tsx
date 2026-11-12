import React from 'react'
import { FileText, ShieldAlert } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const CaseStudiesPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <FileText className="w-4 h-4" />
            <span>Case Studies</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Verified Case Studies & Results
          </h1>

          <p className="text-secondary text-base leading-relaxed">
            RepuShield maintains strict client confidentiality. Verified case studies illustrating our policy appeal workflow will be published here with explicit client consent.
          </p>

          <div className="p-5 rounded-2xl bg-bg-soft border border-slate-200 text-sm space-y-2">
            <div className="flex items-center gap-2 font-semibold text-navy">
              <ShieldAlert className="w-4 h-4 text-ocean" />
              <span>Ethical Standards Notice</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              We never fabricate client logos, stock photo reviews, or simulated success percentages. Case studies will be published as verified documentation becomes available.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="secondary" to="/contact">
              Discuss Your Specific Case
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

