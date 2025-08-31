import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Type-safe navigation guard utilities

export type NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => void

// Authentication guard - require user to be authenticated
export const requireAuth: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  next()
}

// Guest guard - redirect authenticated users away from auth pages
export const requireGuest: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) {
    // Redirect to home if already authenticated
    const redirectTo = to.query.redirect as string
    next(redirectTo ? { path: redirectTo } : { name: 'home' })
    return
  }

  next()
}

// Role-based access guard
export const requireRole = (_roles: string[]): NavigationGuard => {
  return (to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }

    // For now, since we don't have roles implemented yet, just check authentication
    // Future implementation: check if user has required roles
    // const userRoles = authStore.currentUser?.roles || []
    // if (!roles.some(role => userRoles.includes(role))) {
    //   next({ name: 'unauthorized' })
    //   return
    // }

    next()
  }
}
