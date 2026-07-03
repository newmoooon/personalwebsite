export default function SplitText({ children, className = '', delayStep = 22, baseDelay = 0 }) {
  const parts = String(children).split(/(\s+)/)
  let i = 0
  return (
    <span className={`split ${className}`}>
      {parts.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return <span key={wi} className="split-space">&nbsp;</span>
        }
        return (
          <span key={wi} className="split-word">
            {word.split('').map(ch => {
              const idx = i++
              return (
                <span
                  key={idx}
                  className="split-char"
                  style={{ transitionDelay: `${baseDelay + idx * delayStep}ms` }}
                >
                  {ch}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}
