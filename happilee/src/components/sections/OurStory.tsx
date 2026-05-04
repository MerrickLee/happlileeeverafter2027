// components/sections/OurStory.tsx
'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'

export default function OurStory() {
  const ref = useSectionTracking('our_story')

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <SectionHeader
          eyebrow="Chapter One"
          title="Our Love Story"
          subtitle="Two souls, one beautiful chapter beginning beneath the Aegean sun"
        />

        <div className="story-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '3/4', background: 'linear-gradient(135deg, rgba(26,58,92,0.1), transparent), linear-gradient(45deg, var(--rose-deep), var(--rose))', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 12, border: '1px solid rgba(248,241,227,0.4)', pointerEvents: 'none' }} />
              <div style={{ fontFamily: 'var(--font-tenor), sans-serif', color: 'var(--bg)', letterSpacing: '0.3em', fontSize: '0.75rem', textAlign: 'center', background: 'rgba(15,39,64,0.6)', padding: '1rem 1.5rem', position: 'relative', zIndex: 2 }}>
                SEALED IN SANTORINI · 2026
              </div>
              {/* Corner accents */}
              <div style={{ position: 'absolute', width: 40, height: 40, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', background: 'var(--bg)', top: -10, left: -10 }} />
              <div style={{ position: 'absolute', width: 40, height: 40, borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', background: 'var(--bg)', top: -10, right: -10 }} />
              <div style={{ position: 'absolute', width: 40, height: 40, borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', background: 'var(--bg)', bottom: -10, left: -10 }} />
              <div style={{ position: 'absolute', width: 40, height: 40, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', background: 'var(--bg)', bottom: -10, right: -10 }} />
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-tenor), sans-serif', fontSize: '0.7rem', letterSpacing: '0.5em', color: 'var(--gold)', textTransform: 'uppercase' as const, marginBottom: '1rem' }}>The Proposal</div>
            <h3 style={{ fontFamily: 'var(--font-italiana), serif', fontWeight: 400, color: 'var(--navy-deep)', fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>A Promise Under the Santorini Sunset</h3>

            <div style={{ fontSize: '1.15rem', color: 'var(--ink)', lineHeight: 1.7 }}>
              <p style={{ marginBottom: '1.25rem' }}>
                <span className="drop-cap">O</span>ur journey reached a breathtaking pinnacle amidst the whitewashed walls and cobalt domes of Oia. As the sun dipped toward the horizon, casting a golden glow over the Aegean Sea, Merrick asked the most important question of our lives.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                In that moment, surrounded by the timeless beauty of Greece, we began a new chapter defined by a promise to walk hand-in-hand through all the sunsets to come.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Now, as we prepare to exchange our vows beneath the palms of Jamaica, we invite you to join us in celebrating the love that has grown from that magical evening in Santorini to the beautiful reality we share today.
              </p>
            </div>

            <div className="signature">~ With all our love, M &amp; G ~</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .story-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
