import { useEffect, useState } from 'react'
import Scramble from './Scramble'
import { scrollToEl } from '../lib/scroll'

export default function Nav({ sections, active }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = id => {
    setOpen(false)
    scrollToEl(document.getElementById(id))
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo mono" onClick={() => go('home')}>
          <span className="dot" /> xw
        </button>
        <ul className="nav-tabs mono">
          {sections.map(s => (
            <li key={s.id}>
              <button
                className={`nav-tab${active === s.id ? ' active' : ''}`}
                onClick={() => go(s.id)}
              >
                <span className="nav-tab-num">
                  {String(sections.indexOf(s) + 1).padStart(2, '0')}
                </span>
                <Scramble text={s.label} />
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          <span /><span />
        </button>
      </div>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {sections.map(s => (
          <button
            key={s.id}
            className={`mobile-tab mono${active === s.id ? ' active' : ''}`}
            onClick={() => go(s.id)}
          >
            <span className="nav-tab-num">
              {String(sections.indexOf(s) + 1).padStart(2, '0')}
            </span>
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
