import { useEffect, useRef, type RefObject } from 'react'

export function useScrollAnimation<T extends HTMLElement>(
  animationClass: string,
  options?: { delay?: string }
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add(animationClass)
    if (options?.delay) {
      el.style.transitionDelay = options.delay
    }

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
  }, [animationClass, options?.delay])

  return ref
}
