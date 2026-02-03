import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { withSectionContext } from './sections'
import { setWillChange, prefersReducedMotion, type RevealOptions } from './primitives'
import type { CleanupFunction } from './index'

/**
 * Create animations for the home section
 * @param sectionEl - Home section element
 * @returns Cleanup function
 */
export function createHomeAnimations(sectionEl: HTMLElement): CleanupFunction {
  // Check for reduced motion preference
  if (prefersReducedMotion()) {
    // Set elements visible without animations
    const elements = sectionEl.querySelectorAll('[data-anim]')
    gsap.set(elements, { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
    return () => {
      // No cleanup needed for reduced motion
    }
  }

  // Use section context for automatic cleanup
  let internalCleanup: (() => void) | null = null

  const contextCleanup = withSectionContext(sectionEl, (ctx) => {
    // Select elements by data-anim attributes
    const homeBg = sectionEl.querySelector('[data-anim="home-bg"]') as HTMLElement
    const homeLogo = sectionEl.querySelector('[data-anim="home-logo"]') as HTMLElement
    const homeNav = sectionEl.querySelector('[data-anim="home-nav"]') as HTMLElement
    const homeTitle = sectionEl.querySelector('[data-anim="home-title"]') as HTMLElement
    const homeScrollHint = sectionEl.querySelector(
      '[data-anim="home-scrollhint"]'
    ) as HTMLElement
    const homeMetaDay = sectionEl.querySelector(
      '[data-anim="home-meta-day"]'
    ) as HTMLElement
    const homeMetaTime = sectionEl.querySelector(
      '[data-anim="home-meta-time"]'
    ) as HTMLElement

    if (!homeBg || !homeLogo || !homeNav || !homeTitle || !homeScrollHint) {
      return
    }

    // Apply will-change for performance
    const cleanupWillChange = setWillChange(
      [homeBg, homeLogo, homeNav, homeTitle, homeScrollHint, homeMetaDay, homeMetaTime].filter(
        Boolean
      ),
      'transform, opacity, filter'
    )

    // A) Intro timeline (when user arrives on HOME, no scroll needed)
    const introTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // Logo + Nav: y 10 -> 0, autoAlpha 0 -> 1, blur 6 -> 0, duration 1.1
    introTimeline
      .fromTo(
        homeLogo,
        { autoAlpha: 0, y: 10, filter: 'blur(6px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.1 },
        0
      )
      .fromTo(
        homeNav,
        { autoAlpha: 0, y: 10, filter: 'blur(6px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.1 },
        0.08
      )

    // Title: autoAlpha 0 -> 1, y 18 -> 0, duration 1.2
    introTimeline.fromTo(
      homeTitle,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 1.2 },
      0.12
    )

    // Metas: autoAlpha 0 -> 1, y 8 -> 0, duration 1.0
    if (homeMetaDay) {
      introTimeline.fromTo(
        homeMetaDay,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 1.0 },
        0.1
      )
    }
    if (homeMetaTime) {
      introTimeline.fromTo(
        homeMetaTime,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 1.0 },
        0.12
      )
    }

    // Scroll hint: autoAlpha 0 -> 1, y 12 -> 0
    introTimeline.fromTo(
      homeScrollHint,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 1.0 },
      0.2
    )

    // B) Parallax background scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(homeBg, {
        scale: 1.12,
        yPercent: -6,
        ease: 'none',
      }),
    })

    // C) Scroll hint "breath" animation (infinite, subtle)
    const scrollHintIcon = homeScrollHint.querySelector('svg') as SVGSVGElement
    const breathTimeline = gsap.timeline({ repeat: -1, yoyo: true })

    breathTimeline.to(
      homeScrollHint,
      {
        y: 10,
        autoAlpha: 0.35,
        duration: 2.8,
        ease: 'sine.inOut',
      },
      0
    )

    if (scrollHintIcon) {
      breathTimeline.to(
        scrollHintIcon,
        {
          y: 6,
          duration: 2.8,
          ease: 'sine.inOut',
        },
        0
      )
    }

    // Pause/resume on hover (without changing global JS)
    const handleMouseEnter = () => breathTimeline.pause()
    const handleMouseLeave = () => breathTimeline.resume()

    homeScrollHint.addEventListener('mouseenter', handleMouseEnter)
    homeScrollHint.addEventListener('mouseleave', handleMouseLeave)

    // Store internal cleanup function
    internalCleanup = () => {
      cleanupWillChange()
      introTimeline.kill()
      parallaxTrigger.kill()
      breathTimeline.kill()
      homeScrollHint.removeEventListener('mouseenter', handleMouseEnter)
      homeScrollHint.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  // Return combined cleanup
  return () => {
    if (internalCleanup) {
      internalCleanup()
    }
    contextCleanup()
  }
}

