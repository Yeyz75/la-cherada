import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// Type-safe navigation guard utilities for future use

export type NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => void

// Authentication guard (to be implemented when auth module is ready)
export const requireAuth: NavigationGuard = (to, from, next) => {
  // Future implementation:
  // const authStore = useAuthStore()
  // if (!authStore.isAuthenticated) {
  //   next({ name: 'login', query: { redirect: to.fullPath } })
  //   return
  // }
  next()
}

// Guest guard (redirect authenticated users away from auth pages)
export const requireGuest: NavigationGuard = (to, from, next) => {
  // Future implementation:
  // const authStore = useAuthStore()
  // if (authStore.isAuthenticated) {
  //   next({ name: 'dashboard' })
  //   return
  // }
  next()
}

// Role-based access guard
export const requireRole = (_roles: string[]): NavigationGuard => {
  return (to, from, next) => {
    // Future implementation:
    // const authStore = useAuthStore()
    // if (!authStore.user || !roles.some(role => authStore.user?.roles?.includes(role))) {
    //   next({ name: 'unauthorized' })
    //   return
    // }
    next()
  }
}
