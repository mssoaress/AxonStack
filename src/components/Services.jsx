import SectionHeader from './SectionHeader.jsx'
import { ArrowIcon, CheckIcon, ServiceIcon } from './Icons.jsx'
import { SERVICES } from '../content/services.js'
import { WHATSAPP_MESSAGES, serviceWhatsappLink, whatsappLink } from '../constants.js'

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
    <section id="servicos" className="section" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHeader
          index="01"
          label="Soluções"
          titleId="servicos-title"
          title={
            <>
              Tecnologia completa, <span className="text-gradient">do servidor ao software.</span>
            </>
          }
          lead="Seis frentes que se conectam: contrate o que a sua empresa precisa agora e evolua a solução com o mesmo parceiro técnico."
          split
        />

        <ul className="services-grid" onPointerMove={onPointerMove}>
          {SERVICES.map(({ id, title, category, icon, description, benefits }, i) => (
            <li
              key={id}
              id={`servico-${id}`}
              className={`service-card card card--interactive card--spotlight reveal reveal-delay-${(i % 3) + 1}`}
              data-category={category}
            >
              <div className="service-card-head">
                <span className="icon-tile">
                  <ServiceIcon name={icon} />
                </span>
                <span className="badge">{category}</span>
              </div>
              <div className="service-card-body">
                <h3 className="service-title">{title}</h3>
                <p className="service-desc">{description}</p>
              </div>
              <ul className="check-list service-benefits" aria-label={`Benefícios: ${title}`}>
                {benefits.map((benefit) => (
                  <li key={benefit}>
                    <CheckIcon />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a
                href={serviceWhatsappLink(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link service-cta"
              >
                Conversar sobre este serviço
                <span className="sr-only">: {title} (WhatsApp, abre em nova aba)</span>
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>

        <div className="services-foot reveal">
          <p>
            Não sabe por onde começar? Conte o seu cenário e indicamos a combinação de soluções mais
            adequada.
          </p>
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.project)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass"
          >
            Falar com um especialista
            <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
