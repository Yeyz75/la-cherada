import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { requireAuth, requireGuest } from './guards'
import { useAuthStore } from '@/stores/authStore'
import i18n from '@/i18n'

// Lazy load pages for better performance
const HomePage = () => import('@/pages/HomePage.vue')
const HowItWorksPage = () => import('@/pages/HowItWorksPage.vue')
const ExplorePage = () => import('@/pages/ExplorePage.vue')
const ContactPage = () => import('@/pages/ContactPage.vue')

// Auth pages
const LoginPage = () => import('@/pages/LoginPage.vue')
const RegisterPage = () => import('@/pages/RegisterPage.vue')
const ForgotPasswordPage = () => import('@/pages/ForgotPasswordPage.vue')

// Protected pages
const UserProfilePage = () => import('@/pages/UserProfilePage.vue')

// Dashboard components
const DashboardLayout = () =>
  import('@/components/dashboard/DashboardLayout.vue')
const ProfileSection = () =>
  import('@/components/dashboard/sections/ProfileSection.vue')
const StatsSection = () =>
  import('@/components/dashboard/sections/StatsSection.vue')
const ActivitySection = () =>
  import('@/components/dashboard/sections/ActivitySection.vue')
const SettingsSection = () =>
  import('@/components/dashboard/sections/SettingsSection.vue')

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
  {
    path: '/como-funciona',
    name: 'how-it-works',
    component: HowItWorksPage,
    meta: {
      titleKey: 'meta.howItWorksTitle',
      requiresAuth: false
    }
  },
  {
    path: '/explorar',
    name: 'explore',
    component: ExplorePage,
    meta: {
      titleKey: 'meta.exploreTitle',
      requiresAuth: false
    }
  },
  {
    path: '/contacto',
    name: 'contact',
    component: ContactPage,
    meta: {
      titleKey: 'meta.contactTitle',
      requiresAuth: false
    }
  },
  // Auth routes
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter: requireGuest,
    meta: {
      titleKey: 'meta.loginTitle',
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    beforeEnter: requireGuest,
    meta: {
      titleKey: 'meta.registerTitle',
      requiresAuth: false
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordPage,
    beforeEnter: requireGuest,
    meta: {
      titleKey: 'meta.forgotPasswordTitle',
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
    component: DashboardLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        redirect: '/dashboard/profile'
      },
      {
        path: 'profile',
        name: 'dashboard-profile',
        component: ProfileSection,
        meta: {
          requiresAuth: true,
          titleKey: 'meta.dashboardProfileTitle'
        }
      },
      {
        path: 'stats',
        name: 'dashboard-stats',
        component: StatsSection,
        meta: {
          requiresAuth: true,
          titleKey: 'meta.dashboardStatsTitle'
        }
      },
      {
        path: 'activity',
        name: 'dashboard-activity',
        component: ActivitySection,
        meta: {
          requiresAuth: true,
          titleKey: 'meta.dashboardActivityTitle'
        }
      },
      {
        path: 'settings',
        name: 'dashboard-settings',
        component: SettingsSection,
        meta: {
          requiresAuth: true,
          titleKey: 'meta.dashboardSettingsTitle'
        }
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfilePage,
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true,
      titleKey: 'meta.profileTitle'
    }
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

// Navigation guards for authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Set page title using i18n
  if (to.meta.titleKey) {
    document.title = i18n.global.t(to.meta.titleKey as string)
  } else if (to.meta.title) {
    document.title = to.meta.title
  }

  // Wait for auth to initialize if it's still loading
  if (authStore.loading.isLoading) {
    // Wait for the authentication check to complete
    await new Promise(resolve => {
      const unwatch = authStore.$subscribe(() => {
        if (!authStore.loading.isLoading) {
          unwatch()
          resolve(void 0)
        }
      })
    })
  }

  next()
})

export default router
