<!-- Componente de tarjeta moderna con efectos glassmorphism -->
<template>
  <div
    :class="[
      'group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out',
      'backdrop-blur-sm border shadow-xl',
      'dark:shadow-gray-900/40',
      variant === 'glass' && [
        'bg-white/20 dark:bg-gray-800/20',
        'border-white/30 dark:border-gray-700/50',
        'hover:bg-white/30 dark:hover:bg-gray-800/30'
      ],
      variant === 'solid' && [
        'bg-white dark:bg-gray-800',
        'border-gray-200 dark:border-gray-700',
        'hover:bg-gray-50 dark:hover:bg-gray-750'
      ],
      variant === 'gradient' && [
        'bg-gradient-to-br from-white via-gray-50 to-gray-100',
        'dark:from-gray-800 dark:via-gray-750 dark:to-gray-700',
        'border-gray-200/50 dark:border-gray-600/50'
      ],
      padding,
      hoverEffect && 'hover:-translate-y-2 hover:shadow-2xl',
      !hoverEffect && 'hover:shadow-lg',
      containerClass
    ]"
  >
    <!-- Efecto de brillo animado -->
    <div
      v-if="glowEffect"
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
    />

    <!-- Patrón de fondo sutil -->
    <div
      v-if="backgroundPattern"
      class="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.gray.400)_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_theme(colors.gray.300)_1px,_transparent_0)] [background-size:20px_20px]"
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
