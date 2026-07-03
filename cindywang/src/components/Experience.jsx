import SplitText from './SplitText'

const EXPERIENCE = [
  {
    title: '[Software Engineer Intern]',
    org: '[Company One — placeholder]',
    date: 'Summer 2026',
    placeholder: true,
    bullets: [
      'Placeholder — replace with what you shipped, what you owned, what broke and what you fixed.',
      'One line on scope, one line on impact.',
    ],
    tags: ['—', '—', '—'],
  },
  {
    title: '[Software Engineer Intern]',
    org: '[Company Two — placeholder]',
    date: 'Summer 2026',
    placeholder: true,
    bullets: [
      'Placeholder — what you built and why it mattered.',
      'Placeholder — one measurable outcome or lesson.',
    ],
    tags: ['—', '—', '—'],
  },
  {
    title: 'Researcher, Cyber Defense Automation',
    org: 'CMU School of Computer Science × DoD',
    date: 'Sept 2024 — Present',
    bullets: [
      'Building a knowledge graph over 183 MITRE D3FEND techniques so an LLM can compose response playbooks with grounded logical dependencies.',
      'Wrote a Python pipeline that lifts unstructured technical prose into structured JSON, using cosine similarity to match pre/post-conditions.',
      'Cut hallucinations through iterative validation: 89.7% soundness and 98.9% completeness on the final dataset.',
    ],
    tags: ['Python', 'Knowledge Graphs', 'LLMs', 'MITRE D3FEND'],
  },
  {
    title: 'Chief Technology Officer',
    org: 'Aegis, Inc. — Virtual Enterprises Intl.',
    date: 'Aug 2023 — May 2024',
    bullets: [
      'Directed IT and marketing for a student-led virtual firm competing against 7,000+ international teams.',
      'Shipped the company site — generated $45k in simulated sales in the first quarter through UX iteration.',
      'Presented market research at regional business plan competitions and trade shows.',
    ],
    tags: ['Web', 'UX', 'Leadership'],
  },
  {
    title: 'Student Researcher',
    org: 'UC Davis COSMOS Program',
    date: 'Jul 2023 — Aug 2023',
    bullets: [
      'Nuclear physics and electro-optics — analyzed experimental data and modeled system behavior with calculus-based approaches.',
    ],
    tags: ['Research', 'Physics'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <header className="section-head reveal reveal-chars">
          <span className="mono muted section-num">02 —</span>
          <h2 className="section-title">
            <SplitText>Where I&rsquo;ve</SplitText>{' '}
            <span className="accent-word">
              <SplitText className="display">worked</SplitText>
            </span>
          </h2>
        </header>

        <ol className="xp-list">
          {EXPERIENCE.map((x, i) => (
            <li
              key={i}
              className={`xp-item reveal${x.placeholder ? ' placeholder' : ''}`}
            >
              <div className="xp-date mono muted">{x.date}</div>
              <div className="xp-body">
                <div className="xp-head">
                  <h3 className="xp-title">
                    {x.title}
                    {x.placeholder && (
                      <span className="tag-inline mono">tba</span>
                    )}
                  </h3>
                  <p className="xp-org muted">{x.org}</p>
                </div>
                <ul className="xp-bullets">
                  {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <ul className="pill-list small">
                  {x.tags.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
