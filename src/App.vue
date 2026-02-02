<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide, watch, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import Button from './components/Button.vue'
import Nav from './components/Nav.vue'
import logo from './assets/img/logo.svg'
import audioFile from './assets/sound/Flickering-Flames.mp3'
import aboutImg from './assets/img/about-silhouette-in-forest.jpg'

const progress = ref(0)
const ready = ref(false)
const entered = ref(false)
const title = ref('ADRIEN')
const audioRef = ref<HTMLAudioElement>()
const currentDay = ref('')
const currentTime = ref('')
const loadingStatusContainerRef = ref<HTMLElement>()
const loadingStatusHeight = ref(0)
let timeIntervalId: number | undefined

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

onUnmounted(() => {
  if (timeIntervalId !== undefined) {
    clearInterval(timeIntervalId)
  }
})
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
      <h4 v-show="!ready" role="status" aria-live="polite">
        Loading... {{ Math.round(progress) }}%
      </h4>
      <Button v-show="ready" label="ENTER WEBSITE" @click="handleEnter" />
    </div>
  </div>

  <!-- Site (après ENTER) -->
  <main v-show="entered" class="site-content">
    <!-- Section Home -->
    <section id="home" class="section home">
      <div class="home-bg-overlay" aria-hidden="true"></div>
      <div class="home-bg" aria-hidden="true"></div>
      <img :src="logo" alt="Logo" />
      <Nav />
      <div class="hero-title">
        <h1 class="after" :style="{ width: `${progress}%` }">{{ title }}</h1>
      </div>
      <div class="loading-status-container scroll">
        <h4>Scroll to explore</h4>
        <Icon icon="iconoir:fast-arrow-down" :width="20" :height="20" />
      </div>
      <h5 class="meta day">{{ currentDay }}</h5>
      <h5 class="meta time">{{ currentTime }}</h5>
    </section>

    <!-- Section About -->
    <section id="about" class="section about">
      <img :src="aboutImg" alt="About" />
      <div class="title">
        <h2 class="heading-stroke">Développeur full-stack, web et application mobile</h2>
        <h2 class="heading">Développeur full-stack, web et application mobile</h2>
      </div>
      <div class="subtitle">
        <p>
          Je suis alternant chez Therasoft en Bachelor C.D.W.M. (Concepteur Développeur Web et
          Mobile) passionné par le développement web, le design, et grand amateur de basket-ball.
          Créatif et curieux, j’aime allier technique et esthétique dans mes projets.
        </p>
        <Button label="Contactez moi" />
      </div>
    </section>

    <!-- Section Expérience
      <section id="experience" class="section experience">
        <h2>Expérience</h2>
        <p>Mon parcours professionnel...</p>
      </section>

        Section Projects
      <section id="projects" class="section projects">
        <h2>Projects</h2>
        <p>Mes projets...</p>
      </section>

       Section Contact
      <section id="contact" class="section contact">
        <h2>Contact</h2>
        <p>Contactez-moi...</p>
      </section>
       -->
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
  font-family: var(--font-title);
  font-size: clamp(4rem, 16vw, 12rem);
  font-weight: 600;
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

.loading-status-container h4 {
  font-weight: 300;
}

.section.home .loading-status-container.scroll {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 0;
  right: 0;
  gap: var(--spacing-md);
  z-index: 1;
}

.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* -------------------------------- */
/*          Section Home            */
/* -------------------------------- */
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
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('./assets/img/hero-misty-forest.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
}

main .home-bg {
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

.meta {
  position: absolute;
  bottom: var(--spacing-3xl);
  color: var(--muted);
  font-weight: 400;
  z-index: 1;
  opacity: 1;
}

.meta.day {
  left: var(--spacing-3xl);
}

.meta.time {
  right: var(--spacing-3xl);
}

/* -------------------------------- */
/*          Section About           */
/* -------------------------------- */

.section.about {
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(280px, 520px) minmax(320px, 1fr);
  gap: var(--spacing-2xl);
  align-items: center;
}

.section.about img {
  width: 100%;
  height: clamp(360px, 90vh, 760px);
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  grid-row: 1 / 3;
}

.section.about .title {
  align-self: center;
  position: relative;
}

.section.about .title h2 {
  position: absolute;
  font-family: var(--font-title);
  left: -200px;
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 500;
  text-transform: uppercase;
}

.section.about .title .heading-stroke {
  color: transparent;
  -webkit-text-stroke: 40px var(--bg);
  z-index: 1;
}

.section.about .title .heading {
  color: var(--text);
  z-index: 2;
}

.section.about .subtitle {
  display: flex;
  flex-direction: column;
  max-width: 48ch;
  margin: 0 auto;
  gap: var(--spacing-lg);
  align-self: center;
  line-height: 1.8rem;
}

@media (max-width: 900px) {
  .section.about {
    grid-template-columns: 1fr;
    padding: 0 var(--spacing-xl);
    gap: var(--spacing-xl);
  }

  .section.about img {
    height: clamp(240px, 44vh, 400px);
  }

  .section.about .title h1 {
    max-width: 100%;
  }

  .section.about .subtitle {
    max-width: 100%;
  }
}

/* -------------------------------- */
/*          Section Experience      */
/* -------------------------------- */

/* -------------------------------- */
/*          Section Projects        */
/* -------------------------------- */

/* -------------------------------- */
/*          Section Contact         */
/* -------------------------------- */
</style>
