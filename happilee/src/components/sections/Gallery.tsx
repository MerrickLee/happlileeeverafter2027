'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSectionTracking } from '@/lib/useSectionTracking'
import { trackEvent } from '@/lib/amplitude'
import Modal from '@/components/ui/Modal'

const photoFiles = [
  "DSC_7253.jpg", "DSC_7265.jpg", "DSC_7270.jpg", "DSC_7272.jpg", "DSC_7274.jpg", "DSC_7280.jpg", "DSC_7283.jpg", "DSC_7293.jpg", "DSC_7296.jpg", "DSC_7298.jpg", "DSC_7311.jpg", "DSC_7313.jpg", "DSC_7315.jpg", "DSC_7319.jpg", "DSC_7324.jpg", "DSC_7337.jpg", "DSC_9234.jpg", "DSC_9238.jpg", "DSC_9244.jpg", "DSC_9251.jpg", "DSC_9256.jpg", "DSC_9270.jpg", "DSC_9273.jpg", "DSC_9277.jpg", "DSC_9278.jpg", "DSC_9282.jpg", "DSC_9290.jpg", "DSC_9300.jpg", "DSC_9302.jpg", "DSC_9309.jpg", "DSC_9315.jpg", "DSC_9326.jpg", "DSC_9330.jpg", "DSC_9333.jpg", "DSC_9334.jpg", "DSC_9335.jpg", "DSC_9337.jpg", "DSC_9339.jpg", "DSC_9342.jpg", "DSC_9347.jpg", "DSC_9349.jpg", "DSC_9352.jpg", "DSC_9356.jpg", "DSC_9359.jpg", "DSC_9362.jpg", "DSC_9364.jpg", "DSC_9366.jpg", "DSC_9367.jpg", "DSC_9372.jpg", "DSC_9375.jpg", "DSC_9377.jpg", "DSC_9379.jpg", "DSC_9381.jpg", "DSC_9385.jpg", "DSC_9387.jpg", "DSC_9388.jpg", "DSC_9390-2.jpg", "DSC_9393.jpg", "DSC_9397.jpg", "DSC_9399.jpg", "DSC_9402.jpg", "DSC_9406.jpg", "DSC_9407.jpg", "DSC_9409.jpg", "DSC_9412.jpg", "DSC_9413.jpg", "DSC_9415.jpg", "DSC_9417.jpg", "DSC_9420.jpg", "DSC_9423.jpg", "DSC_9425.jpg", "DSC_9427.jpg", "DSC_9432.jpg", "DSC_9437.jpg", "DSC_9438.jpg", "DSC_9440.jpg", "DSC_9443.jpg", "DSC_9451.jpg", "DSC_9456.jpg", "DSC_9460.jpg", "DSC_9466.jpg", "DSC_9467.jpg", "DSC_9471.jpg", "DSC_9475.jpg", "DSC_9476.jpg", "DSC_9479.jpg", "DSC_9484.jpg", "DSC_9488.jpg", "DSC_9502.jpg", "DSC_9506.jpg", "DSC_9507.jpg", "DSC_9701.jpg", "DSC_9704.jpg", "DSC_9716.jpg", "DSC_9723.jpg", "DSC_9735.jpg", "DSC_9744.jpg", "DSC_9747.jpg", "DSC_9750.jpg", "DSC_9752.jpg", "DSC_9755.jpg", "DSC_9757.jpg", "DSC_9759.jpg", "DSC_9761.jpg", "DSC_9764.jpg", "DSC_9771.jpg", "DSC_9773.jpg", "DSC_9774.jpg", "DSC_9776.jpg", "DSC_9796.jpg"
]

