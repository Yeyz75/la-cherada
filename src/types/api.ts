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
}
