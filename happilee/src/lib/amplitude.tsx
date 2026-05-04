'use client'

import { useEffect } from 'react'
import * as amplitude from '@amplitude/analytics-browser'

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || 'dummy-key'

export function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (AMPLITUDE_API_KEY !== 'dummy-key') {
      amplitude.init(AMPLITUDE_API_KEY, {
        defaultTracking: {
          attribution: true,
          pageViews: true,
          sessions: true,
          formInteractions: false, // we'll do these manually
          fileDownloads: true,
        },
        autocapture: {
          elementInteractions: true, // captures button clicks automatically
        },
      })
    }
  }, [])

  return <>{children}</>
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (AMPLITUDE_API_KEY !== 'dummy-key') {
    amplitude.track(eventName, {
      ...properties,
      timestamp_iso: new Date().toISOString(),
    })
  } else {
    console.log(`[Amplitude Mock] Track Event: ${eventName}`, properties)
  }
}

export function identifyUser(email: string, properties?: Record<string, any>) {
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
}
