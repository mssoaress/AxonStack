// Cabeçalho padrão das seções: rótulo numerado, título (h2) e texto de apoio.
// `split` alinha título e texto lado a lado em telas grandes.
export default function SectionHeader({ index, label, title, titleId, lead, split = false }) {
  return (
    <div className={`section-head${split ? ' section-head--split' : ''}`}>
      <p className="eyebrow reveal">
        {index && (
          <span className="eyebrow-index" aria-hidden="true">
            {index}
          </span>
        )}
        <span className="eyebrow-line" aria-hidden="true"></span>
        {label}
      </p>
      <h2 className="section-title reveal reveal-delay-1" id={titleId}>
        {title}
      </h2>
      {lead && <p className="section-lead reveal reveal-delay-2">{lead}</p>}
    </div>
  )
}
