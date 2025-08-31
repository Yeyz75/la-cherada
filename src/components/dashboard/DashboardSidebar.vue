<template>
  <aside
    class="dashboard-sidebar fixed inset-y-0 left-0 z-50 transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg"
    :class="[
      collapsed ? 'w-16' : 'w-64',
      isMobile ? (collapsed ? '-translate-x-full' : 'translate-x-0') : ''
    ]"
  >
    <!-- Header del sidebar -->
    <div
      class="sidebar-header h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700"
    >
      <!-- Logo/Brand -->
      <div v-if="!collapsed" class="flex items-center space-x-3">
        <div
          class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
        >
          <BaseIcon name="home" class="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h2>
        </div>
      </div>

      <!-- Toggle button para desktop -->
      <button
        v-if="!isMobile"
        @click="$emit('toggle')"
        class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        :title="collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'"
      >
        <BaseIcon
          :name="collapsed ? 'chevron-right' : 'chevron-left'"
          class="w-5 h-5"
        />
      </button>

      <!-- Close button para móviles -->
      <button
        v-if="isMobile && !collapsed"
        @click="$emit('toggle')"
        class="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <BaseIcon name="x" class="w-5 h-5" />
      </button>
    </div>

    <!-- Navegación -->
    <nav class="sidebar-nav flex-1 px-2 py-4 space-y-1 overflow-y-auto">
      <template v-for="section in enabledSections" :key="section.id">
        <button
          @click="handleSectionClick(section)"
          class="nav-item group relative flex items-center w-full px-3 py-2 text-left rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="[
            section.id === activeSection
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          ]"
          :title="collapsed ? $t(section.name) : ''"
        >
          <!-- Ícono -->
          <div
            class="flex-shrink-0 flex items-center justify-center w-6 h-6"
            :class="[
              section.id === activeSection
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
            ]"
          >
            <BaseIcon :name="section.icon" class="w-5 h-5" />
          </div>

          <!-- Nombre de la sección -->
          <span
            v-if="!collapsed"
            class="ml-3 text-sm font-medium truncate transition-opacity duration-200"
            :class="[
              section.id === activeSection
                ? 'text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
            ]"
          >
            {{ $t(section.name) }}
          </span>

          <!-- Badge/contador -->
          <div v-if="section.badge && !collapsed" class="ml-auto flex-shrink-0">
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              :class="getBadgeClasses(section.badgeColor || 'blue')"
            >
              {{ section.badge }}
            </span>
          </div>

          <!-- Indicador activo -->
          <div
            v-if="section.id === activeSection"
            class="absolute inset-y-0 left-0 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-lg"
          />
        </button>
      </template>
    </nav>

    <!-- Footer del sidebar -->
    <div
      class="sidebar-footer border-t border-gray-200 dark:border-gray-700 p-4"
    >
      <!-- Información compacta del usuario o acciones adicionales -->
      <div
        v-if="!collapsed"
        class="text-xs text-gray-500 dark:text-gray-400 text-center"
      >
        <p>{{ $t('dashboard.sidebar.version') }} 1.0</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/components/common/BaseIcon.vue'
import type { DashboardSection } from './types/dashboard'

interface Props {
  collapsed: boolean
  isMobile: boolean
  activeSection: string
  sections: DashboardSection[]
}

interface Emits {
  toggle: []
  sectionChange: [sectionId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

// Computed
const enabledSections = computed(() => {
  return props.sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)
})

// Methods
const handleSectionClick = (section: DashboardSection): void => {
  emit('sectionChange', section.id)
}

const getBadgeClasses = (color: string): string => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    yellow:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    purple:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }

  return colorMap[color as keyof typeof colorMap] ?? colorMap.blue
}
</script>

<style scoped>
.dashboard-sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar-nav {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* Animaciones para el sidebar */
.dashboard-sidebar {
  transition:
    width 0.3s ease,
    transform 0.3s ease;
}

/* Estados hover mejorados */
.nav-item:hover .absolute {
  opacity: 0.5;
}

.nav-item[class*='bg-blue'] .absolute {
  opacity: 1;
}

/* Efectos de transición suaves */
.nav-item {
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.nav-item:hover::before {
  left: 100%;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .dashboard-sidebar {
    width: 16rem !important; /* 64 * 4 = w-64 */
  }

  .dashboard-sidebar.collapsed {
    transform: translateX(-100%);
  }
}
</style>
