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
            <a href="https://wa.me/5521994291884?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Axon%20Stack." target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Falar com Axon Stack no WhatsApp">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.42.75-2.11 1.01-2.4.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.3-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.7-.82.89-1.1.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" /></svg>
            </a>
            <a href="tel:+5521994291884" className="social-btn" aria-label="Ligar para Axon Stack">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </a>
            <a href="mailto:contato@axonstack.dev" className="social-btn" aria-label="Enviar e-mail para Axon Stack">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </a>
            <a href="https://instagram.com/axonstack.dev" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Seguir Axon Stack no Instagram">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
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
            <a href="https://wa.me/5521994291884?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Axon%20Stack." target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="tel:+5521994291884">(21) 99429-1884</a>
            <a href="mailto:contato@axonstack.dev">contato@axonstack.dev</a>
            <a href="https://instagram.com/axonstack.dev" target="_blank" rel="noopener noreferrer">@axonstack.dev</a>
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