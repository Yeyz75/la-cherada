<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm-project font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <InputText
      :id="inputId"
      :type="type"
      :model-value="String(modelValue)"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @update:model-value="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <p v-if="error" class="mt-1 text-sm-project text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
}

interface Emits {
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  label: '',
  error: '',
  disabled: false,
  required: false
})

const emit = defineEmits<Emits>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (value: string | undefined): void => {
  const finalValue = value || ''
  const outputValue = props.type === 'number' ? Number(finalValue) : finalValue
  emit('update:modelValue', outputValue)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const inputClasses = computed((): string => {
  const baseClasses =
    'w-full px-4 py-3 text-base-project bg-white/80 dark:bg-gray-700/80 border border-gray-300/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm focus:shadow-md'

  if (props.error) {
    return `${baseClasses} p-invalid !border-red-300 dark:!border-red-500 !focus:ring-red-500 !focus:border-red-500`
  }

  if (props.disabled) {
    return `${baseClasses} !bg-gray-50 dark:!bg-gray-800 !text-gray-500 dark:!text-gray-400 !cursor-not-allowed`
  }

  return baseClasses
})
</script>
