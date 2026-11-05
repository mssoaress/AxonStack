import { useRef } from 'react'
import { useCanvasAnimation } from '../hooks/useCanvasAnimation.js'

const TAU = Math.PI * 2

// Cores dos hexágonos dependem só do índice: pré-calculadas.
const HEX_STYLES = [1, 2, 3, 4, 5].map((i) => {
  const alpha = 0.055 * (6 - i)
  return i % 2 === 0 ? `rgba(232,80,2,${alpha})` : `rgba(255,255,255,${alpha * 0.45})`
})

function createDiffScene(ctx) {
  let W = 0
  let H = 0
  let cx = 0
  let cy = 0
  let core = null

  function polygon(x, y, r, sides, angle) {
    ctx.beginPath()
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * TAU + angle
      const px = x + Math.cos(a) * r
      const py = y + Math.sin(a) * r
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
  }

  return {
    resize(width, height) {
      W = width
      H = height
      cx = W / 2
      cy = H / 2
      core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18)
      core.addColorStop(0, 'rgba(232,80,2,0.55)')
      core.addColorStop(1, 'rgba(232,80,2,0)')
    },

    draw(t) {
      ctx.clearRect(0, 0, W, H)

      ctx.lineWidth = 0.9
      for (let i = 5; i >= 1; i--) {
        polygon(cx, cy, 28 * i + Math.sin(t * 0.01 + i) * 5, 6, t * 0.005 * (i % 2 ? 1 : -1))
        ctx.strokeStyle = HEX_STYLES[i - 1]
        ctx.stroke()
      }

      polygon(cx, cy, 66 + Math.sin(t * 0.015) * 9, 3, t * 0.008)
      ctx.strokeStyle = 'rgba(232,80,2,0.65)'
      ctx.lineWidth = 1.4
      ctx.stroke()

      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * TAU + t * 0.004
        const r2 = 112 + Math.sin(t * 0.01 + i * 0.8) * 13
        const x = cx + Math.cos(a) * r2
        const y = cy + Math.sin(a) * r2
        const accent = i % 3 === 0
        ctx.beginPath()
        ctx.arc(x, y, accent ? 2.8 : 1.4, 0, TAU)
        ctx.fillStyle = accent ? 'rgba(232,80,2,0.9)' : 'rgba(255,255,255,0.55)'
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(255,255,255,0.035)'
        ctx.lineWidth = 0.4
        ctx.stroke()
      }

      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, cy, 18, 0, TAU)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, 3.5, 0, TAU)
      ctx.fillStyle = '#E85002'
      ctx.fill()
    },
  }
}

export default function DiffCanvas() {
  const canvasRef = useRef(null)
  useCanvasAnimation(canvasRef, createDiffScene)
  return <canvas id="diff-canvas" ref={canvasRef} aria-hidden="true" />
}
