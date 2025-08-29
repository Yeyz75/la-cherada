/**
 * Theme Composable - Manages dark/light mode
 * Provides theme switching functionality with localStorage persistence
 */

import { computed, watch, onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import type { UIPreferences } from '@/types/global'

export function useTheme() {
  const appStore = useAppStore()

  // Computed values from store
  const currentTheme = computed(() => appStore.currentTheme)
  const isDark = computed(() => currentTheme.value === 'dark')

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = (): void => {
    const newTheme: UIPreferences['theme'] = isDark.value ? 'light' : 'dark'
    setTheme(newTheme)
  }

  /**
   * Set specific theme
   */
  const setTheme = (theme: UIPreferences['theme']): void => {
    // Update store
    appStore.setTheme(theme)

    // Update DOM class
    updateDOMTheme(theme)

    // Persist to localStorage
    localStorage.setItem('theme', theme)
  }

  /**
   * Update DOM classes for theme switching
   */
  const updateDOMTheme = (theme: UIPreferences['theme']): void => {
    const html = document.documentElement

    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  const initializeTheme = (): void => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as
      | UIPreferences['theme']
      | null

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
      return
    }

    // Check system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const systemTheme: UIPreferences['theme'] = prefersDark ? 'dark' : 'light'

    setTheme(systemTheme)
  }

  /**
   * Listen for system theme changes
   */
  const setupSystemThemeListener = (): void => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      // Only update if no theme is saved in localStorage
      if (!localStorage.getItem('theme')) {
        const systemTheme: UIPreferences['theme'] = e.matches ? 'dark' : 'light'
        setTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
  }

  /**
   * Get theme icon for UI components
   */
  const getThemeIcon = (): string => {
    return isDark.value ? '☀️' : '🌙'
  }

  /**
   * Get theme label for accessibility
   */
  const getThemeLabel = (): string => {
    return isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
  }

  // Watch for theme changes to update DOM
  watch(currentTheme, newTheme => {
    updateDOMTheme(newTheme)
  })

  // Initialize on component mount
  onMounted(() => {
    initializeTheme()
    setupSystemThemeListener()
  })

  return {
    // State
    currentTheme: computed(() => currentTheme.value),
    isDark,

    // Actions
    toggleTheme,
    setTheme,

    // Helpers
    getThemeIcon,
    getThemeLabel,

    // Initialize (can be called manually if needed)
    initializeTheme
  }
}
