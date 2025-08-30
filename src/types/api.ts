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
  email: string
  firstName: string
  lastName: string
  displayName: string
  photoURL?: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * User profile interface for extended user information
 */
export interface UserProfile {
  userId: string
  firstName: string
  lastName: string
  displayName: string
  photoURL?: string
  bio?: string
  preferences: UserPreferences
  updatedAt: Date
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  language: string
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
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
  firstName: string
  lastName: string
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

/**
 * Profile form data interface for editing user profile
 */
export interface ProfileFormData {
  firstName: string
  lastName: string
  displayName: string
  bio?: string
  photoFile?: File
}

/**
 * Profile error interface for profile-specific errors
 */
export interface ProfileError extends AppError {
  type: 'profile' | 'upload' | 'validation'
  field?: string
  code?: string
}

/**
 * Upload error interface for file upload errors
 */
export interface UploadError extends AppError {
  type: 'upload'
  fileSize?: number
  fileType?: string
  maxSize?: number
}

/**
 * Profile validation rule interface
 */
export interface ProfileValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  customValidator?: (value: string) => boolean
  message: string
}

/**
 * Profile validation result interface
 */
export interface ProfileValidationResult {
  isValid: boolean
  errors: ProfileError[]
}
