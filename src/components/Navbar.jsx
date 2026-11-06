import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowIcon, MailIcon, WhatsAppIcon } from './Icons.jsx'
import {
  CONTACT,
  CONTACT_ANCHOR,
  NAV_DESKTOP_QUERY,
  NAV_LINKS,
  WHATSAPP_MESSAGES,
  whatsappLink,
} from '../constants.js'

const SECTION_IDS = [...NAV_LINKS, CONTACT_ANCHOR].map(({ href }) => href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const drawerRef = useRef(null)
  const toggleRef = useRef(null)

  // Estado "rolado" da navbar (vidro). Só atualiza o React quando o valor muda.
  useEffect(() => {
    let last = null
    const onScroll = () => {
      const next = window.scrollY > 24
      if (next !== last) {
        last = next
        setScrolled(next)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Seção ativa: a que cruza uma faixa estreita no meio da viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id),
        )
        setActiveId(SECTION_IDS.find((id) => visible.has(id)) ?? '')
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const linkProps = (href) => {
    const isActive = href.slice(1) === activeId
    return { 'aria-current': isActive ? 'true' : undefined, 'data-active': isActive || undefined }
  }

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // Enquanto o menu está aberto: trava o scroll, deixa o restante da página inerte,
  // fecha com Esc, mantém o foco dentro do menu e fecha ao passar para desktop.
  useEffect(() => {
    if (!open) return undefined

    const drawer = drawerRef.current
    const toggle = toggleRef.current
    const background = [document.querySelector('main'), document.querySelector('footer')].filter(
      Boolean,
    )

    document.body.style.overflow = 'hidden'
    background.forEach((el) => el.setAttribute('inert', ''))
    drawer?.querySelector('a')?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu(true)
        return
      }
      if (e.key !== 'Tab' || !drawer) return
      // Ciclo de foco explícito: links do menu → botão de fechar → primeiro link.
      // (Sem isso o Tab escaparia para o logo da navbar, que fica fora do menu.)
      const focusables = [...drawer.querySelectorAll('a'), toggle].filter(Boolean)
      const count = focusables.length
      const index = focusables.indexOf(document.activeElement)
      e.preventDefault()
      const next = e.shiftKey
        ? index <= 0
          ? count - 1
          : index - 1
        : index === -1 || index === count - 1
          ? 0
          : index + 1
      focusables[next].focus()
    }

    const desktopQuery = window.matchMedia?.(NAV_DESKTOP_QUERY)
    const onBreakpoint = (e) => {
      if (e.matches) closeMenu(false)
    }

    document.addEventListener('keydown', onKeyDown)
    desktopQuery?.addEventListener?.('change', onBreakpoint)

    return () => {
      document.body.style.overflow = ''
      background.forEach((el) => el.removeAttribute('inert'))
      document.removeEventListener('keydown', onKeyDown)
      desktopQuery?.removeEventListener?.('change', onBreakpoint)
    }
  }, [open, closeMenu])

  const navClass = [scrolled && 'scrolled', open && 'menu-open'].filter(Boolean).join(' ')

  return (
    <header className="site-header">
      <nav id="navbar" className={navClass || undefined} aria-label="Navegação principal">
        <div className="nav-shell">
          {/* Superfície de vidro: aparece ao rolar ou com o menu aberto */}
          <span className="nav-surface glass glass--dense" aria-hidden="true">
            <span className="nav-progress"></span>
          </span>

          <a href="#hero" className="nav-logo" aria-label="Axon Stack — início">
            <img
              src="/img/logo-icone-76.png"
              srcSet="/img/logo-icone-76.png 76w, /img/logo-icone-112.png 112w"
              sizes="38px"
              className="nav-logo-icon"
              width="38"
              height="38"
              alt=""
            />
            <span className="nav-logo-text" aria-hidden="true">
              AXON STACK
            </span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="nav-link" {...linkProps(href)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={CONTACT_ANCHOR.href}
            className="btn btn-primary btn-sm nav-cta"
            {...linkProps(CONTACT_ANCHOR.href)}
          >
            {CONTACT_ANCHOR.label}
            <ArrowIcon />
          </a>

          <button
            type="button"
            className="nav-toggle"
            ref={toggleRef}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="nav-drawer"
          >
            <span className="nav-toggle-bars" aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>

      {/* MENU MOBILE — painel flutuante de vidro */}
      <div className="nav-scrim" hidden={!open} aria-hidden="true" onClick={() => closeMenu()} />
      <nav
        className="nav-menu glass glass--dense"
        id="nav-drawer"
        ref={drawerRef}
        aria-label="Menu principal"
        hidden={!open}
      >
        <ol className="nav-menu-links">
          {NAV_LINKS.map(({ href, label }, i) => (
            <li key={href}>
              <a
                href={href}
                className="nav-menu-link"
                onClick={() => closeMenu(false)}
                {...linkProps(href)}
              >
                <span className="index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ol>

        <div className="nav-menu-footer">
          <a
            href={CONTACT_ANCHOR.href}
            className="btn btn-primary btn-block"
            onClick={() => closeMenu(false)}
          >
            {CONTACT_ANCHOR.label}
            <ArrowIcon />
          </a>
          <div className="nav-menu-contacts">
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.project)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass btn-sm"
            >
              <WhatsAppIcon />
              WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a href={CONTACT.emailHref} className="btn btn-glass btn-sm">
              <MailIcon />
              E-mail<span className="sr-only">: {CONTACT.email}</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
