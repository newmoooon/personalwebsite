import { useEffect, useRef } from 'react'
import SplitText from './SplitText'
import { scrollToEl } from '../lib/scroll'

export default function Hero() {
  const heroRef = useRef(null)
  const innerRef = useRef(null)
  const hintRef = useRef(null)
  const btnRef = useRef(null)

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
      <div className="blobs" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>
      <div className="hero-grid" aria-hidden="true" />

      <div className="section-inner hero-inner" ref={innerRef}>
        <p className="mono muted stagger available">
          <span className="dot small" /> available — fall 2026, summer 2027
        </p>

        <h1 className="hero-title reveal reveal-chars is-visible">
          <SplitText delayStep={16} baseDelay={60}>Xinyue</SplitText>{' '}
          <span className="accent-word">
            <SplitText className="display" delayStep={18} baseDelay={200}>Cindy</SplitText>
          </span>{' '}
          <SplitText delayStep={16} baseDelay={340}>Wang.</SplitText>
        </h1>

        <p className="hero-lead stagger">
          <span className="hero-role">SWE Intern @ LeapBound AI</span>
          <span className="lead-sep"> · </span>
          CS + IS @ <span className="under">Carnegie Mellon</span>
        </p>

        <p className="hero-sub stagger">
          Software engineer with experience across <em>full-stack</em>,{' '}
          <em>systems</em>, <em>AI</em>, and <em>security</em>.
        </p>

        <div className="hero-meta mono stagger">
          <span>SNV, CA / PGH, PA</span>
          <span className="sep">✦</span>
          <span>B.S. expected 05.2028</span>
        </div>

        <div className="hero-actions stagger">
          <a
            ref={btnRef}
            href="#experience"
            className="btn magnetic"
            data-hover="wide"
            onClick={e => go(e, 'experience')}
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
