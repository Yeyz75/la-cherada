<template>
  <div class="language-switcher">
    <select
      v-model="currentLocale"
      @change="handleLanguageChange"
      class="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500"
    >
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTranslation } from '@/composables/useTranslation'

const { changeLanguage, currentLanguage } = useTranslation()
const currentLocale = ref(currentLanguage.value)

const handleLanguageChange = () => {
  changeLanguage(currentLocale.value)
}

onMounted(() => {
  // Load saved locale from localStorage
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    currentLocale.value = savedLocale
    changeLanguage(savedLocale)
  }
})
</script>

<style scoped>
.language-switcher {
  @apply inline-block;
}

.language-switcher select {
  @apply cursor-pointer;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .language-switcher select {
    @apply px-2 py-1 text-xs;
  }
}
</style>
