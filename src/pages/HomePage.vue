<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />

    <!-- How It Works Section -->
    <HowItWorksSection />
  </div>
</template>

<script setup lang="ts">
import { HeroSection, HowItWorksSection } from '@/components/ui'
</script>

<style scoped>
.home-page {
  @apply min-h-screen;
}
</style>
