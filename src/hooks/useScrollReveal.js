import { useEffect } from 'react'

// Hook to set up IntersectionObserver based scroll reveal for .reveal elements
export function useScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    revealEls.forEach(el => revealObs.observe(el))

    const diffItems = document.querySelectorAll('.diff-item')
    const diffObs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 110)
      })
    }, { threshold: 0.08 })
    diffItems.forEach(el => diffObs.observe(el))

    return () => {
      revealObs.disconnect()
      diffObs.disconnect()
    }
  }, [])
}
