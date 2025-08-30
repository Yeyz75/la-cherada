/**
 * Error handling utilities
 * Provides centralized error management with user-friendly messages
 */

import type { AppError } from '@/types/global'
import type { ProfileError, UploadError } from '@/types/api'
import { formatFileSize } from './fileUtils'

/**
 * Error code mappings for user-friendly messages
 */
const ERROR_MESSAGES = {
  // Profile errors
  'profile/not-found': 'Perfil de usuario no encontrado',
  'profile/create-failed': 'Error al crear el perfil de usuario',
  'profile/update-failed': 'Error al actualizar el perfil',
  'profile/delete-failed': 'Error al eliminar el perfil',
  'profile/invalid-data': 'Los datos del perfil no son válidos',
  'profile/insufficient-permissions':
    'No tienes permisos para realizar esta acción',

  // Upload errors
  'upload/file-too-large': 'El archivo es demasiado grande',
  'upload/invalid-file-type': 'Tipo de archivo no permitido',
  'upload/upload-failed': 'Error al subir el archivo',
  'upload/compression-failed': 'Error al procesar la imagen',
  'upload/storage-quota-exceeded': 'Espacio de almacenamiento agotado',

  // Validation errors
  'validation/required-field': 'Este campo es obligatorio',
  'validation/invalid-email': 'Formato de email inválido',
  'validation/field-too-short': 'El campo es demasiado corto',
  'validation/field-too-long': 'El campo es demasiado largo',
  'validation/invalid-characters': 'El campo contiene caracteres no permitidos',

  // Network errors
  'network/connection-failed': 'Error de conexión',
  'network/timeout': 'La operación ha tardado demasiado',
  'network/server-error': 'Error del servidor',

  // Auth errors
  'auth/user-not-found': 'Usuario no encontrado',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/email-already-in-use': 'El email ya está en uso',
  'auth/weak-password': 'La contraseña es demasiado débil',
  'auth/invalid-email': 'Formato de email inválido',
  'auth/user-disabled': 'La cuenta de usuario está deshabilitada',
  'auth/operation-not-allowed': 'Operación no permitida',
  'auth/network-request-failed': 'Error de conexión',

  // Generic errors
  unknown: 'Ha ocurrido un error inesperado'
} as const

type ErrorCode = keyof typeof ERROR_MESSAGES

/**
 * Create a standardized profile error
 */
export const createProfileError = (
  code: string,
  message?: string,
  field?: string
): ProfileError => {
  const errorCode = code as ErrorCode
  const friendlyMessage =
    message ?? ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.unknown

  const error: ProfileError = {
    message: friendlyMessage,
    code,
    type: 'profile',
    timestamp: new Date()
  }

  if (field) {
    error.field = field
  }

  return error
}

/**
 * Create a standardized upload error
 */
export const createUploadError = (
  code: string,
  message?: string,
  fileSize?: number,
  fileType?: string,
  maxSize?: number
): UploadError => {
  const errorCode = code as ErrorCode
  let friendlyMessage =
    message ?? ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.unknown

  // Add file-specific information to message
  if (code === 'upload/file-too-large' && fileSize && maxSize) {
    friendlyMessage = `El archivo es demasiado grande (${formatFileSize(fileSize)}). Tamaño máximo permitido: ${formatFileSize(maxSize)}`
  } else if (code === 'upload/invalid-file-type' && fileType) {
    friendlyMessage = `Tipo de archivo '${fileType}' no permitido. Solo se permiten JPG, PNG y WebP`
  }

  const error: UploadError = {
    message: friendlyMessage,
    code,
    type: 'upload',
    timestamp: new Date()
  }

  if (fileSize !== undefined) {
    error.fileSize = fileSize
  }

  if (fileType !== undefined) {
    error.fileType = fileType
  }

  if (maxSize !== undefined) {
    error.maxSize = maxSize
  }

  return error
}

/**
 * Create a standardized validation error
 */
export const createValidationError = (
  field: string,
  code: string,
  message?: string
): ProfileError => {
  const errorCode = code as ErrorCode
  const friendlyMessage =
    message ?? ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.unknown

  return {
    message: friendlyMessage,
    code,
    type: 'validation',
    field,
    timestamp: new Date()
  }
}

/**
 * Create a standardized app error
 */
export const createAppError = (
  type: AppError['type'],
  code: string,
  message?: string
): AppError => {
  const errorCode = code as ErrorCode
  const friendlyMessage =
    message ?? ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.unknown

  return {
    message: friendlyMessage,
    code,
    type,
    timestamp: new Date()
  }
}

/**
 * Extract error information from Firebase or other errors
 */
export const extractErrorInfo = (
  error: unknown
): { code: string; message: string } => {
  if (error && typeof error === 'object') {
    // Firebase error format
    if ('code' in error && typeof error.code === 'string') {
      const firebaseCode = error.code
      const message =
        'message' in error && typeof error.message === 'string'
          ? error.message
          : (ERROR_MESSAGES[firebaseCode as ErrorCode] ??
            ERROR_MESSAGES.unknown)

      return { code: firebaseCode, message }
    }

    // Standard Error object
    if (error instanceof Error) {
      return { code: 'unknown', message: error.message }
    }
  }

  // Fallback for unknown error types
  return {
    code: 'unknown',
    message: typeof error === 'string' ? error : ERROR_MESSAGES.unknown
  }
}

/**
 * Check if an error is a specific type
 */
export const isProfileError = (error: unknown): error is ProfileError => {
  return !!(
    error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'profile'
  )
}

export const isUploadError = (error: unknown): error is UploadError => {
  return !!(
    error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'upload'
  )
}

export const isValidationError = (error: unknown): error is ProfileError => {
  return !!(
    error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'validation'
  )
}

/**
 * Get user-friendly error message for display
 */
export const getErrorMessage = (
  error: AppError | ProfileError | UploadError
): string => {
  return error.message
}

/**
 * Log error for debugging (in development)
 */
export const logError = (context: string, error: unknown): void => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(`[${context}] Error:`, error)
  }
}
