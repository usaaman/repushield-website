import React from 'react'
import { Container } from './Container'

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'soft' | 'white' | 'navy' | 'transparent'
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  noPadding?: boolean
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  variant = 'soft',
  containerSize = 'lg',
  className = '',
  noPadding = false,
  ...props
}) => {
  const variantStyles = {
    soft: 'bg-bg-soft text-navy',
    white: 'bg-white text-navy',
    navy: 'bg-navy text-white',
    transparent: 'bg-transparent text-navy',
  }[variant]

  const paddingStyles = noPadding ? '' : 'py-16 sm:py-24 lg:py-28'

  return (
    <section className={`w-full relative ${variantStyles} ${paddingStyles} ${className}`} {...props}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}

