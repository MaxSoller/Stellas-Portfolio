import { useLenis } from './hooks/useLenis'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionDivider from './components/SectionDivider'
import WorkSection from './components/WorkSection'
import AboutSection from './components/AboutSection'
import ResumeSection from './components/ResumeSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

// SVG wave paths matching the original hand-crafted dividers
const DIVIDERS = {
  heroToWork: {
    background: 'transparent',
    fill: 'var(--color-bg-alt)',
    path: 'M0,60 C240,20 480,90 720,50 C960,10 1200,80 1440,40 L1440,80 L0,80 Z',
  },
  workToAbout: {
    background: 'var(--color-bg-alt)',
    fill: 'var(--color-bg)',
    path: 'M0,30 C180,70 360,10 540,55 C720,80 900,20 1080,65 C1260,30 1380,50 1440,40 L1440,80 L0,80 Z',
  },
  aboutToResume: {
    background: 'var(--color-bg)',
    fill: 'var(--color-bg-alt)',
    path: 'M0,50 C320,80 480,15 720,55 C960,75 1100,25 1280,60 C1360,45 1420,65 1440,50 L1440,80 L0,80 Z',
  },
  resumeToContact: {
    background: 'var(--color-bg-alt)',
    fill: 'var(--color-bg)',
    path: 'M0,45 C200,70 400,20 600,55 C800,80 1000,30 1200,60 C1340,40 1400,55 1440,45 L1440,80 L0,80 Z',
  },
}

export default function App() {
  const lenisRef = useLenis()

  return (
    <>
      <ScrollProgress />
      <Navbar lenisRef={lenisRef} />
      <Hero lenisRef={lenisRef} />

      <SectionDivider
        background={DIVIDERS.heroToWork.background}
        fillColor={DIVIDERS.heroToWork.fill}
        path={DIVIDERS.heroToWork.path}
      />
      <WorkSection />

      <SectionDivider
        background={DIVIDERS.workToAbout.background}
        fillColor={DIVIDERS.workToAbout.fill}
        path={DIVIDERS.workToAbout.path}
      />
      <AboutSection />

      <SectionDivider
        background={DIVIDERS.aboutToResume.background}
        fillColor={DIVIDERS.aboutToResume.fill}
        path={DIVIDERS.aboutToResume.path}
      />
      <ResumeSection />

      <SectionDivider
        background={DIVIDERS.resumeToContact.background}
        fillColor={DIVIDERS.resumeToContact.fill}
        path={DIVIDERS.resumeToContact.path}
      />
      <ContactSection />

      <Footer />
    </>
  )
}
