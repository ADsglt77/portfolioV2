<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type Lenis from "lenis";
import { computed, inject, onMounted, onUnmounted, type Ref, ref } from "vue";
import { iconSettings, iconSoundHigh, iconSoundOff } from "../data/icons";
import { scrambleText } from "../lib/textScramble";
import Button from "./Button.vue";

const audioRef = inject<Ref<HTMLAudioElement | null>>("audioRef");
const getLenisInstance = inject<() => Lenis | null>("lenis");
const animationsEnabledRef = inject<Ref<boolean>>(
	"animationsEnabled",
	ref(true),
);
const showSettings = ref(false);
const isMuted = ref(true); // mettre false en production

const soundIcon = computed(() =>
	isMuted.value ? iconSoundOff : iconSoundHigh,
);

/** Réactif pour le template (évite que le bouton ne mette pas à jour l’état affiché) */
const isAnimationsEnabled = computed({
	get: () => animationsEnabledRef.value,
	set: (v: boolean) => {
		animationsEnabledRef.value = v;
	},
});

const toggleMute = () => {
	isMuted.value = !isMuted.value;
	if (audioRef?.value) {
		audioRef.value.muted = isMuted.value;
	}
};

const toggleSettings = () => {
	showSettings.value = !showSettings.value;
};

const toggleAnimations = () => {
	animationsEnabledRef.value = !animationsEnabledRef.value;
};

const closeSettings = () => {
	showSettings.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	if (showSettings.value && !target.closest(".nav-settings")) {
		closeSettings();
	}
};

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
	document.removeEventListener("click", handleClickOutside);
});

const handleScramble = (e: Event, text: string) => {
	const target = (e.currentTarget as HTMLElement)?.querySelector("span");
	if (target) {
		scrambleText(target, text, {
			duration: 1000,
			fps: 10,
			skipAnimation: !isAnimationsEnabled.value,
		});
	}
};

const scrollToSection = (e: Event, sectionId: string) => {
	e.preventDefault();
	const lenis = getLenisInstance?.();
	if (!lenis) return;

	const element = document.querySelector(sectionId) as HTMLElement | null;
	if (element) {
		lenis.scrollTo(element, {
			duration: 5,
			easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
		});
	}
};
</script>

<template>
  <nav>
    <a
      href="#about"
      class="nav-link"
      @click="scrollToSection($event, '#about')"
      @mouseenter="handleScramble($event, 'ABOUT')"
    >
      <span>ABOUT</span>
    </a>
    <a
      href="#timeline"
      class="nav-link"
      @click="scrollToSection($event, '#timeline')"
      @mouseenter="handleScramble($event, 'EXPERIENCE')"
    >
      <span>EXPERIENCE</span>
    </a>
    <a
      href="#projects"
      class="nav-link"
      @click="scrollToSection($event, '#projects')"
      @mouseenter="handleScramble($event, 'PROJECTS')"
    >
      <span>PROJECTS</span>
    </a>
    <a
      href="#contact"
      class="nav-link"
      @click="scrollToSection($event, '#contact')"
      @mouseenter="handleScramble($event, 'CONTACT')"
    >
      <span>CONTACT</span>
    </a>
    <div class="nav-settings">
      <Button padding="0.6rem" borderRadius="50%" @click="toggleSettings">
        <Icon :icon="iconSettings" :width="16" :height="16" :stroke-width="3" />
      </Button>
      <Transition name="settings-fade">
        <div v-show="showSettings" class="settings-panel">
          <div class="settings-row">
            <span>Son</span>
            <button
              type="button"
              class="settings-toggle"
              :aria-pressed="!isMuted"
              @click="toggleMute"
            >
              <Icon :icon="soundIcon" :width="14" :height="14" :stroke-width="3" />
            </button>
          </div>
          <div class="settings-row">
            <span>Animations</span>
            <button
              type="button"
              class="settings-toggle"
              :aria-pressed="isAnimationsEnabled"
              @click.stop="toggleAnimations"
            >
              <Icon :icon="isAnimationsEnabled ? 'iconoir:eye' : 'iconoir:eye-off'" :width="14" :height="14" :stroke-width="3" />
            </button>
          </div>
        </div>
      </Transition>
    </div>
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

.nav-settings {
  position: relative;
}

.settings-panel {
  position: absolute;
  top: calc(100% + var(--spacing-sm));
  right: 0;
  min-width: 10rem;
  padding: var(--spacing-sm);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  backdrop-filter: blur(8px);
  z-index: 10;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text);
}

.settings-row span {
  font-size: var(--font-size-span);
}

.settings-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.settings-toggle:hover {
  background: var(--glass-hover);
  border-color: var(--glass-border-hover);
}

.settings-fade-enter-active,
.settings-fade-leave-active {
  transition: opacity 0.15s ease;
}

.settings-fade-enter-from,
.settings-fade-leave-to {
  opacity: 0;
}
</style>
