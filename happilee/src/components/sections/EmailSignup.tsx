'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent, identifyUser } from '@/lib/amplitude'

const signupSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
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
      const res = await fetch('https://services.leadconnectorhq.com/hooks/ingqRhlSsMDVzONcCgCo/webhook-trigger/1eb472fe-42ed-4250-a527-7ffcb3c7a397', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'Wedding Newsletter Signup',
          submittedAt: new Date().toISOString()
        }),
      })
      if (res.ok) {
        setStatus('success')
        trackEvent('email_signup_submit_success')
        identifyUser(data.email, { 
          full_name: data.name,
          newsletter_subscriber: true 
        })
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
              {...register('name')}
              placeholder="Your Full Name"
              className="form-input"
            />
            <input
              {...register('email')}
              type="email"
              placeholder="Your email address"
              className="form-input"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="form-btn"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {errors.name && (
              <p style={{ color: 'var(--rose-soft)', fontStyle: 'italic', fontSize: '0.8rem' }}>{errors.name.message as string}</p>
            )}
            {errors.email && (
              <p style={{ color: 'var(--rose-soft)', fontStyle: 'italic', fontSize: '0.8rem' }}>{errors.email.message as string}</p>
            )}
          </div>
          {status === 'success' && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--gold-bright)', fontSize: '0.95rem' }}>
              <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Thank you! You&apos;ve been added to our list.</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                Expect an email soon from <strong>we.happileeeverafter2027.com</strong><br/>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(Check junk/spam just in case)</span>
              </p>
            </div>
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
