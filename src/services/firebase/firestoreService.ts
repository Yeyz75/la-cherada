/**
 * Firebase Firestore Service
 * Handles database operations with Firebase Firestore
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc as firebaseSetDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  type QueryConstraint,
  type Unsubscribe
} from 'firebase/firestore'

import { db } from '@/firebase/config'
import type {
  ServiceResponse,
  CrudResult,
  FirestoreDocument,
  QueryOptions,
  PaginatedResult,
  CreateData,
  UpdateData
} from '@/types/firebase'
import { BaseFirebaseService } from './baseService'

export class FirestoreService extends BaseFirebaseService {
  constructor() {
    super('FirestoreService')
  }

  /**
   * Create a successful CRUD result with proper typing
   */
  private createTypedSuccessCrudResult<T>(data: T, id?: string): CrudResult<T> {
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
   * Helper method to convert document data with proper typing
   */
  private convertDocumentData<T>(
    docData: Record<string, unknown>,
    docId: string
  ): T {
    return {
      id: docId,
      ...docData
    } as T
  }

  /**
   * Create a new document
   */
  async create<T extends FirestoreDocument>(
    collectionName: string,
    data: CreateData<T>
  ): Promise<CrudResult<T>> {
    try {
      const sanitizedData = this.sanitizeData({
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      const docRef = await addDoc(collection(db, collectionName), sanitizedData)

      // Fetch the created document to return with proper timestamps
      const createdDoc = await this.getById<T>(collectionName, docRef.id)

      if (createdDoc.success && createdDoc.data) {
        return this.createSuccessCrudResult(createdDoc.data, docRef.id)
      }

      return this.createErrorCrudResult('Failed to fetch created document')
    } catch (error) {
      const firebaseError = this.handleError(error, 'create')
      return this.createErrorCrudResult(firebaseError.message)
    }
  }

  /**
   * Get document by ID
   */
  async getById<T extends FirestoreDocument>(
    collectionName: string,
    id: string
  ): Promise<CrudResult<T>> {
    try {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const convertedData = this.convertDocumentData<T>(
          docSnap.data(),
          docSnap.id
        )
        return this.createTypedSuccessCrudResult(convertedData)
      }

      return this.createErrorCrudResult('Document not found')
    } catch (error) {
      const firebaseError = this.handleError(error, 'getById')
      return this.createErrorCrudResult(firebaseError.message)
    }
  }

  /**
   * Update document
   */
  async update<T extends FirestoreDocument>(
    collectionName: string,
    updateData: UpdateData<T>
  ): Promise<CrudResult<T>> {
    try {
      const { id, ...data } = updateData
      const sanitizedData = this.sanitizeData({
        ...data,
        updatedAt: serverTimestamp()
      })

      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, sanitizedData)

      // Fetch updated document
      const updatedDoc = await this.getById<T>(collectionName, id)

      if (updatedDoc.success && updatedDoc.data) {
        return this.createSuccessCrudResult(updatedDoc.data, id)
      }

      return this.createErrorCrudResult('Failed to fetch updated document')
    } catch (error) {
      const firebaseError = this.handleError(error, 'update')
      return this.createErrorCrudResult(firebaseError.message)
    }
  }

  /**
   * Delete document
   */
  async delete(collectionName: string, id: string): Promise<CrudResult<void>> {
    try {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)

      return this.createSuccessCrudResult(undefined, id)
    } catch (error) {
      const firebaseError = this.handleError(error, 'delete')
      return this.createErrorCrudResult(firebaseError.message)
    }
  }

  /**
   * Set document (create or replace)
   */
  async set<T extends FirestoreDocument>(
    collectionName: string,
    id: string,
    data: CreateData<T>
  ): Promise<CrudResult<T>> {
    try {
      const sanitizedData = this.sanitizeData({
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      const docRef = doc(db, collectionName, id)
      await firebaseSetDoc(docRef, sanitizedData)

      // Fetch the set document
      const setDocument = await this.getById<T>(collectionName, id)

      if (setDocument.success && setDocument.data) {
        return this.createSuccessCrudResult(setDocument.data, id)
      }

      return this.createErrorCrudResult('Failed to fetch set document')
    } catch (error) {
      const firebaseError = this.handleError(error, 'set')
      return this.createErrorCrudResult(firebaseError.message)
    }
  }

  /**
   * Query documents with filters and pagination
   */
  async query<T extends FirestoreDocument>(
    collectionName: string,
    options: QueryOptions = {}
  ): Promise<ServiceResponse<PaginatedResult<T>>> {
    try {
      const constraints: QueryConstraint[] = []

      // Add where clauses
      if (options.where) {
        options.where.forEach(filter => {
          constraints.push(where(filter.field, filter.operator, filter.value))
        })
      }

      // Add orderBy clauses
      if (options.orderBy) {
        options.orderBy.forEach(order => {
          constraints.push(orderBy(order.field, order.direction))
        })
      }

      // Add pagination
      if (options.startAfter) {
        constraints.push(startAfter(options.startAfter))
      }

      if (options.limit) {
        constraints.push(limit(options.limit + 1)) // +1 to check if there are more results
      }

      const q = query(collection(db, collectionName), ...constraints)
      const querySnapshot = await getDocs(q)

      const documents: T[] = []
      let hasMore = false

      querySnapshot.docs.forEach((doc, index) => {
        if (options.limit && index === options.limit) {
          hasMore = true
          return
        }

        documents.push(this.convertDocumentData<T>(doc.data(), doc.id))
      })

      const result: PaginatedResult<T> = {
        data: documents,
        hasMore,
        ...(documents.length > 0 && {
          lastDoc: querySnapshot.docs[documents.length - 1]
        })
      }

      return this.createSuccessResponse(result)
    } catch (error) {
      const firebaseError = this.handleError(error, 'query')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Get all documents from a collection
   */
  async getAll<T extends FirestoreDocument>(
    collectionName: string
  ): Promise<ServiceResponse<T[]>> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))

      const documents: T[] = []
      querySnapshot.forEach(doc => {
        documents.push(this.convertDocumentData<T>(doc.data(), doc.id))
      })

      return this.createSuccessResponse(documents)
    } catch (error) {
      const firebaseError = this.handleError(error, 'getAll')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Listen to document changes
   */
  onDocumentChange<T extends FirestoreDocument>(
    collectionName: string,
    id: string,
    callback: (doc: T | null) => void
  ): Unsubscribe {
    const docRef = doc(db, collectionName, id)

    return onSnapshot(docRef, docSnap => {
      if (docSnap.exists()) {
        callback(this.convertDocumentData<T>(docSnap.data(), docSnap.id))
      } else {
        callback(null)
      }
    })
  }

  /**
   * Listen to collection changes
   */
  onCollectionChange<T extends FirestoreDocument>(
    collectionName: string,
    callback: (docs: T[]) => void,
    options: QueryOptions = {}
  ): Unsubscribe {
    const constraints: QueryConstraint[] = []

    // Add where clauses
    if (options.where) {
      options.where.forEach(filter => {
        constraints.push(where(filter.field, filter.operator, filter.value))
      })
    }

    // Add orderBy clauses
    if (options.orderBy) {
      options.orderBy.forEach(order => {
        constraints.push(orderBy(order.field, order.direction))
      })
    }

    if (options.limit) {
      constraints.push(limit(options.limit))
    }

    const q = query(collection(db, collectionName), ...constraints)

    return onSnapshot(q, querySnapshot => {
      const documents: T[] = []

      querySnapshot.forEach(doc => {
        documents.push(this.convertDocumentData<T>(doc.data(), doc.id))
      })

      callback(documents)
    })
  }

  /**
   * Count documents in collection (approximate)
   */
  async count(
    collectionName: string,
    options: QueryOptions = {}
  ): Promise<ServiceResponse<number>> {
    try {
      const result = await this.query(collectionName, {
        ...options,
        limit: 1000
      })

      if (result.success && result.data) {
        return this.createSuccessResponse(result.data.data.length)
      }

      return this.createSuccessResponse(0)
    } catch (error) {
      const firebaseError = this.handleError(error, 'count')
      return this.createErrorResponse(firebaseError)
    }
  }

  /**
   * Check if document exists
   */
  async exists(collectionName: string, id: string): Promise<boolean> {
    try {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists()
    } catch (error) {
      this.handleError(error, 'exists')
      return false
    }
  }
}

// Export singleton instance
export const firestoreService = new FirestoreService()
export default firestoreService
