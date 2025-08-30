/**
 * File utility functions
 * Provides validation, compression and format handling for file uploads
 */

import type { ValidationResult } from '@/utils/validationUtils'

/**
 * Supported image file types
 */
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
] as const

/**
 * Maximum file size in bytes (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * File validation options
 */
export interface FileValidationOptions {
  maxSize?: number
  allowedTypes?: string[]
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

/**
 * Image compression options
 */
export interface ImageCompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
}

/**
 * File information
 */
export interface FileInfo {
  name: string
  size: number
  type: string
  lastModified: number
  dimensions?: {
    width: number
    height: number
  }
}

/**
 * Validate file type
 */
export const validateFileType = (
  file: File,
  allowedTypes: string[] = [...SUPPORTED_IMAGE_TYPES]
): ValidationResult => {
  if (!allowedTypes.includes(file.type)) {
    const typesList = allowedTypes.map(type => type.split('/')[1]).join(', ')
    return {
      isValid: false,
      message: `Tipo de archivo no válido. Solo se permiten: ${typesList}`
    }
  }

  return { isValid: true }
}

/**
 * Validate file size
 */
export const validateFileSize = (
  file: File,
  maxSize: number = MAX_FILE_SIZE
): ValidationResult => {
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    const fileSizeMB = Math.round((file.size / (1024 * 1024)) * 100) / 100
    return {
      isValid: false,
      message: `El archivo es demasiado grande (${fileSizeMB}MB). Tamaño máximo: ${maxSizeMB}MB`
    }
  }

  return { isValid: true }
}

/**
 * Get image dimensions
 */
export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo cargar la imagen'))
    }

    img.src = url
  })
}

/**
 * Validate image dimensions
 */
export const validateImageDimensions = async (
  file: File,
  options: {
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
  }
): Promise<ValidationResult> => {
  try {
    const dimensions = await getImageDimensions(file)

    if (options.minWidth && dimensions.width < options.minWidth) {
      return {
        isValid: false,
        message: `La imagen debe tener al menos ${options.minWidth}px de ancho`
      }
    }

    if (options.minHeight && dimensions.height < options.minHeight) {
      return {
        isValid: false,
        message: `La imagen debe tener al menos ${options.minHeight}px de alto`
      }
    }

    if (options.maxWidth && dimensions.width > options.maxWidth) {
      return {
        isValid: false,
        message: `La imagen no puede tener más de ${options.maxWidth}px de ancho`
      }
    }

    if (options.maxHeight && dimensions.height > options.maxHeight) {
      return {
        isValid: false,
        message: `La imagen no puede tener más de ${options.maxHeight}px de alto`
      }
    }

    return { isValid: true }
  } catch (error) {
    return {
      isValid: false,
      message: 'No se pudo validar las dimensiones de la imagen'
    }
  }
}

/**
 * Comprehensive file validation
 */
export const validateFile = async (
  file: File,
  options: FileValidationOptions = {}
): Promise<ValidationResult> => {
  // Type validation
  const typeValidation = validateFileType(file, options.allowedTypes)
  if (!typeValidation.isValid) {
    return typeValidation
  }

  // Size validation
  const sizeValidation = validateFileSize(file, options.maxSize)
  if (!sizeValidation.isValid) {
    return sizeValidation
  }

  // Dimension validation for images
  if (
    SUPPORTED_IMAGE_TYPES.includes(
      file.type as (typeof SUPPORTED_IMAGE_TYPES)[number]
    )
  ) {
    const dimensionOptions = {
      ...(options.minWidth !== undefined && { minWidth: options.minWidth }),
      ...(options.minHeight !== undefined && { minHeight: options.minHeight }),
      ...(options.maxWidth !== undefined && { maxWidth: options.maxWidth }),
      ...(options.maxHeight !== undefined && { maxHeight: options.maxHeight })
    }

    if (Object.keys(dimensionOptions).length > 0) {
      const dimensionValidation = await validateImageDimensions(
        file,
        dimensionOptions
      )
      if (!dimensionValidation.isValid) {
        return dimensionValidation
      }
    }
  }

  return { isValid: true }
}

/**
 * Compress image file
 */
export const compressImage = (
  file: File,
  options: ImageCompressionOptions = {}
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const url = URL.createObjectURL(file)

    if (!ctx) {
      reject(new Error('No se pudo crear el contexto del canvas'))
      return
    }

    img.onload = () => {
      URL.revokeObjectURL(url)

      let { width, height } = img

      // Calculate new dimensions
      if (options.maxWidth ?? options.maxHeight) {
        const ratio = width / height

        if (options.maxWidth && width > options.maxWidth) {
          width = options.maxWidth
          height = width / ratio
        }

        if (options.maxHeight && height > options.maxHeight) {
          height = options.maxHeight
          width = height * ratio
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)

      const quality = options.quality ?? 0.8
      const format = options.format ?? 'jpeg'
      const mimeType = `image/${format}`

      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Error al comprimir la imagen'))
            return
          }

          const compressedFile = new File([blob], file.name, {
            type: mimeType,
            lastModified: Date.now()
          })

          resolve(compressedFile)
        },
        mimeType,
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo cargar la imagen para comprimir'))
    }

    img.src = url
  })
}

/**
 * Get file information including image dimensions
 */
export const getFileInfo = async (file: File): Promise<FileInfo> => {
  const info: FileInfo = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  }

  // Get dimensions for images
  if (
    SUPPORTED_IMAGE_TYPES.includes(
      file.type as (typeof SUPPORTED_IMAGE_TYPES)[number]
    )
  ) {
    try {
      info.dimensions = await getImageDimensions(file)
    } catch {
      // Ignore dimension errors, just don't include them
    }
  }

  return info
}

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Generate unique filename with timestamp
 */
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')

  return `${nameWithoutExt}_${timestamp}_${random}.${extension}`
}

/**
 * Create image preview URL
 */
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file)
}

/**
 * Revoke image preview URL to prevent memory leaks
 */
export const revokeImagePreview = (url: string): void => {
  URL.revokeObjectURL(url)
}
