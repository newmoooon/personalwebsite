import SplitText from './SplitText'

const EXPERIENCE = [
  {
    title: 'Software Engineer Intern',
    org: 'LeapBound AI',
    date: 'Jun 2026 — Present',
    bullets: [
      <>Independently designed and shipped two production, full-stack AI brand-intelligence engines targeted at small-to-medium Chinese companies entering the US market: an <strong>SEO</strong> audit surfacing technical fixes and content-credibility gaps, and a <strong>GEO</strong> audit scoring <strong>AI citation rate</strong> and <strong>share-of-voice</strong> against competitors, live at leapbound.ai.</>,
      <>Built both tools end-to-end on Cloudflare and Supabase, owning the Python audit pipeline, FastAPI endpoints, <strong>database schema/RPCs</strong>, and Next.js frontend, including an <strong>LLM-guided crawler</strong> that curates each sitemap to relevant pages.</>,
      <>Engineered the SEO audit&rsquo;s crawl-to-report pipeline: deep site-crawls and Google PageSpeed data feed a <strong>deterministic</strong> technical analyzer (duplicate titles, meta descriptions, schema) plus a credibility check that flags unsupported marketing claims, output as a prioritized 30-day plan with hour estimates.</>,
      <>Implemented the GEO evaluation harness: generates market-aware buyer questions, extracts and verifies brand citations in LLM responses (blocking <strong>hallucinated</strong> competitor mentions), and computes a composite visibility score from citation rate, content readiness, and authority signals grounded in Wikipedia, Wikidata, and Common Crawl, surfacing false claims AI assistants make about client brands.</>,
    ],
    tags: ['Next.js', 'FastAPI', 'Cloudflare', 'Supabase', 'LLMs'],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Howbe Inc. — WhoBe (Personal CRM)',
    date: 'Apr 2026 — Present',
    bullets: [
      <>Built and shipped core features for WhoBe, a Flutter-based personal CRM app, spanning backend API design, data-layer consistency, and reactive frontend state management.</>,
      <>Hardened the <strong>read/write consistency</strong> of a Google Sheets-backed data layer (dynamic schema-aware reads, redesigned caching), then built a <strong>bulk aggregation API</strong> that replaced O(n) per-contact requests with a <strong>single round-trip</strong>, powering live unread indicators and custom sort ordering.</>,
      <>Developed a <strong>reactive client-side state layer</strong> (coalesced refresh, persisted read state) driving live Flutter UI updates without manual reloads, backed by <strong>~30 new unit and integration tests</strong> across pytest and the Flutter suite.</>,
    ],
    tags: ['Flutter', 'Python', 'Google Sheets API'],
  },
  {
    title: 'Researcher, Cyber Defense Automation',
    org: 'CMU School of Computer Science × DoD',
    date: 'Sept 2024 — Present',
    bullets: [
      <>Built the extraction pipeline for <strong>CyberKG</strong>, a cyber-defense knowledge graph enabling AI-generated incident-response playbooks across <strong>183 MITRE D3FEND</strong> techniques; co-authored a paper on this work submitted to the <strong>2026 IEEE Conference on Communications and Network Security (CNS)</strong>.</>,
      <>Designed an LLM-based extraction methodology (<strong>Chain-of-Thought reasoning</strong>, ReAct-style decomposition), constraining the model to each technique&rsquo;s official text and requiring <strong>evidence-grounded</strong> justification per predicate to reduce <strong>hallucination</strong>.</>,
      <>Achieved <strong>88.1% precondition</strong> and <strong>89.8% postcondition</strong> extraction accuracy across all 183 techniques, validated using an <strong>LLM cross validation</strong> and expert manual review.</>,
    ],
    tags: ['Python', 'LLMs', 'MITRE D3FEND', 'Knowledge Graph'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <header className="section-head reveal reveal-chars">
          <span className="mono muted section-num">01 —</span>
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
