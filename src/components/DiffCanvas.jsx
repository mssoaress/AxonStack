import { useEffect, useRef } from 'react'

export default function DiffCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, t = 0, animId, running = false

    function resize() {
      const r = canvas.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) {
        W = canvas.width = r.width
        H = canvas.height = r.height
      }
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    resize()

    function drawHex(cx, cy, r, angle, alpha, isO) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + angle
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = isO ? `rgba(232,80,2,${alpha})` : `rgba(255,255,255,${alpha * .45})`
      ctx.lineWidth = 0.9; ctx.stroke()
    }

    function draw() {
      if (!W || !H) { animId = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2
      for (let i = 5; i >= 1; i--) drawHex(cx, cy, 28 * i + Math.sin(t * .01 + i) * 5, t * .005 * (i % 2 ? 1 : -1), .055 * (6 - i), i % 2 === 0)
      ctx.beginPath()
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + t * .008
        const r = 66 + Math.sin(t * .015) * 9
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath(); ctx.strokeStyle = 'rgba(232,80,2,0.65)'; ctx.lineWidth = 1.4; ctx.stroke()
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + t * .004
        const r2 = 112 + Math.sin(t * .01 + i * .8) * 13
        const x = cx + Math.cos(a) * r2, y = cy + Math.sin(a) * r2
        ctx.beginPath(); ctx.arc(x, y, i % 3 === 0 ? 2.8 : 1.4, 0, Math.PI * 2)
        ctx.fillStyle = i % 3 === 0 ? 'rgba(232,80,2,0.9)' : 'rgba(255,255,255,0.55)'; ctx.fill()
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(255,255,255,0.035)'; ctx.lineWidth = 0.4; ctx.stroke()
      }
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18)
      g.addColorStop(0, 'rgba(232,80,2,0.55)'); g.addColorStop(1, 'rgba(232,80,2,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fillStyle = '#E85002'; ctx.fill()
      t++
      animId = requestAnimationFrame(draw)
    }

    function start() {
      if (running) return
      running = true
      draw()
    }
    function stop() {
      running = false
      cancelAnimationFrame(animId)
    }

    const diffSection = document.getElementById('diferenciais')
    let obs
    if (diffSection) {
      obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) start()
          else stop()
        })
      }, { threshold: 0.01 })
      obs.observe(diffSection)
    }

    return () => {
      stop()
      ro.disconnect()
      if (obs) obs.disconnect()
    }
  }, [])

  return <canvas id="diff-canvas" ref={canvasRef}></canvas>
}