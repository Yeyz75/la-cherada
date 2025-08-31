<template>
  <div class="stats-section space-y-6">
    <!-- Header de la sección -->
    <div class="section-header">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        {{ $t('dashboard.sections.stats.title') }}
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ $t('dashboard.sections.stats.subtitle') }}
      </p>
    </div>

    <!-- Grid de estadísticas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Completitud del perfil -->
      <BaseCard shadow="sm" padding="lg" class="stat-card">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
            >
              <BaseIcon
                name="check-circle"
                class="w-6 h-6 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.stats.profileCompletion') }}
            </h3>
            <div class="flex items-center space-x-2 mt-1">
              <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  :class="getProgressColor(profileCompletionPercentage)"
                  :style="`width: ${profileCompletionPercentage}%`"
                />
              </div>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                {{ profileCompletionPercentage }}%
              </span>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Tiempo como miembro -->
      <BaseCard shadow="sm" padding="lg" class="stat-card">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
            >
              <BaseIcon
                name="calendar"
                class="w-6 h-6 text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.stats.memberSince') }}
            </h3>
            <p class="text-lg font-semibold text-gray-900 dark:text-white mt-1">
              {{ memberSinceFormatted }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ daysSinceMember }} {{ $t('dashboard.stats.daysAgo') }}
            </p>
          </div>
        </div>
      </BaseCard>

      <!-- Estado de verificación -->
      <BaseCard shadow="sm" padding="lg" class="stat-card">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center"
              :class="
                currentUser?.emailVerified
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-yellow-100 dark:bg-yellow-900'
              "
            >
              <BaseIcon
                :name="
                  currentUser?.emailVerified
                    ? 'check-circle'
                    : 'exclamation-triangle'
                "
                class="w-6 h-6"
                :class="
                  currentUser?.emailVerified
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-yellow-600 dark:text-yellow-400'
                "
              />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.stats.accountStatus') }}
            </h3>
            <p
              class="text-lg font-semibold mt-1"
              :class="
                currentUser?.emailVerified
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              "
            >
              {{
                currentUser?.emailVerified
                  ? $t('dashboard.stats.verified')
                  : $t('dashboard.stats.pending')
              }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Estadísticas de actividad -->
    <BaseCard
      :title="$t('dashboard.stats.activityOverview')"
      shadow="sm"
      padding="lg"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- Items publicados -->
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ activityStats.itemsPosted }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ $t('dashboard.stats.itemsPosted') }}
          </div>
        </div>

        <!-- Mensajes enviados -->
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ activityStats.messagesSent }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ $t('dashboard.stats.messagesSent') }}
          </div>
        </div>

        <!-- Búsquedas realizadas -->
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ activityStats.searchesPerformed }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ $t('dashboard.stats.searchesPerformed') }}
          </div>
        </div>

        <!-- Conexiones realizadas -->
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ activityStats.connections }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ $t('dashboard.stats.connections') }}
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Resumen del período -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Esta semana -->
      <BaseCard
        :title="$t('dashboard.stats.thisWeek')"
        shadow="sm"
        padding="lg"
      >
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.stats.logins') }}
            </span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ weeklyStats.logins }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.stats.timeSpent') }}
            </span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ weeklyStats.timeSpent }}h
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.stats.interactions') }}
            </span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ weeklyStats.interactions }}
            </span>
          </div>
        </div>
      </BaseCard>

      <!-- Este mes -->
      <BaseCard
        :title="$t('dashboard.stats.thisMonth')"
        shadow="sm"
        padding="lg"
      >
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.stats.avgDaily') }}
            </span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ monthlyStats.avgDaily }}min
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.stats.totalSessions') }}
            </span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ monthlyStats.totalSessions }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('dashboard.stats.achievements') }}
            </span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ monthlyStats.achievements }}
            </span>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { formatDate } from '@/utils/dateUtils'

// Components
import BaseCard from '@/components/common/BaseCard.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

// Composables
const { t } = useI18n()
const authStore = useAuthStore()
const userStore = useUserStore()

// Estado reactivo con datos mock (TODO: conectar con API real)
const activityStats = reactive({
  itemsPosted: 0,
  messagesSent: 0,
  searchesPerformed: 0,
  connections: 0
})

const weeklyStats = reactive({
  logins: 7,
  timeSpent: 12,
  interactions: 23
})

const monthlyStats = reactive({
  avgDaily: 45,
  totalSessions: 28,
  achievements: 3
})

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
    return t('dashboard.stats.unknown')
  }

  const date =
    currentUser.value.createdAt instanceof Date
      ? currentUser.value.createdAt
      : new Date(currentUser.value.createdAt)

  return formatDate(date, 'MMMM YYYY')
})

const daysSinceMember = computed(() => {
  if (!currentUser.value?.createdAt) {
    return 0
  }

  const created =
    currentUser.value.createdAt instanceof Date
      ? currentUser.value.createdAt
      : new Date(currentUser.value.createdAt)

  const now = new Date()
  const diffTime = Math.abs(now.getTime() - created.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Methods
const getProgressColor = (percentage: number): string => {
  if (percentage >= 80) {
    return 'bg-green-500'
  }
  if (percentage >= 50) {
    return 'bg-yellow-500'
  }
  return 'bg-red-500'
}
</script>

<style scoped>
.stats-section {
  max-width: 6xl;
  margin: 0 auto;
}

.section-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid theme('colors.gray.200');
}

.dark .section-header {
  border-bottom-color: theme('colors.gray.700');
}

.stat-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .stat-card:hover {
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

/* Animaciones de entrada */
.stats-section > * {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
