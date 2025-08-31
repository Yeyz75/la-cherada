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
          :class="`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`"
        />
      </div>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95 translate-y-1"
      enter-to-class="transform opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100 translate-y-0"
      leave-to-class="transform opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 sm:w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-gray-700 z-50 border border-gray-100 dark:border-gray-600"
        role="menu"
        aria-orientation="vertical"
        :aria-labelledby="'user-menu-button'"
      >
        <div class="py-2" role="none">
          <!-- User Info Header (Mobile Only) -->
          <div
            class="sm:hidden px-4 py-3 border-b border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-center space-x-3">
              <div
                v-if="userProfile?.photoURL && !imageError"
                class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800"
              >
                <img
                  :src="userProfile.photoURL"
                  :alt="userDisplayName"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              >
                {{ userInitials }}
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 dark:text-white truncate"
                >
                  {{ userDisplayName }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ props.user.email }}
                </p>
              </div>
            </div>
          </div>

          <!-- Mi Perfil -->
          <button
            @click="navigateToProfile"
            class="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:translate-x-1"
            role="menuitem"
          >
            <BaseIcon name="user" class="w-5 h-5 mr-3 text-blue-500" />
            {{ t('userMenu.profile') }}
          </button>

          <!-- Panel -->
          <button
            @click="navigateToDashboard"
            class="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:translate-x-1"
            role="menuitem"
          >
            <BaseIcon name="cog" class="w-5 h-5 mr-3 text-green-500" />
            {{ t('userMenu.dashboard') }}
          </button>

          <!-- Divider -->
          <div class="border-t border-gray-100 dark:border-gray-700 my-2"></div>

          <!-- Cerrar Sesión -->
          <button
            @click="handleLogout"
            :disabled="isLoggingOut"
            class="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:translate-x-1"
            role="menuitem"
          >
            <BaseIcon
              :name="isLoggingOut ? 'spinner' : 'sign-out'"
              class="w-5 h-5 mr-3"
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
  return props.user.email ?? t('userMenu.user')
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
      return `${parts[0]?.charAt(0) ?? ''}${parts[parts.length - 1]?.charAt(0) ?? ''}`.toUpperCase()
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
  void router.push({ name: 'profile' })
}

const navigateToDashboard = (): void => {
  closeDropdown()
  void router.push({ name: 'dashboard-home' })
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
    void router.push({ name: 'home' })
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

<style scoped>
/* Enhanced dropdown animations */
.dropdown-menu {
  transform-origin: top right;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Mobile-specific improvements */
@media (max-width: 640px) {
  .dropdown-menu {
    @apply w-64 right-0;
    transform-origin: top right;
  }

  /* Larger touch targets on mobile */
  .dropdown-menu button {
    @apply py-4 text-base;
    min-height: 48px; /* Minimum touch target size */
  }

  /* Better spacing for mobile user info */
  .dropdown-menu .border-b {
    @apply pb-4 mb-2;
  }
}

/* Smooth hover animations */
.dropdown-menu button {
  position: relative;
  overflow: hidden;
}

.dropdown-menu button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.dropdown-menu button:hover::before {
  left: 100%;
}

/* Avatar improvements */
.user-avatar {
  position: relative;
  overflow: hidden;
}

.user-avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-avatar:hover::after {
  opacity: 1;
}

/* Focus states for accessibility */
.user-avatar:focus-visible {
  @apply ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800;
}

.dropdown-menu button:focus-visible {
  @apply bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-inset;
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .dropdown-menu {
    background: rgba(31, 41, 55, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .dropdown-menu button,
  .user-avatar,
  .dropdown-menu button::before {
    transition: none;
  }
}
</style>
