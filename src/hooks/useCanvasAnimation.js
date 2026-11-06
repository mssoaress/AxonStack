import { useEffect } from 'react'
import { subscribeFrame } from '../lib/frameLoop.js'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// Dispositivos modestos (poucos núcleos/pouca memória) recebem cenas mais leves e DPR menor.
function detectLowPower() {
  if (typeof navigator === 'undefined') return false
  const cores = navigator.hardwareConcurrency || 8
  const memory = navigator.deviceMemory || 8
  return cores <= 4 || memory <= 4
}

// Economia de dados ativa: só um quadro estático, como no movimento reduzido.
const prefersSaveData = () =>
  typeof navigator !== 'undefined' && Boolean(navigator.connection?.saveData)

/**
 * Gerencia o ciclo de vida de uma animação em <canvas>:
 *
 * - dimensiona o buffer pelo tamanho CSS × devicePixelRatio (limitado por `maxDpr`,
 *   e a 1,5 em dispositivos modestos);
 * - todos os canvas compartilham um único laço de requestAnimationFrame (lib/frameLoop);
 * - pausa quando o canvas sai da viewport (IntersectionObserver) ou a aba fica oculta
 *   (Page Visibility API) e retoma ao voltar;
 * - com `prefers-reduced-motion: reduce` ou economia de dados, desenha só um quadro estático;
 * - remove listeners e observadores ao desmontar.
 *
 * `createScene(ctx, { lowPower })` deve retornar `{ resize(width, height), draw(frame) }`,
 * em que width/height são dimensões CSS (o contexto já vem escalado pelo DPR).
 */
export function useCanvasAnimation(canvasRef, createScene, { maxDpr = 2 } = {}) {
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const lowPower = detectLowPower()
    const dprCap = lowPower ? Math.min(maxDpr, 1.5) : maxDpr
    const scene = createScene(ctx, { lowPower })
    const motionQuery = window.matchMedia?.(REDUCED_MOTION_QUERY)
    const saveData = prefersSaveData()

    let width = 0
    let height = 0
    let frame = 0
    let unsubscribe = null
    let inView = true
    let pageVisible = !document.hidden
    let reducedMotion = Boolean(motionQuery?.matches)

    const render = () => {
      if (width && height) scene.draw(frame)
    }

    const shouldRun = () => inView && pageVisible && !reducedMotion && !saveData && width > 0

    const onFrame = () => {
      render()
      frame++
    }

    const start = () => {
      if (!unsubscribe) unsubscribe = subscribeFrame(onFrame)
    }

    const stop = () => {
      unsubscribe?.()
      unsubscribe = null
    }

    const update = () => (shouldRun() ? start() : stop())

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
      const bufferW = Math.round(w * dpr)
      const bufferH = Math.round(h * dpr)
      if (w === width && h === height && canvas.width === bufferW && canvas.height === bufferH) {
        return
      }
      width = w
      height = h
      canvas.width = bufferW
      canvas.height = bufferH
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scene.resize(width, height)
      // Redimensionar o buffer apaga o canvas: redesenha já, mesmo com o loop pausado.
      render()
      update()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[entries.length - 1].isIntersecting
        update()
      },
      { rootMargin: '100px' },
    )
    intersectionObserver.observe(canvas)

    const onVisibilityChange = () => {
      pageVisible = !document.hidden
      update()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const onMotionChange = (e) => {
      reducedMotion = e.matches
      render()
      update()
    }
    motionQuery?.addEventListener?.('change', onMotionChange)

    resize()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionQuery?.removeEventListener?.('change', onMotionChange)
    }
    // createScene é definido no módulo de cada canvas (referência estável).
  }, [canvasRef, createScene, maxDpr])
}
