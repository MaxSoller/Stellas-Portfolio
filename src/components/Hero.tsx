import { type RefObject } from 'react'
import type Lenis from 'lenis'

interface HeroProps {
  lenisRef: RefObject<Lenis | null>
}

export default function Hero({ lenisRef }: HeroProps) {
  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector('#work')
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, { offset: -72 })
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-line hero-reveal" style={{ '--delay': 0 } as React.CSSProperties}>
          <p className="hero-greeting">Hello, I'm</p>
        </div>
        <div className="hero-line hero-reveal" style={{ '--delay': 1 } as React.CSSProperties}>
          <h1 className="hero-name">Stella Victor</h1>
        </div>
        <div className="hero-line hero-reveal" style={{ '--delay': 2 } as React.CSSProperties}>
          <h2 className="hero-title">Industrial <span className="hero-accent">Designer</span></h2>
        </div>
        <div className="hero-line hero-reveal" style={{ '--delay': 3 } as React.CSSProperties}>
          <p className="hero-tagline">Crafting thoughtful, human-centered products that bridge form and function.</p>
        </div>
        <div className="hero-line hero-reveal" style={{ '--delay': 4, padding: '0 0 14px' } as React.CSSProperties}>
          <a href="#work" className="btn-3d" onClick={handleViewWork}>View My Work</a>
        </div>
      </div>
    </section>
  )
}
