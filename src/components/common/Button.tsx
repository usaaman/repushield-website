import React from 'react'
import { Link } from 'react-router-dom'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'teal'
    | 'ghost'
    | 'outline'
    | 'whatsapp'
    | 'luxury-primary'
    | 'luxury-ghost'
    | 'luxury-teal'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  isExternal?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  isExternal,
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5 tracking-wide',
    md: 'text-sm px-6 py-3 gap-2 tracking-wide',
    lg: 'text-sm sm:text-base px-8 py-3.5 sm:py-4 gap-2.5 tracking-wide font-semibold',
  }[size]

  const variantClasses = {
    primary:
      'bg-navy text-white hover:bg-navy-midnight focus-visible:ring-navy shadow-sm',
    secondary:
      'bg-white text-navy hover:bg-slate-50 border border-slate-200/80 shadow-sm focus-visible:ring-slate-300',
    teal: 'bg-teal text-navy-dark hover:bg-teal-light focus-visible:ring-teal shadow-sm font-semibold',
    ghost:
      'bg-transparent text-navy hover:bg-navy/5 focus-visible:ring-navy',
    outline:
      'bg-transparent text-navy border border-navy/80 hover:bg-navy hover:text-white focus-visible:ring-navy',
    whatsapp:
      'bg-[#25D366] text-white hover:bg-[#20ba59] focus-visible:ring-[#25D366] shadow-sm font-semibold',
    'luxury-primary':
      'bg-gradient-to-r from-teal to-ocean text-white hover:opacity-95 shadow-lg shadow-teal/20 border border-teal/40 font-semibold',
    'luxury-ghost':
      'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md hover:border-white/40 shadow-sm',
    'luxury-teal':
      'bg-teal text-navy-midnight font-bold hover:bg-teal-light shadow-md shadow-teal/25 border border-teal-light/40',
  }[variant]

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}
