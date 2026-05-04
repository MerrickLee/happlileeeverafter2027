// components/ui/Flourish.tsx
'use client'

export default function Flourish() {
  return (
    <div className="flourish">
      <span className="line" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gold)' }}>
        <path d="M12,2 L14,8 L20,10 L14,12 L12,18 L10,12 L4,10 L10,8 Z" />
      </svg>
      <span className="line" />
    </div>
  )
}
