<template>
  <div :class="cardClasses">
    <div v-if="title || subtitle" :class="headerClasses">
      <h3
        v-if="title"
        class="text-lg font-semibold text-gray-900 dark:text-gray-100"
      >
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-sm text-gray-600 mt-1 dark:text-gray-300">
        {{ subtitle }}
      </p>
    </div>

    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  shadow: 'md',
  padding: 'md',
  hoverable: false
})

const cardClasses = computed((): string => {
  const baseClasses =
    'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300'

  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm hover:shadow-md dark:shadow-gray-900/30 dark:hover:shadow-gray-900/40',
    md: 'shadow-md hover:shadow-lg dark:shadow-gray-900/30 dark:hover:shadow-gray-900/40',
    lg: 'shadow-lg hover:shadow-xl dark:shadow-gray-900/40 dark:hover:shadow-gray-900/50'
  }

  // Hover effect
  const hoverClasses = props.hoverable
    ? 'hover:shadow-lg hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer dark:hover:shadow-gray-900/40 transform'
    : ''

  return `${baseClasses} ${shadowClasses[props.shadow]} ${hoverClasses}`.trim()
})

const headerClasses = computed((): string => {
  const paddingClasses = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6'
  }

  return `border-b border-gray-200 dark:border-gray-700 ${paddingClasses[props.padding]}`
})

const contentClasses = computed((): string => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }

  // If there's a header, adjust top padding
  const topPadding =
    (props.title || props.subtitle) && props.padding !== 'none'
      ? paddingClasses[props.padding]
      : paddingClasses[props.padding]

  return topPadding
})
</script>
