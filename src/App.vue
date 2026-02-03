<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide, watch, watchEffect, nextTick } from 'vue'
import Button from './components/Button.vue'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import TechnologiesPage from './pages/TechnologiesPage.vue'
import TimelinePage from './pages/TimelinePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import audioFile from './assets/sound/Flickering-Flames.mp3'
import { useLenis } from './composables/useLenis'

const progress = ref(0)
const ready = ref(false)
const entered = ref(false)
const isButtonFading = ref(false)
const title = ref('ADRIEN')
const audioRef = ref<HTMLAudioElement>()
const loadingStatusContainerRef = ref<HTMLElement>()
const loadingStatusHeight = ref(0)

const { start: startLenis, stop: stopLenis } = useLenis()

provide('audioRef', audioRef)
provide('entered', entered)

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
  isButtonFading.value = true
  audioRef.value?.play().catch(() => {})
  startLenis()
}

// Scroll lock : bloquer le scroll avant ENTER, libérer après
watchEffect(() => {
  document.body.style.overflow = entered.value ? '' : 'hidden'
})

onUnmounted(() => {
  stopLenis()
  document.body.style.overflow = ''
})
</script>

<template>
  <audio ref="audioRef" :src="audioFile" loop preload="auto" muted></audio>
  <!-- enlever attribut muted en production -->
  <!-- loader (loader + enter) -->
  <div v-show="!entered" class="loader" role="dialog" aria-modal="true">
    <!-- Titre avec effet de remplissage -->
    <h1
      :style="{
        backgroundImage: `linear-gradient(to right, var(--text) 0%, var(--text) ${progress}%, color-mix(in srgb, var(--text) 10%, transparent) ${progress}%, color-mix(in srgb, var(--text) 10%, transparent) 100%)`,
      }"
    >
      {{ title }}
    </h1>
    <!-- Div séparée en dessous pour loading et bouton -->
    <div ref="loadingStatusContainerRef" class="loading-status-container">
      <p v-show="!ready" role="status" aria-live="polite">Loading... {{ Math.round(progress) }}%</p>
      <Button
        v-show="ready"
        :class="{ 'button--fade': isButtonFading }"
        label="ENTER WEBSITE"
        @click="handleEnter"
      />
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

h1 {
  position: absolute;
  z-index: 1;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-image 0.08s linear;
}

.loading-status-container {
  position: relative;
  top: 15%;
  color: var(--muted);
  gap: var(--spacing-md);
}

.button--fade {
  animation: button-fade 1s ease-out forwards;
}

@keyframes button-fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
