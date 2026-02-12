<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { iconGithubAction, iconLink, iconPdf, iconPlay } from "../data/icons";
import type { Project } from "../data/projects";

interface Props {
	project: Project;
}

const props = defineProps<Props>();

const actions = computed(() => {
	const items = [];
	if (props.project.links.readmePdf) {
		items.push({
			icon: iconPdf,
			href: props.project.links.readmePdf,
			ariaLabel: "Lire le README PDF",
			external: false,
		});
	}
	if (props.project.links.website) {
		items.push({
			icon: iconLink,
			href: props.project.links.website,
			ariaLabel: "Visiter le site web",
			external: true,
		});
	}
	if (props.project.links.github) {
		items.push({
			icon: iconGithubAction,
			href: props.project.links.github,
			ariaLabel: "Voir le code source sur GitHub",
			external: true,
		});
	}
	return items;
});
</script>

<template>
  <article>
    <div class="project-media">
      <video
        v-if="project.video.src"
        :src="project.video.src"
        :poster="project.video.poster"
        controls
        controlslist="nodownload noplaybackrate"
        disablePictureInPicture
        muted
        preload="metadata"
        class="project-video"
      ></video>
      <img
        v-else-if="project.video.poster"
        :src="project.video.poster"
        :alt="`Aperçu du projet ${project.title}`"
        class="project-poster"
      />
      <div v-else class="project-placeholder">
        <Icon :icon="iconPlay" :width="48" :height="48" />
        <span>Aucune vidéo disponible</span>
      </div>
    </div>

    <div class="project-content">
      <h4 class="project-title">{{ project.title }}</h4>
      <p class="project-description">{{ project.description }}</p>

      <div class="project-technologies">
        <span
          v-for="tech in project.technologies.slice(0, 4)"
          :key="tech.label"
          class="project-tech-tag"
        >
          <Icon :icon="tech.icon" :width="18" :height="18" />
          <span>{{ tech.label }}</span>
        </span>
        <span v-if="project.technologies.length > 4" class="project-tech-tag">
          <span>+{{ project.technologies.length - 4 }}</span>
        </span>
      </div>

      <div class="project-actions">
        <a
          v-for="action in actions"
          :key="action.icon"
          :href="action.href"
          class="project-action"
          :aria-label="action.ariaLabel"
          :target="action.external ? '_blank' : undefined"
          :rel="action.external ? 'noopener noreferrer' : undefined"
        >
          <Icon :icon="action.icon" :width="24" :height="24" />
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  background: color-mix(in srgb, var(--text) 5%, transparent);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

article:hover {
  border-color: var(--glass-border-hover);
  background: color-mix(in srgb, var(--text) 8%, transparent);
}

.project-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: color-mix(in srgb, var(--text) 3%, transparent);
  overflow: hidden;
}

.project-video,
.project-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-video::-webkit-media-controls-volume-slider,
.project-video::-webkit-media-controls-mute-button {
  display: none !important;
}

.project-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.project-content {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  gap: var(--spacing-md);
  flex: 1;
  min-height: 0;
}

.project-title {
  text-transform: uppercase;
}

.project-description {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
  flex-grow: 1;
}

.project-tech-tag {
  height: fit-content;
  color: var(--muted);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: color-mix(in srgb, var(--text) 3%, transparent);
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.project-tech-tag span {
  transition: all 0.3s ease;
}

.project-tech-tag:hover span {
  color: var(--text);
}

.project-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
}

.project-action {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  padding: var(--spacing-sm);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--text) 5%, transparent);
  transition: all 0.3s ease;
}

.project-action:hover {
  border-color: var(--glass-border-hover);
  background: color-mix(in srgb, var(--text) 10%, transparent);
}
</style>
