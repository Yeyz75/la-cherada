/**
 * App Store - Global application state management
 * Manages loading states, error handling, and UI preferences
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  LoadingState,
  ErrorState,
  UIPreferences,
  AppError
} from '@/types/global'

export const useAppStore = defineStore('app', () => {
  // State
  const loading = ref<LoadingState>({
    isLoading: false
  })

  const error = ref<ErrorState>({
    hasError: false
  })

  const preferences = ref<UIPreferences>({
    theme: 'light',
    language: 'es'
  })

  // Getters
  const isLoading = computed(() => loading.value.isLoading)
  const hasError = computed(() => error.value.hasError)
  const currentTheme = computed(() => preferences.value.theme)
  const currentLanguage = computed(() => preferences.value.language)

  // Actions
  const setLoading = (isLoadingState: boolean, message?: string): void => {
    loading.value = {
      isLoading: isLoadingState,
      ...(message && { message })
    }
  }

  const setError = (errorMessage: string, code?: string): void => {
    error.value = {
      hasError: true,
      message: errorMessage,
      ...(code && { code })
    }
  }

  const clearError = (): void => {
    error.value = {
      hasError: false
    }
  }

  const setAppError = (appError: AppError): void => {
    error.value = {
      hasError: true,
      message: appError.message,
      ...(appError.code && { code: appError.code })
    }
  }

  const setTheme = (theme: UIPreferences['theme']): void => {
    preferences.value.theme = theme
  }

  const setLanguage = (language: UIPreferences['language']): void => {
    preferences.value.language = language
  }

  const updatePreferences = (newPreferences: Partial<UIPreferences>): void => {
    preferences.value = {
      ...preferences.value,
      ...newPreferences
    }
  }

  return {
    // State
    loading,
    error,
    preferences,

    // Getters
    isLoading,
    hasError,
    currentTheme,
    currentLanguage,

    // Actions
    setLoading,
    setError,
    clearError,
    setAppError,
    setTheme,
    setLanguage,
    updatePreferences
  }
})
