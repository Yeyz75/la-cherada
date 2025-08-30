/**
 * User Service
 * Handles user profile operations with Firebase Firestore
 */

import { BaseFirebaseService } from '@/services/firebase/baseService'
import { firestoreService } from '@/services/firebase/firestoreService'
import type {
  ServiceResponse,
  UserProfileDocument,
  ProfileUpdateData,
  CreateData
} from '@/types/firebase'
import type { UserProfile } from '@/types/api'

export class UserService extends BaseFirebaseService {
  private readonly COLLECTION_NAME = 'users'

  constructor() {
    super('UserService')
  }

  /**
   * Create a new user profile in Firestore
   */
  async createUserProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<ServiceResponse<UserProfile>> {
    try {
      this.validateRequired({ userId }, ['userId'])

      const userProfileData: CreateData<UserProfileDocument> = {
        userId,
        firstName: profileData.firstName ?? '',
        lastName: profileData.lastName ?? '',
        displayName:
          profileData.displayName ??
          `${profileData.firstName ?? ''} ${profileData.lastName ?? ''}`.trim(),
        ...(profileData.photoURL && { photoURL: profileData.photoURL }),
        ...(profileData.bio && { bio: profileData.bio }),
        preferences: {
          language: profileData.preferences?.language ?? 'es',
          theme: profileData.preferences?.theme ?? 'system',
          notifications: profileData.preferences?.notifications ?? true
        }
      }

      const result = await firestoreService.set<UserProfileDocument>(
        this.COLLECTION_NAME,
        userId,
        userProfileData
      )

      if (result.success && result.data) {
        const userProfile = this.convertToUserProfile(result.data)
        return this.createSuccessResponse(userProfile)
      }

      return this.createErrorResponse({
        code: 'create-profile-failed',
        message: result.error ?? 'Failed to create user profile',
        name: 'UserServiceError'
      })
    } catch (error) {
      const firebaseError = this.handleError(error, 'createUserProfile')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Get user profile by user ID
   */
  async getUserProfile(userId: string): Promise<ServiceResponse<UserProfile>> {
    try {
      this.validateRequired({ userId }, ['userId'])

      const result = await firestoreService.getById<UserProfileDocument>(
        this.COLLECTION_NAME,
        userId
      )

      if (result.success && result.data) {
        const userProfile = this.convertToUserProfile(result.data)
        return this.createSuccessResponse(userProfile)
      }

      return this.createErrorResponse({
        code: 'profile-not-found',
        message: 'User profile not found',
        name: 'UserServiceError'
      })
    } catch (error) {
      const firebaseError = this.handleError(error, 'getUserProfile')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<ServiceResponse<UserProfile>> {
    try {
      this.validateRequired({ userId }, ['userId'])

      // Prepare update data
      const updateData: ProfileUpdateData = {}

      if (updates.firstName !== undefined) {
        updateData.firstName = updates.firstName
      }

      if (updates.lastName !== undefined) {
        updateData.lastName = updates.lastName
      }

      if (updates.displayName !== undefined) {
        updateData.displayName = updates.displayName
      } else if (
        updates.firstName !== undefined ||
        updates.lastName !== undefined
      ) {
        // Auto-generate displayName if firstName or lastName changed
        const currentProfile = await this.getUserProfile(userId)
        if (currentProfile.success && currentProfile.data) {
          const firstName = updates.firstName ?? currentProfile.data.firstName
          const lastName = updates.lastName ?? currentProfile.data.lastName
          updateData.displayName = `${firstName} ${lastName}`.trim()
        }
      }

      if (updates.bio !== undefined) {
        updateData.bio = updates.bio
      }

      if (updates.photoURL !== undefined) {
        updateData.photoURL = updates.photoURL
      }

      if (updates.preferences) {
        const currentPrefs = {
          language: 'es',
          theme: 'system' as const,
          notifications: true
        }
        updateData.preferences = {
          ...currentPrefs,
          ...updates.preferences
        }
      }

      const result = await firestoreService.update<UserProfileDocument>(
        this.COLLECTION_NAME,
        {
          id: userId,
          ...updateData
        } as Partial<UserProfileDocument> & { id: string }
      )

      if (result.success && result.data) {
        const userProfile = this.convertToUserProfile(result.data)
        return this.createSuccessResponse(userProfile)
      }

      return this.createErrorResponse({
        code: 'update-profile-failed',
        message: result.error ?? 'Failed to update user profile',
        name: 'UserServiceError'
      })
    } catch (error) {
      const firebaseError = this.handleError(error, 'updateUserProfile')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Check if user profile exists
   */
  async profileExists(userId: string): Promise<boolean> {
    try {
      this.validateRequired({ userId }, ['userId'])
      return await firestoreService.exists(this.COLLECTION_NAME, userId)
    } catch (error) {
      this.handleError(error, 'profileExists')
      return false
    }
  }

  /**
   * Delete user profile
   */
  async deleteUserProfile(userId: string): Promise<ServiceResponse<void>> {
    try {
      this.validateRequired({ userId }, ['userId'])

      const result = await firestoreService.delete(this.COLLECTION_NAME, userId)

      if (result.success) {
        return this.createSuccessResponse()
      }

      return this.createErrorResponse({
        code: 'delete-profile-failed',
        message: result.error ?? 'Failed to delete user profile',
        name: 'UserServiceError'
      })
    } catch (error) {
      const firebaseError = this.handleError(error, 'deleteUserProfile')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Convert UserProfileDocument to UserProfile
   */
  private convertToUserProfile(doc: UserProfileDocument): UserProfile {
    return {
      userId: doc.userId,
      firstName: doc.firstName,
      lastName: doc.lastName,
      displayName: doc.displayName,
      photoURL: doc.photoURL ?? '',
      bio: doc.bio ?? '',
      preferences: {
        language: doc.preferences.language,
        theme: doc.preferences.theme,
        notifications: doc.preferences.notifications
      },
      updatedAt:
        doc.updatedAt instanceof Date
          ? doc.updatedAt
          : new Date(doc.updatedAt.seconds * 1000)
    }
  }

  /**
   * Validate profile data before operations
   */
  private validateProfileData(data: Partial<UserProfile>): void {
    if (data.firstName !== undefined && typeof data.firstName !== 'string') {
      throw new Error('firstName must be a string')
    }

    if (data.lastName !== undefined && typeof data.lastName !== 'string') {
      throw new Error('lastName must be a string')
    }

    if (
      data.displayName !== undefined &&
      typeof data.displayName !== 'string'
    ) {
      throw new Error('displayName must be a string')
    }

    if (data.bio !== undefined && typeof data.bio !== 'string') {
      throw new Error('bio must be a string')
    }

    if (data.photoURL !== undefined && typeof data.photoURL !== 'string') {
      throw new Error('photoURL must be a string')
    }

    if (data.preferences) {
      const { language, theme, notifications } = data.preferences

      if (language !== undefined && typeof language !== 'string') {
        throw new Error('preferences.language must be a string')
      }

      if (theme !== undefined && !['light', 'dark', 'system'].includes(theme)) {
        throw new Error('preferences.theme must be one of: light, dark, system')
      }

      if (notifications !== undefined && typeof notifications !== 'boolean') {
        throw new Error('preferences.notifications must be a boolean')
      }
    }
  }

  /**
   * Initialize user profile with default values
   */
  async initializeUserProfile(
    userId: string,
    email: string,
    firstName?: string,
    lastName?: string
  ): Promise<ServiceResponse<UserProfile>> {
    try {
      // Check if profile already exists
      const exists = await this.profileExists(userId)
      if (exists) {
        return await this.getUserProfile(userId)
      }

      // Create new profile with default values
      const profileData: Partial<UserProfile> = {
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        displayName:
          firstName && lastName
            ? `${firstName} ${lastName}`.trim()
            : (email.split('@')[0] ?? ''),
        preferences: {
          language: 'es',
          theme: 'system',
          notifications: true
        }
      }

      return await this.createUserProfile(userId, profileData)
    } catch (error) {
      const firebaseError = this.handleError(error, 'initializeUserProfile')
      return this.createErrorResponse(firebaseError)
    }
  }
}

// Export singleton instance
export const userService = new UserService()
export default userService
