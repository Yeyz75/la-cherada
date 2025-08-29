<!-- Componente de gradiente animado para fondos -->
<template>
  <div
    :class="[
      'absolute inset-0 overflow-hidden',
      'bg-gradient-to-br from-blue-50 via-white to-green-50',
      'dark:from-gray-900 dark:via-gray-800 dark:to-blue-900',
      containerClass
    ]"
  >
    <!-- Formas flotantes animadas -->
    <div class="absolute inset-0">
      <!-- Círculo grande -->
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"
        style="animation-duration: 4s"
      />

      <!-- Círculo mediano -->
      <div
        class="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"
        style="animation-duration: 6s; animation-delay: 2s"
      />

      <!-- Círculo pequeño -->
      <div
        class="absolute bottom-10 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/25 to-pink-500/25 rounded-full blur-xl animate-bounce"
        style="animation-duration: 3s"
      />

      <!-- Elementos flotantes -->
      <div
        v-for="i in particleCount"
        :key="i"
        :class="[
          'absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20',
          'animate-pulse'
        ]"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }"
      />
    </div>

    <!-- Patrón de malla sutil -->
    <div
      v-if="showPattern"
      class="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"
    />

    <!-- Overlay para mejorar la legibilidad -->
    <div
      v-if="overlay"
      class="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[1px]"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  particleCount?: number
  showPattern?: boolean
  overlay?: boolean
  containerClass?: string
}

withDefaults(defineProps<Props>(), {
  particleCount: 15,
  showPattern: true,
  overlay: false,
  containerClass: ''
})
</script>
