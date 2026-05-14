'use client'

import { useState, useEffect, useCallback } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent } from '@/lib/amplitude'

const GUESTBOOK_ENTRIES = [
  {
    name: 'Dave Berger',
    message: "The strongest marriages aren't built on perfection, they're built on patience, teamwork, forgiveness, and showing up for each other consistently. Protect your peace, celebrate the little moments, and never let a day go by without reminding each other why you chose this journey together. So happy for you both!",
  },
  {
    name: 'Ray "Ronnie"',
    message: "Hey cuz, I'm so proud of the union that you're about to enter into through marriage. My heart is filled with so much joy and happiness for both of you. Words truly can't explain how happy I am for the two of you. May God continue to bless you both on this new journey. Love you!",
  },
  {
    name: 'Nicola Smith',
    message: "Congratulations on your engagement! Wishing you both a lifetime of love, happiness, and beautiful memories together.",
  },
  {
    name: 'Reginald Johnson',
    message: "Let's talk about communication! Marriage is the ultimate tool to create a fulfilling life! Wishing you both continued success!!!!",
  },
  {
    name: 'Danielle Hackett',
    message: "Congratulations on your engagement! Enjoy this special time as you plan your next chapter together. Best wishes!",
  },
  {
    name: 'Tanisha Nisby',
    message: "I've watched this love blossom from the beginning. I'm beyond happy for you both. I pray your love for each other is endless and most definitely HAPPILEE ever after!!",
  },
  {
    name: 'Ceciley Bradley',
    message: "Love with everything today for tomorrow is never promised!",
  },
  {
    name: 'Chandri Morton',
    message: "Keep God first and Stay honest to each other and keep people out your business and live life to the fullest, and this will be a be happily ever after!!! Love ya'll to pieces!!!!!",
  },
  {
    name: 'Mo Barry',
    message: "I'm truly happy for you both, and I pray this union brings you peace, growth, and a lifetime of happiness. Congratulations in advance to the soon-to-be newlyweds.",
  },
  {
    name: 'Shasta',
    message: "Gilly, I'm so happy for you both! My advice is to do whatever necessary to stay connected. Life can get in the way so easily but what keeps you grounded and together is the connection. Allow God to lead you both individually and collectively.",
  },
  {
    name: 'Yolanda Coffee',
    message: "I'm sooooo Happy for you both!!! This is an awesome Celebration for two people to become \"1\" ❤️❤️❤️ May you both continue to grow with each other and love one another!!!! This is a Beautiful \"Love Story\"!!!!",
  },
  {
    name: 'Jung Soo Lee',
    message: "So glad to see my cuz find someone that matches his energy, talent and passion for life! May God continue to bless you two as He writes your love story! Best, Jung",
  },
  {
    name: 'LeVura Ross',
    message: "Please refer to the word of God to get an understanding on marriage. Marriage is God's most precious union. Love each other like no other! Honor each other and keep God at the center of your union so that the union will stand and last forever. Congratulations to both of you.",
  },
  {
    name: 'Rhonda Chapman',
    message: "Whenever a difficult situation should arise before you react put yourself in the shoes of your partner.",
  },
  {
    name: 'Robin',
    message: "Be each other's peace. So happy for you both.",
  },
  {
    name: 'Donnetta Marie',
    message: "Hello Family i love you i miss you so much we haven't spent as much time as we should but I love you always and I appreciate The Face Beat you did for me like 28/29th birthday with many more to come — you are family, we love you.",
  },
  {
    name: 'Raymond Jackson',
    message: "Congratulations on your special day. We are excited about this ceremony of commitment and love. May the Lord Bless This union forever of Merrick and Gillian. Love, Uncle Raymond.",
  },
]

