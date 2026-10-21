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

export function scrollToEl(el, { immediate = false, offset = 0, updateUrl = true } = {}) {
  if (!el) return
  if (updateUrl) {
    const hash = el.id === 'home' ? '' : `#${el.id}`
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
    }
  }
  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      immediate,
      duration: 1.3,
      easing: t => 1 - Math.pow(1 - t, 4),
    })
  } else {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + offset,
      behavior: immediate ? 'instant' : 'smooth',
    })
  }
}
