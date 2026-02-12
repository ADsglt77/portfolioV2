<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { inject, type Ref, ref } from "vue";
import cvPdf from "../assets/CV-Adrien.pdf";
import aboutImg from "../assets/img/about-silhouette-in-forest.jpg";
import Button from "../components/Button.vue";
import { useFadeIn } from "../composables/useFadeIn";
import { usePinnedTyping } from "../composables/usePinnedTyping";
import { useTextReveal } from "../composables/useTextReveal";
import { socialLinks } from "../data/socialLinks";

const entered = inject<Ref<boolean>>("entered")!;

const fullText = "Développeur full-stack, web et application mobile";
const paragraphText = `Je suis alternant chez Therasoft en Bachelor C.D.W.M. (Concepteur Développeur Web et Mobile) passionné par le développement web, le design, et grand amateur de basket-ball. Créatif et curieux, j'aime allier technique et esthétique dans mes projets.`;

const displayedText = ref("");
const sectionRef = ref<HTMLElement | null>(null);
const paragraphRef = ref<HTMLParagraphElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const socialLinksRef = ref<HTMLElement | null>(null);

const downloadCV = () => {
	const link = document.createElement("a");
	link.href = cvPdf;
	link.download = "CV-Adrien-Segalat.pdf";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

usePinnedTyping(sectionRef, fullText, displayedText, {
	active: entered,
	threshold: 0.3,
	typingDuration: 2000,
});

// Utiliser le composable useTextReveal pour déclencher l'animation au scroll
useTextReveal(paragraphRef, paragraphText, {
	active: entered,
	threshold: 0.5,
	delay: 3,
});

// Utiliser useFadeIn pour animer le bouton
useFadeIn(buttonRef, {
	active: entered,
	threshold: 0.5,
	duration: 1500,
	delay: 300,
	translateY: 0,
});
</script>

<template>
  <section ref="sectionRef" id="about" class="section about">
    <img :src="aboutImg" alt="About" />
    <div class="title">
      <h2 class="heading-stroke">{{ displayedText }}</h2>
      <h2 class="heading">{{ displayedText }}</h2>
    </div>
    <div class="subtitle">
      <p ref="paragraphRef"></p>
      <div class="actions">
        <div ref="buttonRef">
          <Button label="Télécharger mon CV" @click="downloadCV" />
        </div>
        <div ref="socialLinksRef" class="social-links">
          <a
            v-for="link in socialLinks"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="link.label"
            class="social-link"
          >
            <Icon :icon="link.icon" :width="24" :height="24" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section.about {
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-xl);
  min-height: 100vh;
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
  left: -200px;
  text-transform: uppercase;
}

.section.about .title .heading-stroke {
  color: transparent;
  -webkit-text-stroke: 40px var(--bg);
  z-index: 1;
  clip-path: none; /* IMPORTANT: typing visible */
}

.section.about .title .heading {
  color: var(--text);
  z-index: 2;
  clip-path: none; /* sinon le typing sera caché */
}

.section.about .subtitle {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 48ch;
  margin: 0 auto;
  gap: var(--spacing-lg);
  align-self: center;
  line-height: 1.8rem;
}

.section.about .subtitle p {
  min-height: 160px;
}

.section.about .subtitle .actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section.about .subtitle .social-links {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.section.about .subtitle .social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--muted);
  transition: all 0.3s ease;
  text-decoration: none;
}

.section.about .subtitle .social-link:hover {
  color: var(--text);
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
</style>
