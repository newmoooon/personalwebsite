import { useEffect, useRef } from 'react'
import SplitText from './SplitText'
import ParticleField from './ParticleField'
import ParticleMorph from './ParticleMorph'
import { scrollToEl } from '../lib/scroll'

export default function Hero() {
  const heroRef = useRef(null)
  const innerRef = useRef(null)
  const hintRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const move = e => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  // parallax: hero content drifts up and fades as you scroll past it
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const inner = innerRef.current
    const hint = hintRef.current
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const p = Math.min(y / (window.innerHeight * 0.9), 1)
      if (inner) {
        inner.style.transform = `translateY(${y * 0.28}px)`
        inner.style.opacity = String(1 - p)
      }
      if (hint) hint.style.opacity = String(Math.max(1 - p * 4, 0))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const b = btnRef.current
    if (!b || window.matchMedia('(hover: none)').matches) return
    let raf, tx = 0, ty = 0, dx = 0, dy = 0
    const loop = () => {
      tx += (dx - tx) * 0.18
      ty += (dy - ty) * 0.18
      b.style.transform = `translate(${tx}px, ${ty}px)`
      raf = requestAnimationFrame(loop)
    }
    const move = e => {
      const r = b.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
      if (dist < 120) {
        dx = (e.clientX - cx) * 0.25
        dy = (e.clientY - cy) * 0.25
      } else {
        dx = 0
        dy = 0
      }
    }
    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    scrollToEl(document.getElementById(id))
  }

  return (
    <section id="home" className="section hero" ref={heroRef}>
      <ParticleMorph />
      <ParticleField />
      <div className="spotlight" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="section-inner hero-inner" ref={innerRef}>
        <p className="mono muted stagger available">
          <span className="dot small" /> available — summer 2026
        </p>

        <h1 className="hero-title reveal reveal-chars is-visible">
          <span className="line">
            <SplitText delayStep={28} baseDelay={200}>Xinyue</SplitText>
          </span>
          <span className="line accent-word">
            <SplitText className="display" delayStep={40} baseDelay={520}>Cindy</SplitText>
          </span>
          <span className="line">
            <SplitText delayStep={28} baseDelay={860}>Wang.</SplitText>
          </span>
        </h1>

        <p className="hero-sub stagger">
          Software engineer building at the intersection of{' '}
          <em>systems</em>, <em>AI</em>, and <em>security</em>. Studying CS
          &amp; Information Systems at{' '}
          <span className="under">Carnegie Mellon</span>.
        </p>

        <div className="hero-meta mono stagger">
          <span>SNV, CA / PGH, PA</span>
          <span className="sep">✦</span>
          <span>B.S. expected 05.2027</span>
        </div>

        <div className="hero-actions stagger">
          <a
            ref={btnRef}
            href="#projects"
            className="btn magnetic"
            data-hover="wide"
            onClick={e => go(e, 'projects')}
          >
            <span>see work</span>
            <span className="arrow">→</span>
          </a>
          <a
            href="#contact"
            className="btn ghost"
            onClick={e => go(e, 'contact')}
          >
            <span>get in touch</span>
          </a>
        </div>
      </div>

      <div className="scroll-hint mono muted" ref={hintRef}>
        <span>scroll</span>
        <span className="scroll-line" />
      </div>
    </section>
  )
}
