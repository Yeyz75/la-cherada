/**
 * Error handling composable
 * Provides consistent error management for components
 */

import { ref, computed, type Ref } from 'vue'
import type { AppError } from '@/types/global'

/**
 * Error handling composable interface
 */
export interface UseErrorReturn {
  error: Ref<AppError | null>
  hasError: Ref<boolean>
  errorMessage: Ref<string>
  setError: (message: string, code?: string, type?: AppError['type']) => void
  clearError: () => void
  handleError: (error: unknown) => void
}

/**
 * Composable for managing error states in components
 */
export function useError(): UseErrorReturn {
  const error = ref<AppError | null>(null)

  const hasError = computed(() => error.value !== null)

  const errorMessage = computed(() => error.value?.message ?? '')

  /**
   * Set an error with optional code and type
   */
  const setError = (
    message: string,
    code?: string,
    type: AppError['type'] = 'unknown'
  ): void => {
    error.value = {
      message,
      ...(code && { code }),
      type,
      timestamp: new Date()
    }
  }

  /**
   * Clear the current error
   */
  const clearError = (): void => {
    error.value = null
  }

  /**
   * Handle different types of errors and convert them to AppError
   */
  const handleError = (err: unknown): void => {
    if (err instanceof Error) {
      setError(err.message, undefined, 'unknown')
    } else if (typeof err === 'string') {
      setError(err, undefined, 'unknown')
    } else if (err && typeof err === 'object' && 'message' in err) {
      const errorObj = err as {
        message: string
        code?: string
        type?: AppError['type']
      }
      setError(errorObj.message, errorObj.code, errorObj.type ?? 'unknown')
    } else {
      setError('Ha ocurrido un error inesperado', undefined, 'unknown')
    }
  }

  return {
    error,
    hasError,
    errorMessage,
    setError,
    clearError,
    handleError
  }
}
