import { useEffect, useRef } from 'react'
import HeroCanvas from './HeroCanvas.jsx'

export default function Hero() {
  const contentRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      const hc = contentRef.current
      if (!hc) return
      if (sy < window.innerHeight) {
        const opacity = Math.max(0, 1 - sy / (window.innerHeight * 0.75))
        hc.style.transform = `translateY(${sy * 0.22}px)`
        hc.style.opacity = opacity
      } else {
        hc.style.opacity = 0
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero">
      <HeroCanvas />
      <div className="hero-glow"></div>
      <div className="hero-content" ref={contentRef}>
        <p className="hero-eyebrow">Bem-vindo à Axon Stack</p>
        <h1 className="hero-headline">Da<br />Infraestrutura<br />à <span>Criação</span> de<br />Sistemas</h1>
        <p className="hero-sub">Desenvolvemos e entregamos soluções tecnológicas completas para o crescimento do seu negócio.</p>
        <div className="hero-actions">
          <a href="https://instagram.com/axonstack.dev" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            Falar no Instagram
          </a>
          <a href="#servicos" className="btn-ghost">Ver serviços</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
