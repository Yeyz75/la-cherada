/**
 * Global TypeScript interfaces and types for LaCherada application
 * These types are used across the entire application for consistent typing
 */

/**
 * Interface for managing loading states throughout the application
 */
export interface LoadingState {
  isLoading: boolean
  message?: string
}

/**
 * Interface for managing error states throughout the application
 */
export interface ErrorState {
  hasError: boolean
  message?: string
  code?: string
}

/**
 * Interface for user interface preferences
 */
export interface UIPreferences {
  theme: 'light' | 'dark'
  language: 'es' | 'en'
}

/**
 * Interface for application error handling
 * Used for consistent error management across the application
 */
export interface AppError {
  message: string
  code?: string
  type: 'network' | 'validation' | 'auth' | 'unknown'
  timestamp: Date
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: AppError
}

/**
 * Pagination interface for API responses
 */
export interface PaginationMeta {
  currentPage: number
}
