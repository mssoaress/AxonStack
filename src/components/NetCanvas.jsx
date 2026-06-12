import { useEffect, useRef } from 'react'

export default function NetCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, animId

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const mobile = () => window.innerWidth < 600
    const COUNT = mobile() ? 22 : 42
    const DIST = mobile() ? 120 : 155

    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      r: 1.4 + Math.random() * 1.8,
      orange: Math.random() > 0.62,
      pulse: Math.random() * Math.PI * 2
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.025
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < DIST) {
            const a = (1 - d / DIST) * 0.26
            const useOrange = nodes[i].orange || nodes[j].orange
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = useOrange ? `rgba(232,80,2,${a * 1.5})` : `rgba(255,255,255,${a * 0.45})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        }
      }
      nodes.forEach(n => {
        const p = 0.75 + Math.sin(n.pulse) * 0.25
        if (n.orange) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7)
          g.addColorStop(0, `rgba(232,80,2,${0.22 * p})`)
          g.addColorStop(1, 'rgba(232,80,2,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2)
        ctx.fillStyle = n.orange ? `rgba(232,80,2,${0.88 * p})` : `rgba(255,255,255,${0.62 * p})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    const onVisChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId)
      } else {
        draw()
      }
    }
    document.addEventListener('visibilitychange', onVisChange)

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisChange)
    }
  }, [])

  return <canvas id="net-canvas" ref={canvasRef}></canvas>
}
