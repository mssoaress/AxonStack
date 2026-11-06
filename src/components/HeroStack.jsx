import { STACK_LAYERS } from '../content/stack.js'

// Diagrama da "stack" Axon: camadas isométricas atravessadas por um feixe de dados.
// A parte gráfica é decorativa (aria-hidden); a legenda é uma lista ordenada real.
export default function HeroStack() {
  return (
    <figure className="hero-stack" aria-labelledby="hero-stack-caption">
      <div className="stack-visual" aria-hidden="true">
        {STACK_LAYERS.map(({ id }, i) => (
          <div key={id} className={`stack-plane stack-plane--${i + 1}`}>
            <span className="stack-plane-face"></span>
          </div>
        ))}
        <span className="stack-beam">
          <span className="stack-pulse"></span>
        </span>
        {STACK_LAYERS.map(({ id }, i) => (
          <span key={id} className={`stack-node stack-node--${i + 1}`}></span>
        ))}
      </div>

      <ol className="stack-legend">
        {STACK_LAYERS.map(({ id, name, detail }) => (
          <li key={id} className="stack-row">
            <span className="index" aria-hidden="true">
              {id}
            </span>
            <span className="stack-row-text">
              <strong>{name}</strong>
              <span>{detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="stack-caption" id="hero-stack-caption">
        <span className="status-dot" aria-hidden="true"></span>
        Uma arquitetura integrada, do servidor ao software
      </figcaption>
    </figure>
  )
}
