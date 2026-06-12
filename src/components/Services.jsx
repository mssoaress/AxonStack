export default function Services() {
  return (
    <section id="servicos">
      <div className="container">
        <div className="services-header">
          <p className="section-label reveal">O que fazemos</p>
          <h2 className="section-title reveal reveal-delay-1">Nossos Serviços</h2>
          <p className="section-sub reveal reveal-delay-2">Do servidor ao software, entregamos a stack completa que o seu negócio precisa para operar com performance e segurança.</p>
        </div>
        <div className="services-grid">

          <div className="service-card reveal reveal-delay-1">
            <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <path d="M8 28c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="4" y="28" width="36" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="11" cy="33" r="1.5" fill="currentColor" />
              <circle cx="16" cy="33" r="1.5" fill="currentColor" />
              <path d="M28 33h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h3 className="service-title">Cloud Computing</h3>
            <p className="service-desc">Infraestrutura em nuvem escalável, com alta disponibilidade e configuração sob medida para as demandas do seu negócio.</p>
          </div>

          <div className="service-card reveal reveal-delay-2">
            <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <rect x="24" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <rect x="6" y="24" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <rect x="24" y="24" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 13h4M20 31h4M13 20v4M31 20v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h3 className="service-title">Infraestrutura de Servidores</h3>
            <p className="service-desc">Montagem, configuração e gerenciamento de ambientes de servidores com monitoramento contínuo e suporte especializado.</p>
          </div>

          <div className="service-card reveal reveal-delay-3">
            <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <rect x="4" y="10" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15 34l-3 6h20l-3-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M14 18h16M14 23h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h3 className="service-title">VPS e Hospedagem</h3>
            <p className="service-desc">Servidores virtuais privados com performance garantida, backups automáticos e painel de controle intuitivo.</p>
          </div>

          <div className="service-card reveal reveal-delay-1">
            <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <path d="M6 10l16 12 16-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="4" y="8" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <h3 className="service-title">E-mail Corporativo</h3>
            <p className="service-desc">Soluções de e-mail profissional com domínio próprio, anti-spam avançado e sincronização em todos os dispositivos.</p>
          </div>

          <div className="service-card reveal reveal-delay-2">
            <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <path d="M6 8h32a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 18l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="service-title">Desenvolvimento de Sites</h3>
            <p className="service-desc">Criação de sites e landing pages com design moderno, otimizados para performance, SEO e conversão de clientes.</p>
          </div>

          <div className="service-card reveal reveal-delay-3">
            <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <rect x="4" y="8" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 20l-6 2 6 2M30 20l6 2-6 2M26 16l-8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="service-title">Sistemas e Plataformas SaaS</h3>
            <p className="service-desc">Desenvolvimento de sistemas web e plataformas SaaS do zero, com arquitetura robusta e escalabilidade ilimitada.</p>
          </div>

        </div>
      </div>
    </section>
  )
}
