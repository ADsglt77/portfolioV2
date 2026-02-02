<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { scrambleText } from '../lib/textScramble'
import Button from './Button.vue'
import { iconSoundOff, iconSoundHigh } from '../data/icons'

const audioRef = inject<{ value: HTMLAudioElement | null }>('audioRef')
const isMuted = ref(true) // mettre false en production

const soundIcon = computed(() => (isMuted.value ? iconSoundOff : iconSoundHigh))

const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (audioRef?.value) {
    audioRef.value.muted = isMuted.value
  }
}

const handleScramble = (e: Event, text: string) => {
  const target = (e.currentTarget as HTMLElement)?.querySelector('p')
  if (target) {
    scrambleText(target, text, { duration: 1000, fps: 10 })
  }
}
</script>

<template>
  <nav>
    <a href="#about" class="nav-link" @mouseenter="handleScramble($event, 'ABOUT')">
      <p>ABOUT</p>
    </a>
    <a href="#experience" class="nav-link" @mouseenter="handleScramble($event, 'WORK')">
      <p>WORK</p>
    </a>
    <a href="#projects" class="nav-link" @mouseenter="handleScramble($event, 'PROJECTS')">
      <p>PROJECTS</p>
    </a>
    <a href="#contact" class="nav-link" @mouseenter="handleScramble($event, 'CONTACT')">
      <p>CONTACT</p>
    </a>
    <Button padding="0.6rem" borderRadius="50%" @click="toggleMute">
      <Icon :icon="soundIcon" :width="16" :height="16" :stroke-width="3" />
    </Button>
  </nav>
</template>

<style scoped>
nav {
  position: absolute;
  top: var(--spacing-xl);
  right: var(--spacing-3xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-2xl);
}

nav * {
  color: var(--text);
}
</style>
