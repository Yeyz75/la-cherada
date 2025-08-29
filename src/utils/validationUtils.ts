/**
 * Validation utility functions
 * Provides common validation helpers for forms and data validation
 */

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Phone validation regex pattern (Spanish format)
 */
const PHONE_REGEX = /^(\+34|0034|34)?[6789]\d{8}$/

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean
  message?: string
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'El email es requerido' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'El formato del email no es válido' }
  }

  return { isValid: true }
}

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'La contraseña es requerida' }
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'La contraseña debe tener al menos 8 caracteres'
    }
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return {
      isValid: false,
      message: 'La contraseña debe contener al menos una letra minúscula'
    }
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      isValid: false,
      message: 'La contraseña debe contener al menos una letra mayúscula'
    }
  }

  if (!/(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      message: 'La contraseña debe contener al menos un número'
    }
  }

  return { isValid: true }
}

/**
 * Validate phone number (Spanish format)
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, message: 'El teléfono es requerido' }
  }

  if (!PHONE_REGEX.test(phone)) {
    return { isValid: false, message: 'El formato del teléfono no es válido' }
  }

  return { isValid: true }
}

/**
 * Validate required field
 */
export const validateRequired = (
  value: string | number | null | undefined,
  fieldName: string = 'Campo'
): ValidationResult => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: `${fieldName} es requerido` }
  }

  return { isValid: true }
}

/**
 * Validate minimum length
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string = 'Campo'
): ValidationResult => {
  if (!value) {
    return { isValid: false, message: `${fieldName} es requerido` }
  }

  if (value.length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} debe tener al menos ${minLength} caracteres`
    }
  }

  return { isValid: true }
}

/**
 * Validate maximum length
 */
export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string = 'Campo'
): ValidationResult => {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      message: `${fieldName} no puede tener más de ${maxLength} caracteres`
    }
  }

  return { isValid: true }
}

/**
 * Validate numeric value
 */
export const validateNumeric = (
  value: string | number,
  fieldName: string = 'Campo'
): ValidationResult => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: `${fieldName} es requerido` }
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) {
    return { isValid: false, message: `${fieldName} debe ser un número válido` }
  }

  return { isValid: true }
}

/**
 * Validate positive number
 */
export const validatePositiveNumber = (
  value: string | number,
  fieldName: string = 'Campo'
): ValidationResult => {
  const numericValidation = validateNumeric(value, fieldName)
  if (!numericValidation.isValid) {
    return numericValidation
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (numValue <= 0) {
    return {
      isValid: false,
      message: `${fieldName} debe ser un número positivo`
    }
  }

  return { isValid: true }
}

/**
 * Validate URL format
 */
export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, message: 'La URL es requerida' }
  }

  try {
    new URL(url)
    return { isValid: true }
  } catch {
    return { isValid: false, message: 'El formato de la URL no es válido' }
  }
}
