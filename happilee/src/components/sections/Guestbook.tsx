// components/sections/Guestbook.tsx
'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent } from '@/lib/amplitude'

export default function Guestbook() {
  const ref = useSectionTracking('guestbook')
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.message) return
    setStatus('loading')
    trackEvent('guestbook_submit_attempted', { message_length: formData.message.length })
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      trackEvent('guestbook_submit_success')
      setFormData({ name: '', message: '' })
    } catch (err) {
      setStatus('error')
      trackEvent('guestbook_submit_failed', { error: 'Simulation failed' })
    }
  }

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <SectionHeader
          eyebrow="With Love"
          title="Our Guestbook"
          subtitle="Share a memory, a piece of advice, or simply a warm wish for our journey ahead."
        />

        <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="guestbook-input"
          />
          <textarea
            placeholder="Your message to the couple..."
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="guestbook-textarea"
          />
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button type="submit" disabled={status === 'loading'} className="btn-solid" style={{ width: '100%' }}>
              {status === 'loading' ? 'Signing...' : 'Post Message'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '5rem', maxWidth: 600, margin: '5rem auto 0', borderTop: '1px solid rgba(184,137,59,0.2)', paddingTop: '3rem', textAlign: 'center' }}>
          <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>&ldquo;May your love grow deeper with every sunrise.&rdquo;</p>
          <p className="event-month">— The Thompsons</p>
        </div>
      </div>
    </section>
  )
}
