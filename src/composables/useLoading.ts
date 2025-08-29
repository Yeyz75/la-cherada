/**
 * Loading state composable
 * Provides consistent loading state management for asynchronous operations
 */

import { ref, computed, type Ref } from 'vue'
import type { LoadingState } from '@/types/global'

/**
 * Loading composable interface
 */
export interface UseLoadingReturn {
  loading: Ref<LoadingState>
  isLoading: Ref<boolean>
  loadingMessage: Ref<string>
  setLoading: (loading: boolean, message?: string) => void
  startLoading: (message?: string) => void
  stopLoading: () => void
  withLoading: <T>(asyncFn: () => Promise<T>, message?: string) => Promise<T>
}

/**
 * Composable for managing loading states in components
 */
export function useLoading(initialMessage?: string): UseLoadingReturn {
  const loading = ref<LoadingState>({
    isLoading: false,
    ...(initialMessage && { message: initialMessage })
  })

  const isLoading = computed(() => loading.value.isLoading)

  const loadingMessage = computed(() => loading.value.message ?? '')

  /**
   * Set loading state with optional message
   */
  const setLoading = (isLoading: boolean, message?: string): void => {
    loading.value = {
      isLoading,
      ...(message && { message })
    }
  }

  /**
   * Start loading with optional message
   */
  const startLoading = (message?: string): void => {
    setLoading(true, message)
  }

  /**
   * Stop loading and clear message
   */
  const stopLoading = (): void => {
    loading.value = {
      isLoading: false
    }
  }

  /**
   * Execute an async function with loading state management
   * Automatically handles loading start/stop and error handling
   */
  const withLoading = async <T>(
    asyncFn: () => Promise<T>,
    message?: string
  ): Promise<T> => {
    try {
      startLoading(message)
      const result = await asyncFn()
      return result
    } finally {
      stopLoading()
    }
  }

  return {
    loading,
    isLoading,
    loadingMessage,
    setLoading,
    startLoading,
    stopLoading,
    withLoading
  }
}
