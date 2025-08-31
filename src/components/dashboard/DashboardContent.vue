<template>
  <main
    class="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-gray-900"
    role="main"
    aria-label="Contenido principal del dashboard"
  >
    <!-- Breadcrumbs opcionales -->
    <div
      v-if="showBreadcrumbs && currentSection"
      class="px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <span class="text-gray-500 dark:text-gray-400">Dashboard</span>
          </li>
          <li class="flex items-center">
            <i
              class="pi pi-angle-right text-gray-400 mx-2"
              aria-hidden="true"
            ></i>
            <span class="text-gray-900 dark:text-gray-100 font-medium">
              {{ currentSection.name }}
            </span>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Área de contenido principal -->
    <div class="flex-1 overflow-auto">
      <div class="h-full">
        <!-- Transición entre secciones -->
        <Transition
          :name="transitionName || 'section-fade'"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave"
        >
          <!-- Estado de carga -->
          <div
            v-if="isLoading"
            key="loading"
            class="flex items-center justify-center h-full min-h-96"
          >
            <div class="text-center">
              <BaseLoader
                size="lg"
                variant="spinner"
                :text="loadingText || 'Cargando...'"
              />
            </div>
          </div>

          <!-- Estado de error -->
          <div
            v-else-if="hasError"
            key="error"
            class="flex items-center justify-center h-full min-h-96 p-6"
          >
            <DashboardError
              :error-message="errorMessage"
              :section-name="currentSection?.name || ''"
              @retry="handleRetry"
              @go-home="handleGoHome"
            />
          </div>

          <!-- Componente de sección dinámico -->
          <div
            v-else-if="currentSectionComponent"
            :key="activeSection"
            class="h-full"
          >
            <Suspense>
              <component
                :is="currentSectionComponent"
                :section-id="activeSection"
                @loading="handleSectionLoading"
                @error="handleSectionError"
              />

              <!-- Fallback de carga para Suspense -->
              <template #fallback>
                <div class="flex items-center justify-center h-full min-h-96">
                  <BaseLoader
                    size="md"
                    variant="dots"
                    text="Cargando sección..."
                  />
                </div>
              </template>
            </Suspense>
          </div>

          <!-- Estado por defecto cuando no hay sección -->
          <div
            v-else
            key="no-section"
            class="flex items-center justify-center h-full min-h-96 p-6"
          >
            <BaseCard title="Bienvenido al Dashboard" class="max-w-md">
              <div class="text-center">
                <i class="pi pi-home text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  Selecciona una sección del menú lateral para comenzar.
                </p>
                <BaseButton variant="primary" @click="handleGoToDefaultSection">
                  Ir a Mi Cuenta
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </Transition>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineAsyncComponent, type Component } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import { DASHBOARD_CONSTANTS } from '@/types/dashboard'
import BaseLoader from '@/components/common/BaseLoader.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'

interface Props {
  /** Mostrar breadcrumbs en la parte superior */
  showBreadcrumbs?: boolean
  /** Nombre de la transición CSS */
  transitionName?: string
  /** Texto personalizado para el estado de carga */
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  showBreadcrumbs: true,
  transitionName: 'section-fade',
  loadingText: 'Cargando...'
})

// Emits
const emit = defineEmits<{
  sectionChanged: [sectionId: string]
  loadingStateChanged: [isLoading: boolean]
  error: [error: Error]
}>()

// Store
const dashboardStore = useDashboardStore()

// Estado local
const isLoading = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const componentCache = new Map<string, Component>()

// Getters computados
const activeSection = computed(() => dashboardStore.activeSection)
const currentSection = computed(() => dashboardStore.currentSection)

// Componente dinámico de la sección actual
const currentSectionComponent = computed(() => {
  if (!currentSection.value || hasError.value) {
    return null
  }

  const componentName = currentSection.value.component

  // Verificar si el componente ya está en caché
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName)
  }

  // Crear componente asíncrono con manejo de errores
  const asyncComponent = defineAsyncComponent({
    loader: () => loadSectionComponent(componentName),
    delay: 100, // Delay antes de mostrar loading
    timeout: 10000 // Timeout de 10 segundos
  })

  // Guardar en caché
  componentCache.set(componentName, asyncComponent)

  return asyncComponent
})

// Métodos para carga dinámica de componentes
const loadSectionComponent = async (
  componentName: string
): Promise<Component> => {
  try {
    setLoading(true)

    // Mapeo de nombres de componentes a rutas de archivos
    const componentMap: Record<string, () => Promise<{ default: Component }>> =
      {
        AccountSection: () =>
          import('@/components/dashboard/sections/AccountSection.vue'),
        PreferencesSection: () =>
          import('@/components/dashboard/sections/PreferencesSection.vue'),
        NotificationsSection: () =>
          import('@/components/dashboard/sections/NotificationsSection.vue'),
        AppearanceSection: () =>
          import('@/components/dashboard/sections/AppearanceSection.vue')
      }

    const componentLoader = componentMap[componentName]

    if (!componentLoader) {
      throw new Error(`Componente '${componentName}' no encontrado`)
    }

    const module = await componentLoader()

    // Simular delay mínimo para evitar flashes
    await new Promise(resolve => setTimeout(resolve, 150))

    setLoading(false)
    clearError()

    return module.default
  } catch (error) {
    setLoading(false)
    const errorMsg =
      error instanceof Error
        ? error.message
        : 'Error desconocido al cargar la sección'
    setError(errorMsg)
    emit('error', error instanceof Error ? error : new Error(errorMsg))
    throw error
  }
}

