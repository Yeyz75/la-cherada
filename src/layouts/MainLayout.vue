<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <Navbar />

    <!-- Loading overlay global -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
        <BaseLoader size="lg" variant="spinner" />
        <p id="loading-title" class="mt-4 text-gray-700 font-medium">
          {{ loadingMessage || 'Cargando...' }}
        </p>
      </div>
    </div>

    <!-- Error notification global -->
    <Transition
      name="error-slide"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div
        v-if="hasError"
        class="fixed top-16 left-0 right-0 z-40 mx-4 sm:mx-6 lg:mx-8"
      >
        <div class="max-w-7xl mx-auto">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <p class="mt-1 text-sm text-red-700">
                  {{ errorMessage }}
                </p>
                <p v-if="errorCode" class="mt-1 text-xs text-red-600">
                  Código: {{ errorCode }}
                </p>
              </div>
              <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    @click="clearError"
                    class="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600 transition-colors duration-200"
                    aria-label="Cerrar notificación de error"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Contenido principal -->
    <main class="flex-1 relative">
      <div
        :class="{
          'pt-16': hasError,
          'opacity-50 pointer-events-none': isLoading
        }"
        class="transition-all duration-300"
      >
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { BaseLoader } from '@/components/common'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

const appStore = useAppStore()

// Computed properties para acceder al estado global
const isLoading = computed(() => appStore.isLoading)
const hasError = computed(() => appStore.hasError)
const loadingMessage = computed(() => appStore.loading.message)
const errorMessage = computed(() => appStore.error.message)
const errorCode = computed(() => appStore.error.code)

// Actions
const clearError = (): void => {
  appStore.clearError()
}

// Auto-cerrar errores después de 10 segundos
let errorTimeout: NodeJS.Timeout | null = null

const startErrorTimeout = (): void => {
  if (errorTimeout) {
    clearTimeout(errorTimeout)
  }

  errorTimeout = setTimeout(() => {
    clearError()
  }, 10000) // 10 segundos
}

// Limpiar timeout al cerrar manualmente
const clearErrorTimeout = (): void => {
  if (errorTimeout) {
    clearTimeout(errorTimeout)
    errorTimeout = null
  }
}

// Watchers para manejar el timeout de errores
const unwatchError = computed(() => {
  if (hasError.value) {
    startErrorTimeout()
  } else {
    clearErrorTimeout()
  }
  return hasError.value
})

// Cleanup al desmontar el componente
onUnmounted(() => {
  clearErrorTimeout()
})

// Manejo de teclas de escape para cerrar errores
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && hasError.value) {
    clearError()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Estilos adicionales para transiciones suaves */
.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.error-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Asegurar que el layout sea responsivo */
@media (max-width: 640px) {
  .fixed.top-16 {
    top: 4rem;
  }
}

/* Mejorar la accesibilidad del overlay de loading */
.fixed.inset-0[role='dialog'] {
  backdrop-filter: blur(2px);
}

/* Animación suave para el contenido principal cuando hay loading */
main .transition-all {
  transition-property: opacity, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
