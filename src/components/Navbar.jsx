import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const toggleMenu = () => setOpen(o => !o)
  const closeMenu = () => setOpen(false)

  return (
    <>
      {/* MOBILE NAV DRAWER */}
      <div className={`nav-drawer${open ? ' open' : ''}`} id="nav-drawer" role="dialog" aria-label="Menu de navegação">
        <a href="#servicos" onClick={closeMenu}>Serviços</a>
        <a href="#processo" onClick={closeMenu}>Processo</a>
        <a href="#diferenciais" onClick={closeMenu}>Diferenciais</a>
        <a href="#cta-final" className="nav-cta-drawer" onClick={closeMenu}>Contato</a>
      </div>

      {/* NAVBAR */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo">
          <img src="/img/logo-icone.png" className="nav-logo-icon" width="82" height="82" alt="Axon Stack logo" />
          <span className="nav-logo-text">AXON STACK</span>
        </a>
        <ul className="nav-links">
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#processo">Processo</a></li>
          <li><a href="#diferenciais">Diferenciais</a></li>
          <li><a href="#cta-final" className="nav-cta">Contato</a></li>
        </ul>
        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          id="hamburger"
          onClick={toggleMenu}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="nav-drawer"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </>
  )
}
