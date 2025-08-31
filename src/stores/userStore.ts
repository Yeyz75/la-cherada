/**
 * User Store - User profile state management
 * Handles user profile operations and state
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile, ProfileFormData, ProfileError } from '@/types/api'
import type { LoadingState, AppError } from '@/types/global'
import { userService } from '@/services/firebase/userService'

export const useUserStore = defineStore('user', () => {
  // State
  const currentProfile = ref<UserProfile | null>(null)
  const profileLoading = ref<LoadingState>({
    isLoading: false
  })
  const profileError = ref<AppError | null>(null)
  const uploadProgress = ref<number>(0)
  const isProfileInitialized = ref<boolean>(false)

  // Getters
  const hasProfile = computed(() => currentProfile.value !== null)
  const isProfileLoading = computed(() => profileLoading.value.isLoading)
  const hasProfileError = computed(() => profileError.value !== null)
  const profileDisplayName = computed(() => {
    if (!currentProfile.value) {
      return ''
    }
    return (
      currentProfile.value.displayName ||
      `${currentProfile.value.firstName} ${currentProfile.value.lastName}`.trim()
    )
  })
  const profileInitials = computed(() => {
    if (!currentProfile.value) {
      return ''
    }
    const firstName = currentProfile.value.firstName || ''
    const lastName = currentProfile.value.lastName || ''
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  })

  // Actions - Helper functions
  const setProfileLoading = (
    isLoadingState: boolean,
    message?: string
  ): void => {
    profileLoading.value = {
      isLoading: isLoadingState,
      ...(message && { message })
    }
  }

  const setProfileError = (error: AppError | null): void => {
    profileError.value = error
  }

  const clearProfileError = (): void => {
    profileError.value = null
  }

  const setCurrentProfile = (profile: UserProfile | null): void => {
    currentProfile.value = profile
    isProfileInitialized.value = profile !== null
  }

  const setUploadProgress = (progress: number): void => {
    uploadProgress.value = Math.max(0, Math.min(100, progress))
  }

  // Profile CRUD Actions
  const createProfile = async (
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<void> => {
    setProfileLoading(true, 'Creando perfil...')
    clearProfileError()

    try {
      const result = await userService.createUserProfile(userId, profileData)

      if (result.success && result.data) {
        setCurrentProfile(result.data)
      } else {
        throw new Error(result.error?.message ?? 'Error al crear perfil')
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'profile',
        timestamp: new Date()
      }
      setProfileError(error)
    } finally {
      setProfileLoading(false)
    }
  }

  const loadProfile = async (userId: string): Promise<void> => {
    setProfileLoading(true, 'Cargando perfil...')
    clearProfileError()

    try {
      const result = await userService.getUserProfile(userId)

      if (result.success && result.data) {
        setCurrentProfile(result.data)
      } else {
        // Profile doesn't exist, this is not necessarily an error
        setCurrentProfile(null)
        isProfileInitialized.value = false
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error al cargar perfil',
        type: 'profile',
        timestamp: new Date()
      }
      setProfileError(error)
      setCurrentProfile(null)
    } finally {
      setProfileLoading(false)
    }
  }

  const updateProfile = async (
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<void> => {
    setProfileLoading(true, 'Actualizando perfil...')
    clearProfileError()

    try {
      const result = await userService.updateUserProfile(userId, updates)

      if (result.success && result.data) {
        setCurrentProfile(result.data)
      } else {
        throw new Error(result.error?.message ?? 'Error al actualizar perfil')
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'profile',
        timestamp: new Date()
      }
      setProfileError(error)
    } finally {
      setProfileLoading(false)
    }
  }

  const deleteProfile = async (userId: string): Promise<void> => {
    setProfileLoading(true, 'Eliminando perfil...')
    clearProfileError()

    try {
      const result = await userService.deleteUserProfile(userId)

      if (result.success) {
        setCurrentProfile(null)
        isProfileInitialized.value = false
      } else {
        throw new Error(result.error?.message ?? 'Error al eliminar perfil')
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'profile',
        timestamp: new Date()
      }
      setProfileError(error)
    } finally {
      setProfileLoading(false)
    }
  }

  // Profile initialization and management
  const initializeProfile = async (
    userId: string,
    email: string,
    firstName?: string,
    lastName?: string
  ): Promise<void> => {
    setProfileLoading(true, 'Inicializando perfil...')
    clearProfileError()

    try {
      const result = await userService.initializeUserProfile(
        userId,
        email,
        `${firstName} ${lastName}`.trim()
      )

      if (result.success && result.data) {
        setCurrentProfile(result.data)
      } else {
        throw new Error(result.error?.message ?? 'Error al inicializar perfil')
      }
    } catch (err) {
      const error: AppError = {
        message: err instanceof Error ? err.message : 'Error desconocido',
        type: 'profile',
        timestamp: new Date()
      }
      setProfileError(error)
    } finally {
      setProfileLoading(false)
    }
  }

  const checkProfileExists = async (userId: string): Promise<boolean> => {
    try {
      return await userService.profileExists(userId)
    } catch (err) {
      const error: AppError = {
        message:
          err instanceof Error ? err.message : 'Error al verificar perfil',
        type: 'profile',
        timestamp: new Date()
      }
      setProfileError(error)
      return false
    }
  }

  // Form data handling
  const updateProfileFromForm = async (
    userId: string,
    formData: ProfileFormData
  ): Promise<void> => {
    const updates: Partial<UserProfile> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.displayName,
      ...(formData.bio && { bio: formData.bio })
    }

    await updateProfile(userId, updates)
  }

  // Profile preferences management
  const updatePreferences = async (
    userId: string,
    preferences: Partial<UserProfile['preferences']>
  ): Promise<void> => {
    if (!currentProfile.value) {
      const error: AppError = {
        message: 'No hay perfil cargado para actualizar preferencias',
        type: 'profile',
        timestamp: new Date()
      }
      setProfileError(error)
      return
    }

    const updates: Partial<UserProfile> = {
      preferences: {
        ...currentProfile.value.preferences,
        ...preferences
      }
    }

    await updateProfile(userId, updates)
  }

  // Optimistic updates for better UX
  const updateProfileOptimistic = (updates: Partial<UserProfile>): void => {
    if (currentProfile.value) {
      const updatedProfile = {
        ...currentProfile.value,
        ...updates,
        updatedAt: new Date()
      }
      setCurrentProfile(updatedProfile)
    }
  }

  // Validation helpers
  const validateProfileData = (data: Partial<UserProfile>): ProfileError[] => {
    const errors: ProfileError[] = []

    if (data.firstName !== undefined) {
      if (!data.firstName.trim()) {
        errors.push({
          message: 'El nombre es requerido',
          type: 'validation',
          field: 'firstName',
          timestamp: new Date()
        })
      } else if (data.firstName.length < 2) {
        errors.push({
          message: 'El nombre debe tener al menos 2 caracteres',
          type: 'validation',
          field: 'firstName',
          timestamp: new Date()
        })
      }
    }

    if (data.lastName !== undefined) {
      if (!data.lastName.trim()) {
        errors.push({
          message: 'El apellido es requerido',
          type: 'validation',
          field: 'lastName',
          timestamp: new Date()
        })
      } else if (data.lastName.length < 2) {
        errors.push({
          message: 'El apellido debe tener al menos 2 caracteres',
          type: 'validation',
          field: 'lastName',
          timestamp: new Date()
        })
      }
    }

    if (data.displayName !== undefined) {
      if (!data.displayName.trim()) {
        errors.push({
          message: 'El nombre para mostrar es requerido',
          type: 'validation',
          field: 'displayName',
          timestamp: new Date()
        })
      }
    }

    if (data.bio !== undefined && data.bio.length > 500) {
      errors.push({
        message: 'La biografía no puede exceder 500 caracteres',
        type: 'validation',
        field: 'bio',
        timestamp: new Date()
      })
    }

    return errors
  }

  // Reset store state
  const resetUserStore = (): void => {
    setCurrentProfile(null)
    setProfileError(null)
    setUploadProgress(0)
    isProfileInitialized.value = false
    setProfileLoading(false)
  }

  // Refresh profile data
  const refreshProfile = async (userId: string): Promise<void> => {
    await loadProfile(userId)
  }

  return {
    // State
    currentProfile,
    profileLoading,
    profileError,
    uploadProgress,
    isProfileInitialized,

    // Getters
    hasProfile,
    isProfileLoading,
    hasProfileError,
    profileDisplayName,
    profileInitials,

    // Actions
    setProfileLoading,
    setProfileError,
    clearProfileError,
    setCurrentProfile,
    setUploadProgress,
    createProfile,
    loadProfile,
    updateProfile,
    deleteProfile,
    initializeProfile,
    checkProfileExists,
    updateProfileFromForm,
    updatePreferences,
    updateProfileOptimistic,
    validateProfileData,
    resetUserStore,
    refreshProfile
  }
})
