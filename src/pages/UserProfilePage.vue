<template>
  <div class="user-profile-page min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb Navigation -->
      <nav class="flex mb-4" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              :to="{ name: 'dashboard-home' }"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              <BaseIcon name="home" class="w-4 h-4 mr-2" />
              {{ $t('dashboard.title') }}
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <BaseIcon
                name="chevron-right"
                class="w-4 h-4 text-gray-400 dark:text-gray-500"
              />
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
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t('profile.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          {{ $t('profile.subtitle') }}
        </p>
      </div>

      <!-- Profile Content - New Horizontal Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <!-- Profile Summary Sidebar -->
        <div class="lg:col-span-1 xl:col-span-2 order-2 lg:order-1">
          <div class="space-y-6">
            <!-- User Profile Card -->
            <ModernCard
              variant="solid"
              :hover-effect="false"
              container-class="h-fit"
            >
              <UserProfile :show-edit-button="false" />
            </ModernCard>

            <!-- Quick Stats - Hidden on mobile, shown on tablet+ -->
            <ModernCard
              variant="gradient"
              :hover-effect="false"
              class="hidden lg:block"
            >
              <div class="text-center">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                >
                  Estadísticas Rápidas
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center">
                    <div
                      class="text-2xl font-bold text-blue-600 dark:text-blue-400"
                    >
                      0
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Intercambios
                    </div>
                  </div>
                  <div class="text-center">
                    <div
                      class="text-2xl font-bold text-green-600 dark:text-green-400"
                    >
                      0
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Donaciones
                    </div>
                  </div>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>

        <!-- Profile Form - Main Content -->
        <div class="lg:col-span-2 xl:col-span-3 order-1 lg:order-2">
          <ModernCard
            variant="solid"
            :hover-effect="false"
            container-class="h-fit"
          >
            <div
              class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6"
            >
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-white flex items-center"
              >
                <BaseIcon
                  name="edit"
                  class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
                />
                {{ $t('profile.editProfile') }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Actualiza tu información personal para mejorar tu experiencia
              </p>
            </div>

            <ProfileForm />
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
