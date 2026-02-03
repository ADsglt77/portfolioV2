import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Context } from 'gsap/Context'

/**
 * Helper to create a section-scoped animation context
 * All animations created within the callback will be automatically scoped to the element
 * and cleaned up when the returned function is called
 * 
 * @param el - Element to scope animations to
 * @param cb - Callback function that creates animations
 * @returns Cleanup function
 */
export function withSectionContext(
  el: Element,
  cb: (ctx: Context) => void
): () => void {
  const ctx = gsap.context(cb, el)

  return () => {
    // Revert all animations in this context
    ctx.revert()
    
    // Kill any ScrollTriggers associated with this context
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars && el.contains(trigger.vars.trigger as Element)) {
        trigger.kill()
      }
    })
  }
}


