// components/modals/RsvpModal.tsx
'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRsvp } from '@/lib/rsvp-context'
import { trackEvent, identifyUser } from '@/lib/amplitude'
import { saveGuestInfo, loadGuestInfo, clearGuestInfo } from '@/lib/storage'
import Button from '@/components/ui/Button'

const rsvpSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  guests: z.string(),
  attending: z.string(),
})

type RsvpFormData = z.infer<typeof rsvpSchema>

export default function RsvpModal() {
  const { isOpen, currentEvent, closeModal } = useRsvp()
  const [submitted, setSubmitted] = useState(false)
  const [savedInfo, setSavedInfo] = useState<Partial<RsvpFormData> | null>(null)

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    formState: { errors, isSubmitting } 
  } = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guests: '',
      attending: ''
    }
  })

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false)
      const saved = loadGuestInfo()
      setSavedInfo(saved)
      if (saved) {
        Object.entries(saved).forEach(([key, value]) => {
          if (key !== 'attending') setValue(key as keyof RsvpFormData, value)
        })
      } else {
        reset()
      }
      trackEvent('rsvp_modal_opened', { 
        event_name: currentEvent?.name, 
        has_saved_info: !!saved 
      })
    }
  }, [isOpen, currentEvent, setValue, reset])

  const onSubmit = async (data: RsvpFormData) => {
    trackEvent('rsvp_submit_attempted', {
      event_name: currentEvent?.name,
      attending: data.attending,
      guest_count: data.guests,
    })

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, event: currentEvent?.name }),
      })

      if (!response.ok) throw new Error('RSVP failed')

      saveGuestInfo({
        name: data.name,
        email: data.email,
        guests: data.guests,
      })

      trackEvent('rsvp_submit_success', { 
        event_name: currentEvent?.name, 
        attending: data.attending 
      })
      
      identifyUser(data.email, {
        full_name: data.name,
        guest_count: data.guests,
        rsvp_status: data.attending,
        events_rsvped: [currentEvent?.name],
      })

      setSubmitted(true)
    } catch (error) {
      trackEvent('rsvp_submit_failed', { 
        event_name: currentEvent?.name, 
        error: 'Submission error' 
      })
      alert('Something went wrong. Please try again.')
    }
  }

  const handleClearSaved = () => {
    clearGuestInfo()
    setSavedInfo(null)
    reset()
    trackEvent('rsvp_clear_saved_info')
  }

  const handleClose = () => {
    if (!submitted && isOpen) {
      trackEvent('rsvp_modal_closed_without_submit', { event_name: currentEvent?.name })
    }
    closeModal()
  }

  if (!isOpen) return null

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="modal">
        <button 
          onClick={handleClose}
          className="modal-close"
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-content">
          {!submitted ? (
            <div id="modalFormView">
              <header className="modal-header">
                <span className="modal-eyebrow">- YOU'RE INVITED -</span>
                <h3 className="modal-title">
                  {currentEvent?.name || 'Engagement Soirée'}
                </h3>
                <p className="modal-subtitle">
                  {currentEvent?.location || 'New York · Date to be announced'}
                </p>
              </header>

              <hr className="modal-divider" />

              {savedInfo && (
                <div className="modal-saved-banner visible bg-gold/10 border border-gold p-3 mb-6 font-playfair italic text-navy-deep text-center text-[0.9rem]">
                  Welcome back, <strong>{savedInfo.name}</strong>! We've remembered your details.
                  <button 
                    type="button"
                    onClick={handleClearSaved}
                    className="ml-3 font-tenor text-[0.6rem] tracking-widest text-rose uppercase underline underline-offset-4 hover:text-navy-deep transition-colors"
                  >
                    Use Different Info
                  </button>
                </div>
              )}

              <form id="rsvpForm" className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="field-group">
                  <label htmlFor="rsvpName">Full Name</label>
                  <input
                    id="rsvpName"
                    {...register('name')}
                    placeholder="Your honored name..."
                    required
                  />
                  {errors.name && <p className="text-rose text-[0.7rem] mt-1 italic">{errors.name.message}</p>}
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label htmlFor="rsvpEmail">Email</label>
                    <input
                      id="rsvpEmail"
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                    {errors.email && <p className="text-rose text-[0.7rem] mt-1 italic">{errors.email.message}</p>}
                  </div>
                  <div className="field-group">
                    <label htmlFor="rsvpPhone">Phone</label>
                    <input
                      id="rsvpPhone"
                      {...register('phone')}
                      type="tel"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="rsvpAddress">Mailing Address</label>
                  <input
                    id="rsvpAddress"
                    {...register('address')}
                    placeholder="Street, City, State, ZIP"
                  />
                </div>

                <div className="field-row">
                  <div className="field-group relative">
                    <label htmlFor="rsvpGuests">Guest Count</label>
                    <select
                      id="rsvpGuests"
                      {...register('guests')}
                      required
                      className="appearance-none"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="1">Just myself</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                      <option value="5">5 guests</option>
                      <option value="6+">6 or more</option>
                    </select>
                    <div className="absolute right-4 bottom-[1.2rem] pointer-events-none text-gold">
                      <svg width="10" height="6" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 1l5 5 5-5" />
                      </svg>
                    </div>
                  </div>
                  <div className="field-group relative">
                    <label htmlFor="rsvpAttending">Attending?</label>
                    <select
                      id="rsvpAttending"
                      {...register('attending')}
                      required
                      className="appearance-none"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="yes">Joyfully accepts</option>
                      <option value="maybe">Tentative</option>
                      <option value="no">Regretfully declines</option>
                    </select>
                    <div className="absolute right-4 bottom-[1.2rem] pointer-events-none text-gold">
                      <svg width="10" height="6" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 1l5 5 5-5" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="modal-form-actions pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-solid w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit RSVP'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="modal-success" id="modalSuccessView">
              <div className="modal-success-icon">✓</div>
              <h3 className="modal-success-title">Thank You!</h3>
              <p className="modal-success-message">Your RSVP for</p>
              <div className="modal-success-event" id="successEventName">
                {currentEvent?.name || 'Engagement Soirée'}
              </div>
              <p className="modal-success-message" style={{ marginBottom: '0.5rem' }}>has been received.</p>
              <p className="modal-success-message" style={{ fontSize: '0.95rem', color: 'var(--gold)' }}>We'll be in touch with details soon.</p>
              <div className="modal-form-actions mt-8">
                <Button onClick={handleClose} variant="outline" className="w-full">
                  Close Window
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
