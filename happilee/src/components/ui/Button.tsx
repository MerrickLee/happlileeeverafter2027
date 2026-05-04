// components/ui/Button.tsx
'use client'

import React from 'react'

interface ButtonProps {
  variant?: 'outline' | 'solid' | 'outline-emerald' | 'gold'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  href?: string
}

export default function Button({
  variant = 'solid',
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  fullWidth = false,
  href,
}: ButtonProps) {
  const baseStyles = "inline-block font-tenor text-[0.7rem] sm:text-[0.75rem] tracking-[0.3em] uppercase px-7 py-3.5 sm:px-10 sm:py-5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center"
  
  const variants = {
    outline: "border border-navy text-navy hover:bg-navy hover:text-bg bg-transparent",
    solid: "bg-navy-deep text-bg border border-navy-deep hover:bg-rose hover:border-rose hover:-translate-y-0.5",
    'outline-emerald': "border border-emerald text-emerald hover:bg-emerald hover:text-bg bg-transparent",
    gold: "bg-gold-bright text-navy-deep border-none hover:bg-bg hover:-translate-y-0.5",
  }

  const finalClass = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (href) {
    return (
      <a 
        href={href} 
        onClick={onClick}
        className={finalClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClass}
    >
      {children}
    </button>
  )
}
