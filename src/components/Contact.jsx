import QuoteForm from './QuoteForm.jsx'
import { ArrowUpRightIcon, InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx'
import { CONTACT, WHATSAPP_MESSAGES, whatsappLink } from '../constants.js'

const CHANNELS = [
  {
    label: 'Telefone',
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
    icon: <PhoneIcon />,
    aria: `Ligar para a Axon Stack: ${CONTACT.phoneDisplay}`,
  },
  {
    label: 'E-mail',
    value: CONTACT.email,
    href: CONTACT.emailHref,
    icon: <MailIcon />,
    aria: `Enviar e-mail para ${CONTACT.email}`,
  },
  {
    label: 'Instagram',
    value: CONTACT.instagramHandle,
    href: CONTACT.instagramHref,
    icon: <InstagramIcon />,
    aria: `Instagram da Axon Stack: ${CONTACT.instagramHandle} (abre em nova aba)`,
    external: true,
  },
]

// CTA final + formulário de orçamento.
export default function Contact() {
  return (
    <section id="contato" className="section contact" aria-labelledby="contato-title">
      <div className="container">
        <div className="contact-panel reveal">
          <div className="contact-glow" aria-hidden="true"></div>

          <div className="contact-intro">
            <p className="eyebrow">
              <span className="eyebrow-index" aria-hidden="true">
                06
              </span>
              <span className="eyebrow-line" aria-hidden="true"></span>
              Próximo passo
            </p>
            <h2 className="contact-title" id="contato-title">
              Seu próximo projeto começa com a{' '}
              <span className="text-gradient">arquitetura certa.</span>
            </h2>
            <p className="contact-lead">
              Conte o que sua empresa precisa. Vamos entender o cenário e construir o caminho
              tecnológico mais adequado.
            </p>

            <a
              href={whatsappLink(WHATSAPP_MESSAGES.project)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg contact-cta"
            >
              <WhatsAppIcon />
              Conversar com a Axon Stack
              <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            </a>

            <ul className="contact-channels" aria-label="Outros canais de contato">
              {CHANNELS.map(({ label, value, href, icon, aria, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="contact-channel"
                    aria-label={aria}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="contact-channel-icon">{icon}</span>
                    <span className="contact-channel-text">
                      <span className="contact-channel-label">{label}</span>
                      <span className="contact-channel-value">{value}</span>
                    </span>
                    <ArrowUpRightIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-form glass">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  )
}
