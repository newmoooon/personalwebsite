import SplitText from './SplitText'

const LINKS = [
  { href: 'mailto:xinyuew4@andrew.cmu.edu', label: 'email', val: 'xinyuew4@andrew.cmu.edu' },
  { href: 'https://www.linkedin.com/in/xinyuewangcindy', label: 'linkedin', val: '/in/xinyuewangcindy' },
  { href: 'https://github.com/newmoooon', label: 'github', val: '/newmoooon' },
  { href: `${import.meta.env.BASE_URL}resume.pdf`, label: 'resume', val: 'one-page pdf' },
]

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <header className="section-head reveal reveal-chars">
          <span className="mono muted section-num">04 —</span>
          <h2 className="section-title">
            <SplitText>Say</SplitText>{' '}
            <span className="accent-word">
              <SplitText className="display">hello</SplitText>
            </span>
          </h2>
        </header>

        <div className="contact-wrap reveal">
          <p className="contact-lede">
            I&rsquo;m open to fall 2026 and summer 2027 internships, research,
            and interesting problems. The inbox is always open — I usually reply
            within a day.
          </p>

          <a href="mailto:xinyuew4@andrew.cmu.edu" className="contact-email">
            <span className="mono muted small">write to</span>
            <span className="contact-email-val">
              xinyuew4@andrew.cmu.edu
              <span className="arrow">→</span>
            </span>
          </a>

          <ul className="contact-links mono">
            {LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  <span className="muted">{l.label}</span>
                  <span>{l.val}</span>
                  <span className="arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
