import React from 'react'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface PageIntroProps {
  badge?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  chips?: React.ReactNode
  rightContent?: React.ReactNode
  layout?: 'split' | 'left' | 'floating-card'
  className?: string
}

/**
 * Shared Light Page Intro Component (About, Services, Pricing).
 * Sits directly in normal content flow on the rich teal-mist background.
 * No dark background, no min-height hero, no dark curved divider.
 * Top padding pt-10 sm:pt-12 (combined with pt-20 on main yields 120-130px navbar clearance).
 */
export const PageIntro: React.FC<PageIntroProps> = ({
  badge,
  title,
  subtitle,
  children,
  chips,
  rightContent,
  layout = 'left',
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section className={`relative pt-10 sm:pt-12 pb-12 sm:pb-16 overflow-hidden ${className}`}>
      <Container size="xl" className="relative z-10">
        {layout === 'split' ? (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative Column */}
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-5"
            >
              {badge && <div className="inline-flex items-center">{badge}</div>}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy leading-[1.14]">
                {title}
              </h1>

              {subtitle && (
                <p className="text-base sm:text-lg text-secondary font-normal leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              )}

              {children && (
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  {children}
                </div>
              )}
            </motion.div>

            {/* Right Custom Visual Column (e.g. 3D Glass Shield Scene) */}
            {rightContent && (
              <div className="lg:col-span-5 relative flex items-center justify-center">
                {rightContent}
              </div>
            )}
          </div>
        ) : layout === 'floating-card' ? (
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card-light-page rounded-3xl p-8 sm:p-14 border border-white/80 shadow-xl backdrop-blur-xl text-center space-y-5">
              {badge && <div className="inline-flex items-center justify-center">{badge}</div>}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy leading-[1.14]">
                {title}
              </h1>

              {subtitle && (
                <p className="text-base sm:text-lg text-secondary font-normal leading-relaxed max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}

              {children && (
                <div className="pt-2 flex flex-wrap justify-center gap-4 items-center">
                  {children}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Default Left-Aligned Layout (e.g. Services) */
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-5"
          >
            {badge && <div className="inline-flex items-center">{badge}</div>}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy leading-[1.14]">
              {title}
            </h1>

            {subtitle && (
              <p className="text-base sm:text-lg text-secondary font-normal leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}

            {children && (
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                {children}
              </div>
            )}

            {chips && <div className="pt-2">{chips}</div>}
          </motion.div>
        )}
      </Container>
    </section>
  )
}

export default PageIntro

