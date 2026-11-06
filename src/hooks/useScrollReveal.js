import { useEffect } from 'react'

// Revela elementos .reveal ao entrarem na viewport (uma única vez). O escalonamento
// vem das classes .reveal-delay-N no CSS. Com prefers-reduced-motion, o CSS já os exibe.
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
