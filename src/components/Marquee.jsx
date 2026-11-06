// Faixa contínua com as especialidades da Axon Stack.
// Acessibilidade: leitores de tela recebem a lista uma única vez (oculta visualmente);
// a faixa animada é puramente decorativa. Pausa no hover; parada com movimento reduzido.
export const SPECIALTIES = [
  'Software Engineering',
  'Web Development',
  'SaaS',
  'Cloud Computing',
  'Server Infrastructure',
  'Automation',
  'Digital Solutions',
]

// Duas metades idênticas: a animação desloca -50% e o laço fica contínuo.
// Uma metade (~2.700px no tamanho máximo da fonte) já cobre telas ultrawide.
function Half() {
  return (
    <div className="marquee-group">
      {SPECIALTIES.map((label) => (
        <span key={label} className="marquee-item">
          {label}
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee">
      <ul className="sr-only" aria-label="Especialidades">
        {SPECIALTIES.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <div className="marquee-track" aria-hidden="true">
        <Half />
        <Half />
      </div>
    </div>
  )
}
