import { useCallback, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Home'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import FolderIntro from './components/FolderIntro'
import ScrollProgress from './components/ScrollProgress'
import { initLenis, destroyLenis, pauseLenis } from './lib/scroll'

const SECTIONS = [
  { id: 'home', label: 'index' },
  { id: 'experience', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
]

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'America/New_York',
        })
      )
    fmt()
    const id = setInterval(fmt, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function App() {
  const [active, setActive] = useState('home')
  const [loaded, setLoaded] = useState(false)
  const time = useClock()
  const onPreloaderDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !loaded)
    pauseLenis(!loaded)
  }, [loaded])

  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {!loaded && <FolderIntro onDone={onPreloaderDone} />}
      <ScrollProgress />
      <Nav sections={SECTIONS} active={active} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span>xinyue wang · 2026</span>
          <span className="mono muted footer-clock">
            <span className="dot small" /> PGH, PA — {time}
          </span>
        </div>
      </footer>
    </>
  )
}
