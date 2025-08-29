<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Spinner variant -->
    <div v-if="variant === 'spinner'" :class="spinnerClasses">
      <svg
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <!-- Dots variant -->
    <div v-else-if="variant === 'dots'" :class="dotsContainerClasses">
      <div
        v-for="i in 3"
        :key="i"
        :class="dotClasses"
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      ></div>
    </div>

    <!-- Pulse variant -->
    <div v-else-if="variant === 'pulse'" :class="pulseClasses">
      <div class="animate-pulse bg-blue-600 rounded-full"></div>
    </div>

    <!-- Loading text -->
    <p v-if="text" :class="textClasses">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'dots' | 'pulse'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'spinner',
  text: ''
})

const spinnerClasses = computed((): string => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return `text-blue-600 ${sizeClasses[props.size]}`
})

const dotsContainerClasses = computed((): string => {
  const sizeClasses = {
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3'
  }

  return `flex ${sizeClasses[props.size]}`
})

const dotClasses = computed((): string => {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  }

  return `bg-blue-600 rounded-full animate-bounce ${sizeClasses[props.size]}`
})

const pulseClasses = computed((): string => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return sizeClasses[props.size]
})

const textClasses = computed((): string => {
  const sizeClasses = {
    sm: 'text-sm mt-2',
    md: 'text-base mt-3',
    lg: 'text-lg mt-4'
  }

  return `text-gray-600 ${sizeClasses[props.size]}`
})
</script>

<style scoped>
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out both;
}
</style>
