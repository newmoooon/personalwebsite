import Lenis from 'lenis'

let lenis = null

export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.09,
    wheelMultiplier: 1,
  })
  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}

export function pauseLenis(paused) {
  if (!lenis) return
  paused ? lenis.stop() : lenis.start()
}

export function scrollToEl(el) {
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, {
      offset: 0,
      duration: 1.3,
      easing: t => 1 - Math.pow(1 - t, 4),
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
