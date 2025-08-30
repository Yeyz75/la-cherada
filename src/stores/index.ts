/**
 * Stores index - Central export for all Pinia stores
 * Provides easy access to all application stores
 */

export { useAppStore } from './appStore'
export { useAuthStore } from './authStore'
export { useUserStore } from './userStore'

// Re-export types for convenience
export type {
  LoadingState,
  ErrorState,
  UIPreferences,
  AppError
} from '@/types/global'
export type {
  User,
  AuthState,
  UserProfile,
  ProfileFormData,
  ProfileError
} from '@/types/api'
