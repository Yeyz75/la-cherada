/**
 * Auth Module Exports
 * Central export point for all authentication module components and utilities
 */

// Components
export { default as LoginForm } from './components/LoginForm.vue'
export { default as RegisterForm } from './components/RegisterForm.vue'
export { default as ForgotPasswordForm } from './components/ForgotPasswordForm.vue'

// Composables
export { useAuthValidation, useAuthFormState } from './composables/useAuthForms'

// Types
export type {
  FormError,
  AuthFormState,
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ValidationRule,
  FormFieldConfig,
  ValidationResult
} from './types/forms'
