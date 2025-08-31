/**
 * Input sanitization utilities
 * Provides comprehensive sanitization for user inputs to prevent XSS and other attacks
 */

/**
 * HTML encode special characters to prevent XSS
 */
export const escapeHtml = (input: string): string => {
  if (!input) {
    return ''
  }

  const entityMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }

  return input.replace(/[&<>"'`=/]/g, char => entityMap[char] as string)
}

/**
 * Remove HTML tags from input
 */
export const stripHtmlTags = (input: string): string => {
  if (!input) {
    return ''
  }
  return input.replace(/<[^>]*>/g, '')
}

/**
 * Sanitize text input for names and basic text fields
 */
export const sanitizeTextInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return ''
  }

  // Remove HTML tags and escape special characters
  let sanitized = stripHtmlTags(input)
  sanitized = escapeHtml(sanitized)

  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim()

  return sanitized
}

/**
 * Sanitize email input
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) {
    return ''
  }

  // Basic email sanitization - remove dangerous characters but keep email format
  let sanitized = email.toLowerCase().trim()
  sanitized = sanitized.replace(/[<>"'`]/g, '')

  return sanitized
}

/**
 * Sanitize bio/description text with limited HTML support
 */
export const sanitizeBioText = (input: string, maxLength = 500): string => {
  if (!input) {
    return ''
  }

  // Remove all HTML tags for security
  let sanitized = stripHtmlTags(input)

  // Escape special characters
  sanitized = escapeHtml(sanitized)

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim()

  // Enforce length limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}

/**
 * Sanitize filename for safe storage
 */
export const sanitizeFilename = (filename: string): string => {
  if (!filename) {
    return 'file'
  }

  // Remove path traversal attempts and dangerous characters
  let sanitized = filename.replace(/[/\\?%*:|"<>]/g, '')

  // Remove leading/trailing dots and spaces
  sanitized = sanitized.replace(/^[.\s]+|[.\s]+$/g, '')

  // Ensure it's not empty after sanitization
  if (!sanitized) {
    sanitized = 'file'
  }

  return sanitized
}

/**
 * Validate and sanitize URL input
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) {
    return ''
  }

  try {
    const urlObj = new URL(url)

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return ''
    }

    return urlObj.toString()
  } catch {
    return ''
  }
}

/**
 * Input length constraints
 */
export const INPUT_CONSTRAINTS = {
  firstName: { min: 1, max: 50 },
  lastName: { min: 1, max: 50 },
  displayName: { min: 1, max: 100 },
  bio: { min: 0, max: 500 },
  email: { min: 5, max: 254 }, // RFC 5321 limit
  password: { min: 8, max: 128 }
} as const

/**
 * Validate input length constraints
 */
export const validateInputLength = (
  input: string,
  field: keyof typeof INPUT_CONSTRAINTS
): { isValid: boolean; message?: string } => {
  const constraints = INPUT_CONSTRAINTS[field]
  const length = input.length

  if (length < constraints.min) {
    return {
      isValid: false,
      message: `${field} debe tener al menos ${constraints.min} caracteres`
    }
  }

  if (length > constraints.max) {
    return {
      isValid: false,
      message: `${field} no puede exceder ${constraints.max} caracteres`
    }
  }

  return { isValid: true }
}

/**
 * Comprehensive input sanitization for profile data
 */
export interface SanitizedProfileData {
  firstName: string
  lastName: string
  displayName: string
  bio?: string
}

export const sanitizeProfileData = (data: {
  firstName?: string
  lastName?: string
  displayName?: string
  bio?: string
}): SanitizedProfileData => {
  return {
    firstName: sanitizeTextInput(data.firstName ?? ''),
    lastName: sanitizeTextInput(data.lastName ?? ''),
    displayName: sanitizeTextInput(data.displayName ?? ''),
    ...(data.bio && { bio: sanitizeBioText(data.bio) })
  }
}

/**
 * File upload validation
 */
export const validateFileUpload = (
  file: File
): {
  isValid: boolean
  message?: string
} => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: 'Tipo de archivo no permitido. Solo se permiten JPG, PNG y WebP'
    }
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: 'El archivo es demasiado grande. Tamaño máximo: 5MB'
    }
  }

  // Check filename
  const sanitizedName = sanitizeFilename(file.name)
  if (!sanitizedName || sanitizedName === 'file') {
    return {
      isValid: false,
      message: 'Nombre de archivo inválido'
    }
  }

  return { isValid: true }
}
