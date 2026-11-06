import DiffCanvas from './DiffCanvas.jsx'
import SectionHeader from './SectionHeader.jsx'
import { FeatureIcon } from './Icons.jsx'
import { DIFFERENTIALS } from '../content/differentials.js'

function Cell({ item, index }) {
  return (
    <li className={`diff-cell reveal reveal-delay-${(index % 3) + 1}`}>
      <span className="icon-tile">
        <FeatureIcon name={item.icon} />
      </span>
      <h3 className="diff-title">{item.title}</h3>
      <p className="diff-text">{item.text}</p>
    </li>
  )
}

export default function Diferenciais() {
  const top = DIFFERENTIALS.slice(0, 3)
  const bottom = DIFFERENTIALS.slice(3)

  return (
    <section id="diferenciais" className="section diff" aria-labelledby="diferenciais-title">
      <div className="container">
        <SectionHeader
          index="04"
          label="Diferenciais"
          titleId="diferenciais-title"
          title={
            <>
              Um núcleo técnico, <span className="text-gradient">seis compromissos.</span>
            </>
          }
          lead="O que muda quando software e infraestrutura são pensados pela mesma equipe, com o mesmo cuidado de engenharia."
          split
        />

        <div className="diff-board">
          <ul className="diff-row">
            {top.map((item, i) => (
              <Cell key={item.title} item={item} index={i} />
            ))}
          </ul>

          {/* Núcleo: conecta visualmente os seis diferenciais (decorativo) */}
          <div className="diff-hub" aria-hidden="true">
            <svg className="diff-links" viewBox="0 0 600 100" preserveAspectRatio="none">
              {[100, 300, 500].map((x) => (
                <g key={x}>
                  <line x1="300" y1="50" x2={x} y2="0" />
                  <line x1="300" y1="50" x2={x} y2="100" />
                </g>
              ))}
            </svg>
            <div className="diff-core">
              <DiffCanvas />
            </div>
          </div>

          <ul className="diff-row">
            {bottom.map((item, i) => (
              <Cell key={item.title} item={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
