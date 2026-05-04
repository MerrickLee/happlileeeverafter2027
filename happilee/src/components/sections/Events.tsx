// components/sections/Events.tsx
'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import { useRsvp } from '@/lib/rsvp-context'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent } from '@/lib/amplitude'

const events = [
  { id: 'soiree', title: 'Engagement Soirée', location: 'Atlanta, GA & New York City', month: 'JUNE', day: '12', time: '6:00 PM', isFeatured: false },
  { id: 'shower', title: "Gillian's Bridal Shower", location: 'Atlanta, GA', month: 'OCT', day: '24', time: '2:00 PM', isFeatured: false },
  { id: 'wedding', title: 'The Lee Wedding', location: 'The Isle of Jamaica', month: 'AUG', day: '01', time: '4:00 PM', isFeatured: true },
]

export default function Events() {
  const ref = useSectionTracking('events')
  const { openModal } = useRsvp()

  const openRsvp = (eventId: string) => {
    const event = events.find(e => e.id === eventId)
    if (event) {
      trackEvent('rsvp_button_clicked', { event_name: event.title })
      openModal({ name: event.title, location: event.location })
    }
  }

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="section-inner" style={{ maxWidth: 850 }}>
        <SectionHeader
          eyebrow="Save These Dates"
          title="Upcoming Celebrations"
          subtitle="A series of joyful gatherings leading to our forever"
        />

        <div className="events-list">
          {events.map((event) => (
            <div
              key={event.id}
              className={`event-card ${event.isFeatured ? 'event-card-featured' : ''}`}
              style={{ gridTemplateColumns: '1fr auto' }}
            >
              <div>
                <div className="event-title">
                  {event.title.split(' ').map((word, i) => (
                    <span key={i} className={word === 'Lee' ? 'text-gold' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </div>
                <div className="event-detail">{event.location}</div>
              </div>

              <div>
                <button
                  onClick={() => openRsvp(event.id)}
                  className={`btn-outline ${event.isFeatured ? 'border-emerald text-emerald hover:bg-emerald hover:text-bg' : ''}`}
                  style={event.isFeatured ? { borderColor: 'var(--emerald)', color: 'var(--emerald)' } : {}}
                >
                  RSVP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
