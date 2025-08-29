<template>
  <div class="not-found-page">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">
        {{ $t('notFound.title') }}
      </h2>
      <p class="text-gray-500 mb-8">
        {{ $t('notFound.message') }}
      </p>
      <router-link
        to="/"
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {{ $t('notFound.backHome') }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// 404 Not Found page component
const { t } = useI18n()
</script>

<style scoped>
.not-found-page {
  @apply min-h-screen flex items-center justify-center p-8;
}
</style>
