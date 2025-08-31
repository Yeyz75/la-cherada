import { DashboardSectionId } from '@/types/dashboard'

/**
 * Constantes de configuración para el dashboard
 */
export const DASHBOARD_CONFIG = {
  /** Configuración del sidebar */
  SIDEBAR: {
    /** Ancho del sidebar cuando está expandido (px) */
    EXPANDED_WIDTH: 280,
    /** Ancho del sidebar cuando está colapsado (px) */
    COLLAPSED_WIDTH: 64,
    /** Breakpoint para auto-colapsar en móvil (px) */
    MOBILE_BREAKPOINT: 768
  },

  /** Configuración de animaciones y transiciones */
  ANIMATIONS: {
    /** Duración de transición entre secciones (ms) */
    SECTION_TRANSITION: 200,
    /** Duración de animación del sidebar (ms) */
    SIDEBAR_TRANSITION: 300,
    /** Tipo de easing para las transiciones */
    EASING: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },

  /** Configuración de persistencia */
  STORAGE: {
    /** Clave para guardar la última sección visitada */
    LAST_SECTION_KEY: 'dashboard_last_section',
    /** Clave para guardar el estado del sidebar */
    SIDEBAR_STATE_KEY: 'dashboard_sidebar_collapsed'
  },

  /** Configuración por defecto */
  DEFAULTS: {
    /** Sección que se carga por defecto */
    SECTION: DashboardSectionId.ACCOUNT,
    /** Estado inicial del sidebar (false = expandido) */
    SIDEBAR_COLLAPSED: false
  }
} as const

/**
 * Clases CSS utilizadas en el dashboard
 */
export const DASHBOARD_CLASSES = {
  /** Clases para el layout principal */
  LAYOUT: {
    CONTAINER: 'dashboard-layout',
    SIDEBAR: 'dashboard-sidebar',
    CONTENT: 'dashboard-content'
  },

  /** Clases para la navegación */
  NAVIGATION: {
    NAV_ITEM: 'dashboard-nav-item',
    NAV_ITEM_ACTIVE: 'dashboard-nav-item--active',
    NAV_ITEM_ICON: 'dashboard-nav-item__icon',
    NAV_ITEM_TEXT: 'dashboard-nav-item__text'
  },

  /** Clases para estados */
  STATES: {
    LOADING: 'dashboard--loading',
    ERROR: 'dashboard--error',
    COLLAPSED: 'dashboard--collapsed'
  }
} as const

/**
 * Mensajes de error del dashboard
 */
export const DASHBOARD_ERRORS = {
  SECTION_NOT_FOUND: 'La sección solicitada no existe',
  UNAUTHORIZED_ACCESS: 'No tienes permisos para acceder a esta sección',
  COMPONENT_LOAD_FAILED: 'Error al cargar el componente de la sección',
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado'
} as const

/**
 * Eventos personalizados del dashboard
 */
export const DASHBOARD_EVENTS = {
  SECTION_CHANGED: 'dashboard:section-changed',
  SIDEBAR_TOGGLED: 'dashboard:sidebar-toggled',
  LOADING_STATE_CHANGED: 'dashboard:loading-changed',
  ERROR_OCCURRED: 'dashboard:error-occurred'
} as const

/**
 * Configuración de accesibilidad
 */
export const ACCESSIBILITY_CONFIG = {
  /** ARIA labels */
  ARIA_LABELS: {
    SIDEBAR: 'Navegación del dashboard',
    MAIN_CONTENT: 'Contenido principal del dashboard',
    SECTION_BUTTON: 'Ir a sección',
    TOGGLE_SIDEBAR: 'Alternar navegación lateral',
    LOGOUT_BUTTON: 'Cerrar sesión'
  },

  /** Roles ARIA */
  ARIA_ROLES: {
    NAVIGATION: 'navigation',
    MAIN: 'main',
    MENUBAR: 'menubar',
    MENUITEM: 'menuitem'
  },

  /** Atajos de teclado */
  KEYBOARD_SHORTCUTS: {
    TOGGLE_SIDEBAR: 'Alt+S',
    ACCOUNT_SECTION: 'Alt+1',
    PREFERENCES_SECTION: 'Alt+2',
    NOTIFICATIONS_SECTION: 'Alt+3',
    APPEARANCE_SECTION: 'Alt+4'
  }
} as const
