import SplitText from './SplitText'

const LANGUAGES = ['Python', 'C', 'Java', 'SQL', 'JavaScript', 'TypeScript', 'Dart', 'HTML/CSS', 'Assembly', 'R', 'Ruby']
const TOOLS = ['Git', 'Docker', 'React', 'Node.js', 'FastAPI', 'Flask', 'Flutter', 'Rails', 'Redis', 'Supabase', 'MongoDB', 'Cloudflare', 'GitHub Actions', 'Figma', 'LaTeX']
const COURSEWORK = [
  'Computer Systems',
  'Imperative Computation',
  'Database Development',
  'Artificial Intelligence',
  'Foundations of Software Engineering',
  'Application Development',
  'Functional Programming',
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <header className="section-head reveal reveal-chars">
          <span className="mono muted section-num">01 —</span>
          <h2 className="section-title">
            <SplitText>About</SplitText>{' '}
            <span className="accent-word">
              <SplitText className="display">me</SplitText>
            </span>
          </h2>
        </header>

        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I&rsquo;m a sophomore at <strong>Carnegie Mellon</strong> studying
              Computer Science &amp; Information Systems. I like problems that
              live between layers — where the abstraction gets thin and the
              details matter.
            </p>
            <p>
              I currently research automated cyber defense with the CMU School
              of Computer Science, modeling logical dependencies between MITRE
              D3FEND techniques so LLMs can reason about incident response
              without hallucinating.
            </p>
            <p>
              When I&rsquo;m not writing code, I&rsquo;m usually reading about
              distributed systems, sketching interfaces, or arguing about
              typography.
            </p>
          </div>

          <aside className="about-side reveal">
            <div className="side-block">
              <p className="mono muted small">education</p>
              <p className="side-h">Carnegie Mellon University</p>
              <p className="muted small">
                B.S. Computer Science &amp; Information Systems
              </p>
              <p className="mono muted small">Pittsburgh, PA · 2023 – 2027</p>
            </div>

            <div className="side-block">
              <p className="mono muted small">coursework</p>
              <ul className="pill-list small">
                {COURSEWORK.map(x => <li key={x}>{x}</li>)}
              </ul>
            </div>

            <div className="side-block">
              <p className="mono muted small">languages</p>
              <ul className="pill-list">
                {LANGUAGES.map(x => <li key={x}>{x}</li>)}
              </ul>
            </div>

            <div className="side-block">
              <p className="mono muted small">tools</p>
              <ul className="pill-list">
                {TOOLS.map(x => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
