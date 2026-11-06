import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Services from './Services.jsx'

const pointer = (el, pointerType) =>
  fireEvent(
    el,
    Object.assign(new Event('pointermove', { bubbles: true }), {
      pointerType,
      clientX: 30,
      clientY: 40,
    }),
  )

describe('Services', () => {
  it('apresenta os 6 serviços com categoria', () => {
    render(<Services />)
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles).toHaveLength(6)
    expect(titles).toContain('Sistemas, SaaS e Integrações')
    expect(screen.getAllByText('Software')).toHaveLength(2)
    expect(screen.getAllByText('Infraestrutura')).toHaveLength(4)
  })

  it('cada card lista benefícios e um CTA contextual', () => {
    render(<Services />)
    const lists = screen.getAllByRole('list', { name: /^benefícios/i })
    expect(lists).toHaveLength(6)
    lists.forEach((list) => expect(list.querySelectorAll('li').length).toBeGreaterThanOrEqual(3))
    const ctas = screen.getAllByRole('link', { name: /conversar sobre este serviço/i })
    expect(ctas).toHaveLength(6)
    expect(decodeURIComponent(ctas[2].getAttribute('href'))).toContain('Cloud Computing')
  })

  it('o brilho do card acompanha o mouse', () => {
    render(<Services />)
    const card = screen.getByText('Cloud Computing').closest('.service-card')
    pointer(card, 'mouse')
    expect(card.style.getPropertyValue('--spot-x')).toMatch(/px$/)
  })

  it('ignora toque (sem efeito de hover em telas touch)', () => {
    render(<Services />)
    const card = screen.getByText('Cloud Computing').closest('.service-card')
    pointer(card, 'touch')
    expect(card.style.getPropertyValue('--spot-x')).toBe('')
  })
})
