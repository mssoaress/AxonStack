import SectionHeader from './SectionHeader.jsx'
import { PROCESS_STEPS } from '../content/process.js'

const DETAILS = [
  ['analyzed', 'O que analisamos'],
  ['delivered', 'O que entregamos'],
  ['benefit', 'Benefício para você'],
]

export default function Process() {
  return (
    <section id="processo" className="section process" aria-labelledby="processo-title">
      <div className="container process-layout">
        <div className="process-aside">
          <SectionHeader
            index="03"
            label="Processo"
            titleId="processo-title"
            title={
              <>
                Do diagnóstico ao suporte, <span className="text-gradient">sem lacunas.</span>
              </>
            }
            lead="Quatro etapas com comunicação transparente. Você sabe o que está sendo feito, por quê e o que vem a seguir."
          />
        </div>

        <ol className="process-steps">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.title} className="process-step reveal">
              <span className="process-marker" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="process-body card">
                <p className="process-kicker">Etapa {String(i + 1).padStart(2, '0')}</p>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-summary">{step.summary}</p>
                <dl className="process-details">
                  {DETAILS.map(([key, label]) => (
                    <div key={key} className={`process-detail process-detail--${key}`}>
                      <dt>{label}</dt>
                      <dd>{step[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
