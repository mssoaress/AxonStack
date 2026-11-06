import { useEffect, useRef } from 'react'

// Anel que acompanha o ponteiro com um leve atraso — um realce, não um substituto:
// o cursor nativo continua visível (respeita tamanhos/temas de cursor de acessibilidade).
// Só existe com mouse/trackpad e sem prefers-reduced-motion; some sobre campos de texto.
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const ACTIVE_CLASS = 'has-custom-cursor'
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary, label, select'
const TEXT_FIELD_SELECTOR = 'input, textarea, [contenteditable="true"]'

export default function CustomCursor() {
  const ringRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const root = document.documentElement
    const pointerQuery = window.matchMedia?.(FINE_POINTER_QUERY)
    const motionQuery = window.matchMedia?.(REDUCED_MOTION_QUERY)
    if (!ring || !pointerQuery) return undefined

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let rafId = 0
    let enabled = false

    const place = (x, y) => {
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const stopLoop = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }

    // O loop roda só enquanto o anel ainda não alcançou o ponteiro.
    const tick = () => {
      rafId = 0
      rx += (mx - rx) * 0.2
      ry += (my - ry) * 0.2
      place(rx, ry)
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const onMove = (e) => {
      // Em notebooks com tela touch, toques não devem mover o anel.
      if (e.pointerType === 'touch') return
      mx = e.clientX
      my = e.clientY
      if (!root.classList.contains(ACTIVE_CLASS)) {
        rx = mx
        ry = my
        place(rx, ry)
        root.classList.add(ACTIVE_CLASS)
      }
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null
      ring.classList.toggle('is-hover', Boolean(el?.closest(INTERACTIVE_SELECTOR)))
      ring.classList.toggle('is-hidden', Boolean(el?.closest(TEXT_FIELD_SELECTOR)))
    }

    // Esconde ao sair da janela; reaparece no próximo movimento.
    const onLeave = () => root.classList.remove(ACTIVE_CLASS)

    const enable = () => {
      if (enabled) return
      enabled = true
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      root.addEventListener('pointerleave', onLeave)
    }

    const disable = () => {
      if (!enabled) return
      enabled = false
      stopLoop()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      root.removeEventListener('pointerleave', onLeave)
      root.classList.remove(ACTIVE_CLASS)
    }

    const sync = () => (pointerQuery.matches && !motionQuery?.matches ? enable() : disable())

    sync()
    pointerQuery.addEventListener?.('change', sync)
    motionQuery?.addEventListener?.('change', sync)

    return () => {
      disable()
      pointerQuery.removeEventListener?.('change', sync)
      motionQuery?.removeEventListener?.('change', sync)
    }
  }, [])

  return <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
}
