<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import Nav from '../components/Nav.vue'
import { iconFastArrowDown } from '../data/icons'
import logo from '../assets/img/logo.svg'
import heroBg from '../assets/img/hero-misty-forest.jpg'

const progress = ref(0)
const currentDay = ref('')
const currentTime = ref('')
let timeIntervalId: number | undefined

const title = 'ADRIEN'

const bgImage = computed(() => `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${heroBg}")`)

onMounted(() => {
  const startTime = Date.now()
  const duration = 1000

  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const newProgress = Math.min((elapsed / duration) * 100, 100)

    progress.value = newProgress

    if (newProgress < 100) {
      requestAnimationFrame(updateProgress)
    }
  }

  requestAnimationFrame(updateProgress)

  const updateTime = () => {
    const now = new Date()
    currentDay.value = now.toLocaleDateString(undefined, {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    })
    currentTime.value = now.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  updateTime()
  timeIntervalId = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeIntervalId !== undefined) {
    clearInterval(timeIntervalId)
  }
})
</script>

<template>
  <section id="home" class="section home">
    <div class="home-bg-overlay" aria-hidden="true"></div>
    <div class="home-bg" data-anim="home-bg" aria-hidden="true"></div>
    <img :src="logo" alt="Logo" data-anim="home-logo" />
    <div data-anim="home-nav">
      <Nav />
    </div>
    <div class="hero-title">
      <h1 class="after" data-anim="home-title" :style="{ width: `${progress}%` }">
        {{ title }}
      </h1>
    </div>
    <div class="loading-status-container scroll" data-anim="home-scrollhint">
      <h5>Scroll to explore</h5>
      <Icon :icon="iconFastArrowDown" :width="20" :height="20" />
    </div>
    <h5 class="meta day" data-anim="home-meta-day">{{ currentDay }}</h5>
    <h5 class="meta time" data-anim="home-meta-time">{{ currentTime }}</h5>
  </section>
</template>

<style scoped>
.section.home {
  position: relative;
  overflow: hidden;
}

.home-bg-overlay {
  position: absolute;
  inset: 0;
  background: var(--bg);
  z-index: 0;
  opacity: 0;
  pointer-events: none;
}

.home-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: v-bind('bgImage');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
}

.section.home img {
  width: 6rem;
  height: 6rem;
  position: absolute;
  top: var(--spacing-2xl);
  left: var(--spacing-2xl);
  z-index: 1;
  opacity: 1;
}

.section.home :deep(nav) {
  z-index: 1;
  opacity: 1;
}

.hero-title {
  position: relative;
  z-index: 1;
}

.loading-status-container.scroll {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 0;
  right: 0;
  gap: var(--spacing-md);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.meta {
  position: absolute;
  bottom: var(--spacing-3xl);
  color: var(--muted);
  z-index: 1;
  opacity: 1;
}

.meta.day {
  left: var(--spacing-3xl);
}

.meta.time {
  right: var(--spacing-3xl);
}
</style>
