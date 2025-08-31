/**
 * Location-specific TypeScript interfaces for LaCherada application
 * Types related to geographical locations within El Salvador
 */

/**
 * Municipality interface representing a city/town within a department
 */
export interface Municipality {
  /** Unique identifier for the municipality */
  id: string
  /** Display name of the municipality */
  name: string
  /** ID of the department this municipality belongs to */
  departmentId: string
}

/**
 * Department interface representing a state/province in El Salvador
 */
export interface Department {
  /** Unique identifier for the department */
  id: string
  /** Display name of the department */
  name: string
  /** List of municipalities within this department */
  municipalities: Municipality[]
}

/**
 * User location data stored in user profile
 */
export interface UserLocation {
  /** Selected department ID, null if not configured */
  departmentId: string | null
  /** Selected municipality ID, null if not configured */
  municipalityId: string | null
  /** Whether user has configured their location */
  isConfigured: boolean
  /** When location was first configured */
  createdAt?: Date
  /** When location was last updated */
  updatedAt?: Date
}

/**
 * Location selection state for forms and components
 */
export interface LocationSelection {
  /** Currently selected department */
  selectedDepartment: Department | null
  /** Currently selected municipality */
  selectedMunicipality: Municipality | null
  /** Whether location selection is valid */
  isValid: boolean
  /** Whether user chose to skip location configuration */
  isSkipped: boolean
}

/**
 * Location privacy settings
 */
export interface LocationPrivacy {
  /** Whether to show specific municipality publicly */
  showMunicipality: boolean
  /** Whether to show department publicly */
  showDepartment: boolean
  /** Whether to hide location completely */
  hideLocation: boolean
}

/**
 * Geographic coordinates (for future use)
 */
export interface Coordinates {
  /** Latitude coordinate */
  lat: number
  /** Longitude coordinate */
  lng: number
}

/**
 * Extended location data for advanced features (future use)
 */
export interface ExtendedLocation extends UserLocation {
  /** Optional geographic coordinates */
  coordinates?: Coordinates
  /** Privacy settings for location display */
  privacy?: LocationPrivacy
  /** Delivery radius for products/services */
  deliveryRadius?: number
}

/**
 * Location filter options for searching/displaying items
 */
export interface LocationFilter {
  /** Filter by specific department */
  departmentId?: string
  /** Filter by specific municipality */
  municipalityId?: string
  /** Include national/country-wide items */
  includeNational?: boolean
  /** Maximum distance in kilometers (for future use) */
  maxDistance?: number
}

/**
 * Location display options for UI components
 */
export interface LocationDisplayOptions {
  /** Show full location (Department, Municipality) */
  showFull: boolean
  /** Show only department */
  departmentOnly: boolean
  /** Use short format */
  shortFormat: boolean
  /** Include national indicator */
  showNational: boolean
}
