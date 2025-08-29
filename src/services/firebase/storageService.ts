/**
 * Firebase Storage Service
 * Handles file upload and management with Firebase Storage
 */

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getMetadata,
  updateMetadata,
  listAll,
  type StorageReference,
  type UploadTask,
  type UploadMetadata,
  type FullMetadata
} from 'firebase/storage'

import { initializeFirebase } from '@/firebase/config'
import type {
  ServiceResponse,
  StorageUploadResult,
  StorageUploadProgress,
  ImageUploadOptions
} from '@/types/firebase'
import { BaseFirebaseService } from './baseService'

export class StorageService extends BaseFirebaseService {
  constructor() {
    super('StorageService')
  }

  /**
   * Upload file to Firebase Storage
   */
  async uploadFile(
    path: string,
    file: File,
    metadata?: UploadMetadata
  ): Promise<ServiceResponse<StorageUploadResult>> {
    try {
      const storageInstance = initializeFirebase().storage
      if (!storageInstance) {
        throw new Error('Firebase Storage no inicializado')
      }
      const storageRef = ref(storageInstance, path)
      const snapshot = await uploadBytes(storageRef, file, metadata)
      const downloadURL = await getDownloadURL(snapshot.ref)

      const result: StorageUploadResult = {
        success: true,
        url: downloadURL,
        path: snapshot.ref.fullPath,
        metadata: snapshot.metadata as unknown as Record<string, unknown>
      }

      return this.createSuccessResponse(result)
    } catch (error) {
      const firebaseError = this.handleError(error, 'uploadFile')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Upload file with progress tracking
   */
  uploadFileWithProgress(
    path: string,
    file: File,
    onProgress?: (progress: StorageUploadProgress) => void,
    metadata?: UploadMetadata
  ): Promise<ServiceResponse<StorageUploadResult>> {
    return new Promise(resolve => {
      try {
        const storageInstance = initializeFirebase().storage
        if (!storageInstance) {
          throw new Error('Firebase Storage no inicializado')
        }
        const storageRef = ref(storageInstance, path)
        const uploadTask: UploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata
        )

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress: StorageUploadProgress = {
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
              state: snapshot.state as StorageUploadProgress['state']
            }
            onProgress?.(progress)
          },
          error => {
            const firebaseError = this.handleError(
              error,
              'uploadFileWithProgress'
            )
            resolve(this.createErrorResponse(firebaseError))
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              const result: StorageUploadResult = {
                success: true,
                url: downloadURL,
                path: uploadTask.snapshot.ref.fullPath,
                metadata: uploadTask.snapshot.metadata as unknown as Record<
                  string,
                  unknown
                >
              }
              resolve(this.createSuccessResponse(result))
            } catch (error) {
              const firebaseError = this.handleError(
                error,
                'uploadFileWithProgress'
              )
              resolve(this.createErrorResponse(firebaseError))
            }
          }
        )
      } catch (error) {
        const firebaseError = this.handleError(error, 'uploadFileWithProgress')
        resolve(this.createErrorResponse(firebaseError))
      }
    })
  }

  /**
   * Upload image with optional compression and thumbnail generation
   */
  async uploadImage(
    path: string,
    file: File,
    options: ImageUploadOptions = {},
    onProgress?: (progress: StorageUploadProgress) => void
  ): Promise<ServiceResponse<StorageUploadResult>> {
    try {
      // Process image if options are provided
      let processedFile = file

      if (options.maxWidth ?? options.maxHeight ?? options.quality) {
        processedFile = await this.processImage(file, options)
      }

      // Upload main image
      const result = await this.uploadFileWithProgress(
        path,
        processedFile,
        onProgress,
        {
          contentType: processedFile.type,
          customMetadata: {
            originalName: file.name,
            processed:
              (options.maxWidth ?? options.maxHeight ?? options.quality)
                ? 'true'
                : 'false'
          }
        }
      )

      // Upload thumbnail if requested
      if (options.generateThumbnail && result.success) {
        const thumbnailSize = options.thumbnailSize ?? 200
        const thumbnailFile = await this.processImage(file, {
          maxWidth: thumbnailSize,
          maxHeight: thumbnailSize,
          quality: 0.8
        })

        const thumbnailPath = this.getThumbnailPath(path)
        await this.uploadFile(thumbnailPath, thumbnailFile)
      }

      return result
    } catch (error) {
      const firebaseError = this.handleError(error, 'uploadImage')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Get download URL for a file
   */
  async getDownloadURL(path: string): Promise<ServiceResponse<string>> {
    try {
      const storageInstance = initializeFirebase().storage
      if (!storageInstance) {
        throw new Error('Firebase Storage no inicializado')
      }
      const storageRef = ref(storageInstance, path)
      const url = await getDownloadURL(storageRef)
      return this.createSuccessResponse(url)
    } catch (error) {
      const firebaseError = this.handleError(error, 'getDownloadURL')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Delete file from storage
   */
  async deleteFile(path: string): Promise<ServiceResponse<void>> {
    try {
      const storageInstance = initializeFirebase().storage
      if (!storageInstance) {
        throw new Error('Firebase Storage no inicializado')
      }
      const storageRef = ref(storageInstance, path)
      await deleteObject(storageRef)
      return this.createSuccessResponse()
    } catch (error) {
      const firebaseError = this.handleError(error, 'deleteFile')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Get file metadata
   */
  async getMetadata(path: string): Promise<ServiceResponse<FullMetadata>> {
    try {
      const storageInstance = initializeFirebase().storage
      if (!storageInstance) {
        throw new Error('Firebase Storage no inicializado')
      }
      const storageRef = ref(storageInstance, path)
      const metadata = await getMetadata(storageRef)
      return this.createSuccessResponse(metadata)
    } catch (error) {
      const firebaseError = this.handleError(error, 'getMetadata')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Update file metadata
   */
  async updateFileMetadata(
    path: string,
    metadata: Partial<UploadMetadata>
  ): Promise<ServiceResponse<FullMetadata>> {
    try {
      const storageInstance = initializeFirebase().storage
      if (!storageInstance) {
        throw new Error('Firebase Storage no inicializado')
      }
      const storageRef = ref(storageInstance, path)
      const updatedMetadata = await updateMetadata(storageRef, metadata)
      return this.createSuccessResponse(updatedMetadata)
    } catch (error) {
      const firebaseError = this.handleError(error, 'updateFileMetadata')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * List files in a directory
   */
  async listFiles(path: string): Promise<ServiceResponse<StorageReference[]>> {
    try {
      const storageInstance = initializeFirebase().storage
      if (!storageInstance) {
        throw new Error('Firebase Storage no inicializado')
      }
      const storageRef = ref(storageInstance, path)
      const result = await listAll(storageRef)
      return this.createSuccessResponse(result.items)
    } catch (error) {
      const firebaseError = this.handleError(error, 'listFiles')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Generate file path with user ID and timestamp
   */
  generateFilePath(
    userId: string,
    fileName: string,
    folder = 'uploads'
  ): string {
    const timestamp = Date.now()
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    return `${folder}/${userId}/${timestamp}_${sanitizedFileName}`
  }

  /**
   * Generate image path
   */
  generateImagePath(userId: string, fileName: string): string {
    return this.generateFilePath(userId, fileName, 'images')
  }

  /**
   * Get file extension from filename
   */
  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() ?? ''
  }

  /**
   * Check if file is an image
   */
  isImage(file: File): boolean {
    return file.type.startsWith('image/')
  }

  /**
   * Check if file size is valid
   */
  isValidFileSize(file: File, maxSizeMB = 10): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    return file.size <= maxSizeBytes
  }

  /**
   * Process image (resize, compress)
   */
  private async processImage(
    file: File,
    options: ImageUploadOptions
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img
          const { maxWidth, maxHeight, quality = 0.9 } = options

          if (maxWidth && width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          if (maxHeight && height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }

          canvas.width = width
          canvas.height = height

          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            blob => {
              if (blob) {
                const processedFile = new File([blob], file.name, {
                  type: options.format ? `image/${options.format}` : file.type,
                  lastModified: Date.now()
                })
                resolve(processedFile)
              } else {
                reject(new Error('Failed to process image'))
              }
            },
            options.format ? `image/${options.format}` : file.type,
            quality
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }

  /**
   * Generate thumbnail path
   */
  private getThumbnailPath(originalPath: string): string {
    const pathParts = originalPath.split('/')
    const fileName = pathParts.pop() ?? ''
    const fileNameParts = fileName.split('.')
    const extension = fileNameParts.pop()
    const baseName = fileNameParts.join('.')

    pathParts.push(`${baseName}_thumb.${extension}`)
    return pathParts.join('/')
  }
}

// Export singleton instance
export const storageService = new StorageService()
export default storageService