// Gestión de estados
const setLoading = (loading: boolean) => {
  isLoading.value = loading
  emit('loadingStateChanged', loading)
}

const setError = (message: string) => {
  hasError.value = true
  errorMessage.value = message
}

const clearError = () => {
  hasError.value = false
  errorMessage.value = ''
}

// Manejadores de eventos
const handleSectionLoading = (loading: boolean) => {
  setLoading(loading)
}

const handleSectionError = (error: Error | string) => {
  const message = typeof error === 'string' ? error : error.message
  setError(message)

  if (typeof error !== 'string') {
    emit('error', error)
  }
}

const handleRetry = () => {
  clearError()

  // Limpiar caché del componente actual para forzar recarga
  if (currentSection.value) {
    componentCache.delete(currentSection.value.component)
  }

  // Forzar re-renderizado
  const currentSectionId = activeSection.value
  dashboardStore.setActiveSection('')

  // Restaurar sección después de un tick
  setTimeout(() => {
    dashboardStore.setActiveSection(currentSectionId)
  }, 50)
}

const handleGoHome = () => {
  clearError()
  dashboardStore.navigateToDefaultSection()
}

const handleGoToDefaultSection = () => {
  dashboardStore.setActiveSection(DASHBOARD_CONSTANTS.DEFAULT_SECTION)
}

// Manejadores de transiciones
const onBeforeEnter = () => {
  // Preparar elemento para entrada
}

const onEnter = (el: Element) => {
  // Animación de entrada completada
  if (el instanceof HTMLElement) {
    el.style.opacity = '1'
  }
}

const onLeave = (el: Element) => {
  // Preparar elemento para salida
  if (el instanceof HTMLElement) {
    el.style.opacity = '0'
  }
}

// Watchers
watch(
  activeSection,
  (newSection, oldSection) => {
    if (newSection !== oldSection) {
      clearError()
      emit('sectionChanged', newSection)
    }
  },
  { immediate: true }
)

// Limpiar caché cuando el componente se desmonta
const clearComponentCache = () => {
  componentCache.clear()
}

// Exponer métodos para uso externo si es necesario
defineExpose({
  clearError,
  clearComponentCache,
  handleRetry
})
</script>

<script lang="ts">
// Componente de error como componente hijo
import { defineComponent } from 'vue'

const DashboardError = defineComponent({
  name: 'DashboardError',
  props: {
    errorMessage: {
      type: String,
      default: 'Ha ocurrido un error inesperado'
    },
    sectionName: {
      type: String,
      default: ''
    }
  },
  emits: ['retry', 'goHome'],
  template: `
    <BaseCard title="Error al cargar la sección" class="max-w-md mx-auto">
      <div class="text-center">
        <i class="pi pi-exclamation-triangle text-4xl text-red-500 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No se pudo cargar {{ sectionName || 'la sección' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ errorMessage }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <BaseButton
            variant="primary"
            @click="$emit('retry')"
          >
            <template #icon>
              <i class="pi pi-refresh"></i>
            </template>
            Reintentar
          </BaseButton>
          <BaseButton
            variant="secondary"
            @click="$emit('goHome')"
          >
            <template #icon>
              <i class="pi pi-home"></i>
            </template>
            Ir al inicio
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  `
})

export { DashboardError }
</script>

<style scoped>
/* Transiciones suaves entre secciones */
.section-fade-enter-active,
.section-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.section-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Transición alternativa - slide */
.section-slide-enter-active,
.section-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.section-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.section-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Transición alternativa - scale */
.section-scale-enter-active,
.section-scale-leave-active {
  transition: all 0.3s ease-in-out;
}

.section-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.section-scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Mejoras de rendimiento */
.transition-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Scroll suave */
.overflow-auto {
  scroll-behavior: smooth;
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .section-fade-enter-active,
  .section-fade-leave-active,
  .section-slide-enter-active,
  .section-slide-leave-active,
  .section-scale-enter-active,
  .section-scale-leave-active {
    transition: none;
  }

  .section-fade-enter-from,
  .section-fade-leave-to,
  .section-slide-enter-from,
  .section-slide-leave-to,
  .section-scale-enter-from,
  .section-scale-leave-to {
    transform: none;
  }
}

/* Estados de focus mejorados */
button:focus-visible {
  outline: 2px solid #16a34a;
  outline-offset: 2px;
}

/* Indicadores de carga */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.dark .loading-shimmer {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
}
</style>
