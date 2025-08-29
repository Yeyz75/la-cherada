/**
 * Auth Store - Authentication state management
 * Integrated with Firebase Authentication
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/api'
import type { LoadingState, AppError } from '@/types/global'
import type { AuthUser } from '@/types/firebase'
import { authService } from '@/services/firebase'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const firebaseUser = ref<AuthUser | null>(null)
  const loading = ref<LoadingState>({
    isLoading: false
  })
  const error = ref<AppError | null>(null)
  const authUnsubscribe = ref<(() => void) | null>(null)

  // Getters
  const isAuthenticated = computed(
    () => user.value !== null && firebaseUser.value !== null
  )
  const isLoading = computed(() => loading.value.isLoading)
  const hasError = computed(() => error.value !== null)
  const currentUser = computed(() => user.value)
  const currentFirebaseUser = computed(() => firebaseUser.value)

  // Actions - Helper functions
  const setLoading = (isLoadingState: boolean, message?: string): void => {
    loading.value = {
      isLoading: isLoadingState,
      ...(message && { message })
    }
  }

  const setError = (authError: AppError | null): void => {
    error.value = authError
  }

  const clearError = (): void => {
    error.value = null
  }

  const setUser = (userData: User | null): void => {
    user.value = userData
  }

  const setFirebaseUser = (fbUser: AuthUser | null): void => {
    firebaseUser.value = fbUser
  }

  // Convert Firebase user to app user format
  const mapFirebaseUserToUser = (fbUser: AuthUser): User => {
    return {
      id: fbUser.uid
    }
  }

  // Authentication Actions
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true, 'Iniciando sesión...')
    clearError()

    try {
      const result = await authService.signIn({ email, password })

      if (result.success && result.data) {
        setFirebaseUser(result.data)
        setUser(mapFirebaseUserToUser(result.data))
      } else {
        throw new Error(result.error?.message ?? 'Error al iniciar sesión')
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
      setUser(null)
      setFirebaseUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setLoading(true, 'Cerrando sesión...')

    try {
      await authService.signOut()
      setUser(null)
      setFirebaseUser(null)
      clearError()
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error al cerrar sesión',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<void> => {
    setLoading(true, 'Creando cuenta...')
    clearError()

    try {
      const result = await authService.signUp({
        email,
        password,
        displayName,
        acceptTerms: true
      })

      if (result.success && result.data) {
        setFirebaseUser(result.data)
        setUser(mapFirebaseUserToUser(result.data))
      } else {
        throw new Error(result.error?.message ?? 'Error al crear cuenta')
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
      setUser(null)
      setFirebaseUser(null)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true, 'Enviando correo de recuperación...')
    clearError()

    try {
      const result = await authService.resetPassword({ email })

      if (!result.success) {
        throw new Error(
          result.error?.message ?? 'Error al enviar correo de recuperación'
        )
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: {
    displayName?: string
    photoURL?: string
  }): Promise<void> => {
    setLoading(true, 'Actualizando perfil...')
    clearError()

    try {
      const result = await authService.updateUserProfile(updates)

      if (result.success && result.data) {
        setFirebaseUser(result.data)
        setUser(mapFirebaseUserToUser(result.data))
      } else {
        throw new Error(result.error?.message ?? 'Error al actualizar perfil')
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const checkAuthStatus = async (): Promise<void> => {
    setLoading(true, 'Verificando autenticación...')

    try {
      const fbUser = await authService.waitForAuthInit()

      if (fbUser) {
        setFirebaseUser(fbUser)
        setUser(mapFirebaseUserToUser(fbUser))
      } else {
        setUser(null)
        setFirebaseUser(null)
      }
    } catch (err) {
      const error: AppError = {
        message:
          err instanceof Error
            ? err.message
            : 'Error al verificar autenticación',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
      setUser(null)
      setFirebaseUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Initialize auth state listener
  const initializeAuth = (): void => {
    if (authUnsubscribe.value) {
      authUnsubscribe.value()
    }

    authUnsubscribe.value = authService.onAuthStateChanged(fbUser => {
      if (fbUser) {
        setFirebaseUser(fbUser)
        setUser(mapFirebaseUserToUser(fbUser))
      } else {
        setUser(null)
        setFirebaseUser(null)
      }
    })
  }

  // Cleanup auth listener
  const cleanup = (): void => {
    if (authUnsubscribe.value) {
      authUnsubscribe.value()
      authUnsubscribe.value = null
    }
  }

  return {
    // State
    user,
    firebaseUser,
    loading,
    error,

    // Getters
    isAuthenticated,
    isLoading,
    hasError,
    currentUser,
    currentFirebaseUser,

    // Actions
    setLoading,
    setError,
    clearError,
    setUser,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    checkAuthStatus,
    initializeAuth,
    cleanup
  }
})
