import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render } from '@testing-library/react'
import { useRef } from 'react'
import { useCanvasAnimation } from './useCanvasAnimation.js'
import { intersectionObservers, setMedia } from '../test/setup.js'

// requestAnimationFrame manual: permite contar loops pendentes.
let pending
let nextId
const fakeCtx = { setTransform: vi.fn() }
const scene = { resize: vi.fn(), draw: vi.fn() }
const createScene = () => scene

function TestCanvas() {
  const ref = useRef(null)
  useCanvasAnimation(ref, createScene)
  return <canvas ref={ref} />
}

const runFrame = () => {
  const callbacks = [...pending.values()]
  pending.clear()
  callbacks.forEach((cb) => cb())
}

const setCores = (n) =>
  Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: n })

const setHidden = (hidden) => {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden })
  document.dispatchEvent(new Event('visibilitychange'))
}

describe('useCanvasAnimation', () => {
  beforeEach(() => {
    pending = new Map()
    nextId = 1
    vi.stubGlobal('requestAnimationFrame', (cb) => {
      const id = nextId++
      pending.set(id, cb)
      return id
    })
    vi.stubGlobal('cancelAnimationFrame', (id) => pending.delete(id))
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(fakeCtx)
    Object.defineProperty(HTMLCanvasElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 300,
    })
    Object.defineProperty(HTMLCanvasElement.prototype, 'clientHeight', {
      configurable: true,
      get: () => 150,
    })
    vi.stubGlobal('devicePixelRatio', 3)
    setCores(8)
    scene.resize.mockClear()
    scene.draw.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    setHidden(false)
  })

  it('dimensiona o buffer pelo DPR, limitado a 2', () => {
    const { container } = render(<TestCanvas />)
    const canvas = container.querySelector('canvas')
    expect(canvas.width).toBe(600)
    expect(canvas.height).toBe(300)
    expect(fakeCtx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0)
    expect(scene.resize).toHaveBeenCalledWith(300, 150)
  })

  it('em aparelhos modestos limita o DPR a 1,5 e avisa a cena', () => {
    setCores(4)
    const create = vi.fn(() => scene)
    function LowPowerCanvas() {
      const ref = useRef(null)
      useCanvasAnimation(ref, create)
      return <canvas ref={ref} />
    }
    const { container } = render(<LowPowerCanvas />)
    expect(container.querySelector('canvas').width).toBe(450)
    expect(create).toHaveBeenCalledWith(fakeCtx, { lowPower: true })
  })

  it('vários canvas compartilham um único requestAnimationFrame', () => {
    render(
      <>
        <TestCanvas />
        <TestCanvas />
        <TestCanvas />
      </>,
    )
    expect(pending.size).toBe(1)
    runFrame()
    expect(scene.draw).toHaveBeenCalledTimes(3 + 3) // 3 quadros iniciais (resize) + 3 do laço
    expect(pending.size).toBe(1)
  })

  it('mantém um único loop mesmo com eventos repetidos', () => {
    render(<TestCanvas />)
    expect(pending.size).toBe(1)

    setHidden(false)
    setHidden(false)
    expect(pending.size).toBe(1)

    runFrame()
    expect(scene.draw).toHaveBeenCalled()
    expect(pending.size).toBe(1)
  })

  it('pausa com a aba oculta e retoma ao voltar', () => {
    render(<TestCanvas />)
    setHidden(true)
    expect(pending.size).toBe(0)
    setHidden(false)
    expect(pending.size).toBe(1)
  })

  it('pausa fora da viewport', () => {
    render(<TestCanvas />)
    act(() => [...intersectionObservers].forEach((io) => io.trigger(false)))
    expect(pending.size).toBe(0)
    act(() => [...intersectionObservers].forEach((io) => io.trigger(true)))
    expect(pending.size).toBe(1)
  })

  it('com movimento reduzido desenha um quadro estático, sem loop', () => {
    setMedia('(prefers-reduced-motion: reduce)', true)
    render(<TestCanvas />)
    expect(scene.draw).toHaveBeenCalledTimes(1)
    expect(pending.size).toBe(0)
  })

  it('cancela o loop e os listeners ao desmontar', () => {
    const { unmount } = render(<TestCanvas />)
    unmount()
    expect(pending.size).toBe(0)
    setHidden(false)
    expect(pending.size).toBe(0)
  })
})
