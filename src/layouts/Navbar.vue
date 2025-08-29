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

          <BaseButton
            :text="true"
            @click="handleLogin"
            class="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium rounded-lg flex items-center gap-2"
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
            @click="handleRegister"
            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
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

        <BaseButton
          :outlined="true"
          variant="secondary"
          size="small"
          @click.stop="handleLogin"
          class="w-full border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
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
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
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
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
import { BaseButton } from '@/components/common'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

interface NavigationItem {
  name: string
  href: string
}

const { t } = useTranslation()
const router = useRouter()

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

// Preparado para futuras funcionalidades de autenticación
const handleLogin = (): void => {
  // Navegar a la página de login
  router.push({ name: 'login' })
}

const handleRegister = (): void => {
  // Navegar a la página de registro
  router.push({ name: 'register' })
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
