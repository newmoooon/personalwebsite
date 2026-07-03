import { useEffect, useRef } from 'react'

const COLORS = ['255, 179, 209', '224, 195, 255', '255, 215, 230']
const LINK_DIST = 110
const MOUSE_DIST = 150

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let particles = []
    let raf = 0
    let inView = true
    let pageVisible = true
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(Math.floor((w * h) / 16000), 90)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.6,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }))
    }

    const step = () => {
      raf = requestAnimationFrame(step)
      if (!inView || !pageVisible) return
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // gentle mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const md = Math.hypot(dx, dy)
        if (md < MOUSE_DIST && md > 0.01) {
          const f = ((MOUSE_DIST - md) / MOUSE_DIST) * 0.6
          p.vx += (dx / md) * f * 0.12
          p.vy += (dy / md) * f * 0.12
        }
        // speed cap so repulsion never flings particles
        const sp = Math.hypot(p.vx, p.vy)
        if (sp > 0.9) {
          p.vx = (p.vx / sp) * 0.9
          p.vy = (p.vy / sp) * 0.9
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20
      }

      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          if (Math.abs(dx) > LINK_DIST || Math.abs(dy) > LINK_DIST) continue
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.14
            ctx.strokeStyle = `rgba(${a.c}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.c}, 0.55)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const onMove = e => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVis = () => {
      pageVisible = document.visibilityState === 'visible'
    }

    const io = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting },
      { threshold: 0 }
    )
    io.observe(canvas)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
