<template>
  <aside
    :class="sidebarClasses"
    role="navigation"
    aria-label="Navegación del dashboard"
  >
    <!-- Información del usuario -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-3">
        <!-- Avatar del usuario -->
        <div class="flex-shrink-0">
          <div
            v-if="userInfo?.photoURL"
            class="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
          >
            <img
              :src="userInfo.photoURL"
              :alt="`Foto de ${userInfo.displayName}`"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold text-sm"
          >
            {{ userInitials }}
          </div>
        </div>

        <!-- Información del usuario -->
        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p
            class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
          >
            {{ userInfo?.displayName || 'Usuario' }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ userInfo?.email }}
          </p>
        </div>
      </div>
    </div>

    <!-- Navegación de secciones -->
    <nav class="flex-1 px-4 py-6 space-y-1" role="menubar">
      <button
        v-for="section in availableSections"
        :key="section.id"
        :class="getSectionButtonClasses(section.id)"
        :aria-current="activeSection === section.id ? 'page' : undefined"
        :aria-describedby="`section-${section.id}-desc`"
        role="menuitem"
        @click="handleSectionClick(section.id)"
      >
        <!-- Icono de la sección -->
        <i
          :class="section.icon"
          class="flex-shrink-0 w-5 h-5"
          aria-hidden="true"
        ></i>

        <!-- Nombre de la sección -->
        <span
          v-if="!collapsed"
          class="ml-3 text-sm font-medium truncate"
          :id="`section-${section.id}-desc`"
        >
          {{ section.name }}
        </span>

        <!-- Indicador de sección activa -->
        <div
          v-if="activeSection === section.id && !collapsed"
          class="ml-auto w-2 h-2 bg-green-600 rounded-full"
          aria-hidden="true"
        ></div>
      </button>
    </nav>

    <!-- Botón de colapso/expansión -->
    <div class="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
      <button
        :class="collapseButtonClasses"
        :aria-label="collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'"
        @click="handleToggleSidebar"
      >
        <i
          :class="collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"
          class="w-4 h-4"
          aria-hidden="true"
        ></i>
        <span v-if="!collapsed" class="ml-2 text-sm font-medium">
          Colapsar
        </span>
      </button>
    </div>

    <!-- Botón de logout -->
    <div class="px-4 pb-6">
      <BaseButton
        variant="secondary"
        :class="logoutButtonClasses"
        :loading="isLoggingOut"
        :disabled="isLoggingOut"
        @click="handleLogout"
      >
        <template #icon>
          <i class="pi pi-sign-out" aria-hidden="true"></i>
        </template>
        <span v-if="!collapsed">Cerrar Sesión</span>
      </BaseButton>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useAuthStore } from '@/stores/authStore'
import BaseButton from '@/components/common/BaseButton.vue'

interface Props {
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})

// Stores
const dashboardStore = useDashboardStore()
const authStore = useAuthStore()
const router = useRouter()

// Estado local
const isLoggingOut = ref(false)

// Getters computados
const activeSection = computed(() => dashboardStore.activeSection)
const availableSections = computed(() => dashboardStore.availableSections)
const collapsed = computed(
  () => props.collapsed || dashboardStore.sidebarCollapsed
)

// Información del usuario
const userInfo = computed(() => authStore.currentUser)
const userInitials = computed(() => {
  if (!userInfo.value) {
    return 'U'
  }

  const { firstName, lastName, displayName } = userInfo.value

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  if (displayName) {
    const names = displayName.split(' ')
    if (names.length >= 2) {
      return `${names[0]?.charAt(0)}${names[1]?.charAt(0)}`.toUpperCase()
    }
    return displayName.charAt(0).toUpperCase()
  }

  return 'U'
})

// Clases CSS computadas
const sidebarClasses = computed(() => {
  const baseClasses = [
    'flex',
    'flex-col',
    'h-full',
    'bg-white',
    'dark:bg-gray-800',
    'border-r',
    'border-gray-200',
    'dark:border-gray-700',
    'transition-all',
    'duration-300',
    'ease-in-out'
  ]

  const widthClasses = collapsed.value ? ['w-16'] : ['w-64']

  return [...baseClasses, ...widthClasses].join(' ')
})

const getSectionButtonClasses = (sectionId: string) => {
  const baseClasses = [
    'group',
    'flex',
    'items-center',
    'w-full',
    'px-3',
    'py-2',
    'text-left',
    'rounded-md',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-green-500',
    'focus:ring-offset-2',
    'dark:focus:ring-offset-gray-800'
  ]

  const isActive = activeSection.value === sectionId

  if (isActive) {
    return [
      ...baseClasses,
      'bg-green-50',
      'dark:bg-green-900/20',
      'text-green-700',
      'dark:text-green-300',
      'border-r-2',
      'border-green-600'
    ].join(' ')
  }

  return [
    ...baseClasses,
    'text-gray-600',
    'dark:text-gray-300',
    'hover:bg-gray-50',
    'dark:hover:bg-gray-700',
    'hover:text-gray-900',
    'dark:hover:text-gray-100'
  ].join(' ')
}

const collapseButtonClasses = computed(() =>
  [
    'flex',
    'items-center',
    'w-full',
    'px-3',
    'py-2',
    'text-sm',
    'text-gray-600',
    'dark:text-gray-300',
    'rounded-md',
    'hover:bg-gray-50',
    'dark:hover:bg-gray-700',
    'hover:text-gray-900',
    'dark:hover:text-gray-100',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-green-500',
    'focus:ring-offset-2',
    'dark:focus:ring-offset-gray-800'
  ].join(' ')
)

const logoutButtonClasses = computed(() => {
  const baseClasses = ['w-full', 'justify-start']

  if (collapsed.value) {
    baseClasses.push('px-2')
  }

  return baseClasses.join(' ')
})

// Métodos
const handleSectionClick = (sectionId: string) => {
  dashboardStore.setActiveSection(sectionId)

  // Navegar a la ruta correspondiente
  const section = availableSections.value.find(s => s.id === sectionId)
  if (section) {
    void router.push(section.path)
  }
}

const handleToggleSidebar = () => {
  dashboardStore.toggleSidebar()
}

const handleLogout = async () => {
  if (isLoggingOut.value) {
    return
  }

  try {
    isLoggingOut.value = true

    // Limpiar estado del dashboard antes del logout
    dashboardStore.resetDashboard()

    // Realizar logout
    await authStore.logout()

    // Redirigir al home
    await router.push('/')
  } catch (error) {
    // El error ya se maneja en el authStore
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<style scoped>
/* Animaciones suaves para el colapso */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mejoras de accesibilidad para focus */
button:focus-visible {
  outline: 2px solid #16a34a; /* green-600 - matches project primary color */
  outline-offset: 2px;
}

/* Indicador visual mejorado para sección activa */
.border-r-2 {
  border-right-width: 2px;
  border-right-style: solid;
}

/* Hover effects mejorados */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Estilos para el avatar */
img {
  transition: transform 0.2s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}
</style>
