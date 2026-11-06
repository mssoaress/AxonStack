import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuoteForm from './QuoteForm.jsx'
import { buildQuoteMessage, quoteHref } from '../lib/quote.js'

async function fillRequired(user) {
  await user.type(screen.getByLabelText(/^nome/i), 'Ana Souza')
  await user.selectOptions(screen.getByLabelText(/tipo de solução/i), 'Cloud Computing')
  await user.type(
    screen.getByLabelText(/descrição do projeto/i),
    'Migrar o sistema atual para a nuvem.',
  )
}

describe('QuoteForm', () => {
  let open
  beforeEach(() => {
    open = vi.spyOn(window, 'open').mockReturnValue(null)
  })
  afterEach(() => open.mockRestore())

  it('tem rótulos visíveis e marca os campos obrigatórios', () => {
    render(<QuoteForm />)
    expect(screen.getByLabelText(/^nome/i)).toBeRequired()
    expect(screen.getByLabelText(/^empresa/i)).not.toBeRequired()
    expect(screen.getByLabelText(/^e-mail/i)).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText(/^whatsapp/i)).toHaveAttribute('type', 'tel')
    expect(screen.getByLabelText(/tipo de solução/i)).toBeRequired()
    expect(screen.getByLabelText(/descrição do projeto/i)).toBeRequired()
  })

  it('formulário vazio é inválido (validação nativa impede o envio)', () => {
    const { container } = render(<QuoteForm />)
    expect(container.querySelector('form').checkValidity()).toBe(false)
  })

  it('abre o WhatsApp em nova aba com a mensagem montada', async () => {
    const user = userEvent.setup()
    render(<QuoteForm />)
    await fillRequired(user)
    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))

    expect(open).toHaveBeenCalledTimes(1)
    const [href, target] = open.mock.calls[0]
    expect(target).toBe('_blank')
    expect(href).toMatch(/^https:\/\/wa\.me\/5521994291884\?text=/)
    const text = decodeURIComponent(href.split('text=')[1])
    expect(text).toContain('Nome: Ana Souza')
    expect(text).toContain('Solução: Cloud Computing')
    expect(text).toContain('Migrar o sistema atual para a nuvem.')
  })

  it('abre o e-mail com assunto e corpo preenchidos', async () => {
    const user = userEvent.setup()
    render(<QuoteForm />)
    await fillRequired(user)
    await user.click(screen.getByRole('button', { name: /enviar por e-mail/i }))

    const [href, target] = open.mock.calls[0]
    expect(target).toBe('_self')
    expect(href).toMatch(/^mailto:contato@axonstack\.dev\?subject=/)
    expect(decodeURIComponent(href)).toContain('Pedido de orçamento — Cloud Computing')
  })

  it('nunca afirma que a mensagem foi enviada — orienta a concluir no aplicativo', async () => {
    const user = userEvent.setup()
    render(<QuoteForm />)
    await fillRequired(user)
    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent(/confirme o envio no aplicativo/i)
    expect(status).not.toHaveTextContent(/enviad[ao] com sucesso/i)
    // Alternativa caso a nova aba tenha sido bloqueada
    expect(screen.getByRole('link', { name: /abrir o whatsapp novamente/i })).toHaveAttribute(
      'href',
      open.mock.calls[0][0],
    )
  })
})

describe('buildQuoteMessage', () => {
  it('omite campos opcionais vazios e remove espaços extras', () => {
    const text = buildQuoteMessage({
      nome: '  Ana ',
      empresa: '',
      email: 'ana@exemplo.com',
      whatsapp: ' ',
      solucao: 'VPS e Hospedagem',
      descricao: 'Hospedar o site.',
    })
    expect(text).toContain('Nome: Ana\n')
    expect(text).toContain('E-mail: ana@exemplo.com')
    expect(text).not.toContain('Empresa:')
    expect(text).not.toContain('WhatsApp:')
  })

  it('gera links válidos para os dois canais', () => {
    const fields = { nome: 'Ana', solucao: 'SaaS', descricao: 'Ideia & integração' }
    expect(quoteHref('whatsapp', fields)).toMatch(/^https:\/\/wa\.me\//)
    expect(quoteHref('email', fields)).toContain('%26')
  })
})
