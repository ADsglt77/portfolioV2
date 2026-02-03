import { initLenis, destroyLenis, getLenis } from './lenis'
import { initGsapWithLenis, killAllScrollTriggers } from './gsap'
import { createHomeAnimations } from './home'

export type CleanupFunction = () => void

/**
 * Initialize all animations infrastructure
 * - Lenis smooth scroll
 * - GSAP + ScrollTrigger integration
 * - Section-specific animations (Home, etc.)
 * 
 * @returns Cleanup function to destroy all animations
 */
export function initAnimations(): CleanupFunction {
  // Initialize Lenis
  const lenis = initLenis()

  // Initialize GSAP with Lenis integration
  initGsapWithLenis(lenis)

  // Initialize section animations
  const sectionCleanups: CleanupFunction[] = []

  // Home section animations
  const homeEl = document.getElementById('home') as HTMLElement
  if (homeEl) {
    const homeCleanup = createHomeAnimations(homeEl)
    sectionCleanups.push(homeCleanup)
  }

  // Return cleanup function
  return () => {
    // Cleanup section animations first
    sectionCleanups.forEach((cleanup) => cleanup())

    // Kill all ScrollTriggers
    killAllScrollTriggers()

    // Destroy Lenis
    destroyLenis()
  }
}

// Re-export utilities
export { initLenis, getLenis, destroyLenis } from './lenis'
export { registerScrollTrigger, initGsapWithLenis, killAllScrollTriggers } from './gsap'
export { withSectionContext } from './sections'
export { createHomeAnimations } from './home'
export {
  setWillChange,
  reveal,
  staggerReveal,
  parallaxBg,
  prefersReducedMotion,
  type RevealOptions,
} from './primitives'

