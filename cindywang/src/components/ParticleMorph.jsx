import { useEffect, useRef } from 'react'

/*
 * Particle morph — a cloud of scattered dots that fly together into a
 * butterfly that gently flaps and sways in 3D, drawn as pure points.
 * The shape is the Temple Fay butterfly curve (r = e^sinθ − 2cos4θ + …),
 * a classic of mathematical art — same spirit as the reference site's
 * wire butterfly, deliberately not the same construction. Canvas 2D +
 * a little projection math; no dependencies. Sits full-bleed behind the
 * hero, anchored right-of-center to balance the headline.
 */

const SHAPE_N = 3000 // particles that form the butterfly (fine, line-like)
const DUST_N = 160   // ambient drifting dust
const CONVERGE_MS = 2600

// Temple Fay butterfly curve, upright, normalized to roughly ±1
function butterflyPoint(theta) {
  const r =
    Math.exp(Math.sin(theta)) -
    2 * Math.cos(4 * theta) +
    Math.pow(Math.sin((2 * theta - Math.PI) / 24), 5)
  return {
    x: (r * Math.sin(theta)) / 4,
    y: (-r * Math.cos(theta)) / 4 + 0.06, // flip so wings point up, re-center
    // subtle wing-surface depth — cos(2θ) is left/right symmetric, so
    // perspective doesn't lean the butterfly to one side
    z: 0.15 * Math.cos(2 * theta),
  }
}

export default function ParticleMorph() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0
    const size = () => {
      const rect = canvas.getBoundingClientRect()
      W = Math.round(rect.width)
      H = Math.round(rect.height)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(canvas)

    // each particle: a spot on the curve + a random scatter start + delay
    // (the Fay curve closes over 12π)
    const parts = Array.from({ length: SHAPE_N }, (_, i) => ({
      theta: (i / SHAPE_N) * Math.PI * 12,
      sx: Math.random(),           // scatter start, in 0..1 canvas space
      sy: Math.random(),
      delay: Math.random() * 0.55, // fraction of the converge window
      jitter: Math.random() * Math.PI * 2,
    }))
    const dust = Array.from({ length: DUST_N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.008,
      vy: (Math.random() - 0.5) * 0.006,
      r: 0.6 + Math.random() * 0.9,
      a: 0.06 + Math.random() * 0.16,
    }))

    // pointer parallax (eased in the loop)
    let mx = 0, my = 0, tx = 0, ty = 0
    const onMove = e => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(canvas)

    const ease = p => 1 - Math.pow(1 - p, 3)

    // frame-accumulated clocks (capped dt): stay smooth across tab
    // switches and virtual-time environments, where a wall-clock t0
    // would make the convergence snap or stall.
    // `clock` drives forming/flying and only starts once the folder intro
    // has lifted (html.is-loaded) — so the visitor actually WATCHES the
    // scattered dots stream together. `ambient` always runs (pre-form
    // drift of the scattered dots).
    // The formation plays once per page load, right after the intro lifts;
    // the butterfly then stays formed for the rest of the visit (this
    // component never remounts while browsing).
    // (?noconverge — QA hook like ?nopreload: skip straight to the shape)
    const skipForm = new URLSearchParams(window.location.search).has('noconverge')
    let clock = skipForm ? CONVERGE_MS : 0
    let ambient = 0
    let last = null
    const html = document.documentElement

    const draw = () => {
      const t = clock / 1000
      ctx.clearRect(0, 0, W, H)

      // butterfly anchor: right-of-center, so the left column of copy breathes
      const cx = W * 0.62
      const cy = H * 0.46
      const S = Math.min(W, H) * 0.42

      // barely-there sway (a butterfly at rest, not in flight) + mouse tilt
      const ry = Math.sin(t * 0.14) * 0.10 + mx * 0.22
      const rx = -0.12 + my * 0.10
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const cosX = Math.cos(rx), sinX = Math.sin(rx)

      // wing flap: a slow, light breathing fold — "moves a tad, very lightly"
      const flap = Math.sin(t * 0.55) * 0.10
      const cosF = Math.cos(flap), sinF = Math.sin(flap)

      const gp = reduced ? 1 : Math.min(clock / CONVERGE_MS, 1)

      for (let i = 0; i < SHAPE_N; i++) {
        const pt = parts[i]
        // local progress: staggered so dots stream in, not arrive at once
        const lp = gp >= 1 ? 1 : ease(Math.min(Math.max((gp - pt.delay) / (1 - pt.delay), 0), 1))

        // once formed, dots flow slowly ALONG the outline (plus a faint
        // shimmer) — the lines look like they're being drawn continuously
        const flow = Math.max(t - CONVERGE_MS / 1000, 0) * 0.045
        const th = pt.theta + (lp >= 1 ? flow + Math.sin(t * 0.6 + pt.jitter) * 0.004 : 0)
        const p3 = butterflyPoint(th)

        // flap: fold left/right wings symmetrically (body stays put)
        const wing = p3.x
        p3.z += Math.abs(wing) * sinF
        p3.x = wing * cosF

        // rotate: Y then X
        let x1 = p3.x * cosY + p3.z * sinY
        let z1 = -p3.x * sinY + p3.z * cosY
        let y1 = p3.y * cosX + z1 * sinX
        let z2 = -p3.y * sinX + z1 * cosX

        const persp = 2.4 / (2.4 - z2)
        const txp = cx + x1 * S * persp
        const typ = cy + y1 * S * persp

        // scattered dots drift gently while they wait, then fly to the curve
        const aSec = ambient / 1000
        const sxp = pt.sx * W + Math.sin(aSec * 0.35 + pt.jitter) * 14
        const syp = pt.sy * H + Math.cos(aSec * 0.28 + pt.jitter * 1.7) * 11
        const px = sxp + (txp - sxp) * lp
        const py = syp + (typ - syp) * lp

        // depth-cued color between the site's pink and violet
        const depth = (z2 + 1) / 2
        const rC = Math.round(255 - depth * 31)   // 255 → 224
        const gC = Math.round(179 + depth * 17)   // 179 → 196
        const bC = Math.round(209 + depth * 46)   // 209 → 255
        const alpha = 0.30 + depth * 0.60
        // traveling pulse: brightness/size waves run along the outline
        const wave = lp >= 1 ? 0.78 + 0.30 * Math.sin(th * 2.5 - t * 1.1) : 1
        const rad = (0.55 + depth * 0.85) * persp * wave

        ctx.fillStyle = `rgba(${rC},${gC},${bC},${alpha * (0.25 + 0.75 * lp)})`
        ctx.beginPath()
        ctx.arc(px, py, rad, 0, Math.PI * 2)
        ctx.fill()
      }

      // ambient dust drifting through the whole hero
      for (const d of dust) {
        d.x = (d.x + d.vx / 60 + 1) % 1
        d.y = (d.y + d.vy / 60 + 1) % 1
        ctx.fillStyle = `rgba(224,195,255,${d.a})`
        ctx.beginPath()
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (reduced) {
      // static composition, no animation loop
      clock = CONVERGE_MS
      draw()
      return () => {
        ro.disconnect()
        io.disconnect()
        window.removeEventListener('mousemove', onMove)
      }
    }

    let raf = 0
    const loop = now => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) {
        last = null // don't accumulate the hidden gap
        return
      }
      if (last !== null) {
        const dt = Math.min(now - last, 50)
        ambient += dt
        // hold the formation until the folder intro is out of the way
        if (html.classList.contains('is-loaded')) clock += dt
      }
      last = now
      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04
      draw()
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-morph" aria-hidden="true" />
}
