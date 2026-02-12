<script setup lang="ts">
import Timeline from "../components/Timeline.vue";
import { timelineData } from "../data/timeline";
</script>

<template>
  <section id="timeline" class="section timeline">
    <Timeline :items="timelineData" />
  </section>
</template>

<style scoped>
.section.timeline {
  height: 100%;
  padding: var(--spacing-3xl) var(--spacing-xl);
}
</style>
