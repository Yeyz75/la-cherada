<template>
  <div class="user-profile-display">
    <!-- Avatar and Basic Info -->
    <div
      class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8"
    >
      <!-- Avatar -->
      <div class="flex-shrink-0">
        <div
          v-if="userProfile?.photoURL && !imageError"
          class="relative w-28 h-28 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
        >
          <img
            :src="userProfile.photoURL"
            :alt="userDisplayName"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            @error="onImageError"
          />
          <!-- Overlay sutil en hover -->
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full"
          ></div>
        </div>
        <div
          v-else
          class="w-28 h-28 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-2xl sm:text-xl font-bold ring-4 ring-white dark:ring-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          :style="{ backgroundColor: avatarColor }"
        >
          {{ userInitials }}
        </div>
      </div>

      <!-- User Info -->
      <div class="flex-1 min-w-0 text-center sm:text-left">
        <div
          class="flex flex-col sm:flex-row sm:items-start sm:justify-between"
        >
          <div class="space-y-2">
            <h1
              class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate"
            >
              {{ userDisplayName || $t('profile.noName') }}
            </h1>
            <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              {{ authUser?.email || $t('profile.noEmail') }}
            </p>
            <div
              class="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <div
                class="flex items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <BaseIcon name="calendar" class="w-4 h-4 mr-1" />
                {{ $t('profile.memberSince') }} {{ formatJoinDate }}
              </div>
              <div
                v-if="authUser?.emailVerified"
                class="flex items-center text-sm text-green-600 dark:text-green-400"
              >
                <BaseIcon name="check-circle" class="w-4 h-4 mr-1" />
                {{ $t('profile.emailVerified') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Bio Section -->
        <div v-if="userProfile?.bio" class="mt-4">
          <p
            class="text-gray-700 dark:text-gray-300 leading-relaxed text-center sm:text-left"
          >
            {{ userProfile.bio }}
          </p>
        </div>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t('profile.firstName') }}
        </label>
        <div class="flex items-center justify-between">
          <p class="text-gray-900 dark:text-white font-medium">
            {{ userProfile?.firstName || $t('profile.notProvided') }}
          </p>
          <BaseIcon
            v-if="!userProfile?.firstName"
            name="exclamation-circle"
            class="w-4 h-4 text-amber-500 flex-shrink-0"
            :title="$t('profile.fieldMissing')"
          />
        </div>
      </div>

      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t('profile.lastName') }}
        </label>
        <div class="flex items-center justify-between">
          <p class="text-gray-900 dark:text-white font-medium">
            {{ userProfile?.lastName || $t('profile.notProvided') }}
          </p>
          <BaseIcon
            v-if="!userProfile?.lastName"
            name="exclamation-circle"
            class="w-4 h-4 text-amber-500 flex-shrink-0"
            :title="$t('profile.fieldMissing')"
          />
        </div>
      </div>

      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t('profile.displayName') }}
        </label>
        <div class="flex items-center justify-between">
          <p class="text-gray-900 dark:text-white font-medium">
            {{ userProfile?.displayName || $t('profile.notProvided') }}
          </p>
          <BaseIcon
            v-if="!userProfile?.displayName"
            name="exclamation-circle"
            class="w-4 h-4 text-amber-500 flex-shrink-0"
            :title="$t('profile.fieldMissing')"
          />
        </div>
      </div>

      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t('profile.accountStatus') }}
        </label>
        <div class="flex items-center">
          <div
            :class="[
              'w-3 h-3 rounded-full mr-3 flex-shrink-0',
              authUser?.emailVerified ? 'bg-green-500' : 'bg-yellow-500'
            ]"
          ></div>
          <span class="text-gray-900 dark:text-white font-medium">
            {{
              authUser?.emailVerified
                ? $t('profile.active')
                : $t('profile.pending')
            }}
          </span>
        </div>
      </div>
    </div>

    <!-- Profile Completion Alert -->
    <div v-if="!isProfileComplete" class="mb-8">
      <div
        class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
      >
        <div class="flex items-start">
          <BaseIcon
            name="exclamation-triangle"
            class="w-5 h-5 text-amber-500 mt-0.5 mr-3"
          />
          <div class="flex-1">
            <h3 class="text-sm font-medium text-amber-800 dark:text-amber-200">
              {{ $t('profile.incompleteProfile') }}
            </h3>
            <p class="text-sm text-amber-700 dark:text-amber-300 mt-1">
              {{ $t('profile.completeProfileDescription') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Single Edit Profile Button -->
    <div class="flex justify-center">
      <BaseButton
        variant="primary"
        size="large"
        @click="handleEditProfile"
        :disabled="isLoading"
        class="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <BaseIcon name="pi-pencil" class="w-5 h-5 mr-3" />
        {{ $t('profile.editProfile') }}
      </BaseButton>
    </div>

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center rounded-lg"
    >
      <BaseLoader size="lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { formatDate } from '@/utils/dateUtils'
import { generateInitials, capitalizeWords } from '@/utils/formatUtils'

// Components
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'

interface Props {
  /**
   * Custom avatar color (overrides auto-generated)
   */
  customAvatarColor?: string
}

interface Emits {
  /**
   * Emitted when user clicks the edit profile button
   */
  (e: 'edit-profile'): void
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<Emits>()

// Composables
const { t } = useI18n()
const userStore = useUserStore()
const authStore = useAuthStore()

// State
const imageError = ref(false)

// Computed
const userProfile = computed(() => userStore.currentProfile)
const authUser = computed(() => authStore.user)
const isLoading = computed(() => userStore.isProfileLoading)

const userDisplayName = computed((): string => {
  if (!userProfile.value) {
    return ''
  }

  const profile = userProfile.value
  if (profile.displayName) {
    return capitalizeWords(profile.displayName)
  }

  const firstName = profile.firstName || ''
  const lastName = profile.lastName || ''
  return (
    capitalizeWords(`${firstName} ${lastName}`.trim()) ||
    t('profile.anonymousUser')
  )
})

const userInitials = computed((): string => {
  if (!userProfile.value) {
    return 'U'
  }

  const profile = userProfile.value
  if (profile.displayName) {
    return generateInitials(profile.displayName)
  }

  const firstName = profile.firstName || ''
  const lastName = profile.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim()

  return generateInitials(fullName) || 'U'
})

const avatarColor = computed((): string => {
  if (props.customAvatarColor) {
    return props.customAvatarColor
  }

  // Generate consistent color based on user email or ID
  const identifier =
    authUser.value?.email ?? userProfile.value?.userId ?? 'default'
  const colors = [
    '#3B82F6',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#84CC16'
  ]

  // Simple hash function to get consistent color
  let hash = 0
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length] as string
})

const formatJoinDate = computed((): string => {
  if (!authUser.value?.createdAt) {
    return t('dashboard.unknownDate')
  }

  // Handle both Timestamp and Date types
  const date =
    authUser.value.createdAt instanceof Date
      ? authUser.value.createdAt
      : new Date(authUser.value.createdAt)

  return formatDate(date, 'MMMM YYYY')
})

const isProfileComplete = computed((): boolean => {
  if (!userProfile.value) {
    return false
  }

  const profile = userProfile.value
  return !!(profile.firstName && profile.lastName && profile.displayName)
})

// Methods
const handleEditProfile = (): void => {
  emit('edit-profile')
}

const onImageError = (): void => {
  imageError.value = true
}

// Load user profile on component mount if not already loaded
if (!userStore.currentProfile && authUser.value?.id) {
  void userStore.loadProfile(authUser.value.id)
}
</script>

<style scoped>
.user-profile-display {
  position: relative;
  max-width: 4xl;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.profile-detail-item {
  @apply p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600/50 transition-all duration-200 hover:shadow-md hover:bg-gray-100/50 dark:hover:bg-gray-600/50;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .user-profile-display {
    @apply p-4 rounded-lg;
    margin: 0;
  }

  .profile-detail-item {
    @apply p-3 rounded-lg;
  }

  /* Ensure proper spacing on mobile */
  .grid.grid-cols-1.sm\\:grid-cols-2 {
    @apply gap-3;
  }

  /* Mobile-specific button styling */
  .w-full.sm\\:w-auto {
    @apply text-base py-3;
  }
}

/* Tablet optimizations */
@media (max-width: 768px) {
  .user-profile-display {
    max-width: none;
    @apply mx-2;
  }
}

/* Large screen optimizations */
@media (min-width: 1024px) {
  .user-profile-display {
    @apply p-8;
  }

  .profile-detail-item {
    @apply p-5;
  }
}

/* Animation classes */
.profile-detail-item:hover {
  transform: translateY(-1px);
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .user-profile-display {
    background: rgb(31 41 55);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.2);
  }
}

/* Focus states for accessibility */
.profile-detail-item:focus-within {
  @apply ring-2 ring-blue-500 ring-opacity-50;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke,
    opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
