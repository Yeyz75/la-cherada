/**
 * Composable for authentication form validation and utilities
 * Provides reusable validation logic for all auth forms
 */

import { reactive } from 'vue'
import type { FormError, AuthFormState, ValidationRule } from '../types/forms'

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Password validation rules
 */
const PASSWORD_MIN_LENGTH = 6

/**
 * Composable for form validation
 */
export function useAuthValidation() {
  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email.trim())
  }

  /**
   * Validate password strength
   */
  const isValidPassword = (password: string): boolean => {
    return password.length >= PASSWORD_MIN_LENGTH
  }

  /**
   * Validate required field
   */
  const isRequired = (value: string): boolean => {
    return value.trim() !== ''
  }

  /**
   * Validate passwords match
   */
  const passwordsMatch = (
    password: string,
    confirmPassword: string
  ): boolean => {
    return password === confirmPassword
  }

  /**
   * Validate display name
   */
  const isValidDisplayName = (name: string): boolean => {
    return name.trim().length >= 2
  }

  /**
   * Generic field validator
   */
  const validateField = (
    value: string,
    rules: ValidationRule[]
  ): FormError | null => {
    for (const rule of rules) {
      if (rule.required && !isRequired(value)) {
        return { field: 'field', message: rule.message }
      }

      if (rule.minLength && value.length < rule.minLength) {
        return { field: 'field', message: rule.message }
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        return { field: 'field', message: rule.message }
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return { field: 'field', message: rule.message }
      }

      if (rule.customValidator && !rule.customValidator(value)) {
        return { field: 'field', message: rule.message }
      }
    }

    return null
  }

  /**
   * Validate login form
   */
  const validateLoginForm = (email: string, password: string): FormError[] => {
    const errors: FormError[] = []

    if (!isRequired(email)) {
      errors.push({ field: 'email', message: 'El email es obligatorio' })
    } else if (!isValidEmail(email)) {
      errors.push({ field: 'email', message: 'El email no es válido' })
    }

    if (!isRequired(password)) {
      errors.push({
        field: 'password',
        message: 'La contraseña es obligatoria'
      })
    } else if (!isValidPassword(password)) {
      errors.push({
        field: 'password',
        message: 'La contraseña debe tener al menos 6 caracteres'
      })
    }

    return errors
  }

  /**
   * Validate register form
   */
  const validateRegisterForm = (
    displayName: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean
  ): FormError[] => {
    const errors: FormError[] = []

    // Display name validation
    if (!isRequired(displayName)) {
      errors.push({ field: 'displayName', message: 'El nombre es obligatorio' })
    } else if (!isValidDisplayName(displayName)) {
      errors.push({
        field: 'displayName',
        message: 'El nombre debe tener al menos 2 caracteres'
      })
    }

    // Email validation
    if (!isRequired(email)) {
      errors.push({ field: 'email', message: 'El email es obligatorio' })
    } else if (!isValidEmail(email)) {
      errors.push({ field: 'email', message: 'El email no es válido' })
    }

    // Password validation
    if (!isRequired(password)) {
      errors.push({
        field: 'password',
        message: 'La contraseña es obligatoria'
      })
    } else if (!isValidPassword(password)) {
      errors.push({
        field: 'password',
        message: 'La contraseña debe tener al menos 6 caracteres'
      })
    }

    // Confirm password validation
    if (!isRequired(confirmPassword)) {
      errors.push({
        field: 'confirmPassword',
        message: 'Confirma tu contraseña'
      })
    } else if (!passwordsMatch(password, confirmPassword)) {
      errors.push({
        field: 'confirmPassword',
        message: 'Las contraseñas no coinciden'
      })
    }

    // Terms acceptance validation
    if (!acceptTerms) {
      errors.push({
        field: 'acceptTerms',
        message: 'Debes aceptar los términos y condiciones'
      })
    }

    return errors
  }

  /**
   * Validate forgot password form
   */
  const validateForgotPasswordForm = (email: string): FormError[] => {
    const errors: FormError[] = []

    if (!isRequired(email)) {
      errors.push({ field: 'email', message: 'El email es obligatorio' })
    } else if (!isValidEmail(email)) {
      errors.push({ field: 'email', message: 'El email no es válido' })
    }

    return errors
  }

  return {
    // Individual validators
    isValidEmail,
    isValidPassword,
    isRequired,
    passwordsMatch,
    isValidDisplayName,
    validateField,

    // Form validators
    validateLoginForm,
    validateRegisterForm,
    validateForgotPasswordForm
  }
}

/**
 * Composable for form state management
 */
export function useAuthFormState() {
  /**
   * Create reactive form state
   */
  const createFormState = (): AuthFormState => {
    return reactive<AuthFormState>({
      isLoading: false,
      errors: [],
      touched: {}
    })
  }

  /**
   * Get form errors as object for easy access
   */
  const getFormErrors = (errors: FormError[]): Record<string, string> => {
    const errorMap: Record<string, string> = {}
    errors.forEach(error => {
      errorMap[error.field] = error.message
    })
    return errorMap
  }

  /**
   * Mark field as touched
   */
  const markFieldAsTouched = (
    formState: AuthFormState,
    field: string,
    validator?: () => FormError[]
  ): void => {
    formState.touched[field] = true
    if (validator) {
      formState.errors = validator()
    }
  }

  /**
   * Reset form state
   */
  const resetFormState = (formState: AuthFormState): void => {
    formState.isLoading = false
    formState.errors = []
    formState.touched = {}
  }

  /**
   * Set loading state
   */
  const setLoading = (formState: AuthFormState, loading: boolean): void => {
    formState.isLoading = loading
  }

  /**
   * Set form errors
   */
  const setErrors = (formState: AuthFormState, errors: FormError[]): void => {
    formState.errors = errors
  }

  return {
    createFormState,
    getFormErrors,
    markFieldAsTouched,
    resetFormState,
    setLoading,
    setErrors
  }
}
