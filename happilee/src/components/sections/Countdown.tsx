// components/sections/Countdown.tsx
'use client'

import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'

const WEDDING_DATE = new Date('2027-08-01T16:00:00').getTime()
const pad = (n: number, w: number) => String(n).padStart(w, '0')

export default function Countdown() {
  const ref = useSectionTracking('countdown')
  const [time, setTime] = useState({ days: '000', hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    const tick = () => {
      const distance = WEDDING_DATE - Date.now()
      if (distance <= 0) { setTime({ days: '000', hours: '00', minutes: '00', seconds: '00' }); return }
      setTime({
        days: pad(Math.floor(distance / 86400000), 3),
        hours: pad(Math.floor((distance % 86400000) / 3600000), 2),
        minutes: pad(Math.floor((distance % 3600000) / 60000), 2),
        seconds: pad(Math.floor((distance % 60000) / 1000), 2),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const items = [
    { num: time.days, label: 'Days' },
    { num: time.hours, label: 'Hours' },
    { num: time.minutes, label: 'Minutes' },
    { num: time.seconds, label: 'Seconds' },
  ]

  return (
    <section ref={ref} className="section" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-warm) 100%)' }}>
      <div className="section-inner">
        <SectionHeader eyebrow="A Joyful Anticipation" title="Counting the Days" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: 900, margin: '0 auto' }} className="countdown-grid">
          {items.map(item => (
            <div key={item.label} style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'var(--bg-cream)', border: '1px solid var(--gold)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 6, border: '1px solid rgba(26,94,58,0.2)', pointerEvents: 'none' }} />
              <div style={{ fontFamily: 'var(--font-italiana), serif', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--navy-deep)', lineHeight: 1, marginBottom: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>
                {item.num}
              </div>
              <div className="event-month" style={{ color: 'var(--rose)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .countdown-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    </section>
  )
}
