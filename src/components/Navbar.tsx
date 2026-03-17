import { useState, useEffect, useCallback, type RefObject } from 'react'
import type Lenis from 'lenis'

interface NavbarProps {
  lenisRef: RefObject<Lenis | null>
}

export default function Navbar({ lenisRef }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)

    const scrollY = window.scrollY + 120
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      const el = section as HTMLElement
      const top = el.offsetTop
      const height = el.offsetHeight
      const id = el.getAttribute('id') || ''
      if (scrollY >= top && scrollY < top + height) {
        setActiveSection(id)
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, { offset: -72 })
    }
    setMobileOpen(false)
  }

  const navLinks = [
    { href: '#work', label: 'My Work' },
    { href: '#about', label: 'About Me' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          Stella Victor
        </a>
        <button
          className={`nav-toggle${mobileOpen ? ' active' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links${mobileOpen ? ' active' : ''}`}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
