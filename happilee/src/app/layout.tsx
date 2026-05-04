import type { Metadata } from 'next'
import { italiana, playfair, tenor } from './fonts'
import { AmplitudeProvider } from '@/lib/amplitude'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gillian & Merrick · #HappiLeeEverAfter2027',
  description: 'Sealed in Santorini · Crowned in Jamaica. Join us in celebrating the wedding of Gillian & Merrick Lee, August 2027.',
  openGraph: {
    title: 'Gillian & Merrick · Wedding 2027',
    description: '~ Sealed in Santorini · Crowned in Jamaica ~',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${italiana.variable} ${playfair.variable} ${tenor.variable}`}>
      <body className="bg-bg text-ink font-playfair">
        <AmplitudeProvider>
          {children}
        </AmplitudeProvider>
      </body>
    </html>
  )
}
