<script setup lang="ts">
import { inject, type Ref, ref } from "vue";
import contactImg from "../assets/img/contact-campfire-night.jpg";
import Button from "../components/Button.vue";
import { useFadeIn } from "../composables/useFadeIn";
import { usePinnedTyping } from "../composables/usePinnedTyping";

const entered = inject<Ref<boolean>>("entered")!;

const fullText = "Contactez moi";

const displayedText = ref("");
const sectionRef = ref<HTMLElement | null>(null);
const formRef = ref<HTMLElement | null>(null);

usePinnedTyping(sectionRef, fullText, displayedText, {
	active: entered,
	threshold: 0.3,
	typingDuration: 2000,
});

useFadeIn(formRef, {
	active: entered,
	threshold: 0.5,
	duration: 1500,
	delay: 500,
	translateY: 30,
});

const formData = ref({
	name: "",
	email: "",
	subject: "",
	message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async (e: Event) => {
	e.preventDefault();
	if (isSubmitting.value) return;

	isSubmitting.value = true;

	// Simuler l'envoi du formulaire
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Ici vous pouvez ajouter la logique d'envoi (email, API, etc.)
	console.log("Form submitted:", formData.value);

	// Réinitialiser le formulaire
	formData.value = {
		name: "",
		email: "",
		subject: "",
		message: "",
	};

	isSubmitting.value = false;
	alert("Message envoyé avec succès !");
};
</script>

<template>
  <section ref="sectionRef" id="contact" class="section contact">
    <img :src="contactImg" alt="Contact" />
    <div class="title">
      <h2 class="heading-stroke">{{ displayedText }}</h2>
      <h2 class="heading">{{ displayedText }}</h2>
    </div>
      <form ref="formRef" @submit="handleSubmit" class="contact-form">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            placeholder="Votre nom"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            placeholder="votre.email@example.com"
          />
        </div>
        <div class="form-group">
          <label for="subject">Sujet</label>
          <input
            id="subject"
            v-model="formData.subject"
            type="text"
            required
            placeholder="Sujet de votre message"
          />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            required
            rows="6"
            placeholder="Votre message..."
          ></textarea>
        </div>
        <Button
          type="submit"
          :label="isSubmitting ? 'Envoi...' : 'Envoyer'"
          :disabled="isSubmitting"
        />
      </form>
  </section>
</template>

<style scoped>
.section.contact {
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(280px, 520px) minmax(320px, 1fr);
  gap: var(--spacing-2xl);
  align-items: center;
}

.section.contact img {
  width: 100%;
  height: clamp(360px, 90vh, 760px);
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  grid-row: 1 / 3;
}

.section.contact .title {
  align-self: center;
  position: relative;
}

.section.contact .title h2 {
  position: absolute;
  left: -200px;
  text-transform: uppercase;
}

.section.contact .title .heading-stroke {
  color: transparent;
  -webkit-text-stroke: 40px var(--bg);
  z-index: 1;
  clip-path: none;
}

.section.contact .title .heading {
  color: var(--text);
  z-index: 2;
  clip-path: none;
}

.section.contact .content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  align-self: center;
}

.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  align-self: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-group label {
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.form-group input,
.form-group textarea {
  padding: var(--spacing-md);
  background: color-mix(in srgb, var(--text) 5%, transparent);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text);
  font-family: var(--font-mono);
  transition: all 0.3s ease;
  resize: none;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--glass-border-hover);
  background: color-mix(in srgb, var(--text) 8%, transparent);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--muted);
  opacity: 0.6;
}

@media (max-width: 900px) {
  .section.contact {
    grid-template-columns: 1fr;
    padding: 0 var(--spacing-xl);
    gap: var(--spacing-xl);
  }

  .section.contact img {
    height: clamp(240px, 44vh, 400px);
  }

  .section.contact .title h2 {
    position: static;
    left: 0;
  }

  .section.contact .content {
    max-width: 100%;
  }
}
</style>
