import { useEffect } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Gerencia o ciclo de vida de uma animação em <canvas>:
 *
 * - dimensiona o buffer pelo tamanho CSS × devicePixelRatio (limitado por `maxDpr`);
 * - garante um único loop de requestAnimationFrame por canvas;
 * - pausa quando o canvas sai da viewport (IntersectionObserver) ou a aba fica oculta
 *   (Page Visibility API) e retoma ao voltar;
 * - com `prefers-reduced-motion: reduce`, desenha apenas um quadro estático;
 * - remove listeners e observadores ao desmontar.
 *
 * `createScene(ctx)` deve retornar `{ resize(width, height), draw(frame) }`, em que
 * width/height são dimensões CSS (o contexto já vem escalado pelo DPR).
 */
export function useCanvasAnimation(canvasRef, createScene, { maxDpr = 2 } = {}) {
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const scene = createScene(ctx)
    const motionQuery = window.matchMedia?.(REDUCED_MOTION_QUERY)

    let width = 0
    let height = 0
    let frame = 0
    let rafId = 0
    let inView = true
    let pageVisible = !document.hidden
    let reducedMotion = Boolean(motionQuery?.matches)

    const render = () => {
      if (width && height) scene.draw(frame)
    }

    const shouldRun = () => inView && pageVisible && !reducedMotion && width > 0

    const tick = () => {
      rafId = 0
      render()
      frame++
      schedule()
    }

    function schedule() {
      if (!rafId && shouldRun()) rafId = requestAnimationFrame(tick)
    }

    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }

    const update = () => {
      if (shouldRun()) schedule()
      else stop()
    }

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
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
