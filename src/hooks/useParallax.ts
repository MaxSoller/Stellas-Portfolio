import { useEffect, useRef, type RefObject } from 'react'
import type Lenis from 'lenis'

export function useParallax<T extends HTMLElement>(
  lenisRef: RefObject<Lenis | null>,
  speed: number
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const lenis = lenisRef.current
    const el = ref.current
    if (!lenis || !el) return

    const handler = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const offset = (center - window.innerHeight / 2) * speed
      el.style.transform = `translateY(${offset}px)`
    }

    lenis.on('scroll', handler)
    return () => {
      lenis.off('scroll', handler)
    }
  }, [lenisRef, speed])

  return ref
}
