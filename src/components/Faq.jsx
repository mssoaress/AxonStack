import SectionHeader from './SectionHeader.jsx'
import { ArrowIcon, WhatsAppIcon } from './Icons.jsx'
import { FAQ } from '../content/faq.js'
import { WHATSAPP_MESSAGES, whatsappLink } from '../constants.js'

// Acordeão nativo (<details>/<summary>): teclado, leitor de tela e toque funcionam sem JS.
// `name` agrupa os itens — navegadores compatíveis mantêm só uma resposta aberta por vez.
export default function Faq() {
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-aside">
          <SectionHeader
            index="05"
            label="FAQ"
            titleId="faq-title"
            title={
              <>
                Perguntas <span className="text-gradient">frequentes</span>
              </>
            }
            lead="Não encontrou sua dúvida? Fale direto com quem vai cuidar do seu projeto."
          />
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.question)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass faq-cta reveal"
          >
            <WhatsAppIcon />
            Tirar uma dúvida
            <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
            <ArrowIcon />
          </a>
        </div>

        <div className="faq-list">
          {FAQ.map(({ q, a }, i) => (
            <details key={q} name="faq" className="faq-item reveal">
              <summary>
                <span className="index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="faq-question">{q}</span>
                <span className="faq-icon" aria-hidden="true"></span>
              </summary>
              <div className="faq-answer">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
