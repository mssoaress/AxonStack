import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render } from '@testing-library/react'
import Hero from './Hero.jsx'
import { setMedia } from '../test/setup.js'

const REDUCED = '(prefers-reduced-motion: reduce)'

describe('Hero — parallax', () => {
  let frames
  beforeEach(() => {
    frames = []
    vi.stubGlobal('requestAnimationFrame', (cb) => frames.push(cb))
    vi.stubGlobal('cancelAnimationFrame', () => {})
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
  })

  const scrollTo = (y) => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: y })
    window.dispatchEvent(new Event('scroll'))
    act(() => frames.splice(0).forEach((cb) => cb()))
  }

  it('desloca e esmaece o conteúdo ao rolar (uma escrita por quadro)', () => {
    const { container } = render(<Hero />)
    const content = container.querySelector('.hero-content')
    scrollTo(200)
    expect(content.style.transform).toBe('translateY(44px)')
    expect(Number(content.style.opacity)).toBeCloseTo(1 - 200 / 600)
  })

  it('não aplica parallax com prefers-reduced-motion', () => {
    setMedia(REDUCED, true)
    const { container } = render(<Hero />)
    const content = container.querySelector('.hero-content')
    scrollTo(200)
    expect(content.style.transform).toBe('')
    expect(content.style.opacity).toBe('')
  })

  it('desliga o parallax se a preferência mudar com a página aberta', () => {
    const { container } = render(<Hero />)
    const content = container.querySelector('.hero-content')
    scrollTo(200)
    act(() => setMedia(REDUCED, true))
    expect(content.style.transform).toBe('')
    scrollTo(300)
    expect(content.style.transform).toBe('')
  })
})
