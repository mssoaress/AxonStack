import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx'
import { CONTACT } from '../constants.js'

export default function CtaFinal() {
  return (
    <section id="cta-final" aria-labelledby="cta-final-title">
      <div className="container cta-container">
        <div className="cta-glow" aria-hidden="true"></div>
        <p className="section-label section-label--center reveal">Próximo passo</p>
        <h2 className="cta-final-title reveal reveal-delay-1" id="cta-final-title">
          Vamos construir a tecnologia que o seu negócio precisa.
        </h2>
        <p className="cta-final-sub reveal reveal-delay-2">
          Entre em contato e descubra como a Axon Stack pode transformar sua operação.
        </p>
        <div className="cta-buttons reveal reveal-delay-3">
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            aria-label="Falar com a Axon Stack no WhatsApp (abre em nova aba)"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
          <a
            href={CONTACT.phoneHref}
            className="btn-ghost"
            aria-label={`Ligar para a Axon Stack: ${CONTACT.phoneDisplay}`}
          >
            <PhoneIcon />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={CONTACT.emailHref}
            className="btn-ghost"
            aria-label={`Enviar e-mail para ${CONTACT.email}`}
          >
            <MailIcon />
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label={`Instagram da Axon Stack: ${CONTACT.instagramHandle} (abre em nova aba)`}
          >
            <InstagramIcon />
            {CONTACT.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}
