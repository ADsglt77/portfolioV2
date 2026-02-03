import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface RevealOptions {
  y?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  once?: boolean
}

/**
 * Apply will-change CSS property for performance optimization
 * @param el - Element or array of elements
 * @param props - CSS properties to optimize (e.g., 'transform, opacity')
 * @returns Cleanup function to remove will-change
 */
export function setWillChange(
  el: Element | Element[],
  props: string
): () => void {
  const elements = Array.isArray(el) ? el : [el]
  const originalValues: Map<Element, string> = new Map()

  elements.forEach((element) => {
    const htmlEl = element as HTMLElement
    originalValues.set(element, htmlEl.style.willChange || '')
    htmlEl.style.willChange = props
  })

  return () => {
    elements.forEach((element) => {
      const htmlEl = element as HTMLElement
      const original = originalValues.get(element) || ''
      if (original) {
        htmlEl.style.willChange = original
      } else {
        htmlEl.style.willChange = ''
      }
    })
  }
}

/**
 * Reveal animation with blur and fade
 * @param el - Element to animate
 * @param opts - Animation options
 * @returns ScrollTrigger instance for cleanup
 */
export function reveal(el: Element, opts: RevealOptions = {}): ScrollTrigger {
  const y = opts.y ?? 24
  const duration = opts.duration ?? 1.0
  const delay = opts.delay ?? 0
  const start = opts.start ?? 'top 80%'
  const once = opts.once ?? false

  gsap.set(el, {
    autoAlpha: 0,
    y,
    filter: 'blur(6px)',
  })

  const animation = gsap.to(el, {
    autoAlpha: 1,
    y: 0,
    filter: 'blur(0px)',
    duration,
    delay,
    ease: 'power2.out',
  })

  const trigger = ScrollTrigger.create({
    trigger: el,
    start,
    animation,
    toggleActions: 'play none none reverse',
    once,
  })

  return trigger
}

/**
 * Stagger reveal animation for multiple elements
 * @param list - Array of elements or selector string
 * @param opts - Animation options
 * @returns Array of ScrollTrigger instances for cleanup
 */
export function staggerReveal(
  list: Element[] | string,
  opts: RevealOptions = {}
): ScrollTrigger[] {
  const elements =
    typeof list === 'string' ? gsap.utils.toArray(list) : list
  const y = opts.y ?? 24
  const duration = opts.duration ?? 1.0
  const delay = opts.delay ?? 0
  const stagger = opts.stagger ?? 0.1
  const start = opts.start ?? 'top 80%'
  const once = opts.once ?? false

  gsap.set(elements, {
    autoAlpha: 0,
    y,
    filter: 'blur(6px)',
  })

  const animation = gsap.to(elements, {
    autoAlpha: 1,
    y: 0,
    filter: 'blur(0px)',
    duration,
    delay,
    stagger,
    ease: 'power2.out',
  })

  const trigger = ScrollTrigger.create({
    trigger: Array.isArray(elements) ? elements[0] : elements,
    start,
    animation,
    toggleActions: 'play none none reverse',
    once,
  })

  return [trigger]
}

/**
 * Parallax background animation
 * @param el - Background element
 * @param opts - Options with trigger element
 * @returns ScrollTrigger instance for cleanup
 */
export function parallaxBg(
  el: Element,
  opts: { trigger: Element }
): ScrollTrigger {
  const trigger = ScrollTrigger.create({
    trigger: opts.trigger,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: gsap.to(el, {
      scale: 1.12,
      yPercent: -6,
      ease: 'none',
    }),
  })

  return trigger
}

/**
 * Check if user prefers reduced motion
 * @returns true if prefers-reduced-motion is enabled
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}


