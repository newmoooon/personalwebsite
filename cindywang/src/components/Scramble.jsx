import { useRef } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#░▒'

export default function Scramble({ text, className = '' }) {
  const spanRef = useRef(null)
  const rafRef = useRef(0)

  const start = () => {
    const el = spanRef.current
    if (!el) return
    cancelAnimationFrame(rafRef.current)
    let frame = 0
    const total = text.length * 3 + 6
    const tick = () => {
      frame++
      const resolved = Math.floor((frame / total) * text.length * 1.4)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue }
        out += i < resolved
          ? text[i]
          : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      el.textContent = out
      if (resolved < text.length) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        el.textContent = text
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  return (
    <span
      className={`scramble ${className}`}
      onMouseEnter={start}
      aria-label={text}
    >
      <span ref={spanRef} aria-hidden="true">{text}</span>
    </span>
  )
}
