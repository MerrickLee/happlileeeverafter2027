'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent } from '@/lib/amplitude'

export default function Guestbook() {
  const ref = useSectionTracking('guestbook')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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

        <div style={{ marginTop: '5rem', maxWidth: 600, margin: '5rem auto 0', borderTop: '1px solid rgba(184,137,59,0.2)', paddingTop: '3rem', textAlign: 'center' }}>
          <p style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>&ldquo;May your love grow deeper with every sunrise.&rdquo;</p>
          <p className="event-month">— The Thompsons</p>
        </div>
      </div>
    </section>
  )
}
