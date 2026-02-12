<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import heroBg from "../assets/img/hero-misty-forest.jpg";
import Nav from "../components/Nav.vue";
import { iconFastArrowDown } from "../data/icons";

const entered = inject("entered", ref(false));
const showElements = ref(false);

watch(entered, (val) => {
	if (val) {
		setTimeout(() => {
			showElements.value = true;
		}, 1000);
	}
});

const progress = ref(0);
const currentDay = ref("");
const currentTime = ref("");
let timeIntervalId: number | undefined;

const title = "ADRIEN";

const bgImage = computed(
	() =>
		`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${heroBg}")`,
);

onMounted(() => {
	const startTime = Date.now();
	const duration = 1000;

	const updateProgress = () => {
		const elapsed = Date.now() - startTime;
		const newProgress = Math.min((elapsed / duration) * 100, 100);

		progress.value = newProgress;

		if (newProgress < 100) {
			requestAnimationFrame(updateProgress);
		}
	};

	requestAnimationFrame(updateProgress);

	const updateTime = () => {
		const now = new Date();
		currentDay.value = now.toLocaleDateString(undefined, {
			weekday: "long",
			day: "2-digit",
			month: "2-digit",
		});
		currentTime.value = now.toLocaleTimeString(undefined, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	};

	updateTime();
	timeIntervalId = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
	if (timeIntervalId !== undefined) {
		clearInterval(timeIntervalId);
	}
});
</script>

<template>
  <section id="home" class="section home">
    <div :class="{ 'overlay--fade': entered }" class="overlay" aria-hidden="true"></div>
    <div class="bg immersive-bg" aria-hidden="true"></div>
    <div :class="{ visible: showElements }"><Nav /></div>
    <h1>{{ title }}</h1>
    <div :class="{ 'visible slide-up': showElements }" class="scroll">
      <h5>Scroll to explore</h5>
      <Icon class="scroll-icon" :icon="iconFastArrowDown" :width="20" :height="20" />
    </div>
    <h5 :class="{ 'visible slide-left': showElements }" class="meta day">
      {{ currentDay }}
    </h5>
    <h5 :class="{ 'visible slide-right': showElements }" class="meta time">
      {{ currentTime }}
    </h5>
    <div class="gradient"></div>
  </section>
</template>

<style scoped>
.section.home {
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: var(--bg);
  z-index: 0;
  opacity: 1;
  pointer-events: none;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: v-bind('bgImage');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
}

.section.home > div:has(nav) {
  z-index: 1;
  opacity: 0;
}

h1 {
  color: var(--text);
  opacity: 1 !important;
  z-index: 100 !important;
}

.scroll {
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
  opacity: 0;
  transform: translateY(30px);
}

.meta {
  position: absolute;
  bottom: var(--spacing-3xl);
  color: var(--muted);
  z-index: 1;
  opacity: 0;
}

.meta.day {
  left: var(--spacing-3xl);
  transform: translateX(-30px);
}

.meta.time {
  right: var(--spacing-3xl);
  transform: translateX(30px);
}
</style>
