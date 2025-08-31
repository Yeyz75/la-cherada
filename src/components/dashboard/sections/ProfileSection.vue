<template>
  <div class="profile-section space-y-6">
    <!-- Header de la sección -->
    <div class="section-header">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ $t('dashboard.sections.profile.title') }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {{ $t('dashboard.sections.profile.subtitle') }}
          </p>
        </div>

        <!-- Botón de edición -->
        <BaseButton
          variant="secondary"
          size="small"
          @click="navigateToEditProfile"
        >
          <BaseIcon name="edit" class="w-4 h-4" />
          {{ $t('dashboard.profile.edit') }}
        </BaseButton>
      </div>
    </div>

    <!-- Perfil del usuario -->
    <BaseCard shadow="sm" padding="lg">
      <UserProfileDisplay @edit-profile="navigateToEditProfile" />
    </BaseCard>

    <!-- Alert de completitud del perfil -->
    <div v-if="profileCompletionPercentage < 80">
      <BaseCard
        shadow="sm"
        padding="lg"
        class="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20"
      >
        <div class="flex items-start space-x-3">
          <BaseIcon
            name="exclamation-triangle"
            class="w-6 h-6 text-amber-500 mt-0.5"
          />
          <div class="flex-1">
            <h3 class="text-sm font-medium text-amber-800 dark:text-amber-200">
              {{ $t('dashboard.profile.incompleteTitle') }}
            </h3>
            <p class="text-sm text-amber-700 dark:text-amber-300 mt-1">
              {{ $t('dashboard.profile.incompleteMessage') }}
            </p>
            <div class="mt-3">
              <!-- Barra de progreso -->
              <div class="flex items-center space-x-3">
                <div
                  class="flex-1 bg-amber-200 dark:bg-amber-800 rounded-full h-2"
                >
                  <div
                    class="h-2 bg-amber-500 rounded-full transition-all duration-300"
                    :style="`width: ${profileCompletionPercentage}%`"
                  />
                </div>
                <span
                  class="text-xs font-medium text-amber-700 dark:text-amber-300"
                >
                  {{ profileCompletionPercentage }}%
                </span>
              </div>
            </div>
            <div class="mt-4">
              <BaseButton
                variant="warning"
                size="small"
                @click="navigateToEditProfile"
              >
                {{ $t('dashboard.profile.completeProfile') }}
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Sección de configuración rápida -->
    <BaseCard
      :title="$t('dashboard.profile.quickSettings')"
      shadow="sm"
      padding="lg"
    >
      <div class="space-y-4">
        <!-- Visibilidad del perfil -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.profile.visibility') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.profile.visibilityDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="profileSettings.isPublic"
            @change="updateProfileSetting('isPublic', profileSettings.isPublic)"
          />
        </div>

        <!-- Notificaciones por email -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.profile.emailNotifications') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.profile.emailNotificationsDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="profileSettings.emailNotifications"
            @change="
              updateProfileSetting(
                'emailNotifications',
                profileSettings.emailNotifications
              )
            "
          />
        </div>

        <!-- Actualización de ubicación automática -->
        <div class="flex items-center justify-between py-3">
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.profile.autoLocation') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.profile.autoLocationDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="profileSettings.autoLocation"
            @change="updateProfileSetting('autoLocation', $event)"
          />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

// Components
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import { UserProfileDisplay } from '@/modules/users/components'

// Composables
const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const userStore = useUserStore()

// Estado reactivo
const profileSettings = reactive({
  isPublic: true,
  emailNotifications: true,
  autoLocation: false
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

// Methods
const navigateToEditProfile = (): void => {
  void router.push({ name: 'profile' })
}

const updateProfileSetting = (
  key: keyof typeof profileSettings,
  value: boolean
): void => {
  profileSettings[key] = value
  // TODO: Implementar la actualización en el backend
  console.log(`Updated ${key} to:`, value)
}
</script>

<style scoped>
.profile-section {
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

/* Animaciones suaves */
.profile-section > * {
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
