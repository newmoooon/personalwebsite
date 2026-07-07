import SplitText from './SplitText'
import Scramble from './Scramble'

const LINKS = [
  { href: 'mailto:xyw721@gmail.com', label: 'email', val: 'xyw721@gmail.com' },
  { href: 'https://www.linkedin.com/in/xinyuewangcindy', label: 'linkedin', val: '/in/xinyuewangcindy' },
  { href: 'https://github.com/xinyuewang', label: 'github', val: '/xinyuewang' },
  { href: '/resume.pdf', label: 'resume', val: 'one-page pdf' },
]

const MARQUEE = "let's build something ✦ "

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="big-marquee" aria-hidden="true">
        <div className="big-marquee-track serif italic">
          {[...Array(4)].map((_, i) => (
            <span key={i}>{MARQUEE}</span>
          ))}
        </div>
      </div>

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
            I&rsquo;m open to internships, research, and interesting problems.
            The inbox is always open — I usually reply within a day.
          </p>

          <a href="mailto:xyw721@gmail.com" className="contact-email">
            <span className="mono muted small">write to</span>
            <span className="contact-email-val">
              xyw721@gmail.com
              <span className="arrow">→</span>
            </span>
          </a>

          <ul className="contact-links mono">
            {LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  <Scramble className="muted" text={l.label} />
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
