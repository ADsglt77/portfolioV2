<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">
        {{ currentYear }} Adrien Segalat. Tous droits réservés.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--spacing-xl) var(--spacing-xl);
  border-top: 1px solid var(--glass-border);
  background: var(--bg);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  color: var(--muted);
  font-size: var(--font-size-span);
}
</style>