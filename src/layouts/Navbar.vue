<template>
  <nav
    class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo y nombre -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">LC</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-gray-100"
              >LaCherada</span
            >
          </router-link>
        </div>

        <!-- Navegación desktop -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium dark:text-gray-300 dark:hover:text-blue-400"
            :class="{ 'text-blue-600': $route.path === item.href }"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Botones de autenticación y tema -->
        <div class="hidden md:flex items-center space-x-3">
          <!-- Language Switcher -->
          <LanguageSwitcher />

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Authenticated user menu -->
          <template v-if="authStore.isAuthenticated && authStore.currentUser">
            <div class="flex items-center space-x-4">
              <span class="text-gray-700 dark:text-gray-200">
                {{
                  authStore.currentUser?.displayName ||
                  authStore.currentUser?.email
                }}
              </span>
              <BaseButton
                label="Cerrar sesión"
                @click="handleLogout"
                outlined
                size="small"
              />
            </div>
          </template>

          <!-- Guest user buttons -->
          <template v-else>
            <BaseButton variant="info" size="small" @click="handleLogin">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              {{ t('auth.login') }}
            </BaseButton>
            <BaseButton
              variant="secondary"
              size="small"
              @click="handleRegister"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              {{ t('auth.register') }}
            </BaseButton>
          </template>
        </div>

        <!-- Botón menú móvil -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors duration-200 dark:text-gray-300 dark:hover:text-gray-100 dark:focus:text-gray-100"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Abrir menú de navegación"
          >
            <svg
              class="h-6 w-6"
              :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      @click="closeMobileMenu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
          :class="{
            'text-blue-600 bg-blue-50': $route.path === item.href
          }"
          @click.stop
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Botones de autenticación móvil -->
      <div
        class="px-4 py-3 border-t border-gray-200 space-y-2 dark:border-gray-700"
      >
        <!-- Language Switcher para móvil -->
        <div class="flex justify-center pb-2" @click.stop>
          <LanguageSwitcher />
        </div>

        <!-- Theme Toggle para móvil -->
        <div class="flex justify-center pb-2" @click.stop>
          <ThemeToggle />
        </div>

        <!-- Authenticated user menu for mobile -->
        <template v-if="authStore.isAuthenticated && authStore.currentUser">
          <div class="flex flex-col items-center space-y-2 pb-2" @click.stop>
            <span class="text-gray-700 dark:text-gray-200">
              {{
                authStore.currentUser?.displayName ||
                authStore.currentUser?.email
              }}
            </span>
            <BaseButton
              label="Cerrar sesión"
              @click="handleLogout"
              outlined
              size="small"
            />
          </div>
        </template>

        <!-- Guest user buttons -->
        <template v-else>
          <BaseButton
            :outlined="true"
            variant="secondary"
            size="small"
            @click.stop="handleLogin"
            class="w-full"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            {{ t('auth.login') }}
          </BaseButton>
          <BaseButton
            variant="primary"
            size="small"
            @click.stop="handleRegister"
            class="w-full"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            {{ t('auth.register') }}
          </BaseButton>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
import { useAuthStore } from '@/stores/authStore'
import { BaseButton } from '@/components/common'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

interface NavigationItem {
  name: string
  href: string
}

const { t } = useTranslation()
const router = useRouter()
const authStore = useAuthStore()

const navigationItems: NavigationItem[] = [
  { name: t('navbar.home'), href: '/' },
  { name: t('navbar.howItWorks'), href: '/como-funciona' },
  { name: t('navbar.explore'), href: '/explorar' },
  { name: t('navbar.contact'), href: '/contacto' }
]

const isMobileMenuOpen = ref<boolean>(false)

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

// Navigation handlers
const handleLogin = async (): Promise<void> => {
  closeMobileMenu()
  await router.push({ name: 'login' })
}

const handleRegister = async (): Promise<void> => {
  closeMobileMenu()
  await router.push({ name: 'register' })
}

const handleLogout = async (): Promise<void> => {
  closeMobileMenu()
  try {
    await authStore.logout()
    await router.push('/')
  } catch (error) {
    // Handle logout error silently
  }
}

// Cerrar menú móvil al hacer clic fuera o cambiar de ruta
const handleClickOutside = (event: Event): void => {
  const target = event.target as HTMLElement
  if (!target.closest('nav') && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
