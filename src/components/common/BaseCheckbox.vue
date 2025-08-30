<template>
  <div class="w-full">
    <div class="flex items-start">
      <!-- Custom Checkbox mejorado -->
      <div class="checkbox-container relative">
        <input
          :id="checkboxId"
          :model-value="modelValue"
          :disabled="disabled"
          type="checkbox"
          class="peer sr-only"
          @change="handleChange"
        />
        <label
          :for="checkboxId"
          class="checkbox-label relative flex items-center justify-center w-5 h-5 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 rounded-md cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600 peer-checked:border-transparent peer-checked:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
          :class="checkboxLabelClasses"
        >
          <!-- Checkmark Icon with animation -->
          <svg
            class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-all duration-200 transform peer-checked:scale-100 scale-75"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>

          <!-- Ripple effect -->
          <div
            class="absolute inset-0 rounded-md opacity-0 peer-checked:animate-ping peer-checked:opacity-75 bg-gradient-to-r from-blue-500/30 to-blue-600/30"
          ></div>
        </label>
      </div>

      <!-- Label with enhanced styling -->
      <label
        v-if="label"
        :for="checkboxId"
        class="checkbox-text ml-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer select-none transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
        :class="labelClasses"
      >
        {{ label }}
        <span v-if="required" class="text-red-500 ml-1 font-medium">*</span>

        <!-- Visual feedback cuando está marcado -->
        <div
          v-if="modelValue && !error"
          class="inline-flex items-center ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium animate-fade-in"
        >
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          ✓ Activado
        </div>
      </label>
    </div>

    <!-- Error message with enhanced styling -->
    <div
      v-if="error"
      class="mt-2 flex items-center space-x-2 p-2 bg-red-50/80 dark:bg-red-900/20 rounded-lg border border-red-200/50 dark:border-red-800/30"
    >
      <svg
        class="w-4 h-4 text-red-500 flex-shrink-0 animate-pulse"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-sm text-red-600 dark:text-red-400 font-medium">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: boolean | string[] | undefined
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
  binary?: boolean
}

interface Emits {
  'update:modelValue': [value: boolean | string[] | undefined]
  change: [event: Event]
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  error: '',
  disabled: false,
  required: false,
  binary: true
})

const emit = defineEmits<Emits>()

const checkboxId = ref(`checkbox-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const value = props.binary ? target.checked : target.value
  emit('update:modelValue', value as boolean | string[] | undefined)
  emit('change', event)
}

const checkboxLabelClasses = computed((): string => {
  const baseClasses = ''

  if (props.error) {
    return `${baseClasses} !border-red-400 dark:!border-red-500 shadow-red-200 dark:shadow-red-800`
  }

  if (props.disabled) {
    return `${baseClasses} cursor-not-allowed opacity-50`
  }

  if (props.modelValue && !props.error) {
    return `${baseClasses} ring-4 ring-blue-500/20 dark:ring-blue-400/20`
  }

  return baseClasses
})

const labelClasses = computed((): string => {
  if (props.disabled) {
    return 'cursor-not-allowed text-gray-400 dark:text-gray-500'
  }
  return ''
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.checkbox-container:hover .checkbox-label::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  border-radius: 8px;
  z-index: -1;
  opacity: 0.1;
}

.checkbox-text {
  user-select: none;
}
</style>
