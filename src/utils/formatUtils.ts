/**
 * Format utility functions
 * Provides common formatting helpers for display purposes
 */

/**
 * Format currency to Spanish format
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'EUR'
): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(amount)
}

/**
 * Format number with Spanish locale
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('es-ES').format(number)
}

/**
 * Capitalize first letter of a string
 */
export const capitalize = (text: string): string => {
  if (!text) {
    return ''
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text: string): string => {
  if (!text) {
    return ''
  }
  return text
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Truncate text to specified length
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...'
): string => {
  if (!text) {
    return ''
  }
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Generate initials from a name
 */
export const generateInitials = (name: string): string => {
  if (!name) {
    return ''
  }

  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

/**
 * Format phone number for display
 */
export const formatPhoneDisplay = (phone: string): string => {
  if (!phone) {
    return ''
  }

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')

  // Format Spanish phone number
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }

  return phone
}

/**
 * Generate a random color for avatars or placeholders
 */
export const generateRandomColor = (): string => {
  const colors = [
    '#3B82F6',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#84CC16'
  ]
  return colors[Math.floor(Math.random() * colors.length)] as string
}

/**
 * Clean and format text for URLs (slug)
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}
