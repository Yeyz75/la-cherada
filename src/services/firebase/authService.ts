/**
 * Firebase Authentication Service
 * Handles user authentication operations with Firebase Auth
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  type User as FirebaseUser,
  type UserCredential
} from 'firebase/auth'

import { auth } from '@/firebase/config'
import type {
  ServiceResponse,
  AuthUser,
  LoginCredentials,
  RegisterData,
  ResetPasswordData
} from '@/types/firebase'
import { BaseFirebaseService } from './baseService'

export class AuthService extends BaseFirebaseService {
  constructor() {
    super('AuthService')
  }

  /**
   * Sign in user with email and password
   */
  async signIn(
    credentials: LoginCredentials
  ): Promise<ServiceResponse<AuthUser>> {
    try {
      this.validateRequired(credentials, ['email', 'password'])

      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )

      const authUser = this.mapFirebaseUserToAuthUser(userCredential.user)

      return this.createSuccessResponse(authUser)
    } catch (error) {
      const firebaseError = this.handleError(error, 'signIn')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<ServiceResponse<AuthUser>> {
    try {
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')

      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      )
      const authUser = this.mapFirebaseUserToAuthUser(userCredential.user)

      return this.createSuccessResponse(authUser)
    } catch (error) {
      const firebaseError = this.handleError(error, 'signInWithGoogle')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Register new user with email and password
   */
  async signUp(registerData: RegisterData): Promise<ServiceResponse<AuthUser>> {
    try {
      this.validateRequired(registerData, [
        'email',
        'password',
        'displayName',
        'acceptTerms'
      ])

      if (!registerData.acceptTerms) {
        throw new Error('You must accept the terms and conditions')
      }

      // Create user account
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          registerData.email,
          registerData.password
        )

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: registerData.displayName
      })

      const authUser = this.mapFirebaseUserToAuthUser(userCredential.user)

      return this.createSuccessResponse(authUser)
    } catch (error) {
      const firebaseError = this.handleError(error, 'signUp')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<ServiceResponse<void>> {
    try {
      await signOut(auth)
      return this.createSuccessResponse()
    } catch (error) {
      const firebaseError = this.handleError(error, 'signOut')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(
    resetData: ResetPasswordData
  ): Promise<ServiceResponse<void>> {
    try {
      this.validateRequired(resetData, ['email'])

      await sendPasswordResetEmail(auth, resetData.email)
      return this.createSuccessResponse()
    } catch (error) {
      const firebaseError = this.handleError(error, 'resetPassword')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates: {
    displayName?: string
    photoURL?: string
  }): Promise<ServiceResponse<AuthUser>> {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error('No authenticated user found')
      }

      await updateProfile(currentUser, updates)

      const authUser = this.mapFirebaseUserToAuthUser(currentUser)
      return this.createSuccessResponse(authUser)
    } catch (error) {
      const firebaseError = this.handleError(error, 'updateUserProfile')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): AuthUser | null {
    const currentUser = auth.currentUser
    return currentUser ? this.mapFirebaseUserToAuthUser(currentUser) : null
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!auth.currentUser
  }

  /**
   * Listen to authentication state changes
   */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      const authUser = firebaseUser
        ? this.mapFirebaseUserToAuthUser(firebaseUser)
        : null
      callback(authUser)
    })
  }

  /**
   * Wait for auth initialization
   */
  async waitForAuthInit(): Promise<AuthUser | null> {
    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
        unsubscribe()
        const authUser = firebaseUser
          ? this.mapFirebaseUserToAuthUser(firebaseUser)
          : null
        resolve(authUser)
      })
    })
  }

  /**
   * Get ID token for current user
   */
  async getIdToken(forceRefresh = false): Promise<string | null> {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) {
        return null
      }

      return await currentUser.getIdToken(forceRefresh)
    } catch (error) {
      this.handleError(error, 'getIdToken')
      return null
    }
  }

  /**
   * Reload current user data
   */
  async reloadUser(): Promise<ServiceResponse<AuthUser>> {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error('No authenticated user found')
      }

      await currentUser.reload()
      const authUser = this.mapFirebaseUserToAuthUser(currentUser)

      return this.createSuccessResponse(authUser)
    } catch (error) {
      const firebaseError = this.handleError(error, 'reloadUser')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Map Firebase User to AuthUser interface
   */
  private mapFirebaseUserToAuthUser(firebaseUser: FirebaseUser): AuthUser {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      isAnonymous: firebaseUser.isAnonymous,
      providerData: firebaseUser.providerData,
      refreshToken: firebaseUser.refreshToken,
      tenantId: firebaseUser.tenantId
    }
  }
}

// Export singleton instance
export const authService = new AuthService()
export default authService
