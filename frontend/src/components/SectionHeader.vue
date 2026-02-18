<script setup lang="ts">
import HeadingStroke from "./HeadingStroke.vue";

interface Props {
	imageSrc: string;
	imageAlt: string;
	displayedText: string;
}

defineProps<Props>();
</script>

<template>
	<div class="section-header">
		<img :src="imageSrc" :alt="imageAlt" />
		<div class="title">
			<HeadingStroke :text="displayedText" />
		</div>
	</div>
</template>

<style scoped>
.section-header {
	display: contents;
}

img {
	width: 100%;
	height: clamp(360px, 90vh, 760px);
	object-fit: cover;
	border-radius: var(--radius-lg);
	border: 1px solid var(--glass-border);
	grid-row: 1 / 3;
}

.title {
	align-self: center;
}

@media (max-width: 900px) {
	img {
		height: clamp(240px, 44vh, 400px);
	}
}
</style>
