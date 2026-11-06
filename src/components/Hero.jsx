import { useEffect, useRef } from 'react'
import HeroCanvas from './HeroCanvas.jsx'
import HeroStack from './HeroStack.jsx'
import { ArrowUpRightIcon } from './Icons.jsx'
import { WHATSAPP_MESSAGES, whatsappLink } from '../constants.js'

// Mesmo breakpoint do CSS em que o hero passa a ter duas colunas.
export const HERO_PARALLAX_QUERY = '(min-width: 1100px)'

export default function Hero() {
  const contentRef = useRef(null)

  // Parallax do conteúdo do hero. Só no layout de duas colunas (o hero cabe inteiro na
  // viewport); no mobile o diagrama fica abaixo da dobra e não pode sumir ao rolar.
  // Desativado com prefers-reduced-motion.
  useEffect(() => {
    const content = contentRef.current
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const wideQuery = window.matchMedia?.(HERO_PARALLAX_QUERY)
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

    const sync = () => (motionQuery?.matches || !wideQuery?.matches ? disable() : enable())
    sync()
    motionQuery?.addEventListener?.('change', sync)
    wideQuery?.addEventListener?.('change', sync)

    return () => {
      disable()
      motionQuery?.removeEventListener?.('change', sync)
      wideQuery?.removeEventListener?.('change', sync)
    }
  }, [])

  return (
    <section id="hero" aria-labelledby="hero-title">
      <HeroCanvas />
      <div className="hero-backdrop" aria-hidden="true"></div>

      <div className="container hero-content" ref={contentRef}>
        <div className="hero-copy">
          <p className="badge hero-eyebrow">
            <span className="status-dot" aria-hidden="true"></span>
            Software · Infraestrutura · Cloud
          </p>

          <h1 className="hero-title" id="hero-title">
            Da infraestrutura <span className="text-gradient">à criação de sistemas.</span>
          </h1>

          <p className="hero-sub">
            Desenvolvemos sistemas, sites e infraestrutura digital sob medida para empresas que
            precisam de tecnologia confiável para crescer.
          </p>

          <div className="hero-actions">
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Solicitar orçamento
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
              <ArrowUpRightIcon />
            </a>
            <a href="#servicos" className="btn btn-glass btn-lg">
              Explorar soluções
            </a>
          </div>
        </div>

        <HeroStack />
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-line"></span>
        Role
      </div>
    </section>
  )
}
