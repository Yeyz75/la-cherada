import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n'

// Lazy load pages for better performance
const HomePage = () => import('@/pages/HomePage.vue')

// Define routes with TypeScript typing
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      titleKey: 'meta.homeTitle',
      requiresAuth: false
    }
  },
  // Prepared structure for future protected routes
  {
    path: '/auth',
    name: 'auth',
    children: [
      // Future auth routes will go here
      // {
      //   path: 'login',
      //   name: 'login',
      //   component: () => import('@/modules/auth/pages/LoginPage.vue'),
      //   meta: { requiresAuth: false }
      // },
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import('@/modules/auth/pages/RegisterPage.vue'),
      //   meta: { requiresAuth: false }
      // }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    children: [
      // Future protected dashboard routes will go here
      // {
      //   path: '',
      //   name: 'dashboard-home',
      //   component: () => import('@/modules/dashboard/pages/DashboardPage.vue'),
      //   meta: { requiresAuth: true }
      // },
      // {
      //   path: 'items',
      //   name: 'my-items',
      //   component: () => import('@/modules/items/pages/MyItemsPage.vue'),
      //   meta: { requiresAuth: true }
      // }
    ]
  },
  // Catch-all route for 404 pages
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      titleKey: 'meta.notFoundTitle'
    }
  }
]

// Create router instance with TypeScript configuration
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top on route change, or restore saved position
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards for future authentication
router.beforeEach((to, from, next) => {
  // Set page title using i18n
  if (to.meta.titleKey) {
    document.title = i18n.global.t(to.meta.titleKey as string)
  } else if (to.meta.title) {
    document.title = to.meta.title
  }

  // Future authentication check will go here
  // const authStore = useAuthStore()
  // if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  //   next({ name: 'login' })
  //   return
  // }

  next()
})

export default router
