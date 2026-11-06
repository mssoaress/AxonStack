import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from './App.jsx'
import { SERVICES } from './content/services.js'

describe('App', () => {
  it('tem um único H1 e um H2 por seção principal', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const h2 = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(h2).toEqual([
      'Tecnologia completa, do servidor ao software.',
      'Conectamos software, infraestrutura e tecnologia para construir soluções digitais completas.',
      'Do diagnóstico ao suporte, sem lacunas.',
      'Um núcleo técnico, seis compromissos.',
      'Perguntas frequentes',
      'Seu próximo projeto começa com a arquitetura certa.',
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

  it('não há links vazios ou de mentira', () => {
    const { container } = render(<App />)
    for (const a of container.querySelectorAll('a')) {
      const href = a.getAttribute('href')
      expect(href, a.outerHTML).toBeTruthy()
      expect(href).not.toBe('#')
      expect(href).not.toMatch(/^javascript:/i)
    }
  })

  it('mantém os contatos corretos na seção de contato', () => {
    render(<App />)
    const contact = within(document.getElementById('contato'))
    expect(contact.getByRole('link', { name: /whatsapp/i }).getAttribute('href')).toMatch(
      /^https:\/\/wa\.me\/5521994291884\?text=Ol%C3%A1!/,
    )
    expect(contact.getByRole('link', { name: /ligar/i })).toHaveAttribute(
      'href',
      'tel:+5521994291884',
    )
    expect(contact.getByRole('link', { name: /e-mail/i })).toHaveAttribute(
      'href',
      'mailto:contato@axonstack.dev',
    )
    expect(contact.getByRole('link', { name: /instagram/i })).toHaveAttribute(
      'href',
      'https://instagram.com/axonstack.dev',
    )
  })

  it('exibe o ano atual no rodapé', () => {
    render(<App />)
    expect(
      screen.getByText(`© ${new Date().getFullYear()} Axon Stack. Todos os direitos reservados.`),
    ).toBeInTheDocument()
  })

  it('não apresenta empresas não confirmadas como clientes', () => {
    render(<App />)
    for (const name of ['TechNova', 'Infracore', 'Vortex Digital', 'SkyBridge', 'Nexify']) {
      expect(screen.queryByText(new RegExp(name, 'i'))).toBeNull()
    }
  })

  it('a faixa de especialidades é lida uma única vez por leitores de tela', () => {
    render(<App />)
    const list = screen.getByRole('list', { name: 'Especialidades' })
    expect(within(list).getAllByRole('listitem')).toHaveLength(7)
    expect(document.querySelector('.marquee-track')).toHaveAttribute('aria-hidden', 'true')
  })

  it('imagens têm dimensões explícitas', () => {
    const { container } = render(<App />)
    for (const img of container.querySelectorAll('img')) {
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
      expect(img).toHaveAttribute('alt')
    }
  })

  it('CTA principal do hero leva ao WhatsApp com mensagem de orçamento', () => {
    render(<App />)
    const hero = within(document.getElementById('hero'))
    const cta = hero.getByRole('link', { name: /solicitar orçamento/i })
    expect(cta.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/5521994291884\?text=/)
    expect(decodeURIComponent(cta.getAttribute('href'))).toContain('solicitar um orçamento')
    expect(cta).toHaveClass('btn-primary')
    expect(hero.getByRole('link', { name: 'Explorar soluções' })).toHaveAttribute(
      'href',
      '#servicos',
    )
  })

  it('cada serviço tem um CTA contextual com o nome do serviço na mensagem', () => {
    render(<App />)
    for (const { id, title } of SERVICES) {
      const card = within(document.getElementById(`servico-${id}`))
      const link = card.getByRole('link', { name: /conversar sobre este serviço/i })
      expect(decodeURIComponent(link.getAttribute('href'))).toContain(title)
    }
  })

  it('não renderiza a seção nem o link de projetos sem projetos reais', () => {
    render(<App />)
    expect(document.getElementById('projetos')).toBeNull()
    expect(screen.queryByRole('link', { name: 'Projetos' })).toBeNull()
  })
})
