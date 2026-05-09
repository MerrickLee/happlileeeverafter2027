import type { Metadata } from 'next'
import { italiana, playfair, tenor } from './fonts'
import { AmplitudeProvider } from '@/lib/amplitude'
import Analytics from '@/components/Analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gillian & Merrick · #HappiLeeEverAfter2027',
  description: 'Sealed in Santorini, crowned in Jamaica. Join us in celebrating the wedding of Gillian & Merrick Lee, August 1, 2027.',
  keywords: 'Gillian and Merrick wedding, Lee wedding 2027, Jamaica destination wedding, HappiLeeEverAfter, wedding RSVP',
  authors: [{ name: 'Gillian & Merrick Lee' }],
  themeColor: '#0f2740',
  alternates: {
    canonical: 'https://happileeeverafter2027.com/',
  },
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Gillian & Merrick · #HappiLeeEverAfter2027',
    description: 'Sealed in Santorini, crowned in Jamaica. Join us in celebrating the wedding of Gillian & Merrick Lee, August 1, 2027.',
    url: 'https://happileeeverafter2027.com/',
    siteName: 'HappiLee Ever After 2027',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gillian & Merrick Lee Wedding',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gillian & Merrick · #HappiLeeEverAfter2027',
    description: 'Sealed in Santorini, crowned in Jamaica. Join us in celebrating the wedding of Gillian & Merrick Lee, August 1, 2027.',
    images: ['/og-image.jpg'],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "The Wedding of Gillian & Merrick Lee",
  "startDate": "2027-08-01T16:00:00",
  "endDate": "2027-08-02T00:00:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Jamaica",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "JM"
    }
  },
  "image": ["https://happileeeverafter2027.com/og-image.jpg"],
  "description": "The wedding celebration of Gillian and Merrick Lee, sealed in Santorini and crowned in Jamaica.",
  "organizer": {
    "@type": "Person",
    "name": "Gillian & Merrick Lee",
    "url": "https://happileeeverafter2027.com"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${italiana.variable} ${playfair.variable} ${tenor.variable}`}>
      <body className="bg-bg text-ink font-playfair">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <AmplitudeProvider>
          {children}
        </AmplitudeProvider>
      </body>
    </html>
  )
}
