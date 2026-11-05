import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import CustomCursor from './CustomCursor.jsx'
import { setMedia } from '../test/setup.js'

const FINE = '(hover: hover) and (pointer: fine)'
const move = (pointerType = 'mouse') =>
  fireEvent(
    window,
    Object.assign(new Event('pointermove'), { clientX: 10, clientY: 20, pointerType }),
  )
const active = () => document.documentElement.classList.contains('has-custom-cursor')

describe('CustomCursor', () => {
  it('não ativa em dispositivos touch', () => {
    setMedia(FINE, false)
    render(<CustomCursor />)
    move()
    expect(active()).toBe(false)
  })

  it('ativa com mouse após o primeiro movimento', () => {
    setMedia(FINE, true)
    render(<CustomCursor />)
    expect(active()).toBe(false)
    move()
    expect(active()).toBe(true)
  })

  it('ignora toques em telas híbridas', () => {
    setMedia(FINE, true)
    render(<CustomCursor />)
    move('touch')
    expect(active()).toBe(false)
  })

  it('remove listeners e classe ao desmontar', () => {
    setMedia(FINE, true)
    const { unmount } = render(<CustomCursor />)
    move()
    unmount()
    expect(active()).toBe(false)
    move()
    expect(active()).toBe(false)
  })

  it('desativa se o ponteiro deixar de ser fino', () => {
    setMedia(FINE, true)
    render(<CustomCursor />)
    move()
    setMedia(FINE, false)
    expect(active()).toBe(false)
  })
})
