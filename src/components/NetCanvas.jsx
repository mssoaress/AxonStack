import { useRef } from 'react'
import { useCanvasAnimation } from '../hooks/useCanvasAnimation.js'

const ORANGE = '232,80,2'
const GLOW_SPRITE_SIZE = 64

// Configuração da rede de acordo com a largura disponível.
function getConfig(width) {
  return width < 600 ? { count: 22, dist: 120 } : { count: 42, dist: 155 }
}

// Brilho laranja pré-renderizado uma única vez (evita criar gradientes a cada quadro).
function createGlowSprite() {
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = GLOW_SPRITE_SIZE
  const sctx = sprite.getContext('2d')
  const c = GLOW_SPRITE_SIZE / 2
  const g = sctx.createRadialGradient(c, c, 0, c, c, c)
  g.addColorStop(0, `rgba(${ORANGE},0.22)`)
  g.addColorStop(1, `rgba(${ORANGE},0)`)
  sctx.fillStyle = g
  sctx.fillRect(0, 0, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE)
  return sprite
}

function createNetScene(ctx) {
  let W = 0
  let H = 0
  let dist = 155
  const nodes = []
  const glow = createGlowSprite()

  const makeNode = () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.42,
    vy: (Math.random() - 0.5) * 0.42,
    r: 1.4 + Math.random() * 1.8,
    orange: Math.random() > 0.62,
    pulse: Math.random() * Math.PI * 2,
  })

  return {
    resize(width, height) {
      // Mantém a distribuição: reposiciona os nós proporcionalmente à nova área.
      if (W && H) {
        const sx = width / W
        const sy = height / H
        for (const n of nodes) {
          n.x *= sx
          n.y *= sy
        }
      }
      W = width
      H = height
      const config = getConfig(width)
      dist = config.dist
      while (nodes.length < config.count) nodes.push(makeNode())
      nodes.length = config.count
    },

    draw() {
      ctx.clearRect(0, 0, W, H)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.025
        if (n.x < 0) {
          n.x = 0
          n.vx = Math.abs(n.vx)
        } else if (n.x > W) {
          n.x = W
          n.vx = -Math.abs(n.vx)
        }
        if (n.y < 0) {
          n.y = 0
          n.vy = Math.abs(n.vy)
        } else if (n.y > H) {
          n.y = H
          n.vy = -Math.abs(n.vy)
        }
      }

      const dist2 = dist * dist
      ctx.lineWidth = 0.55
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 >= dist2) continue
          const alpha = (1 - Math.sqrt(d2) / dist) * 0.26
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle =
            a.orange || b.orange
              ? `rgba(${ORANGE},${alpha * 1.5})`
              : `rgba(255,255,255,${alpha * 0.45})`
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const p = 0.75 + Math.sin(n.pulse) * 0.25
        if (n.orange) {
          const radius = n.r * 7
          ctx.globalAlpha = p
          ctx.drawImage(glow, n.x - radius, n.y - radius, radius * 2, radius * 2)
          ctx.globalAlpha = 1
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2)
        ctx.fillStyle = n.orange ? `rgba(${ORANGE},${0.88 * p})` : `rgba(255,255,255,${0.62 * p})`
        ctx.fill()
      }
    },
  }
}

export default function NetCanvas() {
  const canvasRef = useRef(null)
  useCanvasAnimation(canvasRef, createNetScene)
  return <canvas id="net-canvas" ref={canvasRef} aria-hidden="true" />
}
