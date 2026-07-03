import { useEffect, useRef, useState } from 'react'
import SplitText from './SplitText'

const PROJECTS = [
  {
    n: '01',
    title: 'AI-Powered Q&A Forum',
    desc: 'Microservice integration wiring a Node.js frontend to a Python/Flask backend, with an LLM for automated post-translation. Deployed via Docker with distributed container networking.',
    tags: ['Node.js', 'Python', 'Docker', 'Ollama', 'Flask'],
    cats: ['ai', 'web'],
  },
  {
    n: '02',
    title: 'Dynamic Memory Allocator',
    desc: 'malloc / free / realloc / calloc from scratch, using segregated free lists. Tuned coalescing, splitting, and alignment for >75% heap utilization and >10k kops/sec throughput.',
    tags: ['C', 'Segregated Lists', 'Heap'],
    cats: ['systems'],
  },
  {
    n: '03',
    title: 'Concurrent Web Proxy',
    desc: 'HTTP/1.0 proxy that accepts client connections, parses requests, forwards to origin, and streams responses back. POSIX threads for concurrent request handling.',
    tags: ['C', 'Sockets', 'HTTP', 'Pthreads'],
    cats: ['systems', 'web'],
  },
  {
    n: '04',
    title: 'Linux Shell',
    desc: 'Job control, background/foreground execution, I/O redirection, and built-ins. Careful signal handling and process group management to avoid race conditions.',
    tags: ['C', 'Signals', 'Processes'],
    cats: ['systems'],
  },
  {
    n: '05',
    title: 'Multithreaded Filesystem',
    desc: 'Thread-safe concurrent access with synchronization primitives, preventing conflicting operations across threads.',
    tags: ['C', 'Concurrency', 'Sync'],
    cats: ['systems'],
  },
  {
    n: '06',
    title: 'Instacart Relational Model',
    desc: 'Full database design from user stories — conceptual, relational, physical. Used functional dependencies, closure, and BCNF normalization to shape the schema.',
    tags: ['SQL', 'BCNF', 'Modeling'],
    cats: ['data'],
  },
  {
    n: '07',
    title: 'Cache Simulator',
    desc: 'Configurable cache with LRU replacement and write-back/write-allocate. Cut misses ~75% on a 32×32 matrix via blocking and spatial locality tricks.',
    tags: ['C', 'Memory', 'Bit Tricks'],
    cats: ['systems'],
  },
]

const FILTERS = [
  { id: 'all', label: 'all' },
  { id: 'systems', label: 'systems' },
  { id: 'ai', label: 'ai' },
  { id: 'web', label: 'web' },
  { id: 'data', label: 'data' },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const listRef = useRef(null)
  const visible = PROJECTS.filter(p => filter === 'all' || p.cats.includes(filter))

  // rows are re-created on every filter change, so the app-level reveal
  // observer never sees them — observe each fresh batch here
  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('.reveal')
    if (!rows?.length) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.05 }
    )
    rows.forEach(r => io.observe(r))
    return () => io.disconnect()
  }, [filter])

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <header className="section-head reveal reveal-chars">
          <span className="mono muted section-num">03 —</span>
          <h2 className="section-title">
            <SplitText>Selected</SplitText>{' '}
            <span className="accent-word">
              <SplitText className="display">projects</SplitText>
            </span>
          </h2>
        </header>

        <div className="proj-filters mono reveal">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`proj-filter${filter === f.id ? ' active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="proj-list" key={filter} ref={listRef}>
          {visible.map((p, i) => (
            <li
              className="proj-row reveal"
              key={p.title}
              style={{ '--i': i }}
            >
              <span className="proj-n mono muted">{p.n}</span>
              <div className="proj-body">
                <h3 className="proj-title">
                  <span>{p.title}</span>
                  <span className="proj-arrow">→</span>
                </h3>
                <p className="proj-desc">{p.desc}</p>
                <ul className="pill-list small">
                  {p.tags.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
