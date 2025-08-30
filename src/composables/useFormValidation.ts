/**
 * Form validation composable
 * Provides comprehensive validation with real-time feedback
 */

import { reactive, computed } from 'vue'
import {
  validateInputLength,
  sanitizeTextInput,
  sanitizeEmail,
  INPUT_CONSTRAINTS
} from '@/utils/sanitizationUtils'
import { createValidationError } from '@/utils/errorUtils'
import type { ProfileError } from '@/types/api'

/**
 * Validation rule function signature
 */
export type ValidationRule<T = string> = (
  value: T,
  formData?: Record<string, unknown>
) => ProfileError | null

/**
 * Field validation configuration
 */
export interface FieldConfig {
  required?: boolean
  rules?: ValidationRule[]
  sanitizer?: (value: string) => string
  validateOnChange?: boolean
  validateOnBlur?: boolean
  debounceMs?: number
}

/**
 * Form validation state
 */
export interface ValidationState {
  isValid: boolean
  errors: Record<string, ProfileError | null>
  touched: Record<string, boolean>
  dirty: Record<string, boolean>
  validating: Record<string, boolean>
}

/**
 * Built-in validation rules
 */
export const validationRules = {
  /**
   * Required field validation
   */
  required: (message = 'Este campo es obligatorio'): ValidationRule => {
    return (value: string) => {
      if (!value || value.trim() === '') {
        return createValidationError(
          'required',
          'validation/required-field',
          message
        )
      }
      return null
    }
  },

  /**
   * Minimum length validation
   */
  minLength: (min: number, message?: string): ValidationRule => {
    return (value: string) => {
      if (value && value.length < min) {
        return createValidationError(
          'minLength',
          'validation/field-too-short',
          message ?? `Debe tener al menos ${min} caracteres`
        )
      }
      return null
    }
  },

  /**
   * Maximum length validation
   */
  maxLength: (max: number, message?: string): ValidationRule => {
    return (value: string) => {
      if (value && value.length > max) {
        return createValidationError(
          'maxLength',
          'validation/field-too-long',
          message ?? `No puede exceder ${max} caracteres`
        )
      }
      return null
    }
  },

  /**
   * Email format validation
   */
  email: (message = 'Formato de email inválido'): ValidationRule => {
    return (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return createValidationError(
          'email',
          'validation/invalid-email',
          message
        )
      }
      return null
    }
  },

  /**
   * Pattern validation
   */
  pattern: (pattern: RegExp, message = 'Formato inválido'): ValidationRule => {
    return (value: string) => {
      if (value && !pattern.test(value)) {
        return createValidationError(
          'pattern',
          'validation/invalid-format',
          message
        )
      }
      return null
    }
  },

  /**
   * Profile field validation using INPUT_CONSTRAINTS
   */
  profileField: (fieldName: keyof typeof INPUT_CONSTRAINTS): ValidationRule => {
    return (value: string) => {
      const validation = validateInputLength(value, fieldName)
      if (!validation.isValid) {
        return createValidationError(
          fieldName,
          'validation/field-invalid',
          validation.message ?? 'Campo inválido'
        )
      }
      return null
    }
  },

  /**
   * Custom validation rule
   */
  custom: (
    validator: (value: string, formData?: Record<string, unknown>) => boolean,
    message = 'Valor inválido'
  ): ValidationRule => {
    return (value: string, formData?: Record<string, unknown>) => {
      if (!validator(value, formData)) {
        return createValidationError(
          'custom',
          'validation/custom-error',
          message
        )
      }
      return null
    }
  }
}

/**
 * Built-in sanitizers
 */
export const sanitizers = {
  text: sanitizeTextInput,
  email: sanitizeEmail,
  trim: (value: string) => value.trim(),
  none: (value: string) => value
}

/**
 * Form validation composable
 */
