// lib/rsvp-context.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'

export interface WeddingEvent {
  name: string
  location: string
}

interface RsvpContextType {
  isOpen: boolean
  currentEvent: WeddingEvent | null
  openModal: (event: WeddingEvent) => void
  closeModal: () => void
}

const RsvpContext = createContext<RsvpContextType | undefined>(undefined)

export function RsvpProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<WeddingEvent | null>(null)

  const openModal = (event: WeddingEvent) => {
    setCurrentEvent(event)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setCurrentEvent(null)
  }

  return (
    <RsvpContext.Provider value={{ isOpen, currentEvent, openModal, closeModal }}>
      {children}
    </RsvpContext.Provider>
  )
}

export function useRsvp() {
  const context = useContext(RsvpContext)
  if (context === undefined) {
    throw new Error('useRsvp must be used within an RsvpProvider')
  }
  return context
}
