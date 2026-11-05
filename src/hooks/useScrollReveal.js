import { useEffect } from 'react'

// Revela elementos .reveal e .diff-item ao entrarem na viewport (uma única vez).
// Com prefers-reduced-motion, o CSS já os exibe sem transição.
export function useScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal, .diff-item').forEach((el) => el.classList.add('visible'))
      return undefined
    }

    const timers = new Set()

    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        })
      },
      { threshold: 0.1 },
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el))

    const diffObs = new IntersectionObserver(
      (entries, obs) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            obs.unobserve(e.target)
            const id = setTimeout(() => {
              timers.delete(id)
              e.target.classList.add('visible')
            }, i * 110)
            timers.add(id)
          })
      },
      { threshold: 0.08 },
    )
    document.querySelectorAll('.diff-item').forEach((el) => diffObs.observe(el))

    return () => {
      revealObs.disconnect()
      diffObs.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])
}
