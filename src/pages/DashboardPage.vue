<template>
  <DashboardLayout />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useDashboardStore } from '@/stores/dashboardStore'
import { DashboardLayout } from '@/layouts'

// Composables
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()

// Manejo de parámetros de ruta para sección inicial
const handleRouteParams = (): void => {
  const dashboardSection = route.meta.dashboardSection as string

  if (dashboardSection && dashboardStore.isValidSection(dashboardSection)) {
    dashboardStore.setActiveSection(dashboardSection)
  } else {
    // Si no hay sección válida, usar la sección por defecto
    dashboardStore.setActiveSection('account')
  }
}

// Inicialización del dashboard
const initializeDashboard = async (): Promise<void> => {
  try {
    // Verificar autenticación
    if (!authStore.isAuthenticated) {
      await router.push('/login')
      return
    }

    // Inicializar el dashboard store
    dashboardStore.initializeDashboard()

    // Manejar parámetros de ruta
    handleRouteParams()
  } catch (error) {
    // En caso de error, redirigir al login
    await router.push('/login')
  }
}

// Lifecycle hooks
onMounted(() => {
  void initializeDashboard()
})

// Watchers
watch(
  () => route.meta.dashboardSection,
  newSection => {
    if (
      typeof newSection === 'string' &&
      dashboardStore.isValidSection(newSection)
    ) {
      dashboardStore.setActiveSection(newSection)
    }
  }
)

// Watch para cambios en la autenticación
watch(
  () => authStore.isAuthenticated,
  isAuth => {
    if (!isAuth) {
      void router.push('/login')
    }
  }
)
</script>

<style scoped>
/* Estilos específicos para la página del dashboard si es necesario */
</style>
