<template>
  <div class="dashboard-section p-6">
    <BaseCard title="Preferencias" subtitle="Configura tus opciones de cuenta">
      <div class="space-y-6">
        <!-- Configuraciones básicas -->
        <div>
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Configuraciones generales
          </h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Notificaciones por email
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Recibir actualizaciones importantes por correo
                </p>
              </div>
              <div class="text-gray-600 dark:text-gray-400">Próximamente</div>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Privacidad del perfil
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Controla quién puede ver tu información
                </p>
              </div>
              <div class="text-gray-600 dark:text-gray-400">Próximamente</div>
            </div>
          </div>
        </div>

        <!-- Placeholder para futuras funcionalidades -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Configuraciones avanzadas
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            Las opciones avanzadas de configuración estarán disponibles
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
