<script setup lang="ts">
import { onMounted, ref, provide, watch, nextTick } from 'vue'
import Button from './components/Button.vue'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import TechnologiesPage from './pages/TechnologiesPage.vue'
import TimelinePage from './pages/TimelinePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import audioFile from './assets/sound/Flickering-Flames.mp3'

const progress = ref(0)
const ready = ref(false)
const entered = ref(false)
const title = ref('ADRIEN')
const audioRef = ref<HTMLAudioElement>()
const loadingStatusContainerRef = ref<HTMLElement>()
const loadingStatusHeight = ref(0)

provide('audioRef', audioRef)

onMounted(() => {
  const startTime = Date.now()
  const duration = 1000

  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const newProgress = Math.min((elapsed / duration) * 100, 100)

    progress.value = newProgress

    if (newProgress < 100) {
      requestAnimationFrame(updateProgress)
    } else {
      ready.value = true
    }
  }

  requestAnimationFrame(updateProgress)
})

// Calculer la hauteur quand ready change (le bouton apparaît)
watch(ready, () => {
  nextTick(() => {
    if (loadingStatusContainerRef.value) {
      loadingStatusHeight.value = loadingStatusContainerRef.value.offsetHeight
    }
  })
})

const handleEnter = () => {
  entered.value = true
  audioRef.value?.play().catch(() => {})
}
</script>

<template>
  <audio ref="audioRef" :src="audioFile" loop preload="auto" muted></audio>
  <!-- enlever attribut muted en production -->
  <!-- loader (loader + enter) -->
  <div v-show="!entered" class="loader" role="dialog" aria-modal="true">
    <!-- Titre avec effet de remplissage -->
    <div class="hero-title">
      <h1>{{ title }}</h1>
      <h1 :style="{ width: `${progress}%` }">{{ title }}</h1>
    </div>
    <!-- Div séparée en dessous pour loading et bouton -->
    <div ref="loadingStatusContainerRef" class="loading-status-container">
      <p v-show="!ready" role="status" aria-live="polite">
        Loading... {{ Math.round(progress) }}%
      </p>
      <Button v-show="ready" label="ENTER WEBSITE" @click="handleEnter" />
    </div>
  </div>

  <!-- Site (après ENTER) -->
  <main v-show="entered" class="site-content">
    <HomePage />
    <AboutPage />
    <TechnologiesPage />
    <TimelinePage />
    <ProjectsPage />
  </main>
</template>

<style scoped>
/* loader (loader + enter) */
.loader {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hero-title {
  position: relative;
  z-index: 1;
}

.hero-title h1 {
  color: color-mix(in srgb, var(--text) 10%, transparent);
}

.hero-title h1.after {
  color: var(--text);
  margin-bottom: v-bind(loadingStatusHeight + 'px');
}

.hero-title h1:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 0;
  color: var(--text);
  overflow: hidden;
  transition: width 0.08s linear;
}

.loading-status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  gap: var(--spacing-md);
}

.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
