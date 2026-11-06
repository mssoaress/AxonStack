import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Faq from './Faq.jsx'

describe('Faq', () => {
  it('lista as perguntas fechadas por padrão', () => {
    const { container } = render(<Faq />)
    const items = container.querySelectorAll('details')
    expect(items).toHaveLength(8)
    items.forEach((d) => {
      expect(d).not.toHaveAttribute('open')
      // Mesmo grupo: navegadores compatíveis mantêm só uma resposta aberta
      expect(d).toHaveAttribute('name', 'faq')
    })
  })

  it('abre a resposta ao clicar na pergunta (disclosure nativo)', async () => {
    const user = userEvent.setup()
    const { container } = render(<Faq />)
    const first = container.querySelector('details')
    await user.click(screen.getByText('Como funciona o desenvolvimento de um projeto?'))
    expect(first).toHaveAttribute('open')
  })

  it('inclui as perguntas comerciais essenciais', () => {
    render(<Faq />)
    for (const q of [
      'A empresa atende pequenos negócios?',
      'É possível contratar somente hospedagem ou infraestrutura?',
      'Como solicitar um orçamento?',
    ]) {
      expect(screen.getByText(q)).toBeInTheDocument()
    }
  })

  it('oferece um contato direto pelo WhatsApp', () => {
    render(<Faq />)
    expect(screen.getByRole('link', { name: /tirar uma dúvida/i }).getAttribute('href')).toMatch(
      /^https:\/\/wa\.me\//,
    )
  })
})
