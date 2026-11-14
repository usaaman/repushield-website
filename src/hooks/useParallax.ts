import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export interface ParallaxOptions {
  intensity?: number
  disabled?: boolean
}

/**
 * Reusable desktop mouse parallax hook.
 * Computes smooth, spring-interpolated X/Y offsets based on mouse position.
 * Automatically disabled on mobile (< 768px) and when prefers-reduced-motion is active.
 */
export function useParallax(intensity: number = 14, options?: ParallaxOptions) {
  const prefersReduced = usePrefersReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  useEffect(() => {
    if (prefersReduced || options?.disabled) return
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalizes between -1 and 1
      const normX = (e.clientX / innerWidth - 0.5) * 2
      const normY = (e.clientY / innerHeight - 0.5) * 2

      rawX.set(normX * intensity)
      rawY.set(normY * intensity)
    }

    const handleMouseLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReduced, intensity, options?.disabled, rawX, rawY])

  return { x, y }
}

export default useParallax

