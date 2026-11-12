import React from 'react'
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import { Container } from './Container'
import { Button } from './Button'
import { Badge } from './Badge'

export interface CTASectionProps {
  badgeText?: string
  scriptNote?: string
  title?: string
  highlightWord?: string
  description?: string
  showDisclaimer?: boolean
  className?: string
}

export const CTASection: React.FC<CTASectionProps> = ({
  badgeText = 'Confidential & Policy-First',
  scriptNote = 'Strictly Ethical',
  title = 'Your Online Reputation Deserves',
  highlightWord = 'Professional Protection',
  description = 'Speak directly with our team to review policy-violating reviews. We provide honest case evaluations without false removal promises.',
  showDisclaimer = true,
  className = '',
}) => {
  const whatsappUrl =
    'https://wa.me/923406523353?text=Hi%20RepuShield%2C%20I%20would%20like%20assistance%20with%20a%20Google%20review%20policy%20assessment.'

  return (
    <section className={`py-16 sm:py-24 relative overflow-hidden ${className}`}>
      <Container size="lg">
        <div className="bg-navy rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-700/60">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-ocean/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <Badge variant="glass" scriptNote={scriptNote}>
              <ShieldCheck className="w-3.5 h-3.5 text-teal mr-1" />
              <span>{badgeText}</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {title}{' '}
              <span className="text-teal">{highlightWord}</span>.
            </h2>

            <p className="text-base sm:text-lg text-dark-muted leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button variant="teal" size="lg" to="/contact">
                <span>Request Case Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappUrl}
                isExternal
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Chat</span>
              </Button>
            </div>

            {showDisclaimer && (
              <div className="pt-6 border-t border-white/10 text-xs text-dark-muted flex items-start gap-2 max-w-xl">
                <span className="text-teal font-semibold shrink-0">Note:</span>
                <span>
                  RepuShield is independent and not affiliated with Google LLC. Google retains sole authority over review determinations and removals under its published content policies.
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

