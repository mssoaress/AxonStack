import { useEffect, useRef } from 'react'
import HeroCanvas from './HeroCanvas.jsx'
import { WhatsAppIcon } from './Icons.jsx'
import { CONTACT } from '../constants.js'

// Camadas exibidas no painel do hero (desktop): resumo fiel dos serviços da seção #servicos.
const STACK_LAYERS = [
  { layer: 'Aplicações', detail: 'Sistemas, SaaS, automações e integrações' },
  { layer: 'Presença digital', detail: 'Sites e landing pages' },
  { layer: 'Cloud', detail: 'Nuvem, VPS e hospedagem' },
  { layer: 'Infraestrutura', detail: 'Servidores e e-mail corporativo' },
]

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
        <div className="hero-text">
          <p className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true"></span>
            Software · Infraestrutura · Cloud
          </p>
          <h1 className="hero-headline" id="hero-title">
            Da
            <br />
            Infraestrutura
            <br />à <span>Criação</span> de
            <br />
            Sistemas
          </h1>
          <p className="hero-sub">
            Desenvolvemos sistemas, sites e infraestrutura em nuvem sob medida para empresas — do
            servidor ao software, com engenharia, segurança e acompanhamento contínuo.
          </p>
          <div className="hero-actions">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon />
              Solicitar orçamento
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>
            <a href="#servicos" className="btn btn-glass">
              Ver serviços
            </a>
          </div>
        </div>

        <aside className="hero-stack glass" aria-labelledby="hero-stack-title">
          <p className="hero-stack-title" id="hero-stack-title">
            Sua stack, de ponta a ponta
          </p>
          <ol className="hero-stack-list">
            {STACK_LAYERS.map(({ layer, detail }) => (
              <li key={layer}>
                <span className="hero-stack-layer">{layer}</span>
                <span className="hero-stack-detail">{detail}</span>
              </li>
            ))}
          </ol>
          <p className="hero-stack-foot">Um único parceiro do servidor ao software.</p>
        </aside>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
