import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx'
import { CONTACT } from '../constants.js'

export default function CtaFinal() {
  return (
    <section id="cta-final" aria-labelledby="cta-final-title">
      <div className="container">
        <div className="cta-panel glass reveal">
          <div className="cta-glow" aria-hidden="true"></div>
          <p className="section-label">Próximo passo</p>
          <h2 className="cta-final-title" id="cta-final-title">
            Vamos construir a tecnologia que o seu negócio precisa.
          </h2>
          <p className="cta-final-sub">
            Conte o seu cenário: avaliamos a sua operação e indicamos a solução mais adequada — do
            servidor ao software.
          </p>

          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            aria-label="Falar com a Axon Stack no WhatsApp (abre em nova aba)"
          >
            <WhatsAppIcon />
            Falar no WhatsApp
          </a>

          <ul className="cta-channels" aria-label="Outros canais de contato">
            <li>
              <a
                href={CONTACT.phoneHref}
                className="btn btn-glass"
                aria-label={`Ligar para a Axon Stack: ${CONTACT.phoneDisplay}`}
              >
                <PhoneIcon />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.emailHref}
                className="btn btn-glass"
                aria-label={`Enviar e-mail para ${CONTACT.email}`}
              >
                <MailIcon />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass"
                aria-label={`Instagram da Axon Stack: ${CONTACT.instagramHandle} (abre em nova aba)`}
              >
                <InstagramIcon />
                {CONTACT.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
