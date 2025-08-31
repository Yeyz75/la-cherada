/**
 * Tipos específicos para el sistema de dashboard modular
 */

/**
 * Representa una sección individual del dashboard
 */
export interface DashboardSection {
  /** Identificador único de la sección */
  id: string
  /** Nombre visible de la sección */
  name: string
  /** Icono de PrimeVue para mostrar en la navegación */
  icon: string
  /** Nombre del componente Vue a cargar dinámicamente */
  component: string
  /** Ruta de la sección en el router */
  path: string
  /** Indica si la sección requiere autenticación */
  requiresAuth: boolean
  /** Orden de aparición en la navegación */
  order: number
}

/**
 * Estado global del dashboard
 */
export interface DashboardState {
  /** ID de la sección actualmente activa */
  activeSection: string
  /** Lista de todas las secciones disponibles */
  sections: DashboardSection[]
  /** Estado de colapso del sidebar */
  sidebarCollapsed: boolean
  /** Indica si el dashboard está cargando */
  isLoading: boolean
  /** Última sección visitada por el usuario */
  lastVisitedSection: string | null
}

/**
 * Información del usuario para mostrar en el dashboard
 */
export interface DashboardUser {
  /** ID único del usuario */
  id: string
  /** Nombre para mostrar en el dashboard */
  displayName: string
  /** Email del usuario */
  email: string
  /** URL de la foto de perfil (opcional) */
  photoURL?: string
}

/**
 * Enumeración de las secciones disponibles del dashboard
 */
export enum DashboardSectionId {
  ACCOUNT = 'account',
  PREFERENCES = 'preferences',
  NOTIFICATIONS = 'notifications',
  APPEARANCE = 'appearance'
}

/**
 * Constantes para el sistema de navegación
 */
export const DASHBOARD_CONSTANTS = {
  /** Sección por defecto al cargar el dashboard */
  DEFAULT_SECTION: DashboardSectionId.ACCOUNT,
  /** Clave para persistir la última sección en localStorage */
  LAST_SECTION_STORAGE_KEY: 'dashboard_last_section',
  /** Breakpoint para colapsar el sidebar en móvil */
  MOBILE_BREAKPOINT: 768,
  /** Duración de las transiciones entre secciones (ms) */
  TRANSITION_DURATION: 200
} as const

/**
 * Tipo para los eventos del dashboard
 */
export type DashboardEvent =
  | { type: 'SECTION_CHANGED'; payload: { sectionId: string } }
  | { type: 'SIDEBAR_TOGGLED'; payload: { collapsed: boolean } }
  | { type: 'LOADING_STARTED' }
  | { type: 'LOADING_FINISHED' }
  | { type: 'ERROR_OCCURRED'; payload: { message: string } }
