// lib/useSectionTracking.ts
'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from './amplitude'

export function useSectionTracking(sectionName: string) {
  const ref = useRef<HTMLElement>(null)
  const trackedRef = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !trackedRef.current) {
            trackedRef.current = true
            trackEvent('section_viewed', { section_name: sectionName })
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [sectionName])

  return ref
}
