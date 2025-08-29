<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />

    <!-- How It Works Section -->
    <HowItWorksSection />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
// Lazy load components para mejor performance
const HeroSection = defineAsyncComponent(
  () => import('@/components/ui/HeroSection.vue')
)
const HowItWorksSection = defineAsyncComponent(
  () => import('@/components/ui/HowItWorksSection.vue')
)
</script>

<style scoped>
.home-page {
  @apply min-h-screen;
}
</style>
