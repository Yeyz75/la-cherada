<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <DashboardSidebar />

    <!-- Overlay para móviles cuando el sidebar está abierto -->
    <Transition
      name="overlay"
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!sidebarCollapsed && isMobile"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        @click="toggleSidebar"
        aria-hidden="true"
      />
    </Transition>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header móvil -->
      <header
        class="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3"
      >
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ currentSectionName }}
          </h1>
          <button
            @click="toggleSidebar"
            class="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Abrir menú de navegación"
          >
            <i class="pi pi-bars text-lg" aria-hidden="true"></i>
          </button>
        </div>
      </header>

      <!-- Contenido del dashboard -->
      <DashboardContent />
    </div>

    <!-- Loading overlay global del dashboard -->
    <Transition
      name="fade"
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLoading"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-loading-title"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 text-center"
        >
          <BaseLoader size="lg" variant="spinner" />
          <p
            id="dashboard-loading-title"
            class="mt-4 text-gray-700 dark:text-gray-300 font-medium"
          >
            Cargando dashboard...
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useDashboardStore } from '@/stores/dashboardStore'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import DashboardContent from '@/components/dashboard/DashboardContent.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()

// Estado reactivo para el comportamiento responsive
const isMobile = ref(false)

// Computed properties
const isLoading = computed(() => dashboardStore.isLoading)
const sidebarCollapsed = computed(() => dashboardStore.sidebarCollapsed)
const currentSectionName = computed(() => {
  const section = dashboardStore.currentSection
  return section?.name ?? 'Dashboard'
})

// Métodos
const toggleSidebar = (): void => {
  dashboardStore.toggleSidebar()
}

const checkMobile = (): void => {
  isMobile.value = window.innerWidth < 1024 // lg breakpoint
}

const handleResize = (): void => {
  checkMobile()
  // Auto-colapsar sidebar en móvil si está expandido
  if (isMobile.value && !sidebarCollapsed.value) {
    dashboardStore.collapseSidebar()
  }
}

// Verificación de autenticación
const checkAuthentication = async (): Promise<void> => {
  if (!authStore.isAuthenticated) {
    await router.push('/login')
    return
  }
}

// Lifecycle hooks
onMounted(async () => {
  // Verificar autenticación
  await checkAuthentication()

  // Configurar detección de dispositivos móviles
  checkMobile()
  window.addEventListener('resize', handleResize)

  // Inicializar el dashboard store
  dashboardStore.initializeDashboard()

  // Auto-colapsar en móvil al inicializar
  if (isMobile.value) {
    dashboardStore.collapseSidebar()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Watch para cambios en la autenticación
authStore.$subscribe((mutation, state) => {
  if (!state.user || !state.firebaseUser) {
    void router.push('/login')
  }
})
</script>

<style scoped>
/* Transiciones personalizadas */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
</style>
