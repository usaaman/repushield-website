import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'white' | 'soft' | 'navy' | 'glass'
  padding?: 'sm' | 'md' | 'lg' | 'none'
  hoverLift?: boolean
  spotlight?: boolean
  tilt?: boolean
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  padding = 'lg',
  hoverLift = false,
  spotlight = false,
  tilt = false,
  className = '',
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const prefersReduced = usePrefersReducedMotion()
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null)
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768
    const rect = e.currentTarget.getBoundingClientRect()

    if (spotlight && !prefersReduced && isDesktop) {
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    if (tilt && !prefersReduced && isDesktop) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -5.5
      const rotateY = ((x - centerX) / centerX) * 5.5

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
        transition: 'transform 0.1s ease-out',
      })
    }

    if (onMouseMove) onMouseMove(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (spotlight) setCoords(null)
    if (tilt) {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      })
    }
    if (onMouseLeave) onMouseLeave(e)
  }

  const variantStyles = {
    white: 'bg-white text-navy border border-slate-200/80 shadow-sm shadow-slate-900/5',
    soft: 'bg-bg-soft text-navy border border-slate-200/90 shadow-sm',
    navy: 'bg-navy text-white border border-slate-700/60 shadow-lg shadow-navy/20',
    glass: 'glass-card-public text-navy',
  }[variant]

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-9',
  }[padding]

  const hoverStyles = hoverLift && !tilt
    ? 'glass-card-hover'
    : 'transition-all duration-200'

  return (
    <div
      className={`rounded-3xl ${spotlight ? 'relative overflow-hidden' : ''} ${variantStyles} ${paddingStyles} ${hoverStyles} ${className}`}
      style={{ ...tiltStyle, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {spotlight && coords && !prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 hidden md:block z-0"
          style={{
            background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, rgba(20, 184, 166, 0.14), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  points?: string[]
  linkTo?: string
  linkText?: string
  variant?: 'white' | 'navy' | 'glass'
  spotlight?: boolean
  tilt?: boolean
  className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  points,
  linkTo,
  linkText = 'Learn more',
  variant = 'white',
  spotlight = false,
  tilt = false,
  className = '',
}) => {
  const isNavy = variant === 'navy'

  return (
    <Card
      variant={variant}
      hoverLift
      spotlight={spotlight}
      tilt={tilt}
      className={`flex flex-col justify-between ${className}`}
    >
      <div className="space-y-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
            isNavy
              ? 'bg-white/10 text-teal border border-white/15'
              : 'bg-ocean/10 text-ocean border border-ocean/20'
          }`}
        >
          {icon}
        </div>

        <div className="space-y-2">
          <h3
            className={`text-xl font-bold tracking-tight ${
              isNavy ? 'text-white' : 'text-navy'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              isNavy ? 'text-dark-muted' : 'text-secondary'
            }`}
          >
            {description}
          </p>
        </div>

        {points && points.length > 0 && (
          <ul className="space-y-2 pt-2 border-t border-slate-100/10">
            {points.map((pt, idx) => (
              <li
                key={idx}
                className={`text-xs flex items-start gap-2 ${
                  isNavy ? 'text-dark-muted' : 'text-secondary'
                }`}
              >
                <Check className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {linkTo && (
        <div className="pt-6 mt-4 border-t border-slate-100/10">
          <Link
            to={linkTo}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold group ${
              isNavy ? 'text-teal hover:text-white' : 'text-ocean hover:text-navy'
            } transition-colors`}
          >
            <span>{linkText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </Card>
  )
}

export interface StepCardProps {
  stepNumber: string | number
  title: string
  description: string
  icon?: React.ReactNode
  variant?: 'white' | 'soft' | 'navy' | 'glass'
  spotlight?: boolean
  tilt?: boolean
  className?: string
}

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  icon,
  variant = 'white',
  spotlight = false,
  tilt = false,
  className = '',
}) => {
  const isDark = variant === 'navy'
  return (
    <Card
      variant={variant}
      hoverLift
      spotlight={spotlight}
      tilt={tilt}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={`font-mono text-3xl font-extrabold tracking-tighter ${
            isDark ? 'text-teal/40' : 'text-ocean/20'
          }`}
        >
          {typeof stepNumber === 'number' && stepNumber < 10
            ? `0${stepNumber}`
            : stepNumber}
        </span>
        {icon && (
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark
                ? 'bg-white/10 text-teal border border-white/15'
                : 'bg-teal/15 text-navy'
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      <h3
        className={`text-lg font-bold mb-2 tracking-tight ${
          isDark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-secondary'
        }`}
      >
        {description}
      </p>
    </Card>
  )
}
