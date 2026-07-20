import { useEffect, useRef, useState } from 'react'
import SplitText from './SplitText'

/* Projects mirror the resume (old + current). `href` renders the row as a
   link; leave it null until the repo is public (a dead link is worse than
   none). */
const PROJECTS = [
  {
    n: '01',
    title: 'Creamery Management Platform',
    bullets: [
      <>Built a full-stack multi-store retail chain management platform through <strong>test-driven development</strong>, achieving <strong>100% code coverage</strong> with <strong>250+ automated unit tests and behavior-driven Cucumber tests</strong>.</>,
      <>Developed the application using <strong>Ruby on Rails</strong> (MVC) and <strong>React</strong>, designing a relational database schema with <strong>8 models</strong>, implementing a versioned <strong>JSON REST API</strong> with <strong>15+ endpoints</strong>, and building interactive dashboards with a <strong>live time-clock</strong> for payroll calculation.</>,
      <>Configured <strong>session-based authentication</strong> with <strong>bcrypt</strong> and <strong>role-based authorization</strong> using <strong>CanCanCan</strong>, securing <strong>13 controllers</strong> and <strong>50+ views</strong> across <strong>3 permission tiers</strong>.</>,
    ],
    tags: ['Ruby on Rails', 'React', 'SQLite', 'CanCanCan'],
    cats: ['web', 'data'],
  },
  {
    n: '02',
    title: 'AI-Powered Q&A Forum',
    desc: 'Microservice integration wiring a Node.js frontend to a Python/Flask backend, with an LLM for automated post-translation. Managed production deployment via Docker, configuring networking and external hosts for seamless API communication between distributed containers.',
    tags: ['Node.js', 'Python', 'Docker', 'Ollama', 'Flask'],
    cats: ['ai', 'web'],
  },
  {
    n: '03',
    title: 'Dynamic Memory Allocator',
    bullets: [
      <>Programmed a <strong>memory management system</strong> in C implementing malloc, free, realloc, and calloc using <strong>segregated free lists</strong>.</>,
      <>Optimized memory efficiency by minimizing data layout overhead, achieving <strong>75%+ heap utilization</strong> and <strong>10,000+ KOPS throughput</strong>.</>,
      <>Implemented runtime consistency checks to validate memory safety, allocator correctness, and data structure integrity across a <strong>64-bit address space</strong>.</>,
    ],
    tags: ['C', 'Segregated Lists', 'Heap'],
    cats: ['systems'],
  },
  {
    n: '04',
    title: 'Concurrent Web Proxy',
    desc: 'HTTP/1.0 proxy that accepts client connections, parses requests, forwards them to end servers, and streams responses back. Enabled concurrent request handling via POSIX threads, avoiding blocking on slow or long-lived connections.',
    tags: ['C', 'Sockets', 'HTTP', 'Pthreads'],
    cats: ['systems', 'web'],
  },
  {
    n: '05',
    title: 'Linux Shell',
    desc: 'A shell supporting job control, background/foreground execution, I/O redirection, and built-in commands, with signal handling and process-group management to avoid race conditions.',
    tags: ['C', 'Signals', 'Processes'],
    cats: ['systems'],
  },
  {
    n: '06',
    title: 'Multithreaded Filesystem',
    desc: 'Thread-safe concurrent access with synchronization primitives, preventing conflicting operations across threads.',
    tags: ['C', 'Concurrency', 'Sync'],
    cats: ['systems'],
  },
  {
    n: '07',
    title: 'Cache Simulator',
    desc: 'Configurable cache with LRU replacement and write-back/write-allocate policies. Reduced misses ~75% (from ~1,200 to <300) on a 32×32 matrix via blocking and spatial locality.',
    tags: ['C', 'Memory', 'Bit Tricks'],
    cats: ['systems'],
  },
  {
    n: '08',
    title: 'Instacart Relational Model',
    desc: 'Full database design from user stories — conceptual, relational, physical. Used functional dependencies, closure, and BCNF normalization to shape the schema.',
    tags: ['SQL', 'BCNF', 'Modeling'],
    cats: ['data'],
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
          <span className="mono muted section-num">02 —</span>
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
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer">
                      <span>{p.title}</span>
                      <span className="proj-arrow">↗</span>
                    </a>
                  ) : (
                    <span>{p.title}</span>
                  )}
                </h3>
                {p.bullets ? (
                  <ul className="proj-bullets">
                    {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                ) : (
                  <p className="proj-desc">{p.desc}</p>
                )}
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
