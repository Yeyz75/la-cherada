/**
 * Base Firebase Service
 * Abstract class providing common functionality for all Firebase services
 */

import type {
  ServiceResponse,
  FirebaseError,
  CrudResult
} from '@/types/firebase'

export abstract class BaseFirebaseService {
  protected serviceName: string

  constructor(serviceName: string) {
    this.serviceName = serviceName
  }

  /**
   * Handle Firebase errors consistently across all services
   */
  protected handleError(error: unknown, operation?: string): FirebaseError {
    const firebaseError: FirebaseError = {
      code: 'unknown-error',
      message: 'An unknown error occurred',
      name: 'FirebaseError'
    }

    if (error instanceof Error) {
      firebaseError.message = error.message
      firebaseError.name = error.name
      if (error.stack) {
        firebaseError.stack = error.stack
      }

      // Extract Firebase error code if available
      if (
        'code' in error &&
        typeof (error as Record<string, unknown>).code === 'string'
      ) {
        firebaseError.code = (error as Record<string, unknown>).code as string
      }
    }

    // Log error for debugging (you can enhance this with proper logging service)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(
        `[${this.serviceName}] Error in ${operation ?? 'operation'}:`,
        error
      )
    }

    return firebaseError
  }

  /**
   * Create a successful service response
   */
  protected createSuccessResponse<T>(data?: T): ServiceResponse<T> {
    return {
      success: true,
      data: data as T
    }
  }

  /**
   * Create an error service response
   */
  protected createErrorResponse<T = never>(
    error: FirebaseError
  ): ServiceResponse<T> {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: {
          name: error.name,
          stack: error.stack
        }
      }
    }
  }

  /**
   * Create a successful CRUD result
   */
  protected createSuccessCrudResult<T>(data: T, id?: string): CrudResult<T> {
    const result: CrudResult<T> = {
      success: true,
      data
    }
    if (id) {
      result.id = id
    }
    return result
  }

  /**
   * Create an error CRUD result
   */
  protected createErrorCrudResult<T = never>(error: string): CrudResult<T> {
    return {
      success: false,
      error
    }
  }

  /**
   * Validate required parameters
   */
  protected validateRequired<T>(
    params: T,
    requiredFields: Array<keyof T>
  ): void {
    const missingFields = requiredFields.filter(field => {
      const value = params[field]
      return value === undefined || value === null || value === ''
    })

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }
  }

  /**
   * Sanitize data before saving (remove undefined values)
   */
  protected sanitizeData<T extends Record<string, unknown>>(
    data: T
  ): Partial<T> {
    const sanitized: Partial<T> = {}

    Object.keys(data).forEach(key => {
      const value = data[key]
      if (value !== undefined && value !== null) {
        sanitized[key as keyof T] = value as T[keyof T]
      }
    })

    return sanitized
  }

  /**
   * Helper method to convert document data
   */
  protected processDocumentData<T>(
    docData: Record<string, unknown>,
    docId: string
  ): T {
    return {
      id: docId,
      ...docData
    } as T
  }

  /**
   * Get service name for logging and debugging
   */
  protected getServiceName(): string {
    return this.serviceName
  }

  /**
   * Check if running in development mode
   */
  protected isDevelopment(): boolean {
    return import.meta.env.DEV
  }

  /**
   * Check if running in production mode
   */
  protected isProduction(): boolean {
    return import.meta.env.PROD
  }

  /**
   * Generate a timestamp for the current time
   */
  protected now(): Date {
    return new Date()
  }

  /**
   * Retry operation with exponential backoff
   */
  protected async retry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: unknown

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error

        if (attempt === maxRetries) {
          break
        }

        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt)
        await this.sleep(delay)
      }
    }

    throw lastError
  }

  /**
   * Sleep utility for retry logic
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default BaseFirebaseService
