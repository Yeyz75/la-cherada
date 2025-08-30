/**
 * Auth Store - Authentication state management
 * Integrated with Firebase Authentication
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserProfile } from '@/types/api'
import type { LoadingState, AppError } from '@/types/global'
import type { AuthUser } from '@/types/firebase'
import { authService } from '@/services/firebase'
import { userService } from '@/modules/users/services/userService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const firebaseUser = ref<AuthUser | null>(null)
  const userProfile = ref<UserProfile | null>(null)
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
  const currentUserProfile = computed(() => userProfile.value)

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

  const setUserProfile = (profile: UserProfile | null): void => {
    userProfile.value = profile
  }

  // Convert Firebase user to app user format
  const mapFirebaseUserToUser = (fbUser: AuthUser): User => {
    // Extract first and last name from displayName if available
    const displayName = fbUser.displayName ?? ''
    const nameParts = displayName.split(' ')
    const firstName = nameParts[0] ?? ''
    const lastName = nameParts.slice(1).join(' ') || ''

    return {
      id: fbUser.uid,
      email: fbUser.email ?? '',
      firstName,
      lastName,
      displayName,
      ...(fbUser.photoURL && { photoURL: fbUser.photoURL }),
      emailVerified: fbUser.emailVerified,
      createdAt: new Date(), // This will be updated when we load from Firestore
      updatedAt: new Date()
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
      clearUserData()
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setLoading(true, 'Cerrando sesión...')

    try {
      await authService.signOut()
      clearUserData()
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
    firstName: string,
    lastName: string,
    displayName?: string
  ): Promise<void> => {
    setLoading(true, 'Creando cuenta...')
    clearError()

    try {
      const finalDisplayName = displayName ?? `${firstName} ${lastName}`.trim()

      const result = await authService.signUp({
        email,
        password,
        firstName,
        lastName,
        displayName: finalDisplayName,
        acceptTerms: true
      })

      if (result.success && result.data) {
        setFirebaseUser(result.data)
        const mappedUser = mapFirebaseUserToUser(result.data)
        // Override with the actual firstName and lastName provided
        mappedUser.firstName = firstName
        mappedUser.lastName = lastName
        mappedUser.displayName = finalDisplayName
        setUser(mappedUser)

        // TODO: Create user profile in Firestore (will be implemented in later tasks)
        // await createUserProfile(mappedUser)
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
      clearUserData()
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async (): Promise<void> => {
    setLoading(true, 'Iniciando sesión con Google...')
    clearError()

    try {
      const result = await authService.signInWithGoogle()

      if (result.success && result.data) {
        setFirebaseUser(result.data)
        const mappedUser = mapFirebaseUserToUser(result.data)
        setUser(mappedUser)

        // Initialize user profile in Firestore if it doesn't exist
        await initializeUserProfileFromGoogle(result.data)
      } else {
        throw new Error(
          result.error?.message ?? 'Error al iniciar sesión con Google'
        )
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
      clearUserData()
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
    // Si ya hay un listener activo, no necesitamos verificar manualmente
    if (authUnsubscribe.value) {
      return
    }

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
      clearUserData()
    } finally {
      setLoading(false)
    }
  }

  // Initialize auth state listener
  const initializeAuth = (): void => {
    // Clear any existing subscription
    if (authUnsubscribe.value) {
      authUnsubscribe.value()
    }

    setLoading(true, 'Verificando autenticación...')

    authUnsubscribe.value = authService.onAuthStateChanged(fbUser => {
      if (fbUser) {
        setFirebaseUser(fbUser)
        setUser(mapFirebaseUserToUser(fbUser))
      } else {
        clearUserData()
      }
      setLoading(false)
    })
  }

  // Profile management methods
  const updateUserProfile = async (updates: {
    firstName?: string
    lastName?: string
    displayName?: string
    photoURL?: string
  }): Promise<void> => {
    setLoading(true, 'Actualizando perfil...')
    clearError()

    try {
      // Update Firebase Auth profile if displayName or photoURL changed
      if (updates.displayName !== undefined || updates.photoURL !== undefined) {
        const authUpdates: { displayName?: string; photoURL?: string } = {}
        if (updates.displayName !== undefined) {
          authUpdates.displayName = updates.displayName
        }
        if (updates.photoURL !== undefined) {
          authUpdates.photoURL = updates.photoURL
        }

        const result = await authService.updateUserProfile(authUpdates)
        if (result.success && result.data) {
          setFirebaseUser(result.data)
        }
      }

      // Update local user state
      if (user.value) {
        const updatedUser = { ...user.value }
        if (updates.firstName !== undefined) {
          updatedUser.firstName = updates.firstName
        }
        if (updates.lastName !== undefined) {
          updatedUser.lastName = updates.lastName
        }
        if (updates.displayName !== undefined) {
          updatedUser.displayName = updates.displayName
        }
        if (updates.photoURL !== undefined) {
          updatedUser.photoURL = updates.photoURL
        }
        updatedUser.updatedAt = new Date()
        setUser(updatedUser)
      }

      // TODO: Update Firestore user profile document (will be implemented in later tasks)
      // await userService.updateUserProfile(user.value.id, updates)
    } catch (err) {
      const error: AppError = {
        message:
          err instanceof Error ? err.message : 'Error al actualizar perfil',
        type: 'auth',
        timestamp: new Date()
      }
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const clearUserData = (): void => {
    setUser(null)
    setFirebaseUser(null)
    setUserProfile(null)
    clearError()
  }

  // Helper function to initialize user profile after Google login
  const initializeUserProfileFromGoogle = async (
    googleUser: AuthUser
  ): Promise<void> => {
    try {
      // Check if profile already exists
      const existsResult = await userService.profileExists(googleUser.uid)

      if (!existsResult) {
        // Extract first and last name from displayName
        const displayName = googleUser.displayName ?? ''
        const nameParts = displayName.split(' ')
        const firstName = nameParts[0] ?? ''
        const lastName = nameParts.slice(1).join(' ') || ''

        // Initialize profile with Google data
        await userService.initializeUserProfile(
          googleUser.uid,
          googleUser.email ?? '',
          firstName,
          lastName
        )
      }
    } catch (error) {
      // Don't throw error as this is not critical for auth flow
      // Log will be handled by service layer
    }
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
    userProfile,
    loading,
    error,

    // Getters
    isAuthenticated,
    isLoading,
    hasError,
    currentUser,
    currentFirebaseUser,
    currentUserProfile,

    // Actions
    setLoading,
    setError,
    clearError,
    setUser,
    setUserProfile,
    login,
    logout,
    register,
    loginWithGoogle,
    resetPassword,
    updateProfile,
    updateUserProfile,
    checkAuthStatus,
    initializeAuth,
    clearUserData,
    cleanup
  }
})
