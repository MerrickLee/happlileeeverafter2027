// components/ui/SectionHeader.tsx
'use client'

import React from 'react'
import Flourish from './Flourish'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  showFlourish?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  showFlourish = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {showFlourish && <Flourish />}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
