<template>
  <div class="not-found-page">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">
        Página no encontrada
      </h2>
      <p class="text-gray-500 mb-8">
        Lo sentimos, la página que buscas no existe.
      </p>
      <router-link
        to="/"
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Not Found page component
</script>

<style scoped>
.not-found-page {
  @apply min-h-screen flex items-center justify-center p-8;
}
</style>
