/**
 * Users Services Index
 * Centralized export for all user-related services
 */

export { UserService, userService } from './userService'

// Re-export types for convenience
export type {
  ServiceResponse,
  UserProfileDocument,
  ProfileUpdateData
} from '@/types/firebase'
export type { UserProfile, ProfileFormData } from '@/types/api'
