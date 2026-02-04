<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type Lenis from 'lenis'
import { scrambleText } from '../lib/textScramble'
import Button from './Button.vue'
import { iconSoundOff, iconSoundHigh } from '../data/icons'

const audioRef = inject<{ value: HTMLAudioElement | null }>('audioRef')
const getLenisInstance = inject<() => Lenis | null>('lenis')
const isMuted = ref(true) // mettre false en production

const soundIcon = computed(() => (isMuted.value ? iconSoundOff : iconSoundHigh))

const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (audioRef?.value) {
    audioRef.value.muted = isMuted.value
  }
}

const handleScramble = (e: Event, text: string) => {
  const target = (e.currentTarget as HTMLElement)?.querySelector('span')
  if (target) {
    scrambleText(target, text, { duration: 1000, fps: 10 })
  }
}

const scrollToSection = (e: Event, sectionId: string) => {
  e.preventDefault()
  const lenis = getLenisInstance?.()
  if (!lenis) return

  const element = document.querySelector(sectionId) as HTMLElement | null
  if (element) {
    lenis.scrollTo(element, {
      duration: 5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  }
}
</script>

<template>
  <nav>
    <a href="#about" class="nav-link" @click="scrollToSection($event, '#about')" @mouseenter="handleScramble($event, 'ABOUT')">
      <span>ABOUT</span>
    </a>
    <a href="#timeline" class="nav-link" @click="scrollToSection($event, '#timeline')" @mouseenter="handleScramble($event, 'EXPERIENCE')">
      <span>EXPERIENCE</span>
    </a>
    <a href="#projects" class="nav-link" @click="scrollToSection($event, '#projects')" @mouseenter="handleScramble($event, 'PROJECTS')">
      <span>PROJECTS</span>
    </a>
    <a href="#contact" class="nav-link" @click="scrollToSection($event, '#contact')" @mouseenter="handleScramble($event, 'CONTACT')">
      <span>CONTACT</span>
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
