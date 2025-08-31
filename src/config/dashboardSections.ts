import type { DashboardSection } from '@/types/dashboard'
import { DashboardSectionId } from '@/types/dashboard'

/**
 * Configuración de las secciones iniciales del dashboard
 * Estas secciones se muestran en el sidebar de navegación
 */
export const DASHBOARD_SECTIONS: DashboardSection[] = [
  {
    id: DashboardSectionId.ACCOUNT,
    name: 'Cuenta',
    icon: 'pi pi-user',
    component: 'AccountSection',
    path: '/dashboard/account',
    requiresAuth: true,
    order: 1
  },
  {
    id: DashboardSectionId.PREFERENCES,
    name: 'Preferencias',
    icon: 'pi pi-cog',
    component: 'PreferencesSection',
    path: '/dashboard/preferences',
    requiresAuth: true,
    order: 2
  },
  {
    id: DashboardSectionId.NOTIFICATIONS,
    name: 'Notificaciones',
    icon: 'pi pi-bell',
    component: 'NotificationsSection',
    path: '/dashboard/notifications',
    requiresAuth: true,
    order: 3
  },
  {
    id: DashboardSectionId.APPEARANCE,
    name: 'Apariencia',
    icon: 'pi pi-palette',
    component: 'AppearanceSection',
    path: '/dashboard/appearance',
    requiresAuth: true,
    order: 4
  }
]

/**
 * Obtiene una sección por su ID
 * @param sectionId - ID de la sección a buscar
 * @returns La sección encontrada o undefined
 */
export const getSectionById = (
  sectionId: string
): DashboardSection | undefined => {
  return DASHBOARD_SECTIONS.find(section => section.id === sectionId)
}

/**
 * Obtiene todas las secciones que requieren autenticación
 * @returns Array de secciones que requieren autenticación
 */
export const getAuthenticatedSections = (): DashboardSection[] => {
  return DASHBOARD_SECTIONS.filter(section => section.requiresAuth)
}

/**
 * Obtiene las secciones ordenadas por el campo order
 * @returns Array de secciones ordenadas
 */
export const getOrderedSections = (): DashboardSection[] => {
  return [...DASHBOARD_SECTIONS].sort((a, b) => a.order - b.order)
}

/**
 * Valida si un ID de sección es válido
 * @param sectionId - ID a validar
 * @returns true si el ID es válido, false en caso contrario
 */
export const isValidSectionId = (sectionId: string): boolean => {
  return DASHBOARD_SECTIONS.some(section => section.id === sectionId)
}
