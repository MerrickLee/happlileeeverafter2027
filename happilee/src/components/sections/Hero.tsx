// components/sections/Hero.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import GreekKey from '@/components/ui/GreekKey'

export default function Hero() {
  return (
    <section className="hero relative min-h-screen flex flex-col overflow-hidden bg-bg">
      <GreekKey />
      
      <div className="hero-top flex-1 flex items-center justify-center p-8 sm:p-12 relative z-10">
        {/* Background Gradients from Mockup */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(26,58,92,0.05),transparent_60%)]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(26,94,58,0.06),transparent_60%)]" />
        </div>

        <div className="hero-content text-center max-w-[1000px] relative z-20">
          <div className="crest-container mb-10 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/assets/Lee_Crest_2026.png"
              alt="Lee Family Crest"
              width={520}
              height={520}
              priority
              className="crest-img w-[clamp(180px,22vw,260px)] h-auto drop-shadow-[0_8px_24px_rgba(15,39,64,0.25)]"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </div>

          <div className="eyebrow font-tenor text-[0.7rem] tracking-[0.6em] text-gold uppercase mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            Officially Engaged · Sealed in Santorini
          </div>

          <div className="hero-script font-playfair italic text-[clamp(1.25rem,2.5vw,1.75rem)] text-navy mb-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            It is with hearts full of joy that we announce
          </div>

          <h1 className="hero-names font-italiana text-[clamp(3.5rem,9vw,7.5rem)] text-navy-deep leading-none my-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.9s', letterSpacing: '0.03em' }}>
            Gillian
            <span className="ampersand block sm:inline font-playfair italic text-rose text-[clamp(2.5rem,6vw,5rem)] mx-1 sm:mx-4 align-middle">
              &
            </span>
            Merrick
          </h1>

          <div className="hero-divider flex items-center justify-center gap-6 my-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
            <span className="line h-px w-20 bg-gold" />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gold"
            >
              <path d="M12,2 L14,8 L20,10 L14,12 L12,18 L10,12 L4,10 L10,8 Z" />
            </svg>
            <span className="line h-px w-20 bg-gold" />
          </div>

          <div className="hero-date-block opacity-0 animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
            <p className="hero-date font-italiana text-2xl tracking-[0.15em] text-navy mb-2">SUMMER · 2027</p>
            <p className="hero-location font-playfair italic text-xl tracking-[0.1em] text-emerald">~ The Isle of Jamaica ~</p>
          </div>
        </div>
      </div>

      <GreekKey />
    </section>
  )
}
