<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <Password
        :id="inputId"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :feedback="feedback"
        :strength-meter="strengthMeter"
        :toggle-mask="toggleMask"
        :class="['w-full password-input-custom', { 'p-invalid': error }]"
        :input-class="inputClasses"
        :pt="{
          input: { class: inputClasses },
          showIcon: {
            class:
              'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer w-5 h-5'
          },
          hideIcon: {
            class:
              'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer w-5 h-5'
          }
        }"
        @update:model-value="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Password from 'primevue/password'

interface Props {
  modelValue: string
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
  feedback?: boolean
  strengthMeter?: boolean
  toggleMask?: boolean
}

interface Emits {
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  label: '',
  error: '',
  disabled: false,
  required: false,
  feedback: false,
  strengthMeter: false,
  toggleMask: true
})

const emit = defineEmits<Emits>()

const inputId = ref(`password-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (value: string): void => {
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const inputClasses = computed((): string => {
  const baseClasses =
    'w-full pl-4 pr-12 py-3 bg-white/80 dark:bg-gray-700/80 border border-gray-300/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm focus:shadow-md'

  if (props.error) {
    return `${baseClasses} !border-red-300 dark:!border-red-500 !focus:ring-red-500 !focus:border-red-500`
  }

  if (props.disabled) {
    return `${baseClasses} !bg-gray-50 dark:!bg-gray-800 !text-gray-500 dark:!text-gray-400 !cursor-not-allowed`
  }

  return baseClasses
})
</script>

<style scoped>
/* Personalización para el componente Password de PrimeVue */
:deep(.password-input-custom) {
  position: relative;
}

:deep(.password-input-custom .p-password-input) {
  padding-right: 2.75rem !important;
}

:deep(.password-input-custom .p-password-toggle) {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem !important;
  height: 1.25rem !important;
  color: rgb(156, 163, 175);
  transition: color 0.2s ease;
}

:deep(.password-input-custom .p-password-toggle:hover) {
  color: rgb(75, 85, 99);
}

:deep(.dark .password-input-custom .p-password-toggle) {
  color: rgb(107, 114, 128);
}

:deep(.dark .password-input-custom .p-password-toggle:hover) {
  color: rgb(209, 213, 219);
}

:deep(.password-input-custom .p-password-panel) {
  margin-top: 0.25rem;
}
</style>
