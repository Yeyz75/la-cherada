/**
 * API-related TypeScript interfaces for LaCherada application
 * Centralized location for all API request/response types
 */

import type { LoadingState, AppError } from './global'

/**
 * Base interface for all API requests
 */
export interface BaseApiRequest {
  timestamp?: Date
}

/**
 * User interface for authentication and user management
 */
export interface User {
  id: string
}

/**
 * Authentication state interface
 * Used for managing user authentication status
 */
export interface AuthState {
  isAuthenticated: boolean
  loading: LoadingState
  error: AppError | null
}

/**
 * Login request interface
 */
export interface LoginRequest extends BaseApiRequest {
  email: string
  password: string
  rememberMe?: boolean
}

/**
 * Register request interface
 */
export interface RegisterRequest extends BaseApiRequest {
  email: string
  password: string
  confirmPassword: string
  displayName: string
  acceptTerms: boolean
}

/**
 * Forgot password request interface
 */
export interface ForgotPasswordRequest extends BaseApiRequest {
  email: string
}

/**
 * Google auth request interface
 */
export interface GoogleAuthRequest extends BaseApiRequest {
  // Google auth doesn't require additional fields
  // but we keep the structure for consistency
}

/**
 * Auth response interface
 */
export interface AuthResponse {
  user: User
  token?: string
  message?: string
}

/**
 * Form validation error interface
 */
export interface FormError {
  field: string
  message: string
}

/**
 * Auth form state interface
 */
export interface AuthFormState {
  isLoading: boolean
  errors: FormError[]
  touched: Record<string, boolean>
}
