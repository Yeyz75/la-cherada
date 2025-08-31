/**
 * User Service
 * Handles user profile operations with Firebase Firestore
 */

import { BaseFirebaseService } from '@/services/firebase/baseService'
import { firestoreService } from '@/services/firebase/firestoreService'
import { StorageService } from '@/services/firebase/storageService'
import {
  compressImage,
  generateUniqueFilename,
  createProfileError,
  createUploadError,
  extractErrorInfo,
  logError
} from '@/utils'
import type {
  ServiceResponse,
  UserProfileDocument,
  ProfileUpdateData,
  CreateData,
  StorageUploadProgress,
  FirebaseError
} from '@/types/firebase'
import type { UserProfile } from '@/types/api'
import type { ImageCompressionOptions } from '@/utils'

export class UserService extends BaseFirebaseService {
  private readonly COLLECTION_NAME = 'users'
  private readonly storageService: StorageService

  constructor() {
    super('UserService')
    this.storageService = new StorageService()
  }

  /**
   * Convert custom error to FirebaseError format for compatibility
   */
  private toFirebaseError(error: {
    message: string
    code?: string
  }): FirebaseError {
    return {
      code: error.code ?? 'unknown-error',
      message: error.message,
      name: 'UserServiceError'
    }
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

      // Validate profile data
      if (!profileData.firstName?.trim()) {
        const error = createProfileError(
          'validation/required-field',
          'El nombre es obligatorio',
          'firstName'
        )
        logError('UserService.createUserProfile', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      if (!profileData.lastName?.trim()) {
        const error = createProfileError(
          'validation/required-field',
          'El apellido es obligatorio',
          'lastName'
        )
        logError('UserService.createUserProfile', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      const userProfileData: CreateData<UserProfileDocument> = {
        userId,
        firstName: profileData.firstName.trim(),
        lastName: profileData.lastName.trim(),
        displayName:
          profileData.displayName?.trim() ??
          `${profileData.firstName.trim()} ${profileData.lastName.trim()}`.trim(),
        ...(profileData.photoURL && { photoURL: profileData.photoURL }),
        ...(profileData.bio?.trim() && { bio: profileData.bio.trim() }),
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

      const error = createProfileError(
        'profile/create-failed',
        result.error ?? 'No se pudo crear el perfil de usuario'
      )
      logError('UserService.createUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(error))
    } catch (error) {
      const { code, message } = extractErrorInfo(error)
      const profileError = createProfileError(`profile/${code}`, message)
      logError('UserService.createUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(profileError))
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

      const error = createProfileError(
        'profile/not-found',
        'Perfil de usuario no encontrado'
      )
      logError('UserService.getUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(error))
    } catch (error) {
      const { code, message } = extractErrorInfo(error)
      const profileError = createProfileError(`profile/${code}`, message)
      logError('UserService.getUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(profileError))
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

      // Validate update data
      if (updates.firstName !== undefined && !updates.firstName.trim()) {
        const error = createProfileError(
          'validation/required-field',
          'El nombre es obligatorio',
          'firstName'
        )
        logError('UserService.updateUserProfile', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      if (updates.lastName !== undefined && !updates.lastName.trim()) {
        const error = createProfileError(
          'validation/required-field',
          'El apellido es obligatorio',
          'lastName'
        )
        logError('UserService.updateUserProfile', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      // Prepare update data
      const updateData: ProfileUpdateData = {}

      if (updates.firstName !== undefined) {
        updateData.firstName = updates.firstName.trim()
      }

      if (updates.lastName !== undefined) {
        updateData.lastName = updates.lastName.trim()
      }

      if (updates.displayName !== undefined) {
        updateData.displayName = updates.displayName.trim()
      } else if (
        updates.firstName !== undefined ||
        updates.lastName !== undefined
      ) {
        // Auto-generate displayName if firstName or lastName changed
        const currentProfile = await this.getUserProfile(userId)
        if (currentProfile.success && currentProfile.data) {
          const firstName =
            updates.firstName?.trim() ?? currentProfile.data.firstName
          const lastName =
            updates.lastName?.trim() ?? currentProfile.data.lastName
          updateData.displayName = `${firstName} ${lastName}`.trim()
        }
      }

      if (updates.bio !== undefined) {
        updateData.bio = updates.bio.trim()
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

      const error = createProfileError(
        'profile/update-failed',
        result.error ?? 'No se pudo actualizar el perfil'
      )
      logError('UserService.updateUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(error))
    } catch (error) {
      const { code, message } = extractErrorInfo(error)
      const profileError = createProfileError(`profile/${code}`, message)
      logError('UserService.updateUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(profileError))
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

      const error = createProfileError(
        'profile/delete-failed',
        result.error ?? 'No se pudo eliminar el perfil de usuario'
      )
      logError('UserService.deleteUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(error))
    } catch (error) {
      const { code, message } = extractErrorInfo(error)
      const profileError = createProfileError(`profile/${code}`, message)
      logError('UserService.deleteUserProfile', error)
      return this.createErrorResponse(this.toFirebaseError(profileError))
    }
  }

  /**
   * Upload profile image and update user profile
   */
  async uploadProfileImage(
    userId: string,
    imageFile: File,
    compressionOptions: ImageCompressionOptions = {
      maxWidth: 400,
      maxHeight: 400,
      quality: 0.8,
      format: 'jpeg'
    },
    onProgress?: (progress: StorageUploadProgress) => void
  ): Promise<ServiceResponse<{ photoURL: string }>> {
    try {
      this.validateRequired({ userId }, ['userId'])

      if (!imageFile) {
        const error = createUploadError(
          'upload/no-file-provided',
          'No se proporcionó ningún archivo de imagen'
        )
        logError('UserService.uploadProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
      ]
      if (!allowedTypes.includes(imageFile.type)) {
        const error = createUploadError(
          'upload/invalid-file-type',
          undefined,
          imageFile.size,
          imageFile.type
        )
        logError('UserService.uploadProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (imageFile.size > maxSize) {
        const error = createUploadError(
          'upload/file-too-large',
          undefined,
          imageFile.size,
          imageFile.type,
          maxSize
        )
        logError('UserService.uploadProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      // Compress image before upload
      let processedFile = imageFile
      try {
        processedFile = await compressImage(imageFile, compressionOptions)
      } catch (compressionError) {
        logError('UserService.uploadProfileImage.compression', compressionError)
        // Continue with original file instead of failing
        processedFile = imageFile
      }

      // Generate unique filename
      const fileName = generateUniqueFilename(processedFile.name)
      const storagePath = `profile-images/${userId}/${fileName}`

      // Delete existing profile image if any
      try {
        const currentProfile = await this.getUserProfile(userId)
        if (currentProfile.success && currentProfile.data?.photoURL) {
          await this.deleteExistingProfileImage(
            userId,
            currentProfile.data.photoURL
          )
        }
      } catch (deleteError) {
        // Log but don't fail upload for cleanup errors
        logError('UserService.uploadProfileImage.cleanup', deleteError)
      }

      // Upload new image with progress tracking
      const uploadResult = await this.storageService.uploadFileWithProgress(
        storagePath,
        processedFile,
        onProgress,
        {
          contentType: processedFile.type,
          customMetadata: {
            userId,
            originalName: imageFile.name,
            compressed: processedFile !== imageFile ? 'true' : 'false'
          }
        }
      )

      if (!uploadResult.success || !uploadResult.data?.url) {
        const error = createUploadError(
          'upload/upload-failed',
          typeof uploadResult.error === 'string'
            ? uploadResult.error
            : 'Error al subir la imagen'
        )
        logError('UserService.uploadProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      // Update user profile with new photo URL
      const updateResult = await this.updateUserProfile(userId, {
        photoURL: uploadResult.data.url
      })

      if (!updateResult.success) {
        // If profile update fails, cleanup uploaded image
        try {
          await this.storageService.deleteFile(storagePath)
        } catch (cleanupError) {
          logError('UserService.uploadProfileImage.rollback', cleanupError)
        }

        const error = createProfileError(
          'profile/update-failed',
          'No se pudo actualizar el perfil con la nueva imagen'
        )
        logError('UserService.uploadProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      return this.createSuccessResponse({ photoURL: uploadResult.data.url })
    } catch (error) {
      const { code, message } = extractErrorInfo(error)
      const uploadError = createUploadError(`upload/${code}`, message)
      logError('UserService.uploadProfileImage', error)
      return this.createErrorResponse(this.toFirebaseError(uploadError))
    }
  }

  /**
   * Delete profile image and update user profile
   */
  async deleteProfileImage(userId: string): Promise<ServiceResponse<void>> {
    try {
      this.validateRequired({ userId }, ['userId'])

      // Get current profile to obtain photo URL
      const currentProfile = await this.getUserProfile(userId)
      if (!currentProfile.success) {
        const error = createProfileError(
          'profile/not-found',
          'No se pudo encontrar el perfil de usuario'
        )
        logError('UserService.deleteProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      if (!currentProfile.data?.photoURL) {
        return this.createSuccessResponse() // No image to delete
      }

      // Delete image from storage
      const deleteResult = await this.deleteExistingProfileImage(
        userId,
        currentProfile.data.photoURL
      )

      if (!deleteResult) {
        const error = createUploadError(
          'upload/delete-failed',
          'No se pudo eliminar la imagen del almacenamiento'
        )
        logError('UserService.deleteProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      // Update user profile to remove photo URL
      const updateResult = await this.updateUserProfile(userId, {
        photoURL: ''
      })

      if (!updateResult.success) {
        const error = createProfileError(
          'profile/update-failed',
          'No se pudo actualizar el perfil después de eliminar la imagen'
        )
        logError('UserService.deleteProfileImage', error)
        return this.createErrorResponse(this.toFirebaseError(error))
      }

      return this.createSuccessResponse()
    } catch (error) {
      const { code, message } = extractErrorInfo(error)
      const profileError = createProfileError(`profile/${code}`, message)
      logError('UserService.deleteProfileImage', error)
      return this.createErrorResponse(this.toFirebaseError(profileError))
    }
  }

  /**
   * Get profile image metadata
   */
  async getProfileImageMetadata(
    photoURL: string
  ): Promise<ServiceResponse<Record<string, unknown>>> {
    try {
      if (!photoURL) {
        return this.createErrorResponse({
          code: 'no-photo-url',
          message: 'No photo URL provided',
          name: 'UserServiceError'
        })
      }

      // Extract storage path from URL (simplified approach)
      const urlParts = photoURL.split('/o/')
      if (urlParts.length < 2) {
        return this.createErrorResponse({
          code: 'invalid-photo-url',
          message: 'Invalid photo URL format',
          name: 'UserServiceError'
        })
      }

      const pathPart = urlParts[1]?.split('?')[0]
      if (!pathPart) {
        return this.createErrorResponse({
          code: 'invalid-photo-url',
          message: 'Invalid photo URL format',
          name: 'UserServiceError'
        })
      }

      const storagePath = decodeURIComponent(pathPart)

      const metadataResult = await this.storageService.getMetadata(storagePath)

      if (metadataResult.success && metadataResult.data) {
        return this.createSuccessResponse({ ...metadataResult.data })
      }

      return this.createErrorResponse({
        code: 'metadata-not-found',
        message: 'Image metadata not found',
        name: 'UserServiceError'
      })
    } catch (error) {
      const firebaseError = this.handleError(error, 'getProfileImageMetadata')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Helper method to delete existing profile image from storage
   */
  private async deleteExistingProfileImage(
    userId: string,
    photoURL: string
  ): Promise<boolean> {
    try {
      if (!photoURL?.includes('profile-images')) {
        return true // No image to delete or not a profile image
      }

      // Extract storage path from URL
      const urlParts = photoURL.split('/o/')
      if (urlParts.length < 2) {
        return false
      }

      const pathPart = urlParts[1]?.split('?')[0]
      if (!pathPart) {
        return false
      }

      const storagePath = decodeURIComponent(pathPart)

      // Verify the path belongs to this user for security
      if (!storagePath.startsWith(`profile-images/${userId}/`)) {
        return false
      }

      const deleteResult = await this.storageService.deleteFile(storagePath)
      return deleteResult.success
    } catch {
      return false
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
