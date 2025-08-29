<!-- Componente de tarjeta moderna con efectos glassmorphism -->
<template>
  <div
    :class="[
      'group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out transform hover:scale-105',
      'backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl',
      'dark:border-gray-800/50 dark:shadow-gray-900/20',
      variant === 'glass' && 'bg-white/10 dark:bg-gray-900/10',
      variant === 'solid' && 'bg-white dark:bg-gray-800',
      variant === 'gradient' &&
        'bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90',
      padding,
      hoverEffect && 'hover:-translate-y-2',
      containerClass
    ]"
  >
    <!-- Efecto de brillo animado -->
    <div
      v-if="glowEffect"
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
    />

    <!-- Patrón de fondo sutil -->
    <div
      v-if="backgroundPattern"
      class="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.gray.400)_1px,_transparent_0)] [background-size:20px_20px]"
    />

    <!-- Contenido -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'glass' | 'solid' | 'gradient'
  padding?: string
  glowEffect?: boolean
  hoverEffect?: boolean
  backgroundPattern?: boolean
  containerClass?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'glass',
  padding: 'p-6',
  glowEffect: true,
  hoverEffect: true,
  backgroundPattern: false,
  containerClass: ''
})
</script>