export default function Guestbook() {
  const ref = useSectionTracking('guestbook')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [activeIndex, setActiveIndex] = useState(0)
  const [animState, setAnimState] = useState<'visible' | 'exiting' | 'entering'>('visible')
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((nextIndex: number) => {
    setAnimState('exiting')
    setTimeout(() => {
      setActiveIndex(nextIndex)
      setAnimState('entering')
      setTimeout(() => setAnimState('visible'), 50)
    }, 500)
  }, [])

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % GUESTBOOK_ENTRIES.length)
  }, [activeIndex, goTo])

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + GUESTBOOK_ENTRIES.length) % GUESTBOOK_ENTRIES.length)
  }, [activeIndex, goTo])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(goNext, 5500)
    return () => clearInterval(timer)
  }, [goNext, isPaused])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setStatus('loading')
    trackEvent('guestbook_submit_attempted', { message_length: formData.message.length })
    try {
      const res = await fetch('https://services.leadconnectorhq.com/hooks/ingqRhlSsMDVzONcCgCo/webhook-trigger/cd3143fd-64c4-4767-8c40-20ef800525ca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Guestbook Submission',
          submittedAt: new Date().toISOString()
        }),
      })

      if (!res.ok) throw new Error('Guestbook submission failed')

      setStatus('success')
      trackEvent('guestbook_submit_success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      trackEvent('guestbook_submit_failed', { error: 'Webhook failed' })
    }
  }

  const entry = GUESTBOOK_ENTRIES[activeIndex]

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <SectionHeader
          eyebrow="With Love"
          title="Our Guestbook"
          subtitle="Share a memory, a piece of advice, or simply a warm wish for our journey ahead."
        />

        {status === 'success' ? (
          <div className="animate-fadeIn" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div className="modal-success-icon animate-sent-check" style={{ margin: '0 auto 1.5rem', width: '4rem', height: '4rem', border: '1px solid var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '2rem' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--font-italiana), serif', fontSize: '2rem', color: 'var(--navy-deep)', marginBottom: '1rem' }}>Message Received!</h3>
            <p style={{ fontStyle: 'italic', color: 'var(--gold)', marginBottom: '1rem' }}>Thank you for your beautiful words.</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink)', opacity: 0.8, lineHeight: '1.6' }}>
              Expect an email in the near future from<br/>
              <strong style={{ color: 'var(--navy)' }}>we.happileeeverafter2027.com</strong><br/>
              <span style={{ fontSize: '0.8rem' }}>(Check junk/spam just in case)</span>
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn-outline"
              style={{ marginTop: '2rem' }}
            >
              Write Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="guestbook-input"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="guestbook-input"
                required
              />
            </div>
            <textarea
              placeholder="Your message to the couple..."
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="guestbook-textarea"
              required
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button type="submit" disabled={status === 'loading'} className="btn-solid" style={{ width: '100%' }}>
                {status === 'loading' ? 'Signing...' : 'Post Message'}
              </button>
            </div>
          </form>
        )}

        {/* ── Animated Guestbook Entries Carousel ── */}
        <div
          style={{
            marginTop: '5rem',
            borderTop: '1px solid rgba(184,137,59,0.2)',
            paddingTop: '3.5rem',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Eyebrow label */}
          <p className="section-eyebrow" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Words From Our Loved Ones
          </p>

          {/* Card */}
          <div
            style={{
              maxWidth: 680,
              margin: '0 auto',
              position: 'relative',
              minHeight: 220,
            }}
          >
            {/* Decorative corner marks */}
            <span style={{ position: 'absolute', top: 0, left: 0, width: 18, height: 18, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', opacity: 0.5 }} />
            <span style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', opacity: 0.5 }} />
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: 18, height: 18, borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', opacity: 0.5 }} />
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: 18, height: 18, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', opacity: 0.5 }} />

            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 3rem',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                opacity: animState === 'exiting' ? 0 : animState === 'entering' ? 0 : 1,
                transform: animState === 'exiting'
                  ? 'translateY(-12px)'
                  : animState === 'entering'
                  ? 'translateY(12px)'
                  : 'translateY(0)',
              }}
            >
              {/* Large decorative open-quote */}
              <div style={{
                fontFamily: 'var(--font-italiana), serif',
                fontSize: '5rem',
                color: 'var(--gold)',
                opacity: 0.25,
                lineHeight: 0.6,
                marginBottom: '1rem',
                userSelect: 'none',
              }}>
                &ldquo;
              </div>

              <p style={{
                fontStyle: 'italic',
                color: 'var(--gold)',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                lineHeight: 1.8,
                marginBottom: '1.75rem',
                fontFamily: 'var(--font-playfair), serif',
              }}>
                {entry.message}
              </p>

              <p className="event-month" style={{ letterSpacing: '0.35em' }}>
                — {entry.name.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
          }}>
            {/* Prev */}
            <button
              onClick={goPrev}
              aria-label="Previous message"
              style={{
                width: 36,
                height: 36,
                border: '1px solid rgba(184,137,59,0.5)',
                background: 'transparent',
                color: 'var(--gold)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                transition: 'all 0.25s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--bg)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)' }}
            >
              ←
            </button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {GUESTBOOK_ENTRIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to message ${i + 1}`}
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    border: 'none',
                    background: i === activeIndex ? 'var(--gold)' : 'rgba(184,137,59,0.3)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.35s ease',
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={goNext}
              aria-label="Next message"
              style={{
                width: 36,
                height: 36,
                border: '1px solid rgba(184,137,59,0.5)',
                background: 'transparent',
                color: 'var(--gold)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                transition: 'all 0.25s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--bg)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)' }}
            >
              →
            </button>
          </div>

          {/* Entry counter */}
          <p style={{
            textAlign: 'center',
            fontFamily: 'var(--font-tenor), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'rgba(184,137,59,0.6)',
            marginTop: '1rem',
            textTransform: 'uppercase',
          }}>
            {activeIndex + 1} of {GUESTBOOK_ENTRIES.length}
          </p>
        </div>
      </div>
    </section>
  )
}
