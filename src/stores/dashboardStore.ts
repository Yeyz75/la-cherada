/**
 * Dashboard Store - Gestión del estado del dashboard modular
 * Maneja la navegación entre secciones, estado del sidebar y persistencia
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DashboardSection } from '@/types/dashboard'
import { DASHBOARD_CONSTANTS } from '@/types/dashboard'
import {
  DASHBOARD_SECTIONS,
  getSectionById,
  getOrderedSections,
  isValidSectionId
} from '@/config/dashboardSections'

export const useDashboardStore = defineStore('dashboard', () => {
  // Estado reactivo
  const activeSection = ref<string>(DASHBOARD_CONSTANTS.DEFAULT_SECTION)
  const sidebarCollapsed = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const sections = ref<DashboardSection[]>(DASHBOARD_SECTIONS)

  // Getters computados
  const currentSection = computed((): DashboardSection | undefined =>
    getSectionById(activeSection.value)
  )

  const availableSections = computed((): DashboardSection[] =>
    getOrderedSections().filter(section => section.requiresAuth)
  )

  const isValidSection = computed(
    () =>
      (sectionId: string): boolean =>
        isValidSectionId(sectionId)
  )

  const sidebarState = computed(() => ({
    collapsed: sidebarCollapsed.value,
    sections: availableSections.value,
    activeSection: activeSection.value
  }))

  // Actions - Gestión de sección activa
  const setActiveSection = (sectionId: string): boolean => {
    if (!isValidSectionId(sectionId)) {
      activeSection.value = DASHBOARD_CONSTANTS.DEFAULT_SECTION
      return false
    }

    if (activeSection.value !== sectionId) {
      activeSection.value = sectionId

      // Persistir en localStorage
      try {
        localStorage.setItem(
          DASHBOARD_CONSTANTS.LAST_SECTION_STORAGE_KEY,
          sectionId
        )
      } catch (error) {
        //xd
      }
    }

    return true
  }

  const navigateToSection = (sectionId: string): void => {
    setActiveSection(sectionId)
  }

  const navigateToDefaultSection = (): void => {
    setActiveSection(DASHBOARD_CONSTANTS.DEFAULT_SECTION)
  }

  // Actions - Gestión del sidebar
  const toggleSidebar = (): void => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const setSidebarCollapsed = (collapsed: boolean): void => {
    sidebarCollapsed.value = collapsed
  }

  const collapseSidebar = (): void => {
    setSidebarCollapsed(true)
  }

  const expandSidebar = (): void => {
    setSidebarCollapsed(false)
  }

  // Actions - Gestión de estado de carga
  const setLoading = (loading: boolean): void => {
    isLoading.value = loading
  }

  const startLoading = (): void => {
    setLoading(true)
  }

  const stopLoading = (): void => {
    setLoading(false)
  }

  // Actions - Inicialización y persistencia
  const initializeDashboard = (): void => {
    try {
      // Cargar última sección visitada desde localStorage
      const lastSection = localStorage.getItem(
        DASHBOARD_CONSTANTS.LAST_SECTION_STORAGE_KEY
      )

      if (lastSection && isValidSectionId(lastSection)) {
        activeSection.value = lastSection
      } else {
        // Si no hay sección guardada o es inválida, usar la por defecto
        activeSection.value = DASHBOARD_CONSTANTS.DEFAULT_SECTION
      }

      // Inicializar estado del sidebar basado en el tamaño de pantalla
      const isMobile = window.innerWidth < DASHBOARD_CONSTANTS.MOBILE_BREAKPOINT
      sidebarCollapsed.value = isMobile
    } catch (error) {
      // Usar valores por defecto en caso de error
      activeSection.value = DASHBOARD_CONSTANTS.DEFAULT_SECTION
      sidebarCollapsed.value = false
    }
  }

  const resetDashboard = (): void => {
    activeSection.value = DASHBOARD_CONSTANTS.DEFAULT_SECTION
    sidebarCollapsed.value = false
    isLoading.value = false

    // Limpiar localStorage
    try {
      localStorage.removeItem(DASHBOARD_CONSTANTS.LAST_SECTION_STORAGE_KEY)
    } catch (error) {
      //xd
    }
  }

  return {
    // Estado
    activeSection,
    sidebarCollapsed,
    isLoading,
    sections,

    // Getters
    currentSection,
    availableSections,
    isValidSection,
    sidebarState,

    // Actions - Navegación
    setActiveSection,
    navigateToSection,
    navigateToDefaultSection,

    // Actions - Sidebar
    toggleSidebar,
    setSidebarCollapsed,
    collapseSidebar,
    expandSidebar,

    // Actions - Estado de carga
    setLoading,
    startLoading,
    stopLoading,

    // Actions - Inicialización
    initializeDashboard,
    resetDashboard
  }
})

// Funciones adicionales para extensibilidad futura
export const useDashboardExtensions = () => {
  const dashboardStore = useDashboardStore()

  // Gestión de secciones dinámicas
  const addSection = (section: DashboardSection): boolean => {
    if (dashboardStore.sections.some(s => s.id === section.id)) {
      return false
    }

    dashboardStore.sections.push(section)
    return true
  }

  const removeSection = (sectionId: string): boolean => {
    const index = dashboardStore.sections.findIndex(s => s.id === sectionId)

    if (index === -1) {
      return false
    }

    // Si se está eliminando la sección activa, cambiar a la por defecto
    if (dashboardStore.activeSection === sectionId) {
      dashboardStore.setActiveSection(DASHBOARD_CONSTANTS.DEFAULT_SECTION)
    }

    dashboardStore.sections.splice(index, 1)
    return true
  }

  // Utilidades para obtener información de secciones
  const getSectionByPath = (path: string): DashboardSection | undefined => {
    return dashboardStore.sections.find(section => section.path === path)
  }

  const getNextSection = (): DashboardSection | undefined => {
    const orderedSections = getOrderedSections()
    const currentIndex = orderedSections.findIndex(
      s => s.id === dashboardStore.activeSection
    )

    if (currentIndex === -1 || currentIndex === orderedSections.length - 1) {
      return orderedSections[0] // Volver al inicio si es la última o no se encuentra
    }

    return orderedSections[currentIndex + 1]
  }

  const getPreviousSection = (): DashboardSection | undefined => {
    const orderedSections = getOrderedSections()
    const currentIndex = orderedSections.findIndex(
      s => s.id === dashboardStore.activeSection
    )

    if (currentIndex <= 0) {
      return orderedSections[orderedSections.length - 1] // Ir al final si es la primera
    }

    return orderedSections[currentIndex - 1]
  }

  // Navegación con teclado
  const navigateNext = (): void => {
    const nextSection = getNextSection()
    if (nextSection) {
      dashboardStore.setActiveSection(nextSection.id)
    }
  }

  const navigatePrevious = (): void => {
    const previousSection = getPreviousSection()
    if (previousSection) {
      dashboardStore.setActiveSection(previousSection.id)
    }
  }

  return {
    // Gestión dinámica de secciones
    addSection,
    removeSection,

    // Utilidades
    getSectionByPath,
    getNextSection,
    getPreviousSection,

    // Navegación con teclado
    navigateNext,
    navigatePrevious
  }
}
