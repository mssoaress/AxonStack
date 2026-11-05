// Faixa institucional com as áreas de atuação da Axon Stack.
// Antes exibia nomes de empresas sem confirmação de que eram clientes reais; foi
// substituída por conteúdo verificável (os próprios serviços e diferenciais do site).
const AREAS = [
  'Cloud Computing',
  'Infraestrutura',
  'VPS e Hospedagem',
  'E-mail Corporativo',
  'Desenvolvimento Web',
  'Sistemas SaaS',
  'Segurança',
  'Performance',
]

function Item({ label, index, clone = false }) {
  return (
    <li
      className={`client-logo${clone ? ' client-logo--clone' : ''}`}
      aria-hidden={clone || undefined}
    >
      {index % 2 === 1 && <span aria-hidden="true">▲ </span>}
      {label}
    </li>
  )
}

export default function ClientsStrip() {
  return (
    <div className="clients-strip" role="region" aria-label="Áreas de atuação">
      <ul className="clients-track">
        {AREAS.map((label, i) => (
          <Item key={label} label={label} index={i} />
        ))}
        {/* Cópia apenas visual para o loop contínuo da faixa. */}
        {AREAS.map((label, i) => (
          <Item key={`clone-${label}`} label={label} index={i} clone />
        ))}
      </ul>
    </div>
  )
}
