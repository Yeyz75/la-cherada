<template>
  <div class="dashboard-layout min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Overlay para móviles cuando el sidebar está abierto -->
    <div
      v-if="!sidebarCollapsed && isMobile"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="toggleSidebar"
    />

    <!-- Sidebar -->
    <DashboardSidebar
      :collapsed="sidebarCollapsed"
      :is-mobile="isMobile"
      :active-section="activeSection"
      :sections="dashboardSections"
      @toggle="toggleSidebar"
      @section-change="handleSectionChange"
    />

    <!-- Contenido principal -->
    <div
      class="transition-all duration-300"
      :class="[
        'dashboard-main',
        sidebarCollapsed || isMobile ? 'lg:ml-16' : 'lg:ml-64'
      ]"
    >
      <!-- Header del dashboard -->
      <header
        class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div class="px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <!-- Botón de menú para móviles -->
            <div class="flex items-center space-x-4">
              <button
                v-if="isMobile"
                @click="toggleSidebar"
                class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <BaseIcon name="menu" class="w-6 h-6" />
              </button>

              <!-- Título de la sección actual -->
              <div>
                <h1
                  class="text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  {{ $t(`dashboard.sections.${activeSection}.title`) }}
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {{ $t(`dashboard.sections.${activeSection}.subtitle`) }}
                </p>
              </div>
            </div>

            <!-- Acciones rápidas -->
            <div class="flex items-center space-x-3">
              <!-- Notificaciones -->
              <button
                class="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
              >
                <BaseIcon name="bell" class="w-6 h-6" />
                <!-- Badge de notificaciones (opcional) -->
                <span
                  v-if="notificationCount > 0"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ notificationCount > 9 ? '9+' : notificationCount }}
                </span>
              </button>

              <!-- Avatar/menú de usuario -->
              <UserDropdownMenu
                v-if="currentUser"
                :user="currentUser"
                :user-profile="userProfile"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Área de contenido -->
      <main class="dashboard-content p-4 sm:p-6 lg:p-8">
        <!-- Loading state -->
        <div v-if="loading" class="flex items-center justify-center min-h-96">
          <BaseLoader size="lg" />
        </div>

        <!-- Contenido de la sección -->
        <router-view v-else />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

// Components
import DashboardSidebar from './DashboardSidebar.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'
import UserDropdownMenu from '@/components/common/UserDropdownMenu.vue'

// Types
import type { DashboardSection } from './types/dashboard'

// Composables
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const userStore = useUserStore()

// Estado reactivo
const sidebarCollapsed = ref(false)
const isMobile = ref(false)
const loading = ref(false)
const notificationCount = ref(0) // TODO: Conectar con sistema real de notificaciones

// Configuración de secciones del dashboard
const dashboardSections = ref<DashboardSection[]>([
  {
    id: 'profile',
    name: 'dashboard.sections.profile.name',
    icon: 'user',
    route: '/dashboard/profile',
    enabled: true,
    order: 1
  },
  {
    id: 'stats',
    name: 'dashboard.sections.stats.name',
    icon: 'chart-bar',
    route: '/dashboard/stats',
    enabled: true,
    order: 2
  },
  {
    id: 'activity',
    name: 'dashboard.sections.activity.name',
    icon: 'activity',
    route: '/dashboard/activity',
    enabled: true,
    order: 3
  },
  {
    id: 'settings',
    name: 'dashboard.sections.settings.name',
    icon: 'cog',
    route: '/dashboard/settings',
    enabled: true,
    order: 4
  }
])

// Computed
const activeSection = computed(() => {
  const path = route.path
  const section = dashboardSections.value.find(s => path.includes(s.id))
  return section?.id ?? 'profile'
})

const currentUser = computed(() => authStore.user)
const userProfile = computed(() => userStore.currentProfile)

// Methods
const toggleSidebar = (): void => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const handleSectionChange = (sectionId: string): void => {
  const section = dashboardSections.value.find(s => s.id === sectionId)
  if (section) {
    void router.push(section.route)
  }

  // En móviles, cerrar el sidebar al cambiar de sección
  if (isMobile.value) {
    sidebarCollapsed.value = true
  }
}

const checkMobile = (): void => {
  isMobile.value = window.innerWidth < 1024
  // En móviles, el sidebar empieza colapsado
  if (isMobile.value) {
    sidebarCollapsed.value = true
  }
}

// Lifecycle
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  // Si estamos en la ruta base del dashboard, redirigir al perfil
  if (route.path === '/dashboard' || route.path === '/dashboard/') {
    void router.replace('/dashboard/profile')
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.dashboard-layout {
  position: relative;
}

.dashboard-main {
  min-height: 100vh;
}

.dashboard-content {
  min-height: calc(100vh - 5rem); /* Ajustar según altura del header */
}

/* Animaciones suaves */
.dashboard-main {
  transition: margin-left 0.3s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .dashboard-main {
    margin-left: 0 !important;
  }
}
</style>
