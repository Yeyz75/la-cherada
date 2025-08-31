/**
 * Firebase Types and Interfaces
 * Core type definitions for Firebase services integration
 */

import type { User as FirebaseUser } from 'firebase/auth'
import type { Timestamp, DocumentSnapshot } from 'firebase/firestore'
import type { UserLocation } from './location'

// ==================== CONFIGURATION TYPES ====================

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

// ==================== AUTH TYPES ====================

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL?: string | null
  emailVerified: boolean
  isAnonymous: boolean
  providerData: FirebaseUser['providerData']
  refreshToken: string
  tenantId: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  displayName: string
  acceptTerms: boolean
}

export interface ResetPasswordData {
  email: string
}

// ==================== FIRESTORE TYPES ====================

// Base document structure
export interface FirestoreDocument {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Generic service response
export interface ServiceResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}

// CRUD operation result
export interface CrudResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
  id?: string
}

// Query options for Firestore
export interface QueryOptions {
  limit?: number
  orderBy?: Array<{
    field: string
    direction: 'asc' | 'desc'
  }>
  where?: Array<{
    field: string
    operator: FirestoreOperator
    value: FirestoreValue
  }>
  startAfter?: DocumentSnapshot
}

// Firestore query operators
export type FirestoreOperator =
  | '=='
  | '!='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'in'
  | 'not-in'
  | 'array-contains'
  | 'array-contains-any'

// Firestore acceptable values
export type FirestoreValue =
  | string
  | number
  | boolean
  | Date
  | null
  | Array<string | number>

// Pagination result
export interface PaginatedResult<T> {
  data: T[]
  hasMore: boolean
  lastDoc?: DocumentSnapshot
  total?: number
}

// Batch operation
export interface BatchOperation<T = unknown> {
  operation: 'create' | 'update' | 'delete'
  collection: string
  id?: string
  data?: T
}

export interface BatchResult {
  success: boolean
  results: Array<{
    success: boolean
    id?: string
    error?: string
  }>
  totalOperations: number
  successfulOperations: number
}

// ==================== STORAGE TYPES ====================

export interface StorageUploadResult {
  success: boolean
  url?: string
  path?: string
  metadata?: Record<string, unknown>
  error?: string
}

export interface StorageUploadProgress {
  bytesTransferred: number
  totalBytes: number
  state: 'running' | 'paused' | 'success' | 'canceled' | 'error'
}

export interface ImageUploadOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
  generateThumbnail?: boolean
  thumbnailSize?: number
}

// ==================== USER PROFILE TYPES ====================

export interface UserProfileDocument extends FirestoreDocument {
  userId: string
  firstName: string
  lastName: string
  displayName: string
  photoURL?: string
  bio?: string
  location?: UserLocation
  preferences: {
    language: string
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
  }
}

export interface ProfileImageUploadOptions extends ImageUploadOptions {
  userId: string
  replaceExisting?: boolean
}

export interface ProfileUpdateData {
  firstName?: string
  lastName?: string
  displayName?: string
  bio?: string
  photoURL?: string
  location?: UserLocation
  preferences?: {
    language?: string
    theme?: 'light' | 'dark' | 'system'
    notifications?: boolean
  }
}

// ==================== UTILITY TYPES ====================

// Convert Firestore Timestamp to Date for client usage
export type WithDates<T> = {
  [K in keyof T]: T[K] extends Timestamp ? Date : T[K]
}

// Data for creating new documents (without auto-generated fields)
export type CreateData<T extends FirestoreDocument> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>

// Data for updating documents (partial with required id)
export type UpdateData<T extends FirestoreDocument> = Partial<
  Omit<T, 'id' | 'createdAt'>
> & {
  id: string
}

// Query result with Firestore metadata
export interface QueryResult<T> {
  data: T[]
  metadata: {
    fromCache: boolean
    hasPendingWrites: boolean
  }
}

// Generic collection reference type
export type CollectionRef = string

// Document path type
export type DocumentPath = string

// ==================== ERROR TYPES ====================

export interface FirebaseError {
  code: string
  message: string
  name: string
  stack?: string
}

export interface AuthError extends FirebaseError {
  credential?: unknown
}

export interface FirestoreError extends FirebaseError {
  path?: string
  operation?: string
}

export interface StorageError extends FirebaseError {
  bucket?: string
  fullPath?: string
}

export default {}
