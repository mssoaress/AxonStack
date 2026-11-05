import { useEffect, useRef } from 'react'
import HeroCanvas from './HeroCanvas.jsx'
import { InstagramIcon } from './Icons.jsx'
import { CONTACT } from '../constants.js'

export default function Hero() {
  const contentRef = useRef(null)

  // Parallax do conteúdo do hero (desativado com prefers-reduced-motion).
  useEffect(() => {
    const content = contentRef.current
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!content) return undefined

    let rafId = 0

    const apply = () => {
      rafId = 0
      const sy = window.scrollY
      const vh = window.innerHeight
      // Viewport ainda sem dimensões (aba em segundo plano, por exemplo): não esconde nada.
      if (!vh) return
      if (sy < vh) {
        content.style.transform = `translateY(${sy * 0.22}px)`
        content.style.opacity = String(Math.max(0, 1 - sy / (vh * 0.75)))
      } else {
        content.style.opacity = '0'
      }
    }

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    const reset = () => {
      content.style.transform = ''
      content.style.opacity = ''
    }

    const enable = () => {
      window.addEventListener('scroll', onScroll, { passive: true })
      // Página recarregada já rolada: aplica o estado correspondente.
      if (window.scrollY > 0) onScroll()
    }
    const disable = () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
      reset()
    }

    const sync = () => (motionQuery?.matches ? disable() : enable())
    sync()
    motionQuery?.addEventListener?.('change', sync)

    return () => {
      disable()
      motionQuery?.removeEventListener?.('change', sync)
    }
  }, [])

  return (
    <section id="hero" aria-labelledby="hero-title">
      <HeroCanvas />
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="hero-content" ref={contentRef}>
        <p className="hero-eyebrow">Bem-vindo à Axon Stack</p>
        <h1 className="hero-headline" id="hero-title">
          Da
          <br />
          Infraestrutura
          <br />à <span>Criação</span> de
          <br />
          Sistemas
        </h1>
        <p className="hero-sub">
          Desenvolvemos e entregamos soluções tecnológicas completas para o crescimento do seu
          negócio.
        </p>
        <div className="hero-actions">
          <a
            href={CONTACT.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <InstagramIcon />
            Falar no Instagram
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <a href="#servicos" className="btn-ghost">
            Ver serviços
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
