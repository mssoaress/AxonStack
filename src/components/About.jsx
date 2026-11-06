// Seção institucional. Fala de filosofia e forma de trabalho — sem números de equipe,
// clientes, localização ou histórico (não confirmados).
const PILLARS = [
  {
    title: 'Engenharia',
    text: 'Decisões técnicas guiadas pelo problema do negócio, não por modismos.',
  },
  {
    title: 'Arquitetura',
    text: 'Estruturas pensadas para crescer e serem mantidas com segurança.',
  },
  {
    title: 'Integração',
    text: 'Software e infraestrutura projetados juntos, sem lacunas entre as camadas.',
  },
  {
    title: 'Confiabilidade',
    text: 'Ambientes monitorados e boas práticas de segurança em cada entrega.',
  },
  {
    title: 'Evolução contínua',
    text: 'Acompanhamento depois da entrega, para a solução evoluir com a empresa.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="section about" aria-labelledby="sobre-title">
      <div className="container">
        <p className="eyebrow reveal">
          <span className="eyebrow-index" aria-hidden="true">
            02
          </span>
          <span className="eyebrow-line" aria-hidden="true"></span>
          Sobre a Axon Stack
        </p>

        <div className="about-intro">
          <h2 className="about-statement reveal reveal-delay-1" id="sobre-title">
            Conectamos software, infraestrutura e tecnologia para construir{' '}
            <span className="text-gradient">soluções digitais completas.</span>
          </h2>
          <div className="about-copy reveal reveal-delay-2">
            <p>
              Em vez de peças isoladas, cada projeto nasce com a arquitetura pensada de ponta a
              ponta — do servidor que sustenta a operação ao sistema que a sua equipe usa todos os
              dias.
            </p>
            <p>
              Quem desenvolve também entende onde a solução vai rodar. O resultado é tecnologia
              coerente, mais simples de manter e pronta para evoluir.
            </p>
          </div>
        </div>

        <ol className="about-pillars">
          {PILLARS.map(({ title, text }, i) => (
            <li key={title} className={`about-pillar reveal reveal-delay-${i + 1}`}>
              <span className="index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
