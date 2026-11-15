import React, { useId } from 'react'

export interface CurvedHeroTransitionProps {
  /**
   * Target fill color for the curve area.
   * Defaults to RiseRepute's soft page background #F6F8FA ('soft').
   * Can be 'gradient' | 'ambient' | 'mist' | 'soft' | 'white' | 'navy' | 'navy-dark' | 'dark' | hex string.
   */
  fillColor?: 'gradient' | 'ambient' | 'mist' | 'soft' | 'white' | 'navy' | 'navy-dark' | 'dark' | string
  /**
   * Position: 'bottom' (transitions at the bottom of a section)
   * or 'top' (transitions into a section from above).
   */
  position?: 'bottom' | 'top'
  className?: string
  height?: number
}

export const CurvedHeroTransition: React.FC<CurvedHeroTransitionProps> = ({
  fillColor = 'soft',
  position = 'bottom',
  className = '',
  height = 110,
}) => {
  const uniqueId = useId().replace(/:/g, '')
  const glowId = `organicGlow-${uniqueId}`
  const waveId = `translucentWave-${uniqueId}`
  const gradientId = `ambientGradient-${uniqueId}`

  const isGradient =
    fillColor === 'gradient' ||
    fillColor === 'ambient' ||
    fillColor === 'mist-gradient'

  const fillHex =
    {
      soft: '#F6F8FA',
      mist: '#EAF4F7',
      white: '#FFFFFF',
      navy: '#0F2C3D',
      'navy-dark': '#07131B',
      dark: '#07131B',
      transparent: 'transparent',
    }[fillColor] || fillColor

  const fillValue = isGradient ? `url(#${gradientId})` : fillHex

  const isNavy =
    fillColor === 'navy' ||
    fillColor === 'navy-dark' ||
    fillColor === 'dark' ||
    (typeof fillColor === 'string' &&
      (fillColor.startsWith('#0F') ||
        fillColor.startsWith('#07') ||
        fillColor.startsWith('#0B') ||
        fillColor.startsWith('#06') ||
        fillColor.toLowerCase().includes('navy')))

  // When using a dark fill (navy), the wave shape itself is painted navy:
  // - Top transition into a dark band: unrotated (top is 100% transparent letting ambient page background show, bottom is solid navy).
  // - Bottom transition out of a dark band: rotated 180 (top is solid navy connecting to dark section, bottom is 100% transparent).
  // When using a light fill (soft/white), traditional inverted logic applies.
  const isRotated = isNavy ? position === 'bottom' : position === 'top'
  const isBottom = position === 'bottom'

  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none relative z-20 block ${className}`}
      style={{
        height: `${height}px`,
        marginTop: isBottom ? '-1px' : 0,
        marginBottom: isBottom ? 0 : '-1px',
      }}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full block ${isRotated ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle teal to ocean accent gradient for the architectural glow */}
          <linearGradient id={glowId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#0A789B" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#14B8A6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0F2C3D" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id={waveId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F2C3D" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0A789B" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.08" />
          </linearGradient>

          {/* Ambient Page Gradient matching PublicLayout #EAF4F7 to #F4F9FA seamless transition */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DCEEF2" />
            <stop offset="40%" stopColor="#E4F0F4" />
            <stop offset="100%" stopColor="#EAF4F7" />
          </linearGradient>
        </defs>

        {/* Layer 1: Distant Asymmetric Wave Contour */}
        <path
          d="M0,45 C280,120 520,10 880,75 C1160,125 1320,60 1440,30 L1440,180 L0,180 Z"
          fill={`url(#${waveId})`}
        />

        {/* Layer 2: Radiant Accent Glow Filament */}
        <path
          d="M0,60 C320,135 680,25 960,85 C1240,140 1380,85 1440,55"
          stroke={`url(#${glowId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Layer 3: Secondary Overlapping Organic Sweep */}
        <path
          d="M0,80 C260,30 640,140 980,80 C1220,38 1360,95 1440,105 L1440,180 L0,180 Z"
          fill={fillValue}
          fillOpacity={isNavy ? '0.35' : isGradient ? '0.5' : '0.45'}
        />

        {/* Layer 4: Primary Foreground Organic Crest */}
        <path
          d="M0,105 C240,40 560,150 920,95 C1200,50 1340,120 1440,125 L1440,180 L0,180 Z"
          fill={fillValue}
        />
      </svg>
    </div>
  )
}
