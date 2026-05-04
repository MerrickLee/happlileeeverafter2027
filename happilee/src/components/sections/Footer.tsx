// components/sections/Footer.tsx
'use client'

import Image from 'next/image'
import GreekKey from '@/components/ui/GreekKey'
import { useSectionTracking } from '@/lib/useSectionTracking'

export default function Footer() {
  const ref = useSectionTracking('footer')

  return (
    <footer ref={ref} className="footer">
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Image
          src="/assets/Lee_Crest_2026.png"
          alt="Lee Family Crest"
          width={240}
          height={240}
          style={{ display: 'block', margin: '0 auto 2rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
        />



        <div className="footer-est">ESTABLISHED 2027</div>

        <div className="footer-tagline">
          From the Aegean sunsets to the{' '}
          <span className="footer-tagline-jamaica">shores of Jamaica</span>
          {' '}— our forever begins with you.
        </div>

        <div className="footer-hashtag">#HappiLeeEverAfter2027</div>

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(247,241,227,0.4)', fontFamily: 'var(--font-tenor), sans-serif', textTransform: 'uppercase' as const }}>
          <p>&copy; 2027 Gillian &amp; Merrick Lee</p>
          <p>Handcrafted with love</p>
        </div>
      </div>
    </footer>
  )
}
