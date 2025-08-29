/**
 * Async operation composable
 * Combines loading and error handling for async operations
 */
import { useLoading, type UseLoadingReturn } from './useLoading'
import { useError, type UseErrorReturn } from './useError'

/**
 * Async operation composable interface
 */
export interface UseAsyncOperationReturn
  extends UseLoadingReturn,
    UseErrorReturn {
  execute: <T>(
    asyncFn: () => Promise<T>,
    loadingMessage?: string,
    errorMessage?: string
  ) => Promise<T | null>
  reset: () => void
}

/**
 * Composable that combines loading and error handling for async operations
 */
export function useAsyncOperation(
  initialLoadingMessage?: string
): UseAsyncOperationReturn {
  const loadingComposable = useLoading(initialLoadingMessage)
  const errorComposable = useError()

  /**
   * Execute an async operation with automatic loading and error handling
   */
  const execute = async <T>(
    asyncFn: () => Promise<T>,
    loadingMessage?: string,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      errorComposable.clearError()
      loadingComposable.startLoading(loadingMessage)

      const result = await asyncFn()
      return result
    } catch (error) {
      if (errorMessage) {
        errorComposable.setError(errorMessage)
      } else {
        errorComposable.handleError(error)
      }
      return null
    } finally {
      loadingComposable.stopLoading()
    }
  }

  /**
   * Reset both loading and error states
   */
  const reset = (): void => {
    loadingComposable.stopLoading()
    errorComposable.clearError()
  }

  return {
    // Loading composable properties and methods
    ...loadingComposable,

    // Error composable properties and methods
    ...errorComposable,

    // Combined methods
    execute,
    reset
  }
}
