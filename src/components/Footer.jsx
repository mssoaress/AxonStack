import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx'
import { COMPANY_NAME, CONTACT, CONTACT_ANCHOR, NAV_LINKS, TAGLINE } from '../constants.js'

const SERVICE_LINKS = [
  'Cloud Computing',
  'Infraestrutura',
  'VPS e Hospedagem',
  'E-mail Corporativo',
  'Desenvolvimento Web',
  'Sistemas SaaS',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="/img/logo-icone-76.png"
              width="34"
              height="34"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className="nav-logo-text footer-logo-text">AXON STACK</span>
          </div>
          <p className="footer-tagline">{TAGLINE}</p>
          <div className="footer-socials">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="WhatsApp da Axon Stack (abre em nova aba)"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={CONTACT.phoneHref}
              className="social-btn"
              aria-label={`Ligar para a Axon Stack: ${CONTACT.phoneDisplay}`}
            >
              <PhoneIcon />
            </a>
            <a
              href={CONTACT.emailHref}
              className="social-btn"
              aria-label={`Enviar e-mail para ${CONTACT.email}`}
            >
              <MailIcon />
            </a>
            <a
              href={CONTACT.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Instagram da Axon Stack (abre em nova aba)"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Serviços">
          <p className="footer-col-title">Serviços</p>
          <div className="footer-links">
            {SERVICE_LINKS.map((label) => (
              <a key={label} href="#servicos">
                {label}
              </a>
            ))}
          </div>
        </nav>

        <nav aria-label="Empresa">
          <p className="footer-col-title">Empresa</p>
          <div className="footer-links">
            {[...NAV_LINKS, CONTACT_ANCHOR].map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <p className="footer-col-title">Contato</p>
          <div className="footer-links">
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            <a href={CONTACT.instagramHref} target="_blank" rel="noopener noreferrer">
              {CONTACT.instagramHandle}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {/* O ano é calculado em tempo de execução; o HTML pré-renderizado pode diferir na virada do ano. */}
        <p className="footer-copy" suppressHydrationWarning>
          © {year} {COMPANY_NAME}.
        </p>
        <p className="footer-copy">{TAGLINE}.</p>
      </div>
    </footer>
  )
}
