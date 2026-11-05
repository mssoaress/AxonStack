import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Faq from './Faq.jsx'

describe('Faq', () => {
  it('lista as perguntas fechadas por padrão', () => {
    const { container } = render(<Faq />)
    const items = container.querySelectorAll('details')
    expect(items.length).toBeGreaterThanOrEqual(5)
    items.forEach((d) => expect(d).not.toHaveAttribute('open'))
  })

  it('abre a resposta ao clicar na pergunta (disclosure nativo)', async () => {
    const user = userEvent.setup()
    const { container } = render(<Faq />)
    const first = container.querySelector('details')
    await user.click(screen.getByText('Como funciona o desenvolvimento de um projeto?'))
    expect(first).toHaveAttribute('open')
  })

  it('oferece um contato direto pelo WhatsApp', () => {
    render(<Faq />)
    expect(screen.getByRole('link', { name: /tirar uma dúvida/i }).getAttribute('href')).toMatch(
      /^https:\/\/wa\.me\//,
    )
  })
})
