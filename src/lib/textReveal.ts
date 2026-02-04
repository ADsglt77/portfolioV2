export interface TextRevealOptions {
  delay?: number // Délai entre chaque lettre (en ms)
}

export function textReveal(
  element: HTMLElement,
  text: string,
  options: TextRevealOptions = {},
): void {
  const { delay = 50 } = options

  element.innerHTML = ''
  const chars = text.split('')
  const spans: HTMLSpanElement[] = []

  // Créer tous les spans
  chars.forEach((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.opacity = '0'
    span.style.transition = 'opacity 0.3s ease-out'
    span.style.display = 'inline-block'
    element.appendChild(span)
    spans.push(span)
  })

  // Mélanger les indices une seule fois (Fisher-Yates shuffle)
  const indices = Array.from({ length: spans.length }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = indices[i]!
    indices[i] = indices[j]!
    indices[j] = temp
  }

  // Révéler dans l'ordre mélangé
  indices.forEach((index, i) => {
    const span = spans[index]
    if (span) {
      setTimeout(() => {
        span.style.opacity = '1'
      }, i * delay)
    }
  })
}
