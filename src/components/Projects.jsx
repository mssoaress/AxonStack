import SectionHeader from './SectionHeader.jsx'
import { ArrowUpRightIcon } from './Icons.jsx'
import { PROJECTS } from '../content/projects.js'

// Portfólio editorial: o primeiro projeto ganha destaque; os demais alternam proporções.
// Sem projetos reais cadastrados, a seção não é renderizada (nada fictício vai ao ar).
export default function Projects({ items = PROJECTS }) {
  if (!items.length) return null

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <div className="container">
        <SectionHeader
          label="Projetos"
          titleId="projetos-title"
          title="Projetos entregues"
          lead="Uma seleção de trabalhos publicados com autorização dos clientes."
          split
        />

        <ul className="projects-grid">
          {items.map((project, i) => (
            <ProjectCard key={project.name} project={project} featured={i === 0} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProjectCard({ project, featured }) {
  const { name, category, description, problem, solution, technologies, image, url } = project

  return (
    <li className={`project-card card card--interactive reveal${featured ? ' is-featured' : ''}`}>
      {image && (
        <div className="project-media">
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="project-body">
        <span className="badge badge--accent">{category}</span>
        <h3 className="project-title">{name}</h3>
        <p className="project-desc">{description}</p>

        {(problem || solution) && (
          <dl className="project-facts">
            {problem && (
              <div>
                <dt>Problema</dt>
                <dd>{problem}</dd>
              </div>
            )}
            {solution && (
              <div>
                <dt>Solução</dt>
                <dd>{solution}</dd>
              </div>
            )}
          </dl>
        )}

        {technologies?.length > 0 && (
          <ul className="project-tech" aria-label="Tecnologias utilizadas">
            {technologies.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {url && (
          <a
            href={url}
            className="text-link text-link--accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver projeto<span className="sr-only">: {name} (abre em nova aba)</span>
            <ArrowUpRightIcon />
          </a>
        )}
      </div>
    </li>
  )
}
