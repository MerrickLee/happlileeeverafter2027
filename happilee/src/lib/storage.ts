// lib/storage.ts
const STORAGE_KEY = 'happilee_guest_info'

export interface GuestInfo {
  name: string
  email: string
  guests: string
}

export function saveGuestInfo(info: GuestInfo): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info))
}

export function loadGuestInfo(): GuestInfo | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

export function clearGuestInfo(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
