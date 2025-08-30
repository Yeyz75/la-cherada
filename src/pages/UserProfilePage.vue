<template>
  <div class="user-profile-page">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb Navigation -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              :to="{ name: 'dashboard-home' }"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <BaseIcon name="home" class="w-4 h-4 mr-2" />
              {{ $t('dashboard.title') }}
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <BaseIcon name="chevron-right" class="w-4 h-4 text-gray-400" />
              <span
                class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
              >
                {{ $t('profile.title') }}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t('profile.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          {{ $t('profile.subtitle') }}
        </p>
      </div>

      <!-- Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Form -->
        <div class="lg:col-span-2">
          <ModernCard>
            <template #header>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ $t('profile.editProfile') }}
              </h2>
            </template>

            <ProfileForm />
          </ModernCard>
        </div>

        <!-- Profile Summary -->
        <div class="lg:col-span-1">
          <ModernCard>
            <template #header>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ $t('profile.currentProfile') }}
              </h2>
            </template>

            <UserProfile />
          </ModernCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BaseIcon, ModernCard } from '@/components/common'
import { ProfileForm, UserProfile } from '@/modules/users/components'

// Composables
const { t } = useI18n()

// Page meta for SEO and title
defineOptions({
  name: 'UserProfilePage'
})
</script>
