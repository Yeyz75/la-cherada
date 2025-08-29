<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @keydown.esc="handleEscape"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          @click="handleBackdropClick"
        ></div>

        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-if="modelValue" :class="modalClasses" @click.stop>
              <!-- Header -->
              <div
                v-if="title || closable"
                class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h3
                  v-if="title"
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ title }}
                </h3>
                <button
                  v-if="closable"
                  type="button"
                  class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors dark:text-gray-500 dark:hover:text-gray-300 dark:focus:text-gray-300"
                  @click="handleClose"
                >
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Content -->
              <div class="p-6">
                <slot />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  persistent?: boolean
}

interface Emits {
  'update:modelValue': [value: boolean]
  close: []
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  closable: true,
  persistent: false
})

const emit = defineEmits<Emits>()

const handleClose = (): void => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = (): void => {
  if (!props.persistent) {
    handleClose()
  }
}

const handleEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && !props.persistent) {
    handleClose()
  }
}

const modalClasses = computed((): string => {
  const baseClasses =
    'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto dark:bg-gray-800'

  const sizeClasses = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-xl w-full'
  }

  return `${baseClasses} ${sizeClasses[props.size]}`
})

// Prevent body scroll when modal is open
onMounted(() => {
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

// Watch for modelValue changes to control body scroll
import { watch } from 'vue'

watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)
</script>
