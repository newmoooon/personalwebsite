import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Home'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import WorkSamples from './components/WorkSamples'
import Contact from './components/Contact'
import FolderIntro from './components/FolderIntro'
import ScrollProgress from './components/ScrollProgress'
import { initLenis, destroyLenis, pauseLenis, scrollToEl } from './lib/scroll'

const SECTIONS = [
  { id: 'home', label: 'index' },
  { id: 'experience', label: 'work' },
  { id: 'work-samples', label: 'samples' },
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
  const [loaded, setLoaded] = useState(() =>
    SECTIONS.some(section => `#${section.id}` === window.location.hash)
  )
  const time = useClock()
  const onPreloaderDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-loading', !loaded)
    if (loaded) document.documentElement.classList.add('is-loaded')
    pauseLenis(!loaded)
  }, [loaded])

  // React mounts the sections while the intro locks scrolling. Apply the
  // URL fragment after the intro releases that lock, and on later changes.
  useLayoutEffect(() => {
    if (!loaded) return
    let frame
    const goToHash = () => {
      cancelAnimationFrame(frame)
      const scroll = () => {
        const id = window.location.hash.slice(1) || 'home'
        if (!SECTIONS.some(section => section.id === id)) return
        const target = document.getElementById(id)
        const navHeight = document.querySelector('.nav')?.offsetHeight ?? 0
        scrollToEl(target, { immediate: true, offset: -navHeight, updateUrl: false })
        setActive(id)
      }
      scroll()
      frame = requestAnimationFrame(scroll)
    }
    goToHash()
    window.addEventListener('hashchange', goToHash)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', goToHash)
    }
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
        <WorkSamples />
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
