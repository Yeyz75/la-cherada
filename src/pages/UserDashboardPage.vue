<template>
  <div class="user-dashboard">
    <div
      class="dashboard-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <!-- Dashboard Header -->
      <div class="dashboard-header mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ $t('dashboard.welcome') }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              {{ $t('dashboard.subtitle') }}
            </p>
          </div>

          <!-- User Avatar & Quick Actions -->
          <div class="flex items-center space-x-4">
            <div class="hidden sm:block">
              <div class="flex items-center space-x-3">
                <!-- Quick Action Button - Only Explore -->
                <BaseButton
                  variant="info"
                  size="small"
                  @click="navigateToExplore"
                >
                  <BaseIcon name="search" class="w-4 h-4" />
                  {{ $t('dashboard.explore') }}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Content Grid -->
      <div class="dashboard-content grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- User Profile Section -->
          <section class="profile-section">
            <div class="section-header mb-6">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ $t('dashboard.yourProfile') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mt-1">
                {{ $t('dashboard.profileSubtitle') }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {{ $t('dashboard.editProfileHint') }}
              </p>
            </div>

            <!-- User Profile Component -->
            <UserProfileDisplay />
          </section>

          <!-- Recent Activity Section -->
          <section class="activity-section">
            <BaseCard
              :title="$t('dashboard.recentActivity')"
              :subtitle="$t('dashboard.activitySubtitle')"
              shadow="md"
              padding="lg"
            >
              <div class="activity-content">
                <div
                  v-if="isLoadingActivity"
                  class="flex items-center justify-center py-12"
                >
                  <BaseLoader size="lg" />
                </div>

                <div
                  v-else-if="recentActivities.length === 0"
                  class="empty-state text-center py-12"
                >
                  <BaseIcon
                    name="activity"
                    class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
                  />
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-white mb-2"
                  >
                    {{ $t('dashboard.noActivity') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ $t('dashboard.noActivityDescription') }}
                  </p>
                  <div class="mt-6">
                    <BaseButton variant="success" @click="navigateToExplore">
                      {{ $t('dashboard.startExploring') }}
                    </BaseButton>
                  </div>
                </div>

                <div v-else class="activity-list space-y-4">
                  <div
                    v-for="activity in recentActivities"
                    :key="activity.id"
                    class="activity-item p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div class="flex items-start space-x-3">
                      <div
                        class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                      >
                        <BaseIcon
                          :name="getActivityIcon(activity.type)"
                          class="w-4 h-4 text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-900 dark:text-white">
                          {{ activity.description }}
                        </p>
                        <p
                          class="text-xs text-gray-500 dark:text-gray-400 mt-1"
                        >
                          {{ formatActivityDate(activity.createdAt) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BaseCard>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Quick Stats -->
          <BaseCard
            :title="$t('dashboard.quickStats')"
            shadow="md"
            padding="lg"
          >
            <div class="stats-grid space-y-4">
              <div class="stat-item">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                    >
                      <BaseIcon
                        name="check-circle"
                        class="w-5 h-5 text-green-600 dark:text-green-400"
                      />
                    </div>
                    <div>
                      <span class="text-sm text-gray-600 dark:text-gray-400">
                        {{ $t('dashboard.profileComplete') }}
                      </span>
                      <div class="flex items-center mt-1">
                        <div
                          class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                        >
                          <div
                            class="h-2 rounded-full transition-all duration-300"
                            :class="
                              profileCompletionPercentage >= 80
                                ? 'bg-green-500'
                                : profileCompletionPercentage >= 50
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            "
                            :style="`width: ${profileCompletionPercentage}%`"
                          ></div>
                        </div>
                        <span
                          class="text-xs font-medium text-gray-500 dark:text-gray-400 ml-2"
                        >
                          {{ profileCompletionPercentage }}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="stat-item">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                  >
                    <BaseIcon
                      name="calendar"
                      class="w-5 h-5 text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                      {{ $t('dashboard.memberSince') }}
                    </span>
                    <p
                      class="text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      {{ memberSinceFormatted }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="stat-item">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                  >
                    <BaseIcon
                      name="star"
                      class="w-5 h-5 text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <div>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                      {{ $t('dashboard.reputation') }}
                    </span>
                    <p
                      class="text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      {{ $t('dashboard.newMember') }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="stat-item">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
                  >
                    <BaseIcon
                      name="tag"
                      class="w-5 h-5 text-orange-600 dark:text-orange-400"
                    />
                  </div>
                  <div>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                      {{ $t('dashboard.totalActivity') }}
                    </span>
                    <p
                      class="text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      0 {{ $t('dashboard.interactions') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Quick Actions -->
          <BaseCard
            :title="$t('dashboard.quickActions')"
            shadow="md"
            padding="lg"
          >
            <div class="quick-actions space-y-3">
              <BaseButton
                variant="secondary"
                size="small"
                class="w-full justify-start"
                @click="navigateToExplore"
              >
                <BaseIcon name="search" class="w-4 h-4" />
                {{ $t('dashboard.exploreItems') }}
              </BaseButton>

              <BaseButton
                variant="info"
                size="small"
                class="w-full justify-start"
                @click="navigateToContact"
              >
                <BaseIcon name="send" class="w-4 h-4" />
                {{ $t('dashboard.contactSupport') }}
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Theme Toggle -->
          <BaseCard
            :title="$t('dashboard.preferences')"
            shadow="md"
            padding="lg"
          >
            <div class="preferences-content space-y-4">
              <div class="preference-item">
                <div class="flex items-center justify-between">
                  <span
                    class="text-sm-project text-gray-700 dark:text-gray-300"
                  >
                    {{ $t('dashboard.darkMode') }}
                  </span>
                  <ThemeToggle />
                </div>
              </div>

              <div class="preference-item">
                <div class="flex items-center justify-between">
                  <span
                    class="text-sm-project text-gray-700 dark:text-gray-300"
                  >
                    {{ $t('dashboard.language') }}
                  </span>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Profile Completion Wizard -->
    <ProfileCompletionWizard
      :show="showProfileWizard"
      @complete="handleWizardComplete"
      @skip="handleWizardSkip"
      @close="handleWizardClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import type { ProfileFormData } from '@/types/api'
import { formatDate } from '@/utils/dateUtils'

// Components
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { UserProfileDisplay } from '@/modules/users/components'
import { ProfileCompletionWizard } from '@/components/ui'

// Types
interface ActivityItem {
  id: string
  type: 'profile_update' | 'login' | 'registration' | 'password_change'
  description: string
  createdAt: Date
}

// Composables
const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

// State
const recentActivities = ref<ActivityItem[]>([])
const isLoadingActivity = ref(false)
const showProfileWizard = ref(false)

// Computed
const currentUser = computed(() => authStore.user)
const userProfile = computed(() => userStore.currentProfile)

const profileCompletionPercentage = computed(() => {
  if (!currentUser.value && !userProfile.value) {
    return 0
  }

  let completedFields = 0
  const totalFields = 6

  // Check user fields
  if (currentUser.value?.email) {
    completedFields++
  }
  if (currentUser.value?.emailVerified) {
    completedFields++
  }

  // Check profile fields
  if (userProfile.value?.firstName) {
    completedFields++
  }
  if (userProfile.value?.lastName) {
    completedFields++
  }
  if (userProfile.value?.displayName) {
    completedFields++
  }
  if (userProfile.value?.photoURL) {
    completedFields++
  }

  return Math.round((completedFields / totalFields) * 100)
})

const memberSinceFormatted = computed(() => {
  if (!currentUser.value?.createdAt) {
    return t('dashboard.unknown')
  }

  const date =
    currentUser.value.createdAt instanceof Date
      ? currentUser.value.createdAt
      : new Date(currentUser.value.createdAt)

  return formatDate(date, 'MMMM YYYY')
})

// Methods
const navigateToExplore = (): void => {
  void router.push({ name: 'Explore' })
}

const navigateToContact = (): void => {
  void router.push({ name: 'Contact' })
}

const getActivityIcon = (type: ActivityItem['type']): string => {
  const iconMap = {
    profile_update: 'edit',
    login: 'log-in',
    registration: 'user-plus',
    password_change: 'key'
  }
  return iconMap[type] || 'activity'
}

const formatActivityDate = (date: Date): string => {
  return formatDate(date, 'MMM D, YYYY h:mmA')
}

const loadRecentActivity = async (): Promise<void> => {
  isLoadingActivity.value = true
  try {
    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock data for demonstration
    recentActivities.value = []
  } catch (error) {
    // Error loading activity data
  } finally {
    isLoadingActivity.value = false
  }
}

// Wizard handlers
const handleWizardComplete = (formData: ProfileFormData): void => {
  showProfileWizard.value = false
  // Profile update is handled by the wizard component
  // Could show a success message here
}

const handleWizardSkip = (): void => {
  showProfileWizard.value = false
  // User chose to skip profile completion
  // Could save this preference to not show again soon
}

const handleWizardClose = (): void => {
  showProfileWizard.value = false
}

// Check if we should show the profile wizard
const checkProfileCompleteness = (): void => {
  // Show wizard if user has basic auth info but incomplete profile
  const hasAuthInfo = currentUser.value?.email && authStore.isAuthenticated
  const hasIncompleteProfile =
    !userProfile.value?.firstName || !userProfile.value?.lastName

  if (
    hasAuthInfo &&
    hasIncompleteProfile &&
    profileCompletionPercentage.value < 60
  ) {
    // Delay to avoid jarring experience
    setTimeout(() => {
      showProfileWizard.value = true
    }, 1500)
  }
}

// Lifecycle
onMounted(async () => {
  // Load user profile if not already loaded
  if (!userProfile.value && currentUser.value?.id) {
    await userStore.loadProfile(currentUser.value.id)
  }

  // Load recent activity
  await loadRecentActivity()

  // Check if we should show profile completion wizard
  checkProfileCompleteness()
})
</script>

<style scoped>
.user-dashboard {
  min-height: calc(100vh - 4rem);
  background: linear-gradient(
    135deg,
    theme('colors.gray.50') 0%,
    theme('colors.blue.50') 100%
  );
}

.dark .user-dashboard {
  background: linear-gradient(
    135deg,
    theme('colors.gray.900') 0%,
    theme('colors.gray.800') 100%
  );
}

.dashboard-container {
  position: relative;
}

.section-header {
  border-bottom: 1px solid theme('colors.gray.200');
  padding-bottom: 1rem;
}

.dark .section-header {
  border-bottom-color: theme('colors.gray.700');
}

.stat-item,
.preference-item {
  padding: 0.75rem;
  background: theme('colors.gray.50');
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.dark .stat-item,
.dark .preference-item {
  background: theme('colors.gray.700/50');
}

.stat-item:hover,
.preference-item:hover {
  background: theme('colors.gray.100');
}

.dark .stat-item:hover,
.dark .preference-item:hover {
  background: theme('colors.gray.600/50');
}

.activity-item {
  transition: all 0.2s;
}

.activity-item:hover {
  background: theme('colors.gray.50');
  border-color: theme('colors.blue.300');
}

.dark .activity-item:hover {
  background: theme('colors.gray.700/30');
  border-color: theme('colors.blue.600');
}

@media (max-width: 640px) {
  .dashboard-container {
    padding: 1rem;
  }

  .dashboard-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .dashboard-header .flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

/* Quick actions buttons styling */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
