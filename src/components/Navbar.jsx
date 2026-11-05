import { useCallback, useEffect, useRef, useState } from 'react'
import { CONTACT_ANCHOR, NAV_LINKS } from '../constants.js'

// Mesmo breakpoint do CSS em que o hamburger aparece.
const DESKTOP_QUERY = '(min-width: 769px)'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const drawerRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

    const desktopQuery = window.matchMedia?.(DESKTOP_QUERY)
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

  return (
    <header>
      {/* MENU MOBILE */}
      <nav
        className={`nav-drawer${open ? ' open' : ''}`}
        id="nav-drawer"
        ref={drawerRef}
        aria-label="Menu principal"
        hidden={!open}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => closeMenu(false)}>
            {label}
          </a>
        ))}
        <a href={CONTACT_ANCHOR.href} className="nav-cta-drawer" onClick={() => closeMenu(false)}>
          {CONTACT_ANCHOR.label}
        </a>
      </nav>

      {/* NAVBAR */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} aria-label="Navegação principal">
        <a href="#hero" className="nav-logo" aria-label="Axon Stack — início">
          <img
            src="/img/logo-icone.png"
            srcSet="/img/logo-icone-76.png 76w, /img/logo-icone-112.png 112w, /img/logo-icone.png 164w"
            sizes="(max-width: 768px) 38px, (max-width: 1024px) 56px, 82px"
            className="nav-logo-icon"
            width="82"
            height="82"
            alt=""
          />
          <span className="nav-logo-text" aria-hidden="true">
            AXON STACK
          </span>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
          <li>
            <a href={CONTACT_ANCHOR.href} className="nav-cta">
              {CONTACT_ANCHOR.label}
            </a>
          </li>
        </ul>
        <button
          type="button"
          className={`nav-hamburger${open ? ' open' : ''}`}
          ref={toggleRef}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="nav-drawer"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </nav>
    </header>
  )
}
