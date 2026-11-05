// Estrutura pronta para publicar projetos reais. Enquanto a lista estiver vazia, a seção
// não é renderizada (nada fictício vai ao ar).
//
// Para publicar, adicione objetos com dados reais e autorizados pelo cliente:
// {
//   title: 'Nome do projeto',
//   client: 'Cliente (com autorização)',
//   category: 'Software' | 'Infraestrutura',
//   summary: 'Problema, solução e resultado — apenas fatos verificáveis.',
//   image: { src: '/img/cases/projeto.webp', width: 1200, height: 750, alt: 'Descrição' },
//   href: 'https://…'            // opcional
// }
export const CASES = []

export default function Cases({ items = CASES }) {
  if (!items.length) return null

  return (
    <section id="projetos" aria-labelledby="projetos-title">
      <div className="container">
        <div className="section-header">
          <p className="section-label reveal">Projetos</p>
          <h2 className="section-title reveal reveal-delay-1" id="projetos-title">
            Projetos Entregues
          </h2>
        </div>
        <ul className="cases-grid">
          {items.map(({ title, client, category, summary, image, href }) => (
            <li key={title} className="case-card glass reveal">
              {image && (
                <img
                  className="case-image"
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="case-body">
                <span className="service-tag">{category}</span>
                <h3 className="case-title">{title}</h3>
                {client && <p className="case-client">{client}</p>}
                <p className="case-summary">{summary}</p>
                {href && (
                  <a href={href} className="text-link" target="_blank" rel="noopener noreferrer">
                    Ver projeto<span className="sr-only">: {title} (abre em nova aba)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
