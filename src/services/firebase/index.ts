/**
 * Firebase Services Index
 * Centralized export for all Firebase services
 */

// Export services
export { default as authService } from './authService'
export { default as firestoreService } from './firestoreService'
export { default as storageService } from './storageService'
export { userService } from './userService'
export { BaseFirebaseService } from './baseService'

// Export service classes for advanced usage
export { AuthService } from './authService'
export { FirestoreService } from './firestoreService'
export { StorageService } from './storageService'

// Re-export Firebase configuration
export {
  initializeFirebase,
  getFirebaseServices,
  connectToEmulators
} from '@/firebase/config'
