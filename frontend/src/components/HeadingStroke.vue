<script setup lang="ts">
interface Props {
	text: string;
	left?: string;
}

const props = withDefaults(defineProps<Props>(), {
	left: "-200px",
});
</script>

<template>
	<div class="heading-stroke-container">
		<h2 class="heading-stroke" :style="{ left: left }">{{ text }}</h2>
		<h2 class="heading" :style="{ left: left }">{{ text }}</h2>
	</div>
</template>

<style scoped>
.heading-stroke-container {
	position: relative;
}

.heading-stroke-container h2 {
	position: absolute;
	text-transform: uppercase;
}

.heading-stroke {
	color: transparent;
	-webkit-text-stroke: 40px var(--bg);
	z-index: 1;
	clip-path: none;
}

.heading {
	color: var(--text);
	z-index: 2;
	clip-path: none;
}

@media (max-width: 900px) {
	.heading-stroke-container h2 {
		position: static;
		left: 0;
	}
}
</style>
