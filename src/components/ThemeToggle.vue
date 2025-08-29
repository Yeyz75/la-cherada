<template>
  <button
    :aria-label="getThemeLabel()"
    :title="getThemeLabel()"
    class="theme-toggle-button"
    :class="[
      size ? `size-${size}` : '',
      variant !== 'ghost' ? `variant-${variant}` : ''
    ]"
    @click="toggleTheme"
  >
    <!-- Sol/Luna icon con animación -->
    <div class="theme-icon-container">
      <Transition name="theme-icon" mode="out-in">
        <svg
          v-if="!isDark"
          key="moon"
          class="theme-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        <svg
          v-else
          key="sun"
          class="theme-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </Transition>
    </div>

    <!-- Texto opcional (se puede ocultar en mobile) -->
    <span v-if="showLabel" class="theme-toggle-label">
      {{ isDark ? 'Claro' : 'Oscuro' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

interface Props {
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'outline' | 'solid'
}

const props = withDefaults(defineProps<Props>(), {
  showLabel: false,
  size: 'md',
  variant: 'ghost'
})

const { isDark, toggleTheme, getThemeLabel } = useTheme()
</script>

<style scoped>
.theme-toggle-button {
  @apply inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;

  /* Size variants */
  &.size-sm {
    @apply p-1.5 text-sm;
  }

  &.size-md {
    @apply p-2 text-base;
  }

  &.size-lg {
    @apply p-3 text-lg;
  }

  /* Default size (md) */
  @apply p-2 text-base;

  /* Variant styles */
  @apply text-gray-600 hover:text-gray-900 hover:bg-gray-100;
  @apply dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800;
  @apply focus:ring-blue-500 dark:focus:ring-blue-400;

  &.variant-outline {
    @apply border-2 border-gray-300 text-gray-600 hover:border-gray-400;
    @apply dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500;
  }

  &.variant-solid {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
    @apply dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600;
  }
}

.theme-icon-container {
  @apply relative;
}

.theme-icon {
  @apply w-5 h-5;

  .size-sm & {
    @apply w-4 h-4;
  }

  .size-lg & {
    @apply w-6 h-6;
  }
}

.theme-toggle-label {
  @apply select-none;
}

/* Responsive improvements */
@media (max-width: 640px) {
  .theme-toggle-button {
    @apply gap-1.5 p-1.5;
  }

  .theme-toggle-label {
    @apply hidden;
  }
}

/* Animaciones de transición */
.theme-icon-enter-active,
.theme-icon-leave-active {
  @apply transition-all duration-300;
}

.theme-icon-enter-from {
  @apply opacity-0 transform rotate-90 scale-75;
}

.theme-icon-leave-to {
  @apply opacity-0 transform -rotate-90 scale-75;
}

.theme-icon-enter-to,
.theme-icon-leave-from {
  @apply opacity-100 transform rotate-0 scale-100;
}

/* Hover animations */
.theme-toggle-button:hover .theme-icon {
  @apply transform transition-transform duration-200;

  &:not(.theme-icon-enter-active):not(.theme-icon-leave-active) {
    @apply scale-110;
  }
}

/* Active state */
.theme-toggle-button:active .theme-icon {
  @apply scale-95;
}
</style>
