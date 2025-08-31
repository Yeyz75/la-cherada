/**
 * Dashboard Types
 * Tipos TypeScript para el sistema modular de dashboard
 */

// Iconos disponibles (basado en el sistema de iconos existente)
export type DashboardIcon =
  | 'user'
  | 'chart-bar'
  | 'activity'
  | 'cog'
  | 'support'
  | 'home'
  | 'star'
  | 'bell'
  | 'help-circle'

// Sección del dashboard
export interface DashboardSection {
  /** Identificador único de la sección */
  id: string
  /** Nombre de la sección (clave de i18n) */
  name: string
  /** Ícono de la sección */
  icon: DashboardIcon
  /** Ruta de la sección */
  route: string
  /** Si la sección está habilitada */
  enabled: boolean
  /** Orden de aparición en el sidebar */
  order: number
  /** Badge/contador opcional */
  badge?: number | string
  /** Color del badge */
  badgeColor?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'gray'
}

// Estado del dashboard
export interface DashboardState {
  /** Sección activa actualmente */
  activeSection: string
  /** Si el sidebar está colapsado (móviles) */
  sidebarCollapsed: boolean
  /** Si está cargando */
  loading: boolean
}

// Configuración del dashboard
export interface DashboardConfig {
  /** Secciones disponibles */
  sections: DashboardSection[]
  /** Configuración del sidebar */
  sidebar: {
    width: string
    collapsedWidth: string
    breakpoint: number
  }
}

// Props para componentes de sección
export interface DashboardSectionProps {
  /** Si la sección está activa */
  isActive: boolean
  /** Datos del usuario */
  user?: unknown
  /** Configuración adicional */
  config?: Record<string, unknown>
}
