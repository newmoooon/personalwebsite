import SplitText from './SplitText'

const SAMPLES = [
  {
    title: 'Full Stack Store Management Application',
    category: 'Full stack development',
    href: 'https://docs.google.com/document/d/1HcWYp77OlemTeZmd0k86oHDo17sChi8fj84mOGerlLQ/edit?tab=t.0',
  },
  {
    title: 'Full Stack SEO and GEO Audit Tools',
    category: 'Full stack & AI',
    href: 'https://docs.google.com/document/d/1pHtN_oYyuRm7ivdFPDzI-ksmOBAxbTNPhVJCMXCMKq8/edit?usp=sharing',
  },
  {
    title: 'Mobile App WhoBe',
    category: 'Mobile development',
    href: 'https://docs.google.com/document/d/1rCtvhmF7tpYua3N_oOEiZdH_XnmlG0MpWKLoU_HUD6Q/edit?tab=t.0',
  },
  {
    title: 'Full Stack + Microservice Discussion Forum',
    category: 'Full stack & microservices',
    href: 'https://docs.google.com/document/d/1VyHx-i-EIXNLD7MtkhzhHQVvttQxWss2SbhLQXE3kDk/edit?tab=t.0#heading=h.jct5lpnztogx',
  },
]

export default function WorkSamples() {
  return (
    <section id="work-samples" className="section">
      <div className="section-inner">
        <header className="section-head reveal reveal-chars">
          <span className="mono muted section-num">02 —</span>
          <h2 className="section-title">
            <SplitText>Work</SplitText>{' '}
            <span className="accent-word">
              <SplitText className="display">samples</SplitText>
            </span>
          </h2>
        </header>
        <p className="samples-intro muted reveal">
          A closer look at my work, with images and project details. Each sample opens in Google Docs.
        </p>
        <ul className="samples-grid">
          {SAMPLES.map((sample, i) => (
            <li className="reveal" key={sample.href}>
              <a className="sample-card" href={sample.href} target="_blank" rel="noopener noreferrer"
                aria-label={`${sample.title} — view work sample in Google Docs (opens in a new tab)`}>
                <span className="sample-meta mono">
                  <span>{String(i + 1).padStart(2, '0')} / {sample.category}</span>
                  <span className="sample-arrow" aria-hidden="true">↗</span>
                </span>
                <h3 className="sample-title">{sample.title}</h3>
                <span className="sample-link mono">View work sample <span aria-hidden="true">↗</span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
