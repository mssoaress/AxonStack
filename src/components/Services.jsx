import { ArrowIcon } from './Icons.jsx'
import { CONTACT } from '../constants.js'

const stroke = { stroke: 'currentColor', strokeWidth: 1.5 }

// Ordem: software primeiro, depois infraestrutura. Ícones preservados do layout anterior.
const SERVICES = [
  {
    title: 'Sistemas, SaaS e Integrações',
    tag: 'Software',
    desc: 'Sistemas web e plataformas SaaS sob medida, com automações e integrações às ferramentas que sua empresa já usa — arquitetura robusta e preparada para escalar.',
    icon: (
      <>
        <rect x="4" y="8" width="36" height="28" rx="3" {...stroke} />
        <path
          d="M14 20l-6 2 6 2M30 20l6 2-6 2M26 16l-8 12"
          {...stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'Desenvolvimento de Sites',
    tag: 'Software',
    desc: 'Sites e landing pages com design moderno, otimizados para performance, SEO e conversão de clientes.',
    icon: (
      <>
        <path
          d="M6 8h32a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"
          {...stroke}
        />
        <path
          d="M12 18l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: 'Cloud Computing',
    tag: 'Infraestrutura',
    desc: 'Infraestrutura em nuvem escalável, com alta disponibilidade e configuração sob medida para as demandas do seu negócio.',
    icon: (
      <>
        <path d="M8 28c0-7.7 6.3-14 14-14s14 6.3 14 14" {...stroke} strokeLinecap="round" />
        <rect x="4" y="28" width="36" height="10" rx="3" {...stroke} />
        <circle cx="11" cy="33" r="1.5" fill="currentColor" />
        <circle cx="16" cy="33" r="1.5" fill="currentColor" />
        <path d="M28 33h8" {...stroke} strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Infraestrutura de Servidores',
    tag: 'Infraestrutura',
    desc: 'Montagem, configuração e gerenciamento de ambientes de servidores com monitoramento contínuo e suporte especializado.',
    icon: (
      <>
        <rect x="6" y="6" width="14" height="14" rx="2" {...stroke} />
        <rect x="24" y="6" width="14" height="14" rx="2" {...stroke} />
        <rect x="6" y="24" width="14" height="14" rx="2" {...stroke} />
        <rect x="24" y="24" width="14" height="14" rx="2" {...stroke} />
        <path d="M20 13h4M20 31h4M13 20v4M31 20v4" {...stroke} strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'VPS e Hospedagem',
    tag: 'Infraestrutura',
    desc: 'Servidores virtuais privados com performance consistente, backups automáticos e painel de controle intuitivo.',
    icon: (
      <>
        <rect x="4" y="10" width="36" height="24" rx="3" {...stroke} />
        <path d="M15 34l-3 6h20l-3-6" {...stroke} strokeLinejoin="round" />
        <path d="M14 18h16M14 23h10" {...stroke} strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'E-mail Corporativo',
    tag: 'Infraestrutura',
    desc: 'E-mail profissional com domínio próprio, anti-spam avançado e sincronização em todos os dispositivos.',
    icon: (
      <>
        <path d="M6 10l16 12 16-12" {...stroke} strokeLinecap="round" />
        <rect x="4" y="8" width="36" height="28" rx="3" {...stroke} />
      </>
    ),
  },
]

// Brilho que acompanha o ponteiro dentro do card (apenas mouse; um único listener delegado).
function onPointerMove(e) {
  if (e.pointerType !== 'mouse') return
  const card = e.target instanceof Element && e.target.closest('.service-card')
  if (!card) return
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title">
      <div className="container">
        <div className="section-header">
          <p className="section-label reveal">O que fazemos</p>
          <h2 className="section-title reveal reveal-delay-1" id="servicos-title">
            Nossos Serviços
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            Do servidor ao software, entregamos a stack completa que o seu negócio precisa para
            operar com performance e segurança.
          </p>
        </div>

        <ul className="services-grid" onPointerMove={onPointerMove}>
          {SERVICES.map(({ title, tag, desc, icon }, i) => (
            <li key={title} className={`service-card glass reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="service-card-top">
                <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                  {icon}
                </svg>
                <span className="service-tag">{tag}</span>
              </div>
              <h3 className="service-title">{title}</h3>
              <p className="service-desc">{desc}</p>
            </li>
          ))}
        </ul>

        <div className="section-cta reveal">
          <p>
            Precisa de uma solução sob medida? Conte o seu cenário e indicamos o melhor caminho.
          </p>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Conversar no WhatsApp
            <ArrowIcon />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
