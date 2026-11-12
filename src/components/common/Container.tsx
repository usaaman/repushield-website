import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
  ...props
}) => {
  const maxW = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  }[size]

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${maxW} ${className}`} {...props}>
      {children}
    </div>
  )
}

