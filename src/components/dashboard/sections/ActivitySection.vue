<template>
  <div class="activity-section space-y-6">
    <!-- Header de la sección -->
    <div class="section-header">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ $t('dashboard.sections.activity.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {{ $t('dashboard.sections.activity.subtitle') }}
          </p>
        </div>

        <!-- Filtros -->
        <div class="flex items-center space-x-2">
          <select
            v-model="selectedFilter"
            class="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{{ $t('dashboard.activity.all') }}</option>
            <option value="today">{{ $t('dashboard.activity.today') }}</option>
            <option value="week">
              {{ $t('dashboard.activity.thisWeek') }}
            </option>
            <option value="month">
              {{ $t('dashboard.activity.thisMonth') }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Lista de actividad -->
    <BaseCard shadow="sm" padding="lg">
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <BaseLoader size="lg" />
      </div>

      <div
        v-else-if="filteredActivities.length === 0"
        class="empty-state text-center py-12"
      >
        <BaseIcon
          name="activity"
          class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
        />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ $t('dashboard.activity.noActivity') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('dashboard.activity.noActivityDescription') }}
        </p>
        <div class="mt-6">
          <BaseButton variant="success" @click="navigateToExplore">
            {{ $t('dashboard.activity.startExploring') }}
          </BaseButton>
        </div>
      </div>

      <div v-else class="activity-list space-y-4">
        <div
          v-for="activity in filteredActivities"
          :key="activity.id"
          class="activity-item p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="getActivityIconBg(activity.type)"
              >
                <BaseIcon
                  :name="getActivityIcon(activity.type)"
                  class="w-5 h-5"
                  :class="getActivityIconColor(activity.type)"
                />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900 dark:text-white">
                {{ activity.description }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ formatActivityDate(activity.createdAt) }}
              </p>
              <div v-if="activity.metadata" class="mt-2">
                <span
                  v-for="(value, key) in activity.metadata"
                  :key="key"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 mr-2"
                >
                  {{ key }}: {{ value }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getActivityBadgeColor(activity.type)"
              >
                {{ $t(`dashboard.activity.types.${activity.type}`) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load more -->
      <div v-if="hasMore && !isLoading" class="text-center mt-6">
        <BaseButton
          variant="secondary"
          @click="loadMoreActivity"
          :disabled="isLoadingMore"
        >
          <BaseLoader v-if="isLoadingMore" size="sm" class="mr-2" />
          {{
            isLoadingMore
              ? $t('dashboard.activity.loading')
              : $t('dashboard.activity.loadMore')
          }}
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { formatDate } from '@/utils/dateUtils'

// Components
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'

// Types
interface ActivityItem {
  id: string
  type:
    | 'profile_update'
    | 'login'
    | 'registration'
    | 'password_change'
    | 'search'
    | 'message'
  description: string
  createdAt: Date
  metadata?: Record<string, string>
}

// Composables
const router = useRouter()
const { t } = useI18n()

// Estado reactivo
const selectedFilter = ref<'all' | 'today' | 'week' | 'month'>('all')
const isLoading = ref(false)
const isLoadingMore = ref(false)
const activities = ref<ActivityItem[]>([])
const hasMore = ref(false)

// Computed
const filteredActivities = computed(() => {
  if (selectedFilter.value === 'all') {
    return activities.value
  }

  const now = new Date()
  const filterDate = new Date()

  switch (selectedFilter.value) {
    case 'today':
      filterDate.setHours(0, 0, 0, 0)
      break
    case 'week':
      filterDate.setDate(now.getDate() - 7)
      break
    case 'month':
      filterDate.setMonth(now.getMonth() - 1)
      break
  }

  return activities.value.filter(activity => activity.createdAt >= filterDate)
})

// Methods
const loadActivity = async (): Promise<void> => {
  isLoading.value = true
  try {
    // Simulate API call - TODO: Replace with real API
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock data
    activities.value = []
    hasMore.value = false
  } catch (error) {
    console.error('Error loading activity:', error)
  } finally {
    isLoading.value = false
  }
}

const loadMoreActivity = async (): Promise<void> => {
  isLoadingMore.value = true
  try {
    // Simulate API call for more data
    await new Promise(resolve => setTimeout(resolve, 500))
    // Add more mock data here
  } finally {
    isLoadingMore.value = false
  }
}

const navigateToExplore = (): void => {
  void router.push({ name: 'explore' })
}

const getActivityIcon = (type: ActivityItem['type']): string => {
  const iconMap = {
    profile_update: 'edit',
    login: 'log-in',
    registration: 'user-plus',
    password_change: 'key',
    search: 'search',
    message: 'message-circle'
  }
  return iconMap[type] ?? 'activity'
}

const getActivityIconBg = (type: ActivityItem['type']): string => {
  const bgMap = {
    profile_update: 'bg-blue-100 dark:bg-blue-900',
    login: 'bg-green-100 dark:bg-green-900',
    registration: 'bg-purple-100 dark:bg-purple-900',
    password_change: 'bg-yellow-100 dark:bg-yellow-900',
    search: 'bg-indigo-100 dark:bg-indigo-900',
    message: 'bg-pink-100 dark:bg-pink-900'
  }
  return bgMap[type] ?? 'bg-gray-100 dark:bg-gray-900'
}

const getActivityIconColor = (type: ActivityItem['type']): string => {
  const colorMap = {
    profile_update: 'text-blue-600 dark:text-blue-400',
    login: 'text-green-600 dark:text-green-400',
    registration: 'text-purple-600 dark:text-purple-400',
    password_change: 'text-yellow-600 dark:text-yellow-400',
    search: 'text-indigo-600 dark:text-indigo-400',
    message: 'text-pink-600 dark:text-pink-400'
  }
  return colorMap[type] ?? 'text-gray-600 dark:text-gray-400'
}

const getActivityBadgeColor = (type: ActivityItem['type']): string => {
  const colorMap = {
    profile_update:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    login: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    registration:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    password_change:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    search:
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    message: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
  }
  return (
    colorMap[type] ??
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  )
}

const formatActivityDate = (date: Date): string => {
  return formatDate(date, 'MMM D, YYYY h:mmA')
}

// Lifecycle
onMounted(() => {
  void loadActivity()
})
</script>

<style scoped>
.activity-section {
  max-width: 4xl;
  margin: 0 auto;
}

.section-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid theme('colors.gray.200');
}

.dark .section-header {
  border-bottom-color: theme('colors.gray.700');
}

.activity-item {
  transition: all 0.2s;
}

/* Animaciones de entrada */
.activity-section > * {
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
