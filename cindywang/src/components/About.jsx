import SplitText from './SplitText'

const LANGUAGES = ['Python', 'C', 'SQL (PostgreSQL)', 'Java', 'JavaScript', 'HTML/CSS', 'Ruby', 'Assembly', 'R']
const TOOLS = ['React', 'Next.js', 'FastAPI', 'Flutter', 'Ruby on Rails', 'Git', 'Docker', 'CI/CD', 'Supabase', 'Cloudflare', 'REST APIs']
const COURSEWORK = [
  'Application + Database Design and Development',
  'Computer Systems',
  'Software Engineering',
  'Artificial Intelligence',
  'Functional Programming',
  'Imperative Computation',
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-left">
            <header className="section-head reveal reveal-chars">
              <span className="mono muted section-num">03 —</span>
              <h2 className="section-title">
                <SplitText>About</SplitText>{' '}
                <span className="accent-word">
                  <SplitText className="display">me</SplitText>
                </span>
              </h2>
            </header>

            <div className="about-text reveal">
              <p>
                I&rsquo;m a junior at <strong>Carnegie Mellon</strong> studying
                Computer Science &amp; Information Systems, graduating May 2028.
              </p>
              <p>
                I research automated cyber defense with the CMU School of
                Computer Science, and I like problems that live between layers —
                where the abstraction gets thin and the details matter.
              </p>
            </div>
          </div>

          <div className="about-portrait reveal">
            <img
              src={`${import.meta.env.BASE_URL}portrait.jpg`}
              alt="Xinyue (Cindy) Wang"
            />
          </div>
        </div>

        <div className="about-facts reveal">
          <div className="side-block">
            <p className="mono muted small">education</p>
            <p className="side-h">Carnegie Mellon University</p>
            <p className="muted small">
              B.S. Computer Science &amp; Information Systems
            </p>
            <p className="mono muted small">Pittsburgh, PA · 2024 – 2028</p>
          </div>

          <div className="side-block">
            <p className="mono muted small">coursework</p>
            <ul className="pill-list small">
              {COURSEWORK.map(x => <li key={x}>{x}</li>)}
            </ul>
          </div>

          <div className="side-block">
            <p className="mono muted small">languages</p>
            <ul className="pill-list small">
              {LANGUAGES.map(x => <li key={x}>{x}</li>)}
            </ul>
          </div>

          <div className="side-block">
            <p className="mono muted small">tools</p>
            <ul className="pill-list small">
              {TOOLS.map(x => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
