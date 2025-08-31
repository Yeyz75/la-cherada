<template>
  <div class="dashboard-section p-6">
    <BaseCard
      title="Notificaciones"
      subtitle="Gestiona tus preferencias de notificación"
    >
      <div class="space-y-6">
        <!-- Tipos de notificaciones -->
        <div>
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Tipos de notificaciones
          </h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Notificaciones de seguridad
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Alertas sobre actividad de la cuenta
                </p>
              </div>
              <div class="text-gray-600 dark:text-gray-400">Próximamente</div>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Actualizaciones del producto
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Nuevas funcionalidades y mejoras
                </p>
              </div>
              <div class="text-gray-600 dark:text-gray-400">Próximamente</div>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Recordatorios
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Recordatorios personalizados
                </p>
              </div>
              <div class="text-gray-600 dark:text-gray-400">Próximamente</div>
            </div>
          </div>
        </div>

        <!-- Configuración de frecuencia -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Frecuencia de notificaciones
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            Las opciones de configuración de frecuencia estarán disponibles
            próximamente.
          </p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue'

interface Props {
  sectionId?: string
}

defineProps<Props>()

// Emits para comunicación con DashboardContent
const emit = defineEmits<{
  loading: [isLoading: boolean]
  error: [error: Error]
}>()
</script>
