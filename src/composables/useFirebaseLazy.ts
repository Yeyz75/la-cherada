import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { FirebaseStorage } from 'firebase/storage'

// Lazy loading de servicios Firebase
export function useFirebaseLazy() {
  let authInstance: Auth | null = null
  let firestoreInstance: Firestore | null = null
  let storageInstance: FirebaseStorage | null = null

  const getAuth = async (): Promise<Auth> => {
    if (authInstance) {
      return authInstance
    }

    const { initializeFirebase } = await import('@/firebase/config')
    const firebaseServices = initializeFirebase()
    authInstance = firebaseServices.auth as Auth
    return authInstance
  }

  const getFirestore = async (): Promise<Firestore> => {
    if (firestoreInstance) {
      return firestoreInstance
    }

    const { initializeFirebase } = await import('@/firebase/config')
    const firebaseServices = initializeFirebase()
    firestoreInstance = firebaseServices.db as Firestore
    return firestoreInstance
  }

  const getStorage = async (): Promise<FirebaseStorage> => {
    if (storageInstance) {
      return storageInstance
    }

    const { initializeFirebase } = await import('@/firebase/config')
    const firebaseServices = initializeFirebase()
    storageInstance = firebaseServices.storage as FirebaseStorage
    return storageInstance
  }

  const getAuthService = async () => {
    const { AuthService } = await import('@/services/firebase/authService')
    return AuthService
  }

  const getFirestoreService = async () => {
    const { FirestoreService } = await import(
      '@/services/firebase/firestoreService'
    )
    return FirestoreService
  }

  const getStorageService = async () => {
    const { StorageService } = await import(
      '@/services/firebase/storageService'
    )
    return StorageService
  }

  return {
    getAuth,
    getFirestore,
    getStorage,
    getAuthService,
    getFirestoreService,
    getStorageService
  }
}
