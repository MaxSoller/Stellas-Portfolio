import { useEffect, useRef } from 'react'

export default function ContactSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

    const elements = [titleRef.current, introRef.current, contentRef.current]
    elements.forEach((el) => {
      if (el) {
        el.classList.add('fade-in')
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Get in <span className="title-accent">Touch</span></h2>
        <p className="contact-intro" ref={introRef}>Interested in working together? I'd love to hear from you.</p>
        <div className="contact-content" ref={contentRef}>
          <div className="contact-info">
            <a href="mailto:stella.victor.home@gmail.com" className="contact-link">
              <span className="contact-icon">✉</span>
              stella.victor.home@gmail.com
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-icon">in</span>
              LinkedIn
            </a>
          </div>
          <form className="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows={5} required></textarea>
            <button type="submit" className="btn-3d">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}
