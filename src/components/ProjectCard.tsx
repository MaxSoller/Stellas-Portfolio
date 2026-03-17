import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.classList.add('scale-in')
    el.style.transitionDelay = `${index * 0.08}s`
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  const basePath = import.meta.env.BASE_URL

  return (
    <article
      ref={cardRef}
      className={`project-card${project.featured ? ' bento-featured' : ''}`}
      onClick={onClick}
    >
      <div className="project-image">
        {project.images.length > 0 ? (
          <div className="project-gallery">
            {project.images.map((img, i) => (
              <img
                key={img}
                src={`${basePath}${img}`}
                alt={`${project.title}${i > 0 ? ` — image ${i + 1}` : ''}`}
                className={`gallery-slide${i === 0 ? ' active' : ''}`}
              />
            ))}
          </div>
        ) : (
          <div className="project-image-placeholder">{project.title}</div>
        )}
        <div className="project-overlay">
          <span>View Project →</span>
        </div>
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  )
}
