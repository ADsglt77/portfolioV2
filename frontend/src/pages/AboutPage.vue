<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { inject, type Ref, ref } from "vue";
import Button from "../components/Button.vue";
import SectionHeader from "../components/SectionHeader.vue";
import { useFadeIn } from "../composables/useFadeIn";
import { usePinnedTyping } from "../composables/usePinnedTyping";
import { useTextReveal } from "../composables/useTextReveal";
import { iconDownload } from "../data/icons";
import { socialLinks } from "../data/socialLinks";

const entered = inject<Ref<boolean>>("entered")!;

const fullText = "Développeur full-stack, web et application mobile";
const paragraphText = `Je suis alternant chez Therasoft en Bachelor C.D.W.M. (Concepteur Développeur Web et Mobile) passionné par le développement web, le design, et grand amateur de basket-ball. Créatif et curieux, j'aime allier technique et esthétique dans mes projets.`;

const displayedText = ref("");
const sectionRef = ref<HTMLElement | null>(null);
const paragraphRef = ref<HTMLParagraphElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const isDownloaded = ref(false);

const downloadCV = () => {
	const link = document.createElement("a");
	link.href = "/CV-Adrien.pdf";
	link.download = "CV-Adrien-Segalat.pdf";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	isDownloaded.value = true;
	setTimeout(() => {
		isDownloaded.value = false;
	}, 3000);
};

usePinnedTyping(sectionRef, fullText, displayedText, {
	active: entered,
	threshold: 0.3,
	typingDuration: 2000,
});

useTextReveal(paragraphRef, paragraphText, {
	active: entered,
	threshold: 0.5,
	delay: 3,
});

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
    <SectionHeader
      image-src="/img/about-silhouette-in-forest.jpg"
      image-alt="About"
      :displayed-text="displayedText"
    />
    <div class="subtitle">
      <p ref="paragraphRef"></p>
      <div class="actions">
        <div ref="buttonRef">
          <Button 
            :icon="iconDownload" 
            label="Télécharger mon CV" 
            :success="isDownloaded"
            @click="downloadCV" 
          />
        </div>
        <div class="social-links">
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

.subtitle {
	width: 100%;
	display: flex;
	flex-direction: column;
	max-width: 48ch;
	margin: 0 auto;
	gap: var(--spacing-lg);
	align-self: center;
	line-height: 1.8rem;
}

.subtitle p {
	min-height: 160px;
}

.subtitle .actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.subtitle .social-links {
	display: flex;
	gap: var(--spacing-md);
	align-items: center;
}

.subtitle .social-link {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	color: var(--muted);
	transition: all 0.3s ease;
	text-decoration: none;
}

.subtitle .social-link:hover {
	color: var(--text);
}

@media (max-width: 900px) {
	.section.about {
		grid-template-columns: 1fr;
		padding: 0 var(--spacing-xl);
		gap: var(--spacing-xl);
	}

	.subtitle {
		max-width: 100%;
	}
}
</style>
