import { useRef } from 'react'
import { useCanvasAnimation } from '../hooks/useCanvasAnimation.js'

const LINES = Array.from({ length: 10 }, (_, i) => ({
  phase: i * 0.5,
  amplitude: 48 + i * 15,
  speed: 0.006 + i * 0.001,
  y: 0.18 + i * 0.07,
  width: 0.35 + (i % 3) * 0.3,
  alpha: 0.045 + i * 0.013,
  orange: i % 3 === 1,
}))

function createHeroScene(ctx) {
  let W = 0
  let H = 0
  let background = null
  let strokes = []

  return {
    // Gradientes dependem só das dimensões: criados aqui, não a cada quadro.
    resize(width, height) {
      W = width
      H = height
      background = ctx.createRadialGradient(W * 0.72, H * 0.4, 0, W * 0.72, H * 0.4, W * 0.65)
      background.addColorStop(0, 'rgba(102,31,26,0.18)')
      background.addColorStop(1, 'rgba(0,0,0,0)')

      strokes = LINES.map((ln) => {
        const g = ctx.createLinearGradient(0, 0, W, 0)
        if (ln.orange) {
          g.addColorStop(0, 'rgba(232,80,2,0)')
          g.addColorStop(0.35, `rgba(232,80,2,${ln.alpha * 2.1})`)
          g.addColorStop(0.65, `rgba(200,60,0,${ln.alpha * 1.5})`)
          g.addColorStop(1, 'rgba(232,80,2,0)')
        } else {
          g.addColorStop(0, 'rgba(255,255,255,0)')
          g.addColorStop(0.4, `rgba(255,255,255,${ln.alpha})`)
          g.addColorStop(1, 'rgba(255,255,255,0)')
        }
        return g
      })
    },

    draw(t) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = background
      ctx.fillRect(0, 0, W, H)

      for (let idx = 0; idx < LINES.length; idx++) {
        const ln = LINES[idx]
        const yBase = ln.y * H
        const p1 = t * ln.speed + ln.phase
        const p2 = t * ln.speed * 0.6 + ln.phase * 1.7
        const a2 = ln.amplitude * 0.33
        ctx.beginPath()
        for (let x = 0; x <= W; x += 5) {
          const y = yBase + Math.sin(x * 0.006 + p1) * ln.amplitude + Math.sin(x * 0.003 + p2) * a2
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = strokes[idx]
        ctx.lineWidth = ln.width
        ctx.stroke()
      }
    },
  }
}

export default function HeroCanvas() {
  const canvasRef = useRef(null)
  useCanvasAnimation(canvasRef, createHeroScene)
  return <canvas className="hero-waves" id="hero-canvas" ref={canvasRef} aria-hidden="true" />
}
