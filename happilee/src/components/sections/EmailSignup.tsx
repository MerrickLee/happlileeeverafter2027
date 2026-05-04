// components/sections/EmailSignup.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent, identifyUser } from '@/lib/amplitude'

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type SignupFormData = z.infer<typeof signupSchema>

export default function EmailSignup() {
  const ref = useSectionTracking('email_signup')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: SignupFormData) => {
    setStatus('idle')
    trackEvent('email_signup_submit_attempted', { email_domain: data.email.split('@')[1] })
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      })
      if (res.ok) {
        setStatus('success')
        trackEvent('email_signup_submit_success')
        identifyUser(data.email, { newsletter_subscriber: true })
        reset()
      } else {
        throw new Error()
      }
    } catch (err) {
      setStatus('error')
      trackEvent('email_signup_submit_failed', { error: 'Fetch failed' })
    }
  }

  return (
    <section ref={ref} className="signup-section section">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Stay Connected"
          title="Wedding Newsletter"
          subtitle="Subscribe to receive updates on events, travel tips, and special announcements."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <div className="form-group">
            <input
              {...register('email')}
              type="email"
              placeholder="Your email address"
              onFocus={() => trackEvent('email_signup_focused')}
              className="form-input"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="form-btn"
              style={isSubmitting ? { opacity: 0.5 } : {}}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {errors.email && (
            <p style={{ color: 'var(--rose-soft)', marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.9rem' }}>{errors.email.message as string}</p>
          )}
          {status === 'success' && (
            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontStyle: 'italic', color: 'var(--gold-bright)' }}>
              Thank you! You&apos;ve been added to our list.
            </p>
          )}
          {status === 'error' && (
            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontStyle: 'italic', color: 'var(--rose-soft)' }}>
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
