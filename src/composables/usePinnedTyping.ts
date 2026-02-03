import { onUnmounted, watch, nextTick, type Ref } from 'vue'
import { typing } from '../lib/typing'

type Options = {
  active?: Ref<boolean> // ex: entered injecté depuis App
  typingDuration?: number // durée du typing automatique (ex: 3000)
  threshold?: number // seuil IntersectionObserver (ex: 0.3)
}

export function usePinnedTyping(
  sectionRef: Ref<HTMLElement | null>,
  fullText: string,
  displayedText: Ref<string>,
  options: Options = {}
) {
  const {
    active,
    typingDuration = 3000,
    threshold = 0.3,
  } = options

  let hasTyped = false
  let observer: IntersectionObserver | null = null

  // IntersectionObserver pour déclencher le typing automatiquement
  const setupObserver = () => {
    if (!sectionRef.value || !active?.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTyped && active.value) {
            hasTyped = true
            displayedText.value = '' // Reset avant de commencer
            typing(displayedText, fullText, { duration: typingDuration })
          }
        })
      },
      { threshold }
    )

    observer.observe(sectionRef.value)
  }

  // start when active becomes true (or immediately if no active ref)
  watch(
    active ?? ( { value: true } as Ref<boolean> ),
    async (isActive) => {
      if (!isActive) return
      await nextTick()
      setupObserver()
    },
    { immediate: true }
  )

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
}
