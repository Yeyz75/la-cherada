<template>
  <div class="w-full">
    <div class="flex items-start">
      <Checkbox
        :id="checkboxId"
        :model-value="modelValue"
        :binary="binary"
        :disabled="disabled"
        :class="checkboxClasses"
        @update:model-value="handleInput"
        @change="handleChange"
      />
      <label
        v-if="label"
        :for="checkboxId"
        class="ml-2 text-sm text-gray-700 dark:text-gray-300"
        :class="{ 'cursor-not-allowed text-gray-400': disabled }"
      >
        {{ label }}
        <span v-if="required" class="text-red-500 ml-1">*</span>
      </label>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Checkbox from 'primevue/checkbox'

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

const handleInput = (value: boolean | string[] | undefined): void => {
  emit('update:modelValue', value)
}

const handleChange = (event: Event): void => {
  emit('change', event)
}

const checkboxClasses = computed((): string => {
  const baseClasses = 'transition-all duration-200'

  if (props.error) {
    return `${baseClasses} p-invalid border-red-500 dark:border-red-400`
  }

  if (props.disabled) {
    return `${baseClasses} cursor-not-allowed opacity-50`
  }

  return baseClasses
})
</script>
