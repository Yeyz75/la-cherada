<template>
  <div class="relative" ref="dropdownRef">
    <!-- Avatar/Trigger Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      :aria-label="t('userMenu.toggleMenu')"
    >
      <!-- User Avatar or Initials -->
      <div class="flex items-center space-x-2">
        <div
          v-if="userProfile?.photoURL"
          class="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800"
        >
          <img
            :src="userProfile.photoURL"
            :alt="userDisplayName"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
        </div>
        <div
          v-else
          class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm"
        >
          {{ userInitials }}
        </div>

        <!-- User name (hidden on mobile) -->
        <span
          class="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-32 truncate"
        >
          {{ userDisplayName }}
        </span>

        <!-- Dropdown arrow -->
        <BaseIcon
          name="chevron-down"
          class="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 z-50"
        role="menu"
        aria-orientation="vertical"
        :aria-labelledby="'user-menu-button'"
      >
        <div class="py-1" role="none">
          <!-- Mi Perfil -->
          <button
            @click="navigateToProfile"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            role="menuitem"
          >
            <BaseIcon name="user" class="w-4 h-4 mr-3" />
            {{ t('userMenu.profile') }}
          </button>

          <!-- Panel -->
          <button
            @click="navigateToDashboard"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            role="menuitem"
          >
            <BaseIcon name="cog" class="w-4 h-4 mr-3" />
            {{ t('userMenu.dashboard') }}
          </button>

          <!-- Divider -->
          <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>

          <!-- Cerrar Sesión -->
          <button
            @click="handleLogout"
            :disabled="isLoggingOut"
            class="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            role="menuitem"
          >
            <BaseIcon
              :name="isLoggingOut ? 'spinner' : 'sign-out'"
              class="w-4 h-4 mr-3"
              :spin="isLoggingOut"
            />
            {{ isLoggingOut ? t('userMenu.loggingOut') : t('userMenu.logout') }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
import { useAuthStore } from '@/stores/authStore'
import { BaseIcon } from '@/components/common'
import type { User, UserProfile } from '@/types/api'

interface UserDropdownMenuProps {
  user: User
  userProfile?: UserProfile | null
}

const props = defineProps<UserDropdownMenuProps>()

const { t } = useTranslation()
const router = useRouter()
const authStore = useAuthStore()

// Component state
const isOpen = ref<boolean>(false)
const isLoggingOut = ref<boolean>(false)
const dropdownRef = ref<HTMLElement | null>(null)
const imageError = ref<boolean>(false)

// Computed properties
const userDisplayName = computed((): string => {
  if (props.userProfile?.displayName) {
    return props.userProfile.displayName
  }
  if (props.user.displayName) {
    return props.user.displayName
  }
  if (props.user.firstName && props.user.lastName) {
    return `${props.user.firstName} ${props.user.lastName}`.trim()
  }
  if (props.user.firstName) {
    return props.user.firstName
  }
  return props.user.email || t('userMenu.user')
})

const userInitials = computed((): string => {
  if (props.userProfile?.firstName && props.userProfile?.lastName) {
    return `${props.userProfile.firstName.charAt(0)}${props.userProfile.lastName.charAt(0)}`.toUpperCase()
  }
  if (props.user.firstName && props.user.lastName) {
    return `${props.user.firstName.charAt(0)}${props.user.lastName.charAt(0)}`.toUpperCase()
  }
  if (props.user.displayName) {
    const parts = props.user.displayName.split(' ')
    if (parts.length >= 2) {
      return `${parts[0]?.charAt(0) || ''}${parts[parts.length - 1]?.charAt(0) || ''}`.toUpperCase()
    }
    return props.user.displayName.charAt(0).toUpperCase()
  }
  if (props.user.email) {
    return props.user.email.charAt(0).toUpperCase()
  }
  return 'U'
})

// Methods
const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}

const closeDropdown = (): void => {
  isOpen.value = false
}

const handleImageError = (): void => {
  imageError.value = true
}

const navigateToProfile = (): void => {
  closeDropdown()
  router.push({ name: 'profile' })
}

const navigateToDashboard = (): void => {
  closeDropdown()
  router.push({ name: 'dashboard-home' })
}

const handleLogout = async (): Promise<void> => {
  try {
    // Show confirmation dialog
    const confirmed = window.confirm(t('auth.confirmLogout'))

    if (!confirmed) {
      return
    }

    isLoggingOut.value = true
    closeDropdown()

    await authStore.logout()

    // Redirect to home page after logout
    router.push({ name: 'home' })
  } catch (error) {
    // Handle error silently or use proper error handling
    authStore.setError({
      message: t('auth.logoutError'),
      type: 'auth',
      timestamp: new Date()
    })
  } finally {
    isLoggingOut.value = false
  }
}

// Click outside handler
const handleClickOutside = (event: Event): void => {
  const target = event.target as HTMLElement
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    closeDropdown()
  }
}

// Keyboard handler
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closeDropdown()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>
