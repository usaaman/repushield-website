import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { CurvedHeroTransition } from './CurvedHeroTransition'
import { AmbientGlow } from './MotionWrapper'
import { useParallax } from '@/hooks/useParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface PageHeaderProps {
  breadcrumbLabel: string
  title: React.ReactNode
  subtitle?: string
  badge?: React.ReactNode
  children?: React.ReactNode
  curvedFillColor?: 'soft' | 'white' | 'navy' | string
  className?: string
}

/**
 * Compact Dark Glass Page Header for inner pages.
 * Replaces large 600-800px heroes with a clean, ~240-300px desktop header
 * featuring dark navy gradient, subtle mouse-parallax glow, side-by-side breadcrumb + badge,
 * semantic H1 title, subtitle, and compact curved bottom divider.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbLabel,
  title,
  subtitle,
  badge,
  children,
  curvedFillColor = 'soft',
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion()
  const { x: glowX, y: glowY } = useParallax(-14)

  return (
    <section
      className={`relative bg-navy-midnight text-white overflow-hidden pt-24 sm:pt-28 pb-0 ${className}`}
    >
      {/* Background Gradient & Faint Noise Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#091722]/98 via-[#0F2C3D] to-[#0A1F2C] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

      {/* Subtle Mouse-Parallax Ambient Glow (Desktop only, reduced motion safe) */}
      <motion.div
        style={prefersReduced ? undefined : { x: glowX, y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        <AmbientGlow className="absolute top-1/4 right-1/4 w-[420px] h-[320px] bg-ocean/20 opacity-55" />
        <AmbientGlow className="absolute bottom-1/3 left-8 w-[380px] h-[280px] bg-teal/15 opacity-45" />
      </motion.div>

      {/* Header Narrative Content */}
      <Container size="xl" className="relative z-10 pt-4 sm:pt-6 pb-6 sm:pb-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3.5 sm:space-y-4"
        >
          {/* Top Row: Breadcrumb Pill & Existing Badge Pill Side-by-Side */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Breadcrumb Pill */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill-hero text-xs font-semibold text-slate-300 shadow-xs"
            >
              <Link to="/" className="hover:text-teal transition-colors">
                Home
              </Link>
              <span className="text-white/30 text-[10px]">/</span>
              <span className="text-teal font-semibold">{breadcrumbLabel}</span>
            </nav>

            {/* Existing Eyebrow Badge Pill */}
            {badge && <div className="inline-flex items-center">{badge}</div>}
          </div>

          {/* Page Title (One H1 per page) */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.16]">
            {title}
          </h1>

          {/* Subtitle (Max 2 lines, readable line length) */}
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}

          {/* Children Slot: Buttons / Actions */}
          {children && (
            <div className="pt-1.5 flex flex-wrap gap-3 sm:gap-4 items-center">
              {children}
            </div>
          )}
        </motion.div>
      </Container>

      {/* Sleek Compact Curved Bottom Transition into Section 2 */}
      <CurvedHeroTransition fillColor={curvedFillColor} height={36} />
    </section>
  )
}

export default PageHeader

