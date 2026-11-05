import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Cases, { CASES } from './Cases.jsx'

describe('Cases', () => {
  it('não publica nada enquanto não houver cases reais', () => {
    expect(CASES).toEqual([])
    const { container } = render(<Cases />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renderiza a estrutura quando recebe projetos', () => {
    render(
      <Cases
        items={[
          {
            title: 'Projeto X',
            category: 'Software',
            summary: 'Resumo.',
            image: { src: '/x.webp', width: 1200, height: 750, alt: 'Tela do projeto X' },
          },
        ]}
      />,
    )
    expect(
      screen.getByRole('heading', { level: 2, name: 'Projetos Entregues' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Projeto X' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Tela do projeto X' })).toHaveAttribute(
      'loading',
      'lazy',
    )
  })
})
