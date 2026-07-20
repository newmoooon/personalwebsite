import SplitText from './SplitText'

const EXPERIENCE = [
  {
    title: 'Software Engineer Intern',
    org: 'LeapBound AI',
    date: 'Jun 2026 — Present',
    bullets: [
      <>Independently architected and shipped <strong>2 production full stack AI applications</strong> at leapbound.ai for analyzing search visibility and AI brand visibility, delivering client reports with prioritized recommendations.</>,
      <>Engineered scalable infrastructure using <strong>Python, FastAPI, Next.js, Supabase (PostgreSQL), and Cloudflare</strong>, with asynchronous services, LLM-assisted processing pipelines, and integrations with <strong>5 external APIs</strong>.</>,
      <>Optimized the production crawl pipeline for websites with up to <strong>1,000 discovered URLs</strong>, improving crawl performance by <strong>3x</strong> through a redesigned page selection strategy.</>,
      <>Engineered the SEO audit&rsquo;s crawl-to-report pipeline: deep site-crawls and Google PageSpeed data feed a <strong>deterministic</strong> technical analyzer (duplicate titles, meta descriptions, schema) plus a credibility check that flags unsupported marketing claims, output as a prioritized 30-day plan with hour estimates.</>,
      <>Implemented the GEO evaluation harness: generates market-aware buyer questions, extracts and verifies brand citations in LLM responses (blocking <strong>hallucinated</strong> competitor mentions), and computes a composite visibility score from citation rate, content readiness, and authority signals grounded in Wikipedia, Wikidata, and Common Crawl, surfacing false claims AI assistants make about client brands.</>,
    ],
    tags: ['Next.js', 'FastAPI', 'Cloudflare', 'Supabase', 'LLMs'],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Howbe Technology — WhoBe (Personal CRM)',
    date: 'Apr 2026 — Jun 2026',
    bullets: [
      <>Engineered production features for a <strong>cross-platform Flutter application</strong> (App: WhoBe) with a <strong>FastAPI backend</strong>, delivering backend services and cloud-integrated application workflows.</>,
      <>Streamlined backend performance by designing <strong>REST APIs</strong> on <strong>Google Cloud Run</strong>, replacing <strong>O(n) client requests</strong> with a single bulk aggregation endpoint to minimize network overhead.</>,
      <>Resolved caching and state synchronization race conditions, including a silent data loss bug, improving reliability with <strong>30+ unit and integration tests</strong> across <strong>Flutter</strong> and <strong>pytest</strong>.</>,
    ],
    tags: ['Flutter', 'Python', 'Google Sheets API'],
  },
  {
    title: 'Researcher, Cyber Defense Automation',
    org: 'CMU School of Computer Science × DoD',
    date: 'Sept 2024 — Present',
    bullets: [
      <>Researched <strong>automated cyber defense playbook generation</strong> and knowledge graph construction across <strong>183 MITRE D3FEND</strong> techniques; currently co-authoring an <strong>IEEE conference paper</strong>.</>,
      <>Engineered a <strong>RAG framework</strong> leveraging <strong>LLMs</strong> and agentic reasoning to parse action semantics and mitigate hallucinations.</>,
      <>Developed <strong>Python tooling</strong> for <strong>cross-LLM validation</strong> and automated quality assessment, achieving <strong>88.1% precondition</strong> and <strong>89.8% postcondition extraction accuracy</strong>.</>,
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
