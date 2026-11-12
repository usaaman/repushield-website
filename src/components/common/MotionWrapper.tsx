import React from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 28,
  className = '',
  ...props
}) => {
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  const offset = directions[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Cinematic luxury ease-out
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerContainerProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  staggerChildren?: number
  delayChildren?: number
  className?: string
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerChildren = 0.12,
  delayChildren = 0.05,
  className = '',
  ...props
}) => {
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerItemProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  className?: string
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  ...props
}) => {
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}

/**
 * Editorial Heading Text Reveal:
 * Splits lines into masked containers that rise smoothly into view.
 */
export interface TextRevealProps {
  lines: Array<{
    text: string
    highlight?: boolean
    italic?: boolean
    className?: string
  }>
  className?: string
  delay?: number
}

export const TextReveal: React.FC<TextRevealProps> = ({
  lines,
  className = '',
  delay = 0.1,
}) => {
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return (
      <div className={className}>
        {lines.map((l, i) => (
          <span
            key={i}
            className={`${l.className || ''} ${l.italic ? 'italic font-light' : ''} ${
              l.highlight
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-teal to-ocean-light'
                : ''
            }`}
          >
            {l.text}{' '}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className={`space-y-1 sm:space-y-2 ${className}`}>
      {lines.map((line, idx) => (
        <div key={idx} className="overflow-hidden py-0.5 sm:py-1">
          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + idx * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            <span
              className={`${line.className || ''} ${
                line.italic ? 'italic font-light' : ''
              } ${
                line.highlight
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-light via-teal to-ocean-light'
                  : ''
              }`}
            >
              {line.text}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/**
 * Ambient Glow Drift:
 * Gentle continuous lighting movement with zero layout jitter.
 */
export const AmbientGlow: React.FC<{
  className?: string
  style?: React.CSSProperties
}> = ({ className = '', style }) => {
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return (
      <div
        className={`rounded-full blur-3xl pointer-events-none ${className}`}
        style={style}
      />
    )
  }

  return (
    <motion.div
      animate={{
        x: [0, 24, -16, 0],
        y: [0, -20, 15, 0],
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={`rounded-full blur-3xl pointer-events-none ${className}`}
      style={style}
    />
  )
}
