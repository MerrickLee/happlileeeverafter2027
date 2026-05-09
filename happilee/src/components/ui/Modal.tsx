'use client'

import { useEffect, ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: ReactNode
  maxWidth?: string
}

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = '600px' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal" style={{ maxWidth }}>
        <button 
          onClick={onClose}
          className="modal-close"
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-content">
          {(title || subtitle) && (
            <header className="modal-header">
              {title && <h3 className="modal-title">{title}</h3>}
              {subtitle && <p className="modal-subtitle">{subtitle}</p>}
              <hr className="modal-divider" />
            </header>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
