// components/sections/Gallery.tsx
'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent } from '@/lib/amplitude'

const galleryItems = [
  { id: 1, type: 'photo', label: 'Santorini Shores', size: 'large' },
  { id: 2, type: 'video', label: 'The Proposal', size: 'tall' },
  { id: 3, type: 'photo', label: 'Aegean Skies', size: 'standard' },
  { id: 4, type: 'photo', label: 'Jamaica Bound', size: 'standard' },
  { id: 5, type: 'photo', label: 'Engagement Joy', size: 'wide' },
  { id: 6, type: 'photo', label: 'Forever Together', size: 'standard' },
  { id: 7, type: 'video', label: 'Our Journey', size: 'standard' },
]

const sizeClasses: Record<string, string> = {
  large: 'gallery-item large',
  tall: 'gallery-item tall',
  wide: 'gallery-item wide',
  standard: 'gallery-item',
}

export default function Gallery() {
  const ref = useSectionTracking('gallery')

  const handleItemClick = (item: typeof galleryItems[0]) => {
    trackEvent('gallery_image_clicked', { image_index: item.id, image_label: item.label, image_type: item.type })
  }

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-warm)' }}>
      <div className="section-inner">
        <SectionHeader
          eyebrow="Moments Captured"
          title="Our Journey Together"
          subtitle="A visual diary of our most cherished memories from around the world"
        />

        <div className="gallery-grid-layout">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={sizeClasses[item.size] || 'gallery-item'}
            >
              <div className="gallery-inner-border" />
              <div className="gallery-label">{item.label}</div>
              {item.type === 'video' && (
                <div className="video-icon">
                  <div className="video-play" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .gallery-grid-layout {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 200px;
          gap: 1.25rem;
        }
        .gallery-item {
          position: relative;
          background: linear-gradient(135deg, var(--navy), var(--rose-deep));
          border: 1px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .gallery-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(15,39,64,0.2);
        }
        .gallery-inner-border {
          position: absolute;
          inset: 6px;
          border: 1px solid rgba(212,165,72,0.5);
          pointer-events: none;
          transition: all 0.4s ease;
        }
        .gallery-item:hover .gallery-inner-border {
          inset: 3px;
          border-color: var(--gold-bright);
          border-width: 2px;
        }
        .gallery-item.large { grid-column: span 2; grid-row: span 2; }
        .gallery-item.tall { grid-row: span 2; }
        .gallery-item.wide { grid-column: span 2; }
        .gallery-label {
          font-family: var(--font-tenor), sans-serif;
          color: var(--bg);
          letter-spacing: 0.3em;
          font-size: 0.7rem;
          text-align: center;
          padding: 1rem;
          position: relative;
          z-index: 2;
          text-transform: uppercase;
        }
        .video-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 56px;
          height: 56px;
          border: 1px solid var(--bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15,39,64,0.6);
        }
        .video-play {
          width: 0;
          height: 0;
          border-left: 14px solid var(--bg);
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
          margin-left: 4px;
        }
        @media (max-width: 768px) {
          .gallery-grid-layout {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 160px;
            gap: 0.75rem;
          }
          .gallery-item.large, .gallery-item.wide { grid-column: span 2; }
          .gallery-item.large { grid-row: span 2; }
          .gallery-label { font-size: 0.6rem; letter-spacing: 0.2em; padding: 0.75rem; }
        }
        @media (max-width: 480px) {
          .gallery-grid-layout {
            grid-template-columns: 1fr;
            grid-auto-rows: 200px;
          }
          .gallery-item.large, .gallery-item.tall, .gallery-item.wide { grid-column: span 1; grid-row: span 1; }
          .gallery-item.large { grid-row: span 2; }
        }
      `}</style>
    </section>
  )
}
