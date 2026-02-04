import { onUnmounted, watch, nextTick, type Ref } from 'vue'
import { textReveal } from '../lib/textReveal'
import type { TextRevealOptions } from '../lib/textReveal'

type UseTextRevealOptions = {
  active?: Ref<boolean> // ex: entered injecté depuis App
  threshold?: number // seuil IntersectionObserver (ex: 0.3)
  rootMargin?: string // marge pour l'observer (ex: '0px' ou '100px')
} & TextRevealOptions

export function useTextReveal(
  elementRef: Ref<HTMLElement | null>,
  text: string,
  options: UseTextRevealOptions = {},
) {
  const {
    active,
    threshold = 0.3,
    rootMargin = '0px',
    delay = 50,
  } = options

  let hasRevealed = false
  let observer: IntersectionObserver | null = null

  // IntersectionObserver pour déclencher textReveal automatiquement
  const setupObserver = () => {
    if (!elementRef.value || !active?.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed && active.value) {
            hasRevealed = true
            if (elementRef.value) {
              textReveal(elementRef.value, text, {
                delay,
              })
            }
            // Désactiver l'observer après la première révélation
            if (observer) {
              observer.disconnect()
              observer = null
            }
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(elementRef.value)
  }

  // Start when active becomes true (or immediately if no active ref)
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
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    reveal: () => {
      if (elementRef.value && !hasRevealed) {
        hasRevealed = true
        textReveal(elementRef.value, text, {
          delay,
        })
      }
    },
  }
}
