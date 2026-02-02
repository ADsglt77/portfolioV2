<script setup lang="ts">
import { ref } from 'vue'
import { scrambleFromEvent } from '../lib/textScramble'

interface Props {
  label?: string
  disabled?: boolean
  padding?: string
  borderRadius?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--radius-lg) 0',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonRef = ref<HTMLElement>()
const displayLabel = ref(props.label)

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const handleMouseEnter = (e: Event) => {
  if (props.label && buttonRef.value) {
    scrambleFromEvent(e, props.label, { duration: 1000, fps: 10 })
  }
}
</script>

<template>
  <button
    ref="buttonRef"
    :class="{ 'btn--disabled': disabled }"
    :style="{
      padding: padding,
      borderRadius: borderRadius,
    }"
    :disabled="disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <slot>{{ displayLabel }}</slot>
  </button>
</template>

<style scoped>
button {
  width: fit-content;
  display: flex;
  align-items: center;
  color: var(--text);
  font-family: var(--font-mono, 'Space Mono', monospace);
  cursor: pointer;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  &:hover {
    background: var(--glass-hover);
    border: 1px solid var(--glass-border-hover);
  }
}

.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
