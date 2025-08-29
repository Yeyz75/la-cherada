/**
 * Form-specific types for authentication module
 * These types extend the base API types with form-specific functionality
 */

import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest
} from '../../../types/api'

/**
 * Form error interface for individual field errors
 */
export interface FormError {
  field: string
  message: string
}

/**
 * Form state interface for managing form UI state
 */
export interface AuthFormState {
  isLoading: boolean
  errors: FormError[]
  touched: Record<string, boolean>
}

/**
 * Login form data interface
 * Extends the base LoginRequest with form-specific properties
 */
export interface LoginFormData extends Omit<LoginRequest, 'timestamp'> {
  timestamp?: Date
}

/**
 * Register form data interface
 * Extends the base RegisterRequest with form-specific properties
 */
export interface RegisterFormData extends Omit<RegisterRequest, 'timestamp'> {
  timestamp?: Date
}

/**
 * Forgot password form data interface
 * Extends the base ForgotPasswordRequest with form-specific properties
 */
export interface ForgotPasswordFormData
  extends Omit<ForgotPasswordRequest, 'timestamp'> {
  timestamp?: Date
}

/**
 * Field validation rule interface
 */
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  customValidator?: (value: string) => boolean
  message: string
}

/**
 * Form field configuration interface
 */
export interface FormFieldConfig {
  name: string
  rules: ValidationRule[]
}

/**
 * Form validation result interface
 */
export interface ValidationResult {
  isValid: boolean
  errors: FormError[]
}
