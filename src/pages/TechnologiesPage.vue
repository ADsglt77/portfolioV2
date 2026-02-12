<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
	iconBdd,
	iconCss,
	iconCursor,
	iconDocker,
	iconFlutter,
	iconGithubAction,
	iconLinux,
	iconNuxt,
	iconPhotoshop,
	iconPhp,
	iconPython,
	iconSymfony,
	iconTypeScript,
	iconVue,
} from "../data/icons";
import type { Technology } from "../data/projects";

const technologies: Technology[] = [
	{ icon: iconVue, label: "VueJS" },
	{ icon: iconSymfony, label: "Symfony" },
	{ icon: iconNuxt, label: "NuxtJS" },
	{ icon: iconPhp, label: "PHP" },
	{ icon: iconCss, label: "CSS" },
	{ icon: iconLinux, label: "Linux" },
	{ icon: iconTypeScript, label: "TypeScript" },
	{ icon: iconPhotoshop, label: "Photoshop" },
	{ icon: iconBdd, label: "BDD" },
	{ icon: iconCursor, label: "Cursor" },
	{ icon: iconDocker, label: "Docker" },
	{ icon: iconPython, label: "Python" },
	{ icon: iconGithubAction, label: "GitHub" },
	{ icon: iconFlutter, label: "Flutter" },
];

const technologiesReversed = [...technologies].reverse();
</script>

<template>
  <section id="tech" class="section technologies">
    <div class="tech-row tech-row--left">
      <div class="tech-row-inner">
        <div v-for="tech in technologies" :key="'l1-' + tech.label" class="tech-item">
          <Icon :icon="tech.icon" :width="36" :height="36" />
          <h3>{{ tech.label }}</h3>
        </div>
        <div v-for="tech in technologies" :key="'l2-' + tech.label" class="tech-item">
          <Icon :icon="tech.icon" :width="36" :height="36" />
          <h3>{{ tech.label }}</h3>
        </div>
      </div>
    </div>
    <div class="tech-row tech-row--right">
      <div class="tech-row-inner">
        <div v-for="tech in technologiesReversed" :key="'r1-' + tech.label" class="tech-item">
          <Icon :icon="tech.icon" :width="36" :height="36" />
          <h3>{{ tech.label }}</h3>
        </div>
        <div v-for="tech in technologiesReversed" :key="'r2-' + tech.label" class="tech-item">
          <Icon :icon="tech.icon" :width="36" :height="36" />
          <h3>{{ tech.label }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section.technologies {
  min-height: 0;
  height: 50vh;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3xl);
}

.tech-row {
  width: 100%;
  overflow: hidden;
}

.tech-row-inner {
  display: flex;
  width: max-content;
  gap: var(--spacing-md);
  text-transform: uppercase;
}

.tech-row--left .tech-row-inner {
  animation: tech-scroll-left 45s linear infinite;
}

.tech-row--right .tech-row-inner {
  animation: tech-scroll-right 45s linear infinite;
}

.tech-row--left:has(.tech-item:hover) .tech-row-inner {
  animation-play-state: paused;
}

.tech-row--right:has(.tech-item:hover) .tech-row-inner {
  animation-play-state: paused;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  color: var(--muted);
}

.tech-item h3 {
  line-height: 0;
  transition:
    color 0.25s ease,
    -webkit-text-stroke 0.25s ease;
}

.tech-item:nth-child(odd) h3 {
  color: var(--text);
}

.tech-item:nth-child(even) h3 {
  color: transparent;
  -webkit-text-stroke: 1px var(--text);
}

.tech-item:nth-child(odd):hover h3 {
  color: transparent;
  -webkit-text-stroke: 1px var(--text);
}

.tech-item:nth-child(even):hover h3 {
  color: var(--text);
  -webkit-text-stroke: none;
}
</style>
