import { ArrowUpIcon, InstagramIcon, MailIcon, WhatsAppIcon } from './Icons.jsx'
import { SERVICES } from '../content/services.js'
import {
  COMPANY_NAME,
  CONTACT,
  CONTACT_ANCHOR,
  NAV_LINKS,
  TAGLINE,
  WHATSAPP_MESSAGES,
  whatsappLink,
} from '../constants.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const whatsappHref = whatsappLink(WHATSAPP_MESSAGES.project)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#hero" className="footer-logo" aria-label="Axon Stack — voltar ao início">
              <img
                src="/img/logo-icone-76.png"
                width="40"
                height="40"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className="footer-logo-text" aria-hidden="true">
                AXON STACK
              </span>
            </a>
            <p className="footer-pitch">
              Sistemas, sites e infraestrutura digital sob medida para empresas — do servidor ao
              software.
            </p>
            <div className="footer-socials">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="WhatsApp da Axon Stack (abre em nova aba)"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={CONTACT.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Instagram da Axon Stack (abre em nova aba)"
              >
                <InstagramIcon />
              </a>
              <a
                href={CONTACT.emailHref}
                className="footer-social"
                aria-label={`Enviar e-mail para ${CONTACT.email}`}
              >
                <MailIcon />
              </a>
            </div>
          </div>

          <nav className="footer-col" aria-label="Soluções">
            <p className="footer-col-title">Soluções</p>
            <ul>
              {SERVICES.map(({ id, title }) => (
                <li key={id}>
                  <a href={`#servico-${id}`}>{title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Navegação do rodapé">
            <p className="footer-col-title">Navegação</p>
            <ul>
              {[...NAV_LINKS, { ...CONTACT_ANCHOR, label: 'Contato' }].map(({ href, label }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <p className="footer-col-title">Contato</p>
            <ul>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp<span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              </li>
              <li>
                <a href={CONTACT.emailHref}>{CONTACT.email}</a>
              </li>
              <li>
                <a href={CONTACT.instagramHref} target="_blank" rel="noopener noreferrer">
                  {CONTACT.instagramHandle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          AXON STACK
        </p>

        <div className="footer-bottom">
          {/* O ano é calculado em tempo de execução; o HTML pré-renderizado pode diferir na virada do ano. */}
          <p suppressHydrationWarning>
            © {year} {COMPANY_NAME}. Todos os direitos reservados.
          </p>
          <p>{TAGLINE}.</p>
          <a href="#hero" className="footer-top-link">
            Voltar ao topo
            <ArrowUpIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
