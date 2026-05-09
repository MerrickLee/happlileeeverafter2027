// components/sections/Registry.tsx
'use client'

import React from 'react'
import SectionHeader from '../ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent } from '@/lib/amplitude'

const registries = [
  { name: "Bloomingdale's", desc: 'Classic essentials for our home', monogram: 'B', isFeatured: false, link: '#' },
  { name: 'Honeymoon Fund', desc: 'Contributing to our first adventure', monogram: 'H', isFeatured: true, link: '#' },
  { name: 'Williams Sonoma', desc: 'Kitchen tools for our future together', monogram: 'W', isFeatured: false, link: '#' },
]

export default function Registry() {
  const ref = useSectionTracking('registry')

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-warm)' }}>
      <div className="section-inner">
        <SectionHeader
          eyebrow="Gifts & Registry"
          title="With Gratitude"
          subtitle="Your presence is the greatest gift, but if you wish to honor us with a gift..."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="registry-grid-wrapper">
          {registries.map((item, index) => (
            <div key={index} className={`registry-card ${item.isFeatured ? 'registry-card-featured' : ''}`}>
              <div className="registry-monogram">{item.monogram}</div>
              <div className="registry-name">{item.name}</div>
              <div className="registry-desc">{item.desc}</div>
              <a
                href={item.link}
                onClick={() => trackEvent('registry_viewed', { registry_name: item.name })}
                className="btn-outline"
                style={item.isFeatured ? { borderColor: 'var(--emerald)', color: 'var(--emerald)' } : {}}
              >
                View Registry
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .registry-grid-wrapper {
            grid-template-columns: 1fr !important;
            max-width: 400px;
            margin: 0 auto;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  )
}
