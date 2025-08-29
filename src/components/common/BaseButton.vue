<template>
  <Button
    :type="type"
    :disabled="disabled || loading"
    :loading="loading"
    :severity="primevueSeverity"
    :size="size"
    :outlined="outlined"
    :text="text"
    :class="buttonClasses"
    :pt="{
      root: {
        'data-pc-name': 'button',
        'data-pc-section': 'root',
        'data-p-disabled': disabled || loading
      }
    }"
    :unstyled="false"
    @click="handleClick"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'

interface Props {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'help'
    | 'danger'
  size?: 'small' | 'large'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  outlined?: boolean
  text?: boolean
}

interface Emits {
  click: [event: MouseEvent]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  type: 'button',
  outlined: false,
  text: false
})

const emit = defineEmits<Emits>()

const handleClick = (event: MouseEvent): void => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

// Mapear nuestras variantes a las severity de PrimeVue
const primevueSeverity = computed(() => {
  const severityMap = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    info: 'info',
    warning: 'warning',
    help: 'help',
    danger: 'danger'
  } as const

  return severityMap[props.variant] || 'primary'
})

const buttonClasses = computed((): string => {
  const baseClasses = 'base-button font-medium'

  // Clases adicionales según la variante para mantener compatibilidad
  const variantClasses = {
    primary: 'shadow-lg hover:shadow-xl',
    secondary: 'shadow-md hover:shadow-lg',
    success: 'shadow-lg hover:shadow-xl',
    info: 'shadow-md hover:shadow-lg',
    warning: 'shadow-md hover:shadow-lg',
    help: 'shadow-md hover:shadow-lg',
    danger: 'shadow-lg hover:shadow-xl'
  }

  return `${baseClasses} ${variantClasses[props.variant]}`
})
</script>
