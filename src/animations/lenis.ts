import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/**
 * Initialize Lenis smooth scroll (singleton)
 * @returns Lenis instance
 */
export function initLenis(): Lenis {
  if (lenisInstance) {
    return lenisInstance
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  return lenisInstance
}

/**
 * Get current Lenis instance
 * @returns Lenis instance or null
 */
export function getLenis(): Lenis | null {
  return lenisInstance
}

/**
 * Destroy Lenis instance and cleanup
 */
export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}


