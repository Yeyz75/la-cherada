/**
 * Firebase Configuration
 * Centralized Firebase initialization and configuration
 */

import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { getAnalytics, type Analytics } from 'firebase/analytics'

// Firebase configuration interface
export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

// Get Firebase configuration from environment variables
const getFirebaseConfig = (): FirebaseConfig => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  }

  // Validate required configuration
  const requiredKeys = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ]
  const missingKeys = requiredKeys.filter(
    key => !config[key as keyof typeof config]
  )

  if (missingKeys.length > 0) {
    throw new Error(`Firebase configuration missing: ${missingKeys.join(', ')}`)
  }

  return config
}

// Initialize Firebase
let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined
let storage: FirebaseStorage | undefined
let analytics: Analytics | undefined

// Inicializa Firebase solo si no está inicializado y la config es válida
export function initializeFirebase() {
  if (app) {
    return { app, auth, db, storage, analytics }
  }
  const firebaseConfig = getFirebaseConfig()
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  if (import.meta.env.PROD && firebaseConfig.measurementId) {
    analytics = getAnalytics(app)
  }
  // eslint-disable-next-line no-console
  console.log('🔥 Firebase initialized successfully')
  return { app, auth, db, storage, analytics }
}

// Export Firebase service getters (useful for testing and dynamic imports)
export const getFirebaseServices = () => ({
  app,
  auth,
  db,
  storage,
  analytics
})

// Firebase connection status
export const isFirebaseInitialized = (): boolean => {
  return !!app && !!auth && !!db && !!storage
}

// Environment helper
export const isProduction = (): boolean => {
  return import.meta.env.PROD
}

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV
}

// Firebase emulator configuration (for development)
export const connectToEmulators = async (): Promise<void> => {
  if (!isDevelopment()) {
    return
  }

  try {
    const { connectAuthEmulator } = await import('firebase/auth')
    const { connectFirestoreEmulator } = await import('firebase/firestore')
    const { connectStorageEmulator } = await import('firebase/storage')

    // Connect to Auth emulator
    try {
      if (auth) {
        connectAuthEmulator(auth, 'http://localhost:9099')
      }
    } catch (error) {
      // Emulator already connected or not available
    }

    // Connect to Firestore emulator
    try {
      if (db) {
        connectFirestoreEmulator(db, 'localhost', 8080)
      }
    } catch (error) {
      // Emulator already connected or not available
    }

    // Connect to Storage emulator
    try {
      if (storage) {
        connectStorageEmulator(storage, 'localhost', 9199)
      }
    } catch (error) {
      // Emulator already connected or not available
    }

    // eslint-disable-next-line no-console
    console.log('🔧 Connected to Firebase emulators')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('⚠️  Could not connect to Firebase emulators:', error)
  }
}
