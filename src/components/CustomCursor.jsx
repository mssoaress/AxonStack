import { useEffect, useRef } from 'react'

// Só exibe o cursor customizado em dispositivos com mouse/trackpad.
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const ACTIVE_CLASS = 'has-custom-cursor'
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary, label'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const root = document.documentElement
    const pointerQuery = window.matchMedia?.(FINE_POINTER_QUERY)
    const motionQuery = window.matchMedia?.(REDUCED_MOTION_QUERY)
    if (!dot || !ring || !pointerQuery) return undefined

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let rafId = 0
    let enabled = false
    let reducedMotion = Boolean(motionQuery?.matches)

    // O ponto interno já se centraliza via CSS; o anel é centralizado aqui.
    const placeDot = (x, y) => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const placeRing = (x, y) => {
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const stopLoop = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }

    // O anel segue o ponteiro com atraso suave; o loop roda só enquanto há distância a percorrer.
    const tick = () => {
      rafId = 0
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      placeRing(rx, ry)
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const onMove = (e) => {
      // Em notebooks com tela touch, toques não devem mover o cursor customizado.
      if (e.pointerType === 'touch') return
      mx = e.clientX
      my = e.clientY
      placeDot(mx, my)
      if (!root.classList.contains(ACTIVE_CLASS)) {
        // Primeiro movimento: posiciona o anel junto ao ponteiro e só então exibe.
        rx = mx
        ry = my
        placeRing(rx, ry)
        root.classList.add(ACTIVE_CLASS)
      }
      if (reducedMotion) {
        // Sem animação de atraso: o anel acompanha o ponteiro diretamente.
        rx = mx
        ry = my
        placeRing(rx, ry)
      } else if (!rafId) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const onOver = (e) => {
      const interactive = e.target instanceof Element && e.target.closest(INTERACTIVE_SELECTOR)
      ring.classList.toggle('is-hover', Boolean(interactive))
    }

    // Esconde ao sair da janela; reaparece no próximo movimento.
    const onLeave = () => root.classList.remove(ACTIVE_CLASS)

    const enable = () => {
      if (enabled) return
      enabled = true
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }

    const disable = () => {
      if (!enabled) return
      enabled = false
      stopLoop()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      root.classList.remove(ACTIVE_CLASS)
    }

    const sync = () => (pointerQuery.matches ? enable() : disable())
    const onMotionChange = (e) => {
      reducedMotion = e.matches
    }

    sync()
    pointerQuery.addEventListener?.('change', sync)
    motionQuery?.addEventListener?.('change', onMotionChange)

    return () => {
      disable()
      pointerQuery.removeEventListener?.('change', sync)
      motionQuery?.removeEventListener?.('change', onMotionChange)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={dotRef} aria-hidden="true">
        <div className="cursor-dot" />
      </div>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
