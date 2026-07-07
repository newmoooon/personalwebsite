import SplitText from './SplitText'

const EXPERIENCE = [
  {
    title: 'Software Engineer Intern',
    org: 'LeapBound AI',
    date: 'Jun 2026 — Present',
    bullets: [
      'Shipped a full-stack SEO-audit platform to production, crawling 100+ pages per site across 5 client brands.',
      'Designed a 7-stage LLM pipeline with anti-hallucination guardrails — index-based outputs, deterministic validators, auto-retry — to keep recommendations grounded and evidence-cited.',
      "Built the crawler and caching layer's domain-resolution logic, covered by a 49-test regression suite, to keep full-site audits reliable at scale.",
    ],
    tags: ['TypeScript', 'FastAPI', 'Cloudflare', 'Supabase'],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Howbe Inc. — WhoBe (Personal CRM)',
    date: 'Apr 2026 — Present',
    bullets: [
      'Engineered the read/write consistency model for a Google Sheets-backed data layer — schema-aware reads, redesigned caching — to keep contact state reliably in sync.',
      'Built a bulk aggregation API replacing O(n) per-contact requests with a single round-trip, powering real-time unread indicators and custom sort ordering.',
      'Built a reactive client-side state layer driving live Flutter UI updates without manual reloads, backed by 100%-passing pytest and Flutter test suites.',
    ],
    tags: ['Flutter', 'Python', 'Google Sheets API'],
  },
  {
    title: 'Researcher, Cyber Defense Automation',
    org: 'CMU School of Computer Science × DoD',
    date: 'Sept 2024 — Present',
    bullets: [
      'Built a pipeline extracting formal pre/postconditions from unstructured MITRE D3FEND text across 183 techniques via multi-stage LLM prompting — chain-of-thought, decomposition, RAG, cross-model validation across GPT and Gemini.',
      'Translated natural-language conditions into first-order logic through divide-and-conquer decomposition, then used the Z3 SMT solver to formally verify state-to-state dependencies between defensive actions.',
      'Reached 89.7% soundness and 98.9% completeness on the resulting knowledge base through predicate purification, inferred micro-implications, and iterative expert validation.',
    ],
    tags: ['Python', 'Z3', 'LLMs', 'MITRE D3FEND'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <header className="section-head reveal reveal-chars">
          <span className="mono muted section-num">03 —</span>
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
