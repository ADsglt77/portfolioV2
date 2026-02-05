import { onUnmounted, watch, nextTick, type Ref } from 'vue'
import { fadeIn } from '../lib/fadeIn'
import type { FadeInOptions } from '../lib/fadeIn'

type UseFadeInOptions = {
  active?: Ref<boolean> // ex: entered injecté depuis App
  threshold?: number // seuil IntersectionObserver (ex: 0.3)
} & FadeInOptions

export function useFadeIn(elementRef: Ref<HTMLElement | null>, options: UseFadeInOptions = {}) {
  const {
    active,
    threshold = 0.3,
    duration = 800,
    delay = 0,
    translateY = 20,
    translateX = 0,
    opacity = 1,
  } = options

  let hasAnimated = false
  let observer: IntersectionObserver | null = null
  let timeoutId: number | null = null

  const reset = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    if (elementRef.value) {
      elementRef.value.style.opacity = '0'
      elementRef.value.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
  }

  const setupObserver = () => {
    if (!elementRef.value || !active?.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated && active.value) {
            hasAnimated = true
            if (elementRef.value) {
              timeoutId = fadeIn(elementRef.value, {
                duration,
                delay,
                translateY,
                translateX,
                opacity,
              })
            }
          } else if (!entry.isIntersecting && hasAnimated) {
            hasAnimated = false
            reset()
          }
        })
      },
      { threshold },
    )

    observer.observe(elementRef.value)
  }

  watch(
    active ?? ({ value: true } as Ref<boolean>),
    async (isActive) => {
      if (!isActive) return
      await nextTick()
      setupObserver()
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    trigger: () => {
      if (elementRef.value && !hasAnimated) {
        hasAnimated = true
        timeoutId = fadeIn(elementRef.value, { duration, delay, translateY, translateX, opacity })
      }
    },
  }
}
