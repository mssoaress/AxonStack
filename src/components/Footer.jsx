export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/img/logo-icone.png" width="34" height="34" alt="Axon Stack logo" style={{ objectFit: 'contain' }} />
            <span className="nav-logo-text" style={{ fontSize: '17px' }}>AXON STACK</span>
          </div>
          <p className="footer-tagline">Infraestrutura, Cloud e Software</p>
          <div className="footer-socials">
            <a href="https://instagram.com/axonstack.dev" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Seguir Axon Stack no Instagram">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="mailto:axonstack.dev@gmail.com" className="social-btn" aria-label="Enviar e-mail para Axon Stack">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </a>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Serviços</p>
          <div className="footer-links">
            <a href="#servicos">Cloud Computing</a>
            <a href="#servicos">Infraestrutura</a>
            <a href="#servicos">VPS e Hospedagem</a>
            <a href="#servicos">E-mail Corporativo</a>
            <a href="#servicos">Desenvolvimento Web</a>
            <a href="#servicos">Sistemas SaaS</a>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Empresa</p>
          <div className="footer-links">
            <a href="#servicos">Serviços</a>
            <a href="#processo">Processo</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#cta-final">Contato</a>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Contato</p>
          <div className="footer-links">
            <a href="https://instagram.com/axonstack.dev" target="_blank" rel="noopener noreferrer">@axonstack.dev</a>
            <a href="mailto:axonstack.dev@gmail.com">axonstack.dev@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 Axon Stack.</p>
        <p className="footer-copy">Infraestrutura, Cloud e Software.</p>
      </div>
    </footer>
  )
}