export default function Gallery() {
  const ref = useSectionTracking('gallery')
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const openVideo = () => {
    setIsVideoOpen(true)
    trackEvent('proposal_video_opened')
  }

  const openGallery = () => {
    setIsGalleryOpen(true)
    setCurrentPhotoIndex(0)
    trackEvent('proposal_gallery_opened')
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photoFiles.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photoFiles.length) % photoFiles.length)
  }

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-warm)' }}>
      <div className="section-inner">
        <SectionHeader
          eyebrow="The Proposal"
          title="The Proposal"
          subtitle="Relive the magic of the moment beneath the Santorini sun"
        />

        <div className="proposal-actions">
          <button onClick={openVideo} className="proposal-btn video">
            <div className="proposal-btn-content">
              <span className="proposal-btn-eyebrow">Watch the Moment</span>
              <span className="proposal-btn-title">The Proposal Surprise Video</span>
              <div className="play-icon-simple">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="proposal-btn-overlay" />
          </button>

          <button onClick={openGallery} className="proposal-btn photos">
            <div className="proposal-btn-content">
              <span className="proposal-btn-eyebrow">View the Gallery</span>
              <span className="proposal-btn-title">Proposal Photoshoot</span>
              <div className="photo-icon-simple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            </div>
            <div className="proposal-btn-overlay" />
          </button>
        </div>
      </div>

      {/* Instagram Video Modal */}
      <Modal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)}
        title="The Surprise"
        subtitle="Captured in Oia, Santorini"
        maxWidth="500px"
      >
        <div className="video-container">
          <iframe 
            src="https://www.instagram.com/reel/DYDPAYOMZtx/embed/" 
            width="100%" 
            height="550" 
            frameBorder="0" 
            scrolling="no" 
            allowTransparency={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
          <div className="video-fallback">
            <a 
              href="https://www.instagram.com/reel/DYDPAYOMZtx/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('proposal_instagram_clicked')}
              className="btn-outline w-full"
            >
              Open in Instagram
            </a>
          </div>
        </div>
      </Modal>

      {/* Photoshoot Gallery Modal */}
      <Modal 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)}
        title="Proposal Photoshoot"
        subtitle={`Moment ${currentPhotoIndex + 1} of ${photoFiles.length}`}
        maxWidth="900px"
      >
        <div className="gallery-modal-content">
          <div className="gallery-main-image">
            <button 
              className="nav-btn prev" 
              onClick={() => { prevPhoto(); trackEvent('gallery_navigated', { direction: 'prev' }); }} 
              aria-label="Previous photo"
            >
              ‹
            </button>
            <div className="image-wrapper">
              <Image 
                src={`/assets/all-photos/${photoFiles[currentPhotoIndex]}`}
                alt={`Proposal photo ${currentPhotoIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <button 
              className="nav-btn next" 
              onClick={() => { nextPhoto(); trackEvent('gallery_navigated', { direction: 'next' }); }} 
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
          
          <div className="gallery-thumbnails">
            {photoFiles.slice(Math.max(0, currentPhotoIndex - 2), Math.min(photoFiles.length, currentPhotoIndex + 3)).map((file, idx) => {
               const actualIdx = photoFiles.indexOf(file);
               return (
                <div 
                  key={file} 
                  className={`thumb-wrapper ${actualIdx === currentPhotoIndex ? 'active' : ''}`}
                  onClick={() => { setCurrentPhotoIndex(actualIdx); trackEvent('gallery_thumbnail_clicked', { photo_index: actualIdx }); }}
                >
                  <Image 
                    src={`/assets/all-photos/${file}`}
                    alt="Thumbnail"
                    width={80}
                    height={80}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
               );
            })}
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .proposal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        .proposal-btn {
          position: relative;
          height: 350px;
          border: 1px solid var(--gold);
          background: var(--navy-deep);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
        }
        .proposal-btn.video {
          background: linear-gradient(rgba(15, 39, 64, 0.8), rgba(15, 39, 64, 0.8)), url('/assets/merrick-gillian.jpg');
          background-size: cover;
          background-position: center;
        }
        .proposal-btn.photos {
          background: linear-gradient(rgba(15, 39, 64, 0.8), rgba(15, 39, 64, 0.8)), url('/assets/all-photos/DSC_9385.jpg');
          background-size: cover;
          background-position: center;
        }
        .proposal-btn-content {
          position: relative;
          z-index: 2;
          color: var(--bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .proposal-btn-eyebrow {
          font-family: var(--font-tenor), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold-bright);
        }
        .proposal-btn-title {
          font-family: var(--font-italiana), serif;
          font-size: 2rem;
          line-height: 1.2;
          max-width: 250px;
        }
        .play-icon-simple, .photo-icon-simple {
          width: 60px;
          height: 60px;
          border: 1px solid rgba(247, 241, 227, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }
        .play-icon-simple svg, .photo-icon-simple svg {
          width: 24px;
          height: 24px;
          color: var(--gold-bright);
        }
        .proposal-btn:hover {
          transform: translateY(-8px);
          border-color: var(--gold-bright);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .proposal-btn:hover .play-icon-simple,
        .proposal-btn:hover .photo-icon-simple {
          background: var(--gold-bright);
          border-color: var(--gold-bright);
        }
        .proposal-btn:hover .play-icon-simple svg,
        .proposal-btn:hover .photo-icon-simple svg {
          color: var(--navy-deep);
        }
        .proposal-btn-overlay {
          position: absolute;
          inset: 0;
          background: var(--navy-deep);
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }
        .proposal-btn:hover .proposal-btn-overlay {
          opacity: 0.2;
        }

        /* Modal Gallery Styles */
        .video-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #000;
          overflow: hidden;
        }
        .video-fallback {
          width: 100%;
          background: var(--bg-warm);
          padding: 1.5rem;
          border-top: 1px solid rgba(184, 137, 59, 0.1);
          text-align: center;
        }
        .gallery-modal-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .gallery-main-image {
          position: relative;
          height: 60vh;
          display: flex;
          align-items: center;
          background: #000;
          border: 1px solid rgba(184, 137, 59, 0.2);
        }
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(15, 39, 64, 0.6);
          color: var(--bg);
          border: 1px solid var(--gold);
          width: 50px;
          height: 50px;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background: var(--gold);
          color: var(--navy-deep);
        }
        .nav-btn.prev { left: 1rem; }
        .nav-btn.next { right: 1rem; }

        .gallery-thumbnails {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .thumb-wrapper {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
        }
        .thumb-wrapper.active {
          border-color: var(--gold);
          opacity: 1;
        }
        .thumb-wrapper:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .proposal-actions {
            grid-template-columns: 1fr;
          }
          .proposal-btn {
            height: 280px;
          }
          .gallery-main-image {
            height: 40vh;
          }
          .nav-btn {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
