import React from 'react'

export interface SectionHeadingProps {
  badge?: React.ReactNode
  title: string
  accent?: string
  subtitle?: string
  align?: 'center' | 'left'
  dark?: boolean
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  accent,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const isCenter = align === 'center'

  return (
    <div
      className={`space-y-4 max-w-3xl ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && <div className={isCenter ? 'flex justify-center' : ''}>{badge}</div>}

      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}{' '}
        {accent && (
          <span className={dark ? 'text-teal' : 'text-ocean'}>{accent}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            dark ? 'text-dark-muted' : 'text-secondary'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

