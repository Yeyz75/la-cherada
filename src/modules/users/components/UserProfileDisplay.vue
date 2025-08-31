<template>
  <div class="user-profile-display">
    <!-- Avatar and Basic Info -->
    <div class="flex items-start space-x-6 mb-8">
      <!-- Avatar -->
      <div class="flex-shrink-0">
        <div
          v-if="userProfile?.photoURL && !imageError"
          class="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
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
          class="w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-bold ring-4 ring-white dark:ring-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          :style="{ backgroundColor: avatarColor }"
        >
          {{ userInitials }}
        </div>
      </div>

      <!-- User Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between">
          <div>
            <h1
              class="text-3xl font-bold text-gray-900 dark:text-white truncate"
            >
              {{ userDisplayName || $t('profile.noName') }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mt-1">
              {{ authUser?.email || $t('profile.noEmail') }}
            </p>
            <div class="flex items-center mt-2 space-x-4">
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
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ userProfile.bio }}
          </p>
        </div>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {{ $t('profile.firstName') }}
        </label>
        <div class="flex items-center justify-between">
          <p class="text-gray-900 dark:text-white">
            {{ userProfile?.firstName || $t('profile.notProvided') }}
          </p>
          <BaseIcon
            v-if="!userProfile?.firstName"
            name="exclamation-circle"
            class="w-4 h-4 text-amber-500"
            :title="$t('profile.fieldMissing')"
          />
        </div>
      </div>

      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {{ $t('profile.lastName') }}
        </label>
        <div class="flex items-center justify-between">
          <p class="text-gray-900 dark:text-white">
            {{ userProfile?.lastName || $t('profile.notProvided') }}
          </p>
          <BaseIcon
            v-if="!userProfile?.lastName"
            name="exclamation-circle"
            class="w-4 h-4 text-amber-500"
            :title="$t('profile.fieldMissing')"
          />
        </div>
      </div>

      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {{ $t('profile.displayName') }}
        </label>
        <div class="flex items-center justify-between">
          <p class="text-gray-900 dark:text-white">
            {{ userProfile?.displayName || $t('profile.notProvided') }}
          </p>
          <BaseIcon
            v-if="!userProfile?.displayName"
            name="exclamation-circle"
            class="w-4 h-4 text-amber-500"
            :title="$t('profile.fieldMissing')"
          />
        </div>
      </div>

      <div class="profile-detail-item">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {{ $t('profile.accountStatus') }}
        </label>
        <div class="flex items-center">
          <div
            :class="[
              'w-2 h-2 rounded-full mr-2',
              authUser?.emailVerified ? 'bg-green-500' : 'bg-yellow-500'
            ]"
          ></div>
          <span class="text-gray-900 dark:text-white">
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
        class="px-8 py-3 text-lg font-semibold"
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
}

.profile-detail-item {
  @apply p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg;
}

@media (max-width: 640px) {
  .user-profile-display {
    @apply p-4;
  }

  .flex.items-start.space-x-6 {
    @apply flex-col space-x-0 space-y-4 text-center items-center;
  }

  .grid.grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @apply gap-3;
  }

  .profile-detail-item {
    @apply p-3;
  }

  /* Ajustar tamaño del avatar en móviles */
  .w-24.h-24 {
    @apply w-20 h-20;
  }

  /* Reducir tamaños de texto en móviles */
  .text-3xl {
    @apply text-2xl;
  }

  .text-lg {
    @apply text-base;
  }
}

@media (max-width: 768px) {
  .user-profile-display {
    max-width: none;
  }
}
</style>
