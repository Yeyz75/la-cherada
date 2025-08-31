<template>
  <div class="dashboard-section p-6">
    <BaseCard title="Mi Cuenta" subtitle="Gestiona tu información personal">
      <div class="space-y-6">
        <!-- Información básica del usuario -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Nombre completo
            </label>
            <p class="text-gray-900 dark:text-gray-100">
              {{ userInfo?.displayName || 'No disponible' }}
            </p>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Correo electrónico
            </label>
            <p class="text-gray-900 dark:text-gray-100">
              {{ userInfo?.email || 'No disponible' }}
            </p>
          </div>
        </div>

        <!-- Placeholder para futuras funcionalidades -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Configuración de cuenta
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            Las opciones de edición de perfil estarán disponibles próximamente.
          </p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
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

// Store
const authStore = useAuthStore()

// Información del usuario
const userInfo = computed(() => authStore.currentUser)
</script>
