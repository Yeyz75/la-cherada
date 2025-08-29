<template>
  <div id="app">
    <!-- Main Layout wraps all pages -->
    <MainLayout>
      <!-- Language switcher in top right corner -->
      <div class="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <!-- Router view will render the current page component -->
      <router-view />
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { MainLayout } from '@/layouts'

// Main App component with MainLayout integration
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>
