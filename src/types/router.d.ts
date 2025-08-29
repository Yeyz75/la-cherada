import 'vue-router'

// Extend Vue Router's RouteMeta interface for type safety
declare module 'vue-router' {
  interface RouteMeta {
    // Page title for document.title
    title?: string
    // Whether the route requires authentication
    requiresAuth?: boolean
    // Layout to use for the route (for future use)
    layout?: 'default' | 'auth' | 'dashboard'
    // Roles required to access the route (for future use)
    roles?: string[]
    // Whether to show in navigation (for future use)
    showInNav?: boolean
    // Icon for navigation (for future use)
    icon?: string
  }
}
