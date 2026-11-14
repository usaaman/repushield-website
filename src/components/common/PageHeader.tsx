import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { CurvedHeroTransition } from './CurvedHeroTransition'
import { AmbientGlow } from './MotionWrapper'
import { useParallax } from '@/hooks/useParallax'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface PageHeaderProps {
  breadcrumbLabel?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  badge?: React.ReactNode
  children?: React.ReactNode
  rightContent?: React.ReactNode
  chips?: React.ReactNode
  layout?: 'left' | 'center' | 'split'
  glowPosition?: 'top-left' | 'top-right' | 'center' | 'bottom'
  curvedFillColor?: string
  curvedHeight?: number
  className?: string
}

/**
 * Shared Compact Dark Glass Page Header for inner pages.
 * Replaces full heroes with an elegant ~280-340px desktop header
 * featuring dark navy gradient (#0F2C3D to #0A1F2C), customizable soft teal glows,
 * glass pills, semantic H1, and compact curved divider into the teal-mist body.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbLabel,
  title,
  subtitle,
  badge,
  children,
  rightContent,
  chips,
  layout = 'left',
  glowPosition = 'top-right',
  curvedFillColor = '#DCEFF0',
  curvedHeight = 40,
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion()
  const { x: glowX, y: glowY } = useParallax(-12)

  // Glow position variants so every page is distinct
  const renderGlow = () => {
    switch (glowPosition) {
      case 'top-left':
        return (
          <>
            <AmbientGlow className="absolute -top-10 left-10 w-[450px] h-[320px] bg-ocean/25 opacity-60" />
            <AmbientGlow className="absolute top-1/3 right-1/4 w-[360px] h-[260px] bg-teal/15 opacity-45" />
          </>
        )
      case 'center':
        return (
          <>
            <AmbientGlow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-teal/20 opacity-55" />
            <AmbientGlow className="absolute -top-10 right-1/4 w-[380px] h-[260px] bg-ocean/20 opacity-45" />
          </>
        )
      case 'bottom':
        return (
          <>
            <AmbientGlow className="absolute bottom-0 left-1/3 w-[480px] h-[300px] bg-ocean/25 opacity-60" />
            <AmbientGlow className="absolute top-1/4 right-10 w-[380px] h-[280px] bg-teal/15 opacity-45" />
          </>
        )
      case 'top-right':
      default:
        return (
          <>
            <AmbientGlow className="absolute top-1/4 right-1/4 w-[460px] h-[340px] bg-ocean/25 opacity-60" />
            <AmbientGlow className="absolute bottom-1/3 left-8 w-[380px] h-[280px] bg-teal/15 opacity-45" />
          </>
        )
    }
  }

  const isCenter = layout === 'center'
  const isSplit = layout === 'split'

  return (
    <section
      className={`relative bg-gradient-to-b from-[#091722]/98 via-[#0F2C3D] to-[#0A1F2C] text-white overflow-hidden pt-28 sm:pt-32 pb-0 ${className}`}
    >
      {/* Background Ambience & Noise Grain */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />
      <motion.div
        style={prefersReduced ? undefined : { x: glowX, y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        {renderGlow()}
      </motion.div>

      {/* Header Narrative Content */}
      <Container size="xl" className="relative z-10 pt-2 sm:pt-4 pb-6 sm:pb-8">
        {isSplit ? (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column Narrative */}
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-3.5 sm:space-y-4"
            >
              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {breadcrumbLabel && (
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
                )}
                {badge && <div className="inline-flex items-center">{badge}</div>}
              </div>

              {/* Title (H1) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.15]">
                {title}
              </h1>

              {/* Subtitle */}
              {subtitle && (
                <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              )}

              {/* Buttons Slot */}
              {children && (
                <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 items-center">
                  {children}
                </div>
              )}
            </motion.div>

            {/* Right Column: Custom Visual Element */}
            {rightContent && (
              <div className="lg:col-span-5 relative flex items-center justify-center">
                {rightContent}
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-3.5 sm:space-y-4 ${
              isCenter ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'
            }`}
          >
            {/* Badge Row */}
            <div
              className={`flex flex-wrap items-center gap-2 sm:gap-3 ${
                isCenter ? 'justify-center' : ''
              }`}
            >
              {breadcrumbLabel && (
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
              )}
              {badge && <div className="inline-flex items-center">{badge}</div>}
            </div>

            {/* Title (H1) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.15]">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                className={`text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl ${
                  isCenter ? 'mx-auto' : ''
                }`}
              >
                {subtitle}
              </p>
            )}

            {/* Buttons Slot */}
            {children && (
              <div
                className={`pt-2 flex flex-wrap gap-3 sm:gap-4 items-center ${
                  isCenter ? 'justify-center' : ''
                }`}
              >
                {children}
              </div>
            )}

            {/* Quick-Jump Chips (Optional) */}
            {chips && <div className="pt-2">{chips}</div>}
          </motion.div>
        )}
      </Container>

      {/* Sleek Compact Curved Bottom Transition into Section 2 */}
      <CurvedHeroTransition fillColor={curvedFillColor} height={curvedHeight} />
    </section>
  )
}

export default PageHeader
