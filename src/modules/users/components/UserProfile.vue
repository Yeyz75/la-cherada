<template>
  <BaseCard
    :title="isEditMode ? $t('profile.editProfile') : $t('profile.userProfile')"
    :subtitle="isEditMode ? $t('profile.updateYourInformation') : ''"
    shadow="lg"
    padding="lg"
    class="user-profile-card"
  >
    <!-- View Mode -->
    <div v-if="!isEditMode" class="profile-view-mode">
      <!-- Avatar and Basic Info -->
      <div class="flex items-start space-x-6 mb-8">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <div
            v-if="userProfile?.photoURL && !imageError"
            class="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-lg"
          >
            <img
              :src="userProfile.photoURL"
              :alt="userDisplayName"
              class="w-full h-full object-cover"
              @error="onImageError"
            />
          </div>
          <div
            v-else
            class="w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-bold ring-4 ring-white dark:ring-gray-800 shadow-lg"
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

            <!-- Edit Button -->
            <BaseButton
              v-if="showEditButton"
              variant="primary"
              size="small"
              @click="toggleEditMode"
              :disabled="isLoading"
            >
              <BaseIcon name="edit" class="w-4 h-4 mr-2" />
              {{ $t('common.edit') }}
            </BaseButton>
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="profile-detail-item">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {{ $t('profile.firstName') }}
          </label>
          <p class="text-gray-900 dark:text-white">
            {{ userProfile?.firstName || $t('profile.notProvided') }}
          </p>
        </div>

        <div class="profile-detail-item">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {{ $t('profile.lastName') }}
          </label>
          <p class="text-gray-900 dark:text-white">
            {{ userProfile?.lastName || $t('profile.notProvided') }}
          </p>
        </div>

        <div class="profile-detail-item">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {{ $t('profile.displayName') }}
          </label>
          <p class="text-gray-900 dark:text-white">
            {{ userProfile?.displayName || $t('profile.notProvided') }}
          </p>
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
    </div>

    <!-- Edit Mode -->
    <div v-else class="profile-edit-mode">
      <ProfileForm
        @submit="handleProfileUpdate"
        @cancel="toggleEditMode"
        :loading="isLoading"
      />
    </div>

    <!-- Loading State -->
    <div
      v-if="isLoading && !isEditMode"
      class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center rounded-lg"
    >
      <BaseLoader size="lg" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import type { ProfileFormData } from '@/types/api'
import { formatDate } from '@/utils/dateUtils'
import {
  generateInitials,
  generateRandomColor,
  capitalizeWords
} from '@/utils/formatUtils'

// Components
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'
import ProfileForm from './ProfileForm.vue'

interface Props {
  /**
   * Whether to start in edit mode
   */
  startInEditMode?: boolean

  /**
   * Whether to show the edit button
   */
  showEditButton?: boolean

  /**
   * Custom avatar color (overrides auto-generated)
   */
  customAvatarColor?: string
}

interface Emits {
  /**
   * Emitted when profile is updated successfully
   */
  (e: 'profile-updated', data: ProfileFormData): void

  /**
   * Emitted when edit mode is toggled
   */
  (e: 'edit-mode-changed', isEditMode: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  startInEditMode: false,
  showEditButton: true
})

const emit = defineEmits<Emits>()

// Composables
const { t } = useI18n()
const userStore = useUserStore()
const authStore = useAuthStore()

// State
const isEditMode = ref(props.startInEditMode)
const imageError = ref(false)

// Computed
const userProfile = computed(() => userStore.currentProfile)
const authUser = computed(() => authStore.user)
const isLoading = computed(() => userStore.isProfileLoading)

const userDisplayName = computed(() => {
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

const userInitials = computed(() => {
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

const avatarColor = computed(() => {
  if (props.customAvatarColor) {
    return props.customAvatarColor
  }

  // Generate consistent color based on user email or ID
  const identifier =
    authUser.value?.email || userProfile.value?.userId || 'default'
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

const formatJoinDate = computed(() => {
  if (!authUser.value?.createdAt) {
    return t('profile.unknown')
  }

  // Handle both Timestamp and Date types
  const date =
    authUser.value.createdAt instanceof Date
      ? authUser.value.createdAt
      : new Date(authUser.value.createdAt)

  return formatDate(date, 'MMMM yyyy')
})

// Methods
const toggleEditMode = (): void => {
  isEditMode.value = !isEditMode.value
  emit('edit-mode-changed', isEditMode.value)
}

const handleProfileUpdate = async (
  formData: ProfileFormData
): Promise<void> => {
  try {
    if (!authUser.value?.id) {
      return
    }
    await userStore.updateProfile(authUser.value.id, formData)
    isEditMode.value = false
    emit('profile-updated', formData)
    emit('edit-mode-changed', false)
  } catch (error) {
    // Error handled by store
  }
}

const onImageError = (): void => {
  imageError.value = true
}

// Watchers
watch(
  () => props.startInEditMode,
  newValue => {
    isEditMode.value = newValue
  }
)

// Load user profile on component mount
if (!userStore.currentProfile && authUser.value?.id) {
  userStore.loadProfile(authUser.value.id)
}
</script>

<style scoped>
.user-profile-card {
  position: relative;
  max-width: 4xl;
  margin: 0 auto;
}

.profile-detail-item {
  @apply p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg;
}

.profile-edit-mode {
  min-height: 400px;
}

@media (max-width: 640px) {
  .user-profile-card :deep(.card-content) {
    @apply p-4;
  }

  .flex.items-start.space-x-6 {
    @apply flex-col space-x-0 space-y-4 text-center;
  }

  .grid.grid-cols-1.md\\:grid-cols-2 {
    @apply grid-cols-1;
  }
}
</style>
