<template>
  <div id="app">
    <!-- Main Layout wraps all pages -->
    <MainLayout>
      <!-- Router view will render the current page component -->
      <router-view />
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
import { MainLayout } from '@/layouts'
import { useTheme } from '@/composables/useTheme'

// Initialize theme system
const { initializeTheme } = useTheme()
initializeTheme()
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>
