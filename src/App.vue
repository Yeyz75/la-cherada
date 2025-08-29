<template>
  <div id="app">
    <!-- Language switcher in top right corner -->
    <div class="fixed top-4 right-4 z-50">
      <LanguageSwitcher />
    </div>

    <!-- Router view will render the current page component -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from './components/LanguageSwitcher.vue'

// Main App component with router integration
// Layout components will be implemented in task 9
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>
