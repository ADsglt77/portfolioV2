<script setup lang="ts">
import Button from '../components/Button.vue'
import aboutImg from '../assets/img/about-silhouette-in-forest.jpg'
</script>

<template>
  <section id="about" class="section about">
    <img :src="aboutImg" alt="About" />
    <div class="title">
      <h2 class="heading-stroke">Développeur full-stack, web et application mobile</h2>
      <h2 class="heading">Développeur full-stack, web et application mobile</h2>
    </div>
    <div class="subtitle">
      <p>
        Je suis alternant chez Therasoft en Bachelor C.D.W.M. (Concepteur Développeur Web et Mobile)
        passionné par le développement web, le design, et grand amateur de basket-ball. Créatif et
        curieux, j'aime allier technique et esthétique dans mes projets.
      </p>
      <Button label="Contactez moi" />
    </div>
  </section>
</template>

<style scoped>
.section.about {
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
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
}

.section.about .title .heading {
  color: var(--text);
  z-index: 2;
}

.section.about .subtitle {
  display: flex;
  flex-direction: column;
  max-width: 48ch;
  margin: 0 auto;
  gap: var(--spacing-lg);
  align-self: center;
  line-height: 1.8rem;
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
