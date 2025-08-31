/**
 * Service for managing user profiles - minimal implementation
 * Since we removed the dashboard and complex profile management,
 * this provides basic operations for compatibility
 */
import type {
  UserProfile,
  UserProfileResponse,
  DeleteProfileResponse
} from '@/types/api'

export class UserService {
  /**
   * Create a new user profile
   */
  async createUserProfile(
    userId: string,
    inputData: Partial<UserProfile>
  ): Promise<UserProfileResponse> {
    try {
      const profileData: UserProfile = {
        userId,
        firstName: inputData.firstName ?? '',
        lastName: inputData.lastName ?? '',
        displayName: inputData.displayName ?? 'Usuario',
        preferences: {
          language: 'es',
          theme: 'system',
          notifications: true
        },
        updatedAt: new Date(),
        ...(inputData.photoURL && { photoURL: inputData.photoURL }),
        ...(inputData.bio && { bio: inputData.bio }),
        ...(inputData.location && { location: inputData.location })
      }

      return {
        success: true,
        data: profileData
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROFILE_CREATE_ERROR',
          message: 'Failed to create user profile',
          type: 'VALIDATION_ERROR',
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  /**
   * Get user profile by user ID
   */
  async getUserProfile(userId: string): Promise<UserProfileResponse> {
    try {
      return {
        success: true,
        data: {
          userId,
          firstName: '',
          lastName: '',
          displayName: 'Usuario',
          preferences: {
            language: 'es',
            theme: 'system',
            notifications: true
          },
          updatedAt: new Date()
        }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROFILE_GET_ERROR',
          message: 'Failed to get user profile',
          type: 'FETCH_ERROR',
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfileResponse> {
    try {
      const existingProfile = await this.getUserProfile(userId)
      if (!existingProfile.success || !existingProfile.data) {
        return {
          success: false,
          error: {
            code: 'PROFILE_NOT_FOUND',
            message: 'User profile not found',
            type: 'NOT_FOUND',
            timestamp: new Date().toISOString()
          }
        }
      }

      return {
        success: true,
        data: {
          ...existingProfile.data,
          ...updates,
          updatedAt: new Date()
        }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROFILE_UPDATE_ERROR',
          message: 'Failed to update user profile',
          type: 'UPDATE_ERROR',
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  /**
   * Delete user profile
   */
  async deleteUserProfile(_userId: string): Promise<DeleteProfileResponse> {
    try {
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROFILE_DELETE_ERROR',
          message: 'Failed to delete user profile',
          type: 'DELETE_ERROR',
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  /**
   * Check if user profile exists
   */
  async profileExists(_userId: string): Promise<boolean> {
    return true
  }

  /**
   * Initialize user profile with default data
   */
  async initializeUserProfile(
    userId: string,
    _email: string,
    _displayName?: string
  ): Promise<UserProfileResponse> {
    try {
      const profileData: Partial<UserProfile> = {
        userId,
        firstName: '',
        lastName: '',
        displayName: 'Usuario'
      }

      return await this.createUserProfile(userId, profileData)
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROFILE_INIT_ERROR',
          message: 'Failed to initialize user profile',
          type: 'INITIALIZATION_ERROR',
          timestamp: new Date().toISOString()
        }
      }
    }
  }
}

export const userService = new UserService()
