/**
 * User-specific TypeScript interfaces for LaCherada application
 * Types related to user management, profiles, and user operations
 */

import type { User, UserProfile, UserPreferences } from './api'
import type { LoadingState, AppError } from './global'
import type { Timestamp } from 'firebase/firestore'

/**
 * User document interface for Firestore storage
 */
export interface UserDocument {
  id: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  photoURL?: string
  emailVerified: boolean
  preferences: UserPreferences
  createdAt: Timestamp
  updatedAt: Timestamp
}

/**
 * User store state interface for Pinia store
 */
export interface UserStoreState {
  currentProfile: UserProfile | null
  profileLoading: LoadingState
  profileError: AppError | null
  uploadProgress: number
}

/**
 * User profile update data interface
 */
export interface UserProfileUpdateData {
  firstName?: string
  lastName?: string
  displayName?: string
  bio?: string
  photoURL?: string
  preferences?: Partial<UserPreferences>
}

/**
 * User profile creation data interface
 */
export interface UserProfileCreateData {
  userId: string
  firstName: string
  lastName: string
  displayName: string
  bio?: string
  photoURL?: string
  preferences: UserPreferences
}

/**
 * Image upload metadata interface
 */
export interface ImageUploadMetadata {
  originalName: string
  size: number
  type: string
  lastModified: number
}

/**
 * Profile image upload result interface
 */
export interface ProfileImageUploadResult {
  success: boolean
  url?: string
  path?: string
  metadata?: ImageUploadMetadata
  error?: string
}

/**
 * User avatar configuration interface
 */
export interface UserAvatarConfig {
  size: number
  showInitials: boolean
  backgroundColor?: string
  textColor?: string
}

/**
 * User profile validation constraints interface
 */
export interface UserProfileValidationConstraints {
  firstName: {
    minLength: number
    maxLength: number
    required: boolean
  }
  lastName: {
    minLength: number
    maxLength: number
    required: boolean
  }
  displayName: {
    minLength: number
    maxLength: number
    required: boolean
  }
  bio: {
    maxLength: number
    required: boolean
  }
  image: {
    maxSize: number
    allowedTypes: string[]
    maxWidth?: number
    maxHeight?: number
  }
}

/**
 * User activity log interface
 */
export interface UserActivityLog {
  userId: string
  action:
    | 'profile_updated'
    | 'image_uploaded'
    | 'image_deleted'
    | 'preferences_updated'
  timestamp: Date
  details?: Record<string, unknown>
}

/**
 * User search criteria interface
 */
export interface UserSearchCriteria {
  query?: string
  email?: string
  displayName?: string
  createdAfter?: Date
  createdBefore?: Date
  emailVerified?: boolean
}

/**
 * User list result interface
 */
export interface UserListResult {
  users: User[]
  total: number
  hasMore: boolean
  nextCursor?: string
}
