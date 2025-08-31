/**
 * Composable para el manejo de errores de red en el dashboard
 * Proporciona funcionalidades de detección, retry y recuperación
 */

import { ref, computed, onUnmounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useTranslation } from '@/composables/useTranslation'

// Tipos para errores de red
interface NetworkError {
  message: string
  status?: number
  code?: string
  url?: string
  timestamp: Date
  retryCount: number
}

interface RequestError {
  message?: string
  status?: number
  code?: string
  name?: string
  config?: {
    url?: string
  }
}

interface RetryConfig {
  maxRetries?: number
  baseDelay?: number
  maxDelay?: number
  backoffFactor?: number
  retryOn?: number[]
}

interface NetworkHealthCheck {
  isOnline: boolean
  latency: number | null
  lastCheck: Date | null
  endpoint: string
}

export const useNetworkErrorHandler = () => {
  const dashboardStore = useDashboardStore()
  const { t } = useTranslation()

  // Estado reactivo
  const networkError = ref<NetworkError | null>(null)
  const isRetrying = ref(false)
  const healthCheck = ref<NetworkHealthCheck>({
    isOnline: navigator.onLine,
    latency: null,
    lastCheck: null,
    endpoint: '/api/health'
  })

  // Configuración por defecto para reintentos
  const defaultRetryConfig: Required<RetryConfig> = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 30000,
    backoffFactor: 2,
    retryOn: [408, 429, 500, 502, 503, 504]
  }

  // Getters computados
  const hasNetworkError = computed(() => networkError.value !== null)
  const canRetryNetworkError = computed(
    () =>
      hasNetworkError.value &&
      (networkError.value?.retryCount ?? 0) < defaultRetryConfig.maxRetries &&
      !isRetrying.value
  )

  // Listeners para eventos de red
  const networkListeners = {
    online: () => {
      healthCheck.value.isOnline = true
      if (hasNetworkError.value) {
        void checkNetworkRecovery()
      }
    },
    offline: () => {
      healthCheck.value.isOnline = false
      setNetworkError(
        t('dashboard.error.network.offline'),
        0,
        'NETWORK_OFFLINE'
      )
    }
  }

  // Detectar el tipo de error de red
  const detectNetworkErrorType = (
    error: RequestError
  ): {
    message: string
    status?: number
    code: string
  } => {
    // Error de conexión perdida
    if (!navigator.onLine) {
      return {
        message: t('dashboard.error.network.offline'),
        status: 0,
        code: 'NETWORK_OFFLINE'
      }
    }

    // Error de timeout
    if (error.code === 'TIMEOUT' || error.name === 'TimeoutError') {
      return {
        message: t('dashboard.error.network.timeout'),
        status: 408,
        code: 'NETWORK_TIMEOUT'
      }
    }

    // Error de servidor
    if (error.status && error.status >= 500) {
      return {
        message: t('dashboard.error.network.serverError'),
        status: error.status,
        code: 'SERVER_ERROR'
      }
    }

    // Error de cliente (4xx)
    if (error.status && error.status >= 400 && error.status < 500) {
      return {
        message: t('dashboard.error.network.clientError'),
        status: error.status,
        code: 'CLIENT_ERROR'
      }
    }

    // Error genérico de red
    return {
      message: t('dashboard.error.network.generic'),
      ...(error.status !== undefined && { status: error.status }),
      code: 'NETWORK_ERROR'
    }
  }

  // Establecer error de red
  const setNetworkError = (
    message: string,
    status?: number,
    code?: string,
    url?: string
  ): void => {
    const errorObj: NetworkError = {
      message,
      timestamp: new Date(),
      retryCount: 0
    }

    if (status !== undefined) {
      errorObj.status = status
    }
    if (code !== undefined) {
      errorObj.code = code
    }
    if (url !== undefined) {
      errorObj.url = url
    }

    networkError.value = errorObj

    // También actualizar el store del dashboard
    dashboardStore.setError(message, 'network', `${code}: ${status}`)
  }

  // Limpiar error de red
  const clearNetworkError = (): void => {
    networkError.value = null
    if (dashboardStore.hasNetworkError) {
      dashboardStore.clearError()
    }
  }

  // Calcular delay para el próximo retry con backoff exponencial
  const calculateRetryDelay = (
    retryCount: number,
    config: RetryConfig = {}
  ): number => {
    const finalConfig = { ...defaultRetryConfig, ...config }
    const delay =
      finalConfig.baseDelay * Math.pow(finalConfig.backoffFactor, retryCount)
    return Math.min(delay, finalConfig.maxDelay)
  }

  // Verificar si el error es retryable
  const isRetryableError = (
    error: RequestError,
    config: RetryConfig = {}
  ): boolean => {
    const finalConfig = { ...defaultRetryConfig, ...config }

    if (!error.status) {
      return true // Errores de conexión son retryables
    }

    return finalConfig.retryOn.includes(error.status)
  }

  // Realizar request con retry automático
  const requestWithRetry = async <T>(
    requestFn: () => Promise<T>,
    config: RetryConfig = {}
  ): Promise<T> => {
    const finalConfig = { ...defaultRetryConfig, ...config }
    let lastError: RequestError = { message: 'Unknown error' }

    for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          isRetrying.value = true
          const delay = calculateRetryDelay(attempt - 1, config)
          await new Promise(resolve => setTimeout(resolve, delay))
        }

        const result = await requestFn()

        // Si llegamos aquí, la request fue exitosa
        if (
          hasNetworkError.value &&
          networkError.value?.retryCount === attempt
        ) {
          clearNetworkError()
        }

        return result
      } catch (error) {
        lastError = error as RequestError

        // Si no es retryable o llegamos al máximo de intentos
        if (
          !isRetryableError(lastError, config) ||
          attempt === finalConfig.maxRetries
        ) {
          const errorInfo = detectNetworkErrorType(lastError)
          setNetworkError(
            errorInfo.message,
            errorInfo.status,
            errorInfo.code,
            lastError.config?.url
          )
          throw error
        }

        // Actualizar contador de retry
        if (networkError.value) {
          networkError.value.retryCount = attempt + 1
        }
      } finally {
        isRetrying.value = false
      }
    }

    throw lastError
  }

  // Verificar salud de la red
  const checkNetworkHealth = async (): Promise<NetworkHealthCheck> => {
    const startTime = Date.now()

    try {
      const response = await fetch(healthCheck.value.endpoint, {
        method: 'HEAD',
        cache: 'no-cache'
      })

      const latency = Date.now() - startTime

      healthCheck.value = {
        isOnline: response.ok,
        latency,
        lastCheck: new Date(),
        endpoint: healthCheck.value.endpoint
      }
    } catch (error) {
      healthCheck.value = {
        isOnline: false,
        latency: null,
        lastCheck: new Date(),
        endpoint: healthCheck.value.endpoint
      }
    }

    return healthCheck.value
  }

  // Verificar recuperación de la red después de un error
  const checkNetworkRecovery = async (): Promise<boolean> => {
    try {
      await checkNetworkHealth()

      if (healthCheck.value.isOnline && hasNetworkError.value) {
        clearNetworkError()
        return true
      }
    } catch (error) {
      // La red sigue sin funcionar
    }

    return false
  }

  // Reintentar la última operación que falló
  const retryLastNetworkOperation = async (): Promise<boolean> => {
    if (!canRetryNetworkError.value) {
      return false
    }

    try {
      isRetrying.value = true

      // Verificar primero la salud de la red
      await checkNetworkHealth()

      if (!healthCheck.value.isOnline) {
        return false
      }

      // Incrementar contador de retry
      if (networkError.value) {
        networkError.value.retryCount += 1
      }

      // Si llegamos aquí, asumimos que la red se recuperó
      clearNetworkError()
      return true
    } catch (error) {
      return false
    } finally {
      isRetrying.value = false
    }
  }

  // Configurar listeners de eventos de red
  const setupNetworkListeners = (): void => {
    window.addEventListener('online', networkListeners.online)
    window.addEventListener('offline', networkListeners.offline)
  }

  // Limpiar listeners de eventos de red
  const cleanupNetworkListeners = (): void => {
    window.removeEventListener('online', networkListeners.online)
    window.removeEventListener('offline', networkListeners.offline)
  }

  // Setup inicial y cleanup
  setupNetworkListeners()

  onUnmounted(() => {
    cleanupNetworkListeners()
  })

  return {
    // Estado
    networkError,
    isRetrying,
    healthCheck,

    // Getters
    hasNetworkError,
    canRetryNetworkError,

    // Acciones
    setNetworkError,
    clearNetworkError,
    requestWithRetry,
    checkNetworkHealth,
    checkNetworkRecovery,
    retryLastNetworkOperation,

    // Utilidades
    detectNetworkErrorType,
    isRetryableError,
    calculateRetryDelay,

    // Configuración
    defaultRetryConfig
  }
}