export function useFormValidation<T extends Record<string, unknown>>(
  initialData: T,
  fieldConfigs: Record<keyof T, FieldConfig>
) {
  // Form data
  const formData = reactive<T>({ ...initialData })

  // Validation state
  const validationState = reactive<ValidationState>({
    isValid: false,
    errors: {},
    touched: {},
    dirty: {},
    validating: {}
  })

  // Debounce timers
  const debounceTimers: Record<string, NodeJS.Timeout> = {}

  /**
   * Validate a single field
   */
  const validateField = async (
    fieldName: keyof T,
    value: string,
    showError = true
  ): Promise<ProfileError | null> => {
    const config = fieldConfigs[fieldName]
    if (!config) {
      return null
    }

    const fieldKey = fieldName as string
    validationState.validating[fieldKey] = true

    try {
      // Apply sanitizer if configured
      if (config.sanitizer) {
        value = config.sanitizer(value)
      }

      // Run validation rules
      if (config.rules) {
        for (const rule of config.rules) {
          const error = rule(value, formData as Record<string, unknown>)
          if (error) {
            if (showError) {
              validationState.errors[fieldKey] = error
            }
            return error
          }
        }
      }

      // Clear error if validation passed
      if (showError) {
        validationState.errors[fieldKey] = null
      }
      return null
    } finally {
      validationState.validating[fieldKey] = false
    }
  }

  /**
   * Validate all fields
   */
  const validateForm = async (
    showErrors = true
  ): Promise<Record<keyof T, ProfileError | null>> => {
    const errors: Record<keyof T, ProfileError | null> = {} as Record<
      keyof T,
      ProfileError | null
    >

    for (const fieldName of Object.keys(fieldConfigs) as Array<keyof T>) {
      const value = String((formData as T)[fieldName] ?? '')
      const error = await validateField(fieldName, value, showErrors)
      errors[fieldName] = error
    }

    return errors
  }

  /**
   * Handle field change with validation
   */
  const handleFieldChange = (fieldName: keyof T, value: string): void => {
    const fieldKey = fieldName as string

    // Update form data
    ;(formData as T)[fieldName] = value as T[keyof T]

    // Mark as dirty
    validationState.dirty[fieldKey] = true

    const config = fieldConfigs[fieldName]

    // Apply sanitizer immediately
    if (config?.sanitizer) {
      const sanitized = config.sanitizer(value)
      if (sanitized !== value) {
        ;(formData as T)[fieldName] = sanitized as T[keyof T]
      }
    }

    // Validate on change if configured
    if (config?.validateOnChange !== false) {
      const debounceMs = config?.debounceMs ?? 300

      // Clear existing timer
      if (debounceTimers[fieldKey]) {
        clearTimeout(debounceTimers[fieldKey])
      }

      // Debounced validation
      debounceTimers[fieldKey] = setTimeout(() => {
        validateField(
          fieldName,
          String((formData as T)[fieldName] ?? ''),
          validationState.touched[fieldKey] ?? false
        )
      }, debounceMs)
    }
  }

  /**
   * Handle field blur with validation
   */
  const handleFieldBlur = (fieldName: keyof T): void => {
    const fieldKey = fieldName as string
    validationState.touched[fieldKey] = true

    const config = fieldConfigs[fieldName]
    if (config?.validateOnBlur !== false) {
      validateField(fieldName, String((formData as T)[fieldName] ?? ''))
    }
  }

  /**
   * Reset form validation state
   */
  const resetValidation = (): void => {
    validationState.errors = {}
    validationState.touched = {}
    validationState.dirty = {}
    validationState.validating = {}

    // Clear timers
    Object.values(debounceTimers).forEach(timer => clearTimeout(timer))
  }

  /**
   * Reset form to initial data
   */
  const resetForm = (): void => {
    Object.assign(formData, initialData)
    resetValidation()
  }

  /**
   * Mark all fields as touched
   */
  const touchAllFields = (): void => {
    for (const fieldName of Object.keys(fieldConfigs)) {
      validationState.touched[fieldName] = true
    }
  }

  /**
   * Get sanitized form data
   */
  const getSanitizedData = (): T => {
    const sanitized = { ...formData }

    for (const [fieldName, config] of Object.entries(fieldConfigs)) {
      if (config.sanitizer && (sanitized as T)[fieldName]) {
        ;(sanitized as T)[fieldName as keyof T] = config.sanitizer(
          String((sanitized as T)[fieldName as keyof T])
        ) as T[keyof T]
      }
    }

    return sanitized as T
  }

  // Computed properties
  const isFormValid = computed(() => {
    return Object.values(validationState.errors).every(error => error === null)
  })

  const hasErrors = computed(() => {
    return Object.values(validationState.errors).some(error => error !== null)
  })

  const isFormDirty = computed(() => {
    return Object.values(validationState.dirty).some(dirty => dirty)
  })

  const isValidating = computed(() => {
    return Object.values(validationState.validating).some(
      validating => validating
    )
  })

  // Helper to get field error
  const getFieldError = (fieldName: keyof T): ProfileError | null => {
    return validationState.errors[fieldName as string] ?? null
  }

  // Helper to check if field should show error
  const shouldShowError = (fieldName: keyof T): boolean => {
    const fieldKey = fieldName as string
    return Boolean(
      validationState.touched[fieldKey] &&
        validationState.errors[fieldKey] !== null
    )
  }

  return {
    // State
    formData,
    validationState,

    // Computed
    isFormValid,
    hasErrors,
    isFormDirty,
    isValidating,

    // Methods
    validateField,
    validateForm,
    handleFieldChange,
    handleFieldBlur,
    resetValidation,
    resetForm,
    touchAllFields,
    getSanitizedData,
    getFieldError,
    shouldShowError
  }
}
