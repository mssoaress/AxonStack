import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from './Projects.jsx'
import { PROJECTS } from '../content/projects.js'

const SAMPLE = [
  {
    name: 'Projeto A',
    category: 'Sistema SaaS',
    description: 'Descrição A.',
    problem: 'Problema A.',
    solution: 'Solução A.',
    technologies: ['React', 'Node.js'],
    image: { src: '/a.webp', width: 1600, height: 1000, alt: 'Tela do projeto A' },
    url: 'https://exemplo.com',
  },
  { name: 'Projeto B', category: 'Site', description: 'Descrição B.' },
]

describe('Projects', () => {
  it('não publica nada enquanto não houver projetos reais', () => {
    expect(PROJECTS).toEqual([])
    const { container } = render(<Projects />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renderiza a estrutura editorial quando recebe projetos', () => {
    const { container } = render(<Projects items={SAMPLE} />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Projetos entregues' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'Projeto A',
      'Projeto B',
    ])
    expect(container.querySelector('.project-card')).toHaveClass('is-featured')
    expect(screen.getByRole('img', { name: 'Tela do projeto A' })).toHaveAttribute(
      'loading',
      'lazy',
    )
    expect(screen.getByText('Problema A.')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Tecnologias utilizadas' })).toHaveTextContent('React')
    expect(screen.getByRole('link', { name: /ver projeto: projeto a/i })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    )
  })

  it('campos opcionais ausentes não geram blocos vazios', () => {
    const { container } = render(<Projects items={[SAMPLE[1]]} />)
    expect(container.querySelector('.project-facts')).toBeNull()
    expect(container.querySelector('.project-tech')).toBeNull()
    expect(container.querySelector('img')).toBeNull()
  })
})
