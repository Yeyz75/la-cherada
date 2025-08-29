/**
 * Date utility functions using dayjs
 * Provides consistent date formatting and manipulation across the application
 */

import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

// Configure dayjs with plugins and locale
dayjs.extend(relativeTime)
dayjs.locale('es')

/**
 * Format date to a readable string
 */
export const formatDate = (
  date: Date | string | Dayjs,
  format: string = 'DD/MM/YYYY'
): string => {
  return dayjs(date).format(format)
}

/**
 * Format date to relative time (e.g., "hace 2 horas")
 */
export const formatRelativeTime = (date: Date | string | Dayjs): string => {
  return dayjs(date).fromNow()
}

/**
 * Format date to a more readable format for display
 */
export const formatDisplayDate = (date: Date | string | Dayjs): string => {
  return dayjs(date).format('DD [de] MMMM [de] YYYY')
}

/**
 * Format date and time for display
 */
export const formatDateTime = (date: Date | string | Dayjs): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

/**
 * Check if a date is today
 */
export const isToday = (date: Date | string | Dayjs): boolean => {
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * Check if a date is in the past
 */
export const isPast = (date: Date | string | Dayjs): boolean => {
  return dayjs(date).isBefore(dayjs())
}

/**
 * Get the start of day for a given date
 */
export const startOfDay = (date: Date | string | Dayjs): Dayjs => {
  return dayjs(date).startOf('day')
}

/**
 * Get the end of day for a given date
 */
export const endOfDay = (date: Date | string | Dayjs): Dayjs => {
  return dayjs(date).endOf('day')
}

/**
 * Add days to a date
 */
export const addDays = (date: Date | string | Dayjs, days: number): Dayjs => {
  return dayjs(date).add(days, 'day')
}

/**
 * Subtract days from a date
 */
export const subtractDays = (
  date: Date | string | Dayjs,
  days: number
): Dayjs => {
  return dayjs(date).subtract(days, 'day')
}
