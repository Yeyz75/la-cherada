<template>
  <div class="dashboard-section p-6">
    <BaseCard
      title="Apariencia"
      subtitle="Personaliza la interfaz de la aplicación"
    >
      <div class="space-y-6">
        <!-- Configuración de tema -->
        <div>
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Tema de la aplicación
          </h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Modo oscuro/claro
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Cambia entre tema claro y oscuro
                </p>
              </div>
              <div class="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        <!-- Configuración de idioma -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Idioma de la interfaz
          </h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Idioma preferido
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Selecciona el idioma de la aplicación
                </p>
              </div>
              <div class="flex items-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        <!-- Configuraciones adicionales -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Personalización adicional
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            Más opciones de personalización estarán disponibles próximamente.
          </p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

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
