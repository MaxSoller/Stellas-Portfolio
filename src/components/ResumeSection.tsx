import { useEffect, useRef } from 'react'

export default function ResumeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
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

    if (titleRef.current) {
      titleRef.current.classList.add('fade-in')
      observer.observe(titleRef.current)
    }
    if (contentRef.current) {
      contentRef.current.classList.add('fade-in')
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="section section-alt" id="resume">
      <div className="container">
        <h2 className="section-title" ref={titleRef}>My <span className="title-accent">Resume</span></h2>
        <div className="resume-content" ref={contentRef}>
          <div className="resume-column">
            <h3>Education</h3>
            <div className="resume-item">
              <h4>Industrial Design BA</h4>
              <p className="resume-meta">Lund University, LTH — 2024 – Present</p>
            </div>
            <div className="resume-item">
              <h4>Design and Art</h4>
              <p className="resume-meta">KV Art School, Gothenburg — 2023 – 2024</p>
            </div>
            <div className="resume-item">
              <h4>Introduction to Product Design</h4>
              <p className="resume-meta">CSM College of Art and Design, London UK — 2023</p>
            </div>

            <h3>Work Experience</h3>
            <div className="resume-item">
              <h4>Waitress</h4>
              <p className="resume-meta">Hypoteket i Lund — 2024 – Onward</p>
            </div>
            <div className="resume-item">
              <h4>Sales, Paint Department</h4>
              <p className="resume-meta">Bauhaus Hardware Store, Gothenburg — 2024</p>
            </div>
            <div className="resume-item">
              <h4>Head Waitress</h4>
              <p className="resume-meta">Sketch Restaurant, London UK — 2023</p>
            </div>
            <div className="resume-item">
              <h4>Service Manager, Advisory Role</h4>
              <p className="resume-meta">SEB Bank, Gothenburg — 2022</p>
            </div>
            <div className="resume-item">
              <h4>Waitress</h4>
              <p className="resume-meta">Hotel Gletscherblick, St. Anton, Austria — 2021</p>
            </div>
          </div>
          <div className="resume-column">
            <h3>Skills</h3>
            <ul className="skills-list">
              <li>Adobe Illustrator</li>
              <li>Adobe Photoshop</li>
              <li>Adobe Fresco</li>
              <li>Adobe InDesign</li>
              <li>Fusion 360</li>
              <li>SolidWorks</li>
              <li>CNC Milling</li>
              <li>Ceramics &amp; Glazing</li>
              <li>Multilingual (Swedish &amp; English)</li>
            </ul>

            <h3>Engagements</h3>
            <div className="resume-item">
              <h4>Business Committee, A-Guild at LTH</h4>
              <p>Responsible for Industrial Design.</p>
            </div>
            <div className="resume-item">
              <h4>SRID</h4>
              <p>Member of the student council for Industrial Design at LTH.</p>
            </div>
            <div className="resume-item">
              <h4>Lundaspexarna</h4>
              <p>Member of the PR, product and design sections in the student theater.</p>
            </div>
            <div className="resume-item">
              <h4>Lundakarnevalen 2026</h4>
              <p>Manager of communication and participants in the cabaret section.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
