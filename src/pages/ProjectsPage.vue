<script setup lang="ts">
import Button from "../components/Button.vue";
import ProjectCard from "../components/ProjectCard.vue";
import { projects } from "../data/projects";
</script>

<template>
  <section id="projects" class="section projects">
    <div class="projects-container">
      <ProjectCard v-for="project in projects.slice(0, 6)" :key="project.id" :project="project" />
    </div>
    <div v-if="projects.length > 6" class="projects-more">
      <Button label="Voir tous les projets" />
    </div>
  </section>
</template>

<style scoped>
.section.projects {
  height: 100%;
  padding: var(--spacing-3xl) var(--spacing-xl);
  min-height: auto;
}

.projects-container {
  width: 100%;
  max-width: 80vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: var(--spacing-3xl);
}

.projects-more {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-3xl);
}

@media (max-width: 768px) {
  .projects-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }
}
</style>
