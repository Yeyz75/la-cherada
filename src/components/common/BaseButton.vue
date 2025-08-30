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
  const baseClasses = 'base-button font-medium transition-all duration-200'

  // Clases adicionales según la variante para mantener compatibilidad
  const variantClasses = {
    primary: 'shadow-sm hover:shadow-md',
    secondary: 'shadow-sm hover:shadow-md',
    success: 'shadow-sm hover:shadow-md',
    info: 'shadow-sm hover:shadow-md',
    warning: 'shadow-sm hover:shadow-md',
    help: 'shadow-sm hover:shadow-md',
    danger: 'shadow-sm hover:shadow-md'
  }

  return `${baseClasses} ${variantClasses[props.variant]}`
})
</script>

<style scoped>
/* Additional styles for better button appearance */
:deep(.p-button) {
  /* Ensure proper text alignment and spacing */
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.375rem !important;
  white-space: nowrap !important;

  /* Better text rendering - smaller text */
  font-weight: 500 !important;
  letter-spacing: 0.025em !important;
  line-height: 1.2 !important;
  font-size: 0.875rem !important; /* 14px - smaller default size */

  /* Better padding for small buttons */
  padding: 0.5rem 1rem !important;

  /* Auto-adjust padding based on content */
  min-width: fit-content !important;
  width: auto !important;
}

/* Size-specific styling */
:deep(.p-button.p-button-sm) {
  font-size: 0.75rem !important; /* 12px - even smaller for small buttons */
  padding: 0.375rem 0.75rem !important;
  gap: 0.25rem !important;
}

:deep(.p-button.p-button-lg) {
  font-size: 1rem !important; /* 16px - larger for large buttons */
  padding: 0.75rem 1.5rem !important;
  gap: 0.5rem !important;
}

/* When button has w-full class, override the auto width */
:deep(.p-button.w-full) {
  width: 100% !important;
  min-width: 100% !important;
}

/* Special handling for justified buttons */
:deep(.p-button.justify-start) {
  justify-content: flex-start !important;
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
  text-align: left !important;
}

/* Icon spacing in buttons - smaller gap for small buttons */
:deep(.p-button .p-button-icon) {
  flex-shrink: 0 !important;
}

:deep(.p-button.p-button-sm .p-button-icon) {
  width: 1rem !important;
  height: 1rem !important;
}

/* Better text container for justified buttons */
:deep(.p-button.justify-start .p-button-label) {
  flex: 1 !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-align: left !important;
  font-size: inherit !important;
}

/* Ensure text doesn't overflow in full-width justified buttons */
:deep(.p-button.w-full.justify-start) {
  overflow: hidden !important;
}
</style>
