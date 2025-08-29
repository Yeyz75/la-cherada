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
        <div class="hidden md:flex items-center space-x-4">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <BaseButton
            variant="ghost"
            size="sm"
            @click="handleLogin"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Iniciar Sesión
          </BaseButton>
          <BaseButton variant="primary" size="sm" @click="handleRegister">
            Registrarse
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
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Botones de autenticación móvil -->
      <div
        class="px-4 py-3 border-t border-gray-200 space-y-2 dark:border-gray-700"
      >
        <!-- Theme Toggle para móvil -->
        <div class="flex justify-center pb-2">
          <ThemeToggle show-label />
        </div>

        <BaseButton
          variant="outline"
          size="sm"
          @click="handleLogin"
          class="w-full"
        >
          Iniciar Sesión
        </BaseButton>
        <BaseButton
          variant="primary"
          size="sm"
          @click="handleRegister"
          class="w-full"
        >
          Registrarse
        </BaseButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { BaseButton } from '@/components/common'
import ThemeToggle from '@/components/ThemeToggle.vue'

interface NavigationItem {
  name: string
  href: string
}

const navigationItems: NavigationItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Cómo funciona', href: '/como-funciona' },
  { name: 'Explorar', href: '/explorar' },
  { name: 'Contacto', href: '/contacto' }
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
  // TODO: Implementar lógica de login
  // eslint-disable-next-line no-console
  console.log('Login clicked')
}

const handleRegister = (): void => {
  // TODO: Implementar lógica de registro
  // eslint-disable-next-line no-console
  console.log('Register clicked')
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
