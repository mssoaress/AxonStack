import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)
  const heroWrapRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = document.getElementById('hero')
    if (!canvas || !hero) return
    const ctx = canvas.getContext('2d')
    let W, H, t = 0, animId

    function resize() {
      W = canvas.width = hero.offsetWidth
      H = canvas.height = hero.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const lines = Array.from({ length: 10 }, (_, i) => ({
      phase: i * 0.5, amplitude: 48 + i * 15,
      speed: 0.006 + i * 0.001,
      y: 0.18 + i * 0.07,
      width: 0.35 + (i % 3) * 0.3,
      alpha: 0.045 + i * 0.013
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const bg = ctx.createRadialGradient(W * .72, H * .4, 0, W * .72, H * .4, W * .65)
      bg.addColorStop(0, 'rgba(102,31,26,0.18)')
      bg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
      lines.forEach((ln, idx) => {
        ctx.beginPath()
        const yBase = ln.y * H
        for (let x = 0; x <= W; x += 5) {
          const y = yBase
            + Math.sin(x * .006 + t * ln.speed + ln.phase) * ln.amplitude
            + Math.sin(x * .003 + t * ln.speed * .6 + ln.phase * 1.7) * (ln.amplitude * .33)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const isO = idx % 3 === 1
        const g = ctx.createLinearGradient(0, 0, W, 0)
        if (isO) {
          g.addColorStop(0, `rgba(232,80,2,0)`)
          g.addColorStop(.35, `rgba(232,80,2,${ln.alpha * 2.1})`)
          g.addColorStop(.65, `rgba(200,60,0,${ln.alpha * 1.5})`)
          g.addColorStop(1, `rgba(232,80,2,0)`)
        } else {
          g.addColorStop(0, `rgba(255,255,255,0)`)
          g.addColorStop(.4, `rgba(255,255,255,${ln.alpha})`)
          g.addColorStop(1, `rgba(255,255,255,0)`)
        }
        ctx.strokeStyle = g
        ctx.lineWidth = ln.width
        ctx.stroke()
      })
      t++
      animId = requestAnimationFrame(draw)
    }

    const heroObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          draw()
        } else {
          cancelAnimationFrame(animId)
        }
      })
    }, { threshold: 0.01 })
    heroObs.observe(hero)

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      heroObs.disconnect()
    }
  }, [])

  return <canvas className="hero-waves" id="hero-canvas" ref={canvasRef}></canvas>
}
