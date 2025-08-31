/**
 * Dashboard Components Export
 * Exportaciones centralizadas para todos los componentes del dashboard
 */

// Layout principal
export { default as DashboardLayout } from './DashboardLayout.vue'

// Sidebar
export { default as DashboardSidebar } from './DashboardSidebar.vue'

// Secciones
export { default as ProfileSection } from './sections/ProfileSection.vue'
export { default as StatsSection } from './sections/StatsSection.vue'
export { default as ActivitySection } from './sections/ActivitySection.vue'
export { default as SettingsSection } from './sections/SettingsSection.vue'

// Tipos
export * from './types/dashboard'

// Re-export tipos para compatibilidad
export type {
  DashboardSection,
  DashboardState,
  DashboardConfig
} from './types/dashboard'
