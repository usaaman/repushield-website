import React from 'react'

export interface CurvedHeroTransitionProps {
  /**
   * Target fill color for the bottom area.
   * Defaults to RiseRepute's soft page background #F6F8FA ('soft').
   */
  fillColor?: 'soft' | 'white' | 'navy' | string
  /**
   * Position: 'bottom' (transitions from dark hero above to light section below)
   * or 'top' (transitions into a dark section from above).
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
  const fillHex =
    {
      soft: '#EAF4F7',
      mist: '#EAF4F7',
      white: '#FFFFFF',
      navy: '#0F2C3D',
      transparent: 'transparent',
    }[fillColor] || fillColor

  const isBottom = position === 'bottom'

  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none relative z-20 ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full block ${isBottom ? '' : 'rotate-180'}`}
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle teal to ocean accent gradient for the architectural glow */}
          <linearGradient id="organicGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#0A789B" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#14B8A6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0F2C3D" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="translucentWave" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F2C3D" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0A789B" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Layer 1: Distant Asymmetric Wave Contour */}
        <path
          d="M0,45 C280,120 520,10 880,75 C1160,125 1320,60 1440,30 L1440,180 L0,180 Z"
          fill="url(#translucentWave)"
        />

        {/* Layer 2: Radiant Accent Glow Filament */}
        <path
          d="M0,60 C320,135 680,25 960,85 C1240,140 1380,85 1440,55"
          stroke="url(#organicGlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Layer 3: Secondary Overlapping Organic Sweep */}
        <path
          d="M0,80 C260,30 640,140 980,80 C1220,38 1360,95 1440,105 L1440,180 L0,180 Z"
          fill={fillHex}
          fillOpacity="0.45"
        />

        {/* Layer 4: Primary Foreground Organic Crest */}
        <path
          d="M0,105 C240,40 560,150 920,95 C1200,50 1340,120 1440,125 L1440,180 L0,180 Z"
          fill={fillHex}
        />
      </svg>
    </div>
  )
}
