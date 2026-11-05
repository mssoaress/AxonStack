import { CONTACT } from '../constants.js'

// Respostas baseadas apenas no que o site já afirma (processo e serviços).
// Não incluir prazos, preços ou garantias sem confirmação comercial.
const FAQ = [
  {
    q: 'Como funciona o desenvolvimento de um projeto?',
    a: 'Seguimos quatro etapas: diagnóstico da sua operação e objetivos, desenho da arquitetura da solução, desenvolvimento em sprints com entregas contínuas e suporte após a entrada em produção. Você acompanha cada etapa com comunicação transparente.',
  },
  {
    q: 'A Axon Stack desenvolve sistemas personalizados?',
    a: 'Sim. Desenvolvemos sistemas web e plataformas SaaS do zero, sob medida para o processo da sua empresa, com arquitetura preparada para crescer junto com o negócio.',
  },
  {
    q: 'É possível integrar sistemas que a empresa já utiliza?',
    a: 'Sim. No diagnóstico mapeamos as ferramentas que você já usa e avaliamos as integrações e automações viáveis para conectar dados e reduzir trabalho manual.',
  },
  {
    q: 'Vocês também cuidam da infraestrutura e da hospedagem?',
    a: 'Sim. Configuramos e gerenciamos ambientes em nuvem, servidores, VPS com backups automáticos e e-mail corporativo com domínio próprio — do servidor ao software.',
  },
  {
    q: 'Como funciona a manutenção depois da entrega?',
    a: 'Oferecemos acompanhamento contínuo, atualizações proativas e escalonamento sob demanda. Os níveis de atendimento são definidos em conjunto com cada cliente.',
  },
  {
    q: 'Como solicitar um orçamento?',
    a: 'Fale com a gente pelo WhatsApp, telefone, e-mail ou Instagram contando o seu cenário. A partir disso, agendamos o diagnóstico e indicamos o melhor caminho para o seu projeto.',
  },
]

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-intro">
          <p className="section-label reveal">Dúvidas frequentes</p>
          <h2 className="section-title reveal reveal-delay-1" id="faq-title">
            Perguntas
            <br />
            <span className="text-orange">Frequentes</span>
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            Não encontrou sua dúvida? Fale direto com quem vai cuidar do seu projeto.
          </p>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass"
          >
            Tirar uma dúvida
            <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
          </a>
        </div>

        <div className="faq-list">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="faq-item reveal">
              <summary>
                <span className="faq-question">{q}</span>
                <span className="faq-icon" aria-hidden="true"></span>
              </summary>
              <p className="faq-answer">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
