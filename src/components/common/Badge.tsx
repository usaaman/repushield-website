import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'teal' | 'ocean' | 'navy' | 'slate' | 'amber' | 'glass'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  scriptNote?: string
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'md',
  icon,
  scriptNote,
  className = '',
}) => {
  const variantStyles = {
    teal: 'bg-teal/15 text-navy border-teal/30',
    ocean: 'bg-ocean/10 text-ocean border-ocean/25',
    navy: 'bg-navy text-white border-navy/40',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    amber: 'bg-amber-500/15 text-amber-800 border-amber-500/30',
    glass: 'bg-white/10 text-white border-white/20 backdrop-blur-md',
  }[variant]

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-1 gap-1.5',
    md: 'text-xs px-3.5 py-1.5 gap-2',
  }[size]

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border transition-colors ${variantStyles} ${sizeStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {scriptNote && (
        <span className="font-script text-sm font-normal text-teal -my-1 ml-0.5 tracking-wide">
          {scriptNote}
        </span>
      )}
    </span>
  )
}

