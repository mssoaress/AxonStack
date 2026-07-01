import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const dotInnerRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const dotInner = dotInnerRef.current

    const isTouch = () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId
    let active = false

    function applyVisibility() {
      const shouldShow = !isTouch() && window.innerWidth >= 768
      if (shouldShow === active) return
      active = shouldShow
      if (dot) dot.style.display = active ? '' : 'none'
      if (ring) ring.style.display = active ? '' : 'none'
    }
    applyVisibility()
    window.addEventListener('resize', applyVisibility, { passive: true })

    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    function loop() {
      if (!active) { rafId = requestAnimationFrame(loop); return }
      if (dot) {
        dot.style.position = 'fixed'
        dot.style.left = mx + 'px'
        dot.style.top = my + 'px'
        if (dotInner) dotInner.style.transform = 'translate(-50%,-50%)'
      }
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      if (ring) {
        ring.style.left = rx + 'px'
        ring.style.top = ry + 'px'
      }
      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor" id="cursor-dot" ref={dotRef}>
        <div className="cursor-dot" ref={dotInnerRef}></div>
      </div>
      <div className="cursor-ring" id="cursor-ring" ref={ringRef}></div>
    </>
  )
}