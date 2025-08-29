<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />

    <!-- How It Works Section -->
    <HowItWorksSection />
  </div>
</template>

<script setup lang="ts">
// Lazy load components for better performance
const HeroSection = () => import('@/components/ui/HeroSection.vue')
const HowItWorksSection = () => import('@/components/ui/HowItWorksSection.vue')
</script>

<style scoped>
.home-page {
  @apply min-h-screen;
}
</style>
