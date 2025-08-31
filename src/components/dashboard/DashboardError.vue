<template>
  <div
    class="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <!-- Icono de error -->
    <div
      class="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6"
    >
      <i
        class="pi pi-exclamation-triangle text-3xl text-red-600 dark:text-red-400"
      />
    </div>

    <!-- Título del error -->
    <h3
      class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3 text-center"
    >
      {{ errorTitle }}
    </h3>

    <!-- Mensaje del error -->
    <p
      class="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md leading-relaxed"
    >
      {{ errorMessage }}
    </p>

    <!-- Detalles técnicos (solo en desarrollo) -->
    <details v-if="showDetails && errorDetails" class="w-full max-w-md mb-6">
      <summary
        class="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        {{ t('dashboard.error.showDetails') }}
      </summary>
      <div
        class="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded border text-xs font-mono text-gray-700 dark:text-gray-300 overflow-auto max-h-32"
      >
        {{ errorDetails }}
      </div>
    </details>

    <!-- Botones de acción -->
    <div class="flex flex-col sm:flex-row gap-3">
      <!-- Botón de reintentar -->
      <BaseButton
        v-if="showRetry"
        :loading="isRetrying"
        :disabled="isRetrying"
        variant="primary"
        @click="handleRetry"
        class="px-6 py-2"
      >
        <i class="pi pi-refresh mr-2" />
        {{
          isRetrying
            ? t('dashboard.error.retrying')
            : t('dashboard.error.retry')
        }}
      </BaseButton>

      <!-- Botón de volver al dashboard -->
      <BaseButton
        v-if="showGoHome"
        variant="secondary"
        :outlined="true"
        @click="handleGoHome"
        class="px-6 py-2"
      >
        <i class="pi pi-home mr-2" />
        {{ t('dashboard.error.goHome') }}
      </BaseButton>

      <!-- Botón personalizado -->
      <BaseButton
        v-if="customAction"
        :variant="(customAction.severity as any) || 'secondary'"
        :outlined="customAction.outlined || false"
        @click="customAction.handler"
        class="px-6 py-2"
      >
        <i v-if="customAction.icon" :class="customAction.icon + ' mr-2'" />
        {{ customAction.label }}
      </BaseButton>
    </div>

    <!-- Tiempo transcurrido desde el error -->
    <div
      v-if="showTimestamp && errorTimestamp"
      class="mt-6 text-xs text-gray-500 dark:text-gray-400"
    >
      {{ formatErrorTimestamp }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
import { useDashboardStore } from '@/stores/dashboardStore'
import BaseButton from '@/components/common/BaseButton.vue'

// Props del componente
interface Props {
  /** Título del error */
  errorTitle?: string
  /** Mensaje descriptivo del error */
  errorMessage?: string
  /** Detalles técnicos del error (solo en desarrollo) */
  errorDetails?: string | Error
  /** Mostrar botón de reintentar */
  showRetry?: boolean
  /** Mostrar botón de volver al inicio */
  showGoHome?: boolean
  /** Mostrar detalles técnicos */
  showDetails?: boolean
  /** Mostrar timestamp del error */
  showTimestamp?: boolean
  /** Timestamp del error */
  errorTimestamp?: Date
  /** Acción personalizada */
  customAction?: {
    label: string
    handler: () => void
    icon?: string
    severity?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'info'
      | 'warning'
      | 'danger'
    outlined?: boolean
  }
  /** Tipo de error para mostrar mensaje predefinido */
  errorType?: 'network' | 'section' | 'auth' | 'generic'
}

// Props con valores por defecto
const props = withDefaults(defineProps<Props>(), {
  errorTitle: '',
  errorMessage: '',
  errorDetails: '',
  showRetry: true,
  showGoHome: true,
  showDetails: false,
  showTimestamp: false,
  errorType: 'generic'
})

// Events
const emit = defineEmits<{
  retry: []
  goHome: []
}>()

// Composables
const { t } = useTranslation()
const router = useRouter()
const dashboardStore = useDashboardStore()

// Estado reactivo
const isRetrying = ref(false)
const currentTime = ref(new Date())
const timeInterval = ref<NodeJS.Timeout>()

// Títulos y mensajes predefinidos por tipo de error
const errorContent = computed(() => {
  const baseContent = {
    network: {
      title: t('dashboard.error.network.title'),
      message: t('dashboard.error.network.message')
    },
    section: {
      title: t('dashboard.error.section.title'),
      message: t('dashboard.error.section.message')
    },
    auth: {
      title: t('dashboard.error.auth.title'),
      message: t('dashboard.error.auth.message')
    },
    generic: {
      title: t('dashboard.error.generic.title'),
      message: t('dashboard.error.generic.message')
    }
  }

  return baseContent[props.errorType]
})

// Título final del error
const errorTitle = computed(() => {
  return props.errorTitle || errorContent.value.title
})

// Mensaje final del error
const errorMessage = computed(() => {
  return props.errorMessage || errorContent.value.message
})

// Formateo del timestamp del error
const formatErrorTimestamp = computed(() => {
  if (!props.errorTimestamp) {
    return ''
  }

  const diff = currentTime.value.getTime() - props.errorTimestamp.getTime()
  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  if (minutes > 0) {
    return t('dashboard.error.timestamp.minutes', { minutes })
  } else {
    return t('dashboard.error.timestamp.seconds', { seconds })
  }
})

// Manejo de reintentar
const handleRetry = async (): Promise<void> => {
  if (isRetrying.value) {
    return
  }

  try {
    isRetrying.value = true
    emit('retry')
  } finally {
    // Mantener el estado de loading por un momento para feedback visual
    setTimeout(() => {
      isRetrying.value = false
    }, 1000)
  }
}

// Manejo de volver al inicio
const handleGoHome = (): void => {
  dashboardStore.navigateToDefaultSection()
  emit('goHome')
}

// Lifecycle hooks
onMounted(() => {
  // Actualizar tiempo cada segundo si se muestra timestamp
  if (props.showTimestamp && props.errorTimestamp) {
    timeInterval.value = setInterval(() => {
      currentTime.value = new Date()
    }, 1000)
  }
})

onUnmounted(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
})
</script>

<style scoped>
/* Animación suave para la aparición del componente */
.error-container {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilo para el elemento details */
details summary {
  list-style: none;
}

details summary::-webkit-details-marker {
  display: none;
}

details summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5rem;
  transition: transform 0.2s ease;
}

details[open] summary::before {
  transform: rotate(90deg);
}
</style>
