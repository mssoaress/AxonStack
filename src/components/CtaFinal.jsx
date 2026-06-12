export default function CtaFinal() {
  return (
    <section id="cta-final">
      <div className="container" style={{ position: 'relative' }}>
        <div className="cta-glow"></div>
        <p className="section-label reveal" style={{ display: 'block', textAlign: 'center' }}>Próximo passo</p>
        <h2 className="cta-final-title reveal reveal-delay-1">Vamos construir a tecnologia que o seu negócio precisa.</h2>
        <p className="cta-final-sub reveal reveal-delay-2">Entre em contato e descubra como a Axon Stack pode transformar sua operação.</p>
        <div className="cta-buttons reveal reveal-delay-3">
          <a href="https://instagram.com/axonstack.dev" target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label="Falar com Axon Stack no Instagram">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            @axonstack.dev
          </a>
          <a href="mailto:axonstack.dev@gmail.com" className="btn-ghost" aria-label="Enviar e-mail para Axon Stack">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            axonstack.dev@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
