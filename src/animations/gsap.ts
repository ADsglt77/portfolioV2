import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

let isRegistered = false

/**
 * Register ScrollTrigger plugin (call once)
 */
export function registerScrollTrigger(): void {
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger)
    isRegistered = true
  }
}

/**
 * Initialize GSAP with Lenis integration
 * @param lenis - Lenis instance
 */
export function initGsapWithLenis(lenis: Lenis): void {
  registerScrollTrigger()

  // Disable lag smoothing for better performance
  gsap.config({
    nullTargetWarn: false,
  })
  gsap.ticker.lagSmoothing(0)

  // Configure ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: false,
  })

  // Sync ScrollTrigger with Lenis scroll events
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP ticker to call Lenis RAF
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Disable GSAP ticker lag smoothing
  gsap.ticker.lagSmoothing(0)
}

/**
 * Kill all ScrollTrigger instances and cleanup
 */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill()
  })
  ScrollTrigger.clearScrollMemory()
  gsap.globalTimeline.clear()
}

