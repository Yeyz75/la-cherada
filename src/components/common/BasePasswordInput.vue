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

    <Password
      :id="inputId"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :feedback="feedback"
      :strength-meter="strengthMeter"
      :toggle-mask="toggleMask"
      :class="['w-full', { 'p-invalid': error }]"
      :input-class="inputClasses"
      @update:model-value="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

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
    'w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border border-gray-300/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm focus:shadow-md'

  if (props.error) {
    return `${baseClasses} !border-red-300 dark:!border-red-500 !focus:ring-red-500 !focus:border-red-500`
  }

  if (props.disabled) {
    return `${baseClasses} !bg-gray-50 dark:!bg-gray-800 !text-gray-500 dark:!text-gray-400 !cursor-not-allowed`
  }

  return baseClasses
})
</script>
