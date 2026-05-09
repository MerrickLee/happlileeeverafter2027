'use client'

import { useEffect } from 'react'
import * as amplitude from '@amplitude/analytics-browser'

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || 'a013a8aef5661df201bf8330107f5244'

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (AMPLITUDE_API_KEY !== 'dummy-key') {
      amplitude.init(AMPLITUDE_API_KEY, {
        defaultTracking: {
          attribution: true,
          pageViews: true,
          sessions: true,
          formInteractions: false,
          fileDownloads: true,
        },
        autocapture: {
          elementInteractions: true,
        },
      })
    }
  }, [])

  return <>{children}</>
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Track in Amplitude
  if (AMPLITUDE_API_KEY !== 'dummy-key') {
    amplitude.track(eventName, {
      ...properties,
      timestamp_iso: new Date().toISOString(),
    })
  } else {
    console.log(`[Amplitude Mock] Track Event: ${eventName}`, properties)
  }

  // Track in Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

export function identifyUser(email: string, properties?: Record<string, any>) {
  // Identify in Amplitude
  if (AMPLITUDE_API_KEY !== 'dummy-key') {
    amplitude.setUserId(email)
    if (properties) {
      const identify = new amplitude.Identify()
      Object.entries(properties).forEach(([k, v]) => identify.set(k, v))
      amplitude.identify(identify)
    }
  } else {
    console.log(`[Amplitude Mock] Identify User: ${email}`, properties)
  }

  // Identify in Google Analytics (User ID)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-L0V7GNQYZW', {
      user_id: email,
      ...properties
    })
  }
}
