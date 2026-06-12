import DiffCanvas from './DiffCanvas.jsx'

export default function Diferenciais() {
  return (
    <section id="diferenciais">
      <div className="container">
        <div className="diff-grid">
          <div>
            <p className="section-label reveal">Por que a Axon Stack</p>
            <h2 className="section-title reveal reveal-delay-1">Nossos<br /><span style={{ color: 'var(--orange)' }}>Diferenciais</span></h2>
            <div className="diff-list" style={{ marginTop: '36px' }}>

              <div className="diff-item">
                <div className="diff-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="diff-text">
                  <h4>Performance extrema</h4>
                  <p>Infraestrutura otimizada para latência mínima e throughput máximo, com SLAs garantidos.</p>
                </div>
              </div>

              <div className="diff-item">
                <div className="diff-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.5 14v7M14 17.5h7" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="diff-text">
                  <h4>Escalabilidade nativa</h4>
                  <p>Arquitetura projetada para crescer com o seu negócio — do startup ao enterprise, sem refatoração.</p>
                </div>
              </div>

              <div className="diff-item">
                <div className="diff-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 2l3 6.5L22 9.5l-5 5 1.18 7.02L12 18.27l-6.18 3.25L7 14.5 2 9.5l7-1L12 2z" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="diff-text">
                  <h4>Segurança de ponta</h4>
                  <p>Camadas de proteção desde a infraestrutura até o código, com auditoria contínua e criptografia.</p>
                </div>
              </div>

              <div className="diff-item">
                <div className="diff-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="diff-text">
                  <h4>Design de alto nível</h4>
                  <p>Interfaces que refletem a identidade da sua marca com precisão, usabilidade e impacto visual memorável.</p>
                </div>
              </div>

            </div>
          </div>
          <div className="diff-visual reveal reveal-delay-2">
            <DiffCanvas />
          </div>
        </div>
      </div>
    </section>
  )
}
