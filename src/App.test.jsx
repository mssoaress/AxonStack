import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('tem um único H1 e um H2 por seção principal', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const h2 = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(h2).toEqual([
      'Nossos Serviços',
      'Nosso Processo',
      'NossosDiferenciais',
      'PerguntasFrequentes',
      'Vamos construir a tecnologia que o seu negócio precisa.',
    ])
  })

  it('não pula níveis de título (H2 → H3)', () => {
    render(<App />)
    const levels = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) =>
      Number(h.tagName[1]),
    )
    levels.reduce((prev, level) => {
      expect(level - prev).toBeLessThanOrEqual(1)
      return level
    })
  })

  it('tem landmark principal e link para pular navegação', () => {
    render(<App />)
    expect(screen.getByRole('main')).toHaveAttribute('id', 'conteudo')
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute(
      'href',
      '#conteudo',
    )
  })

  it('todas as âncoras internas apontam para seções existentes', () => {
    const { container } = render(<App />)
    const anchors = [...container.querySelectorAll('a[href^="#"]')].map((a) =>
      a.getAttribute('href'),
    )
    for (const href of new Set(anchors)) {
      expect(document.querySelector(href), href).not.toBeNull()
    }
  })

  it('links externos abrem em nova aba com rel seguro', () => {
    const { container } = render(<App />)
    for (const a of container.querySelectorAll('a[target="_blank"]')) {
      expect(a.getAttribute('rel')).toContain('noopener')
      expect(a.getAttribute('rel')).toContain('noreferrer')
    }
  })

  it('mantém os contatos corretos no CTA final', () => {
    render(<App />)
    const cta = within(document.getElementById('cta-final'))
    expect(cta.getByRole('link', { name: /whatsapp/i }).getAttribute('href')).toMatch(
      /^https:\/\/wa\.me\/5521994291884\?text=Ol%C3%A1!/,
    )
    expect(cta.getByRole('link', { name: /ligar/i })).toHaveAttribute('href', 'tel:+5521994291884')
    expect(cta.getByRole('link', { name: /e-mail/i })).toHaveAttribute(
      'href',
      'mailto:contato@axonstack.dev',
    )
    expect(cta.getByRole('link', { name: /instagram/i })).toHaveAttribute(
      'href',
      'https://instagram.com/axonstack.dev',
    )
  })

  it('exibe o ano atual no rodapé', () => {
    render(<App />)
    expect(screen.getByText(`© ${new Date().getFullYear()} Axon Stack.`)).toBeInTheDocument()
  })

  it('não apresenta empresas não confirmadas como clientes', () => {
    render(<App />)
    for (const name of ['TechNova', 'Infracore', 'Vortex Digital', 'SkyBridge', 'Nexify']) {
      expect(screen.queryByText(new RegExp(name, 'i'))).toBeNull()
    }
    const strip = screen.getByRole('region', { name: 'Áreas de atuação' })
    // A cópia usada no loop visual fica oculta para leitores de tela.
    expect(within(strip).getAllByRole('listitem')).toHaveLength(8)
  })

  it('imagens têm dimensões explícitas', () => {
    const { container } = render(<App />)
    for (const img of container.querySelectorAll('img')) {
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
      expect(img).toHaveAttribute('alt')
    }
  })

  it('CTA principal do hero leva ao WhatsApp com mensagem pronta', () => {
    render(<App />)
    const hero = within(document.getElementById('hero'))
    const cta = hero.getByRole('link', { name: /solicitar orçamento/i })
    expect(cta.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/5521994291884\?text=/)
    expect(cta).toHaveClass('btn-primary')
  })

  it('não renderiza a seção de projetos sem cases reais', () => {
    render(<App />)
    expect(document.getElementById('projetos')).toBeNull()
  })
})
