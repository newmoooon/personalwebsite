import { useEffect, useRef, useState } from 'react'

/*
 * Folder intro — the site opens as a little folder of Cindy's papers.
 * Sequence: folder pops in → flap opens and three info pages fan out →
 * the center page zooms until it fills the screen (its background is the
 * site background, so the page it "opens to" IS the website) → overlay
 * fades. Click anywhere to skip. Same contract as the old Preloader:
 * calls onDone() and adds .is-loaded for the hero char animations.
 */

const STAGES = [
  ['in', 650],     // folder bounces in
  ['open', 1250],  // flap opens, pages fan out
  ['zoom', 800],   // center page expands to cover the viewport
  ['done', 850],   // overlay fades while the hero is already animating in
]

export default function FolderIntro({ onDone }) {
  const [stage, setStage] = useState('idle')
  const timers = useRef([])
  const finished = useRef(false)

  const finish = () => {
    if (finished.current) return
    finished.current = true
    document.documentElement.classList.add('is-loaded')
    onDone()
  }

  // seamlessness: the hero's entrance (title chars, butterfly formation)
  // kicks off as soon as the zoomed page covers the screen, so the site is
  // already alive while the overlay fades — no hard cut
  useEffect(() => {
    if (stage === 'done') document.documentElement.classList.add('is-loaded')
  }, [stage])

  useEffect(() => {
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      new URLSearchParams(window.location.search).has('nopreload')
    if (skip) {
      finish()
      return
    }
    let acc = 60
    for (const [name, dur] of STAGES) {
      timers.current.push(setTimeout(() => setStage(name), acc))
      acc += dur
    }
    timers.current.push(setTimeout(finish, acc))
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // click to skip: jump straight to the zoom, then finish quickly
  const skipNow = () => {
    if (stage === 'zoom' || stage === 'done') return
    timers.current.forEach(clearTimeout)
    setStage('zoom')
    timers.current.push(setTimeout(() => setStage('done'), 650))
    timers.current.push(setTimeout(finish, 1450))
  }

  if (finished.current && stage === 'idle') return null

  return (
    <div
      className={`folder-intro stage-${stage}`}
      onClick={skipNow}
      role="presentation"
      aria-hidden="true"
    >
      <p className="fi-hint mono">click to open</p>

      <div className="fi-scene">
        <div className="fi-folder">
          {/* back panel + tab */}
          <div className="fi-back">
            {/* pages — fan out left / right / center */}
            <div className="fi-page fi-page-left mono">
              <span className="fi-page-tag">01 — about</span>
              <span className="fi-page-line">cmu cs &amp; is &apos;28</span>
              <span className="fi-page-line">systems · ai · security</span>
            </div>
            <div className="fi-page fi-page-right mono">
              <span className="fi-page-tag">02 — work</span>
              <span className="fi-page-line">ai price sniper</span>
              <span className="fi-page-line">this very site ✦</span>
            </div>
            {/* center page: its bg is the site bg — zooming it IS the reveal */}
            <div className="fi-page fi-page-center">
              <span className="fi-center-name display">Cindy</span>
              <span className="fi-center-sub mono">portfolio — 2026</span>
            </div>
            {/* front flaps */}
            <div className="fi-front" />
            <div className="fi-front fi-front-right" />
            <span className="fi-sticker">✦</span>
          </div>
        </div>
      </div>
    </div>
  )
}
