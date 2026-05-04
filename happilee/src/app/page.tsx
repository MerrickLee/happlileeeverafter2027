// app/page.tsx
'use client'

import Hero from '@/components/sections/Hero'
import Countdown from '@/components/sections/Countdown'
import OurStory from '@/components/sections/OurStory'
import Gallery from '@/components/sections/Gallery'
import Events from '@/components/sections/Events'
import Registry from '@/components/sections/Registry'
import EmailSignup from '@/components/sections/EmailSignup'
import Guestbook from '@/components/sections/Guestbook'
import Footer from '@/components/sections/Footer'
import RsvpModal from '@/components/modals/RsvpModal'
import { RsvpProvider } from '@/lib/rsvp-context'

export default function Home() {
  return (
    <RsvpProvider>
      <main className="min-h-screen">
        <Hero />
        <Countdown />
        <OurStory />
        <Gallery />
        <Events />
        {/* Registry section hidden for now — re-enable when ready */}
        {/* <Registry /> */}
        <EmailSignup />
        <Guestbook />
        <Footer />
      </main>
      <RsvpModal />
    </RsvpProvider>
  )
}
