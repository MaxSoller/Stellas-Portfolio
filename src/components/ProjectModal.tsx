import { useEffect, useState, useCallback } from 'react'
import type { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const hasGallery = project.images.length > 1
  const basePath = import.meta.env.BASE_URL

  const goTo = useCallback(
    (index: number) => {
      setCurrentSlide((index + project.images.length) % project.images.length)
    },
    [project.images.length]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (hasGallery) {
        if (e.key === 'ArrowLeft') goTo(currentSlide - 1)
        if (e.key === 'ArrowRight') goTo(currentSlide + 1)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose, hasGallery, goTo, currentSlide])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay active" id="project-modal" onClick={handleBackdropClick}>
      <div className="modal">
        <button className="modal-close" aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        <div className="modal-inner">
          <div className="modal-image" id="modal-image-wrap">
            {project.images.length > 0 ? (
              <>
                {project.images.map((img, i) => (
                  <img
                    key={img}
                    src={`${basePath}${img}`}
                    alt={`${project.title} — image ${i + 1}`}
                    className={`gallery-slide${i === currentSlide ? ' active' : ''}`}
                    style={{
                      borderRadius: '20px 0 0 20px',
                      height: '100%',
                      minHeight: '360px',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ))}
                {hasGallery && (
                  <>
                    <button
                      className="gallery-prev modal-gallery-prev"
                      aria-label="Previous image"
                      onClick={(e) => {
                        e.stopPropagation()
                        goTo(currentSlide - 1)
                      }}
                    >
                      &#8249;
                    </button>
                    <button
                      className="gallery-next modal-gallery-next"
                      aria-label="Next image"
                      onClick={(e) => {
                        e.stopPropagation()
                        goTo(currentSlide + 1)
                      }}
                    >
                      &#8250;
                    </button>
                    <div className="gallery-dots" id="modal-dots">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          className={`gallery-dot${i === currentSlide ? ' active' : ''}`}
                          aria-label={`Image ${i + 1}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            goTo(i)
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="project-image-placeholder" id="modal-image">
                {project.title}
              </div>
            )}
          </div>
          <div className="modal-body">
            <h2 id="modal-title">{project.title}</h2>
            <div id="modal-details">
              {project.details.map((detail, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: detail }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
