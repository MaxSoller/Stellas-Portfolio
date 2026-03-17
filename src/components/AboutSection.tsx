import { useEffect, useRef } from 'react'

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

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

    if (imageRef.current) {
      imageRef.current.classList.add('slide-in-left')
      observer.observe(imageRef.current)
    }
    if (bodyRef.current) {
      bodyRef.current.classList.add('slide-in-right')
      observer.observe(bodyRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const basePath = import.meta.env.BASE_URL

  return (
    <section className="section" id="about">
      <div className="about-layout">
        <div className="about-image" ref={imageRef}>
          <img src={`${basePath}images/about.png`} alt="Stella Victor" />
        </div>
        <div className="about-body" ref={bodyRef}>
          <h2 className="about-heading">About <span className="title-accent">Me</span></h2>
          <p>
            My name is <span className="title-accent">Stella Victor</span> and I am a student at the Industrial Design programme at LTH. I am a positive, ambitious and quick-learning person who works well with others.
          </p>
          <p>
            I always strive to contribute to a positive atmosphere and give my full commitment in every workplace and environment I find myself in.
          </p>
          <p>
            With valuable experience from a range of different workplaces and educations, I have developed a strong adaptability and the ability to take on new challenges and tasks.
          </p>
        </div>
      </div>
    </section>
  )
}
