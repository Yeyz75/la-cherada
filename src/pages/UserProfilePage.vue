<template>
  <div class="user-profile-page min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
      <!-- Simplified Page Header -->
      <div class="mb-6 sm:mb-8">
        <h1
          class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left"
        >
          Perfil de Usuario
        </h1>
      </div>

      <!-- Loading State -->
      <div
        v-if="pageState.isLoading"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="pageState.error"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6"
      >
        <div class="flex items-center">
          <BaseIcon
            name="exclamation-triangle"
            class="w-6 h-6 text-red-600 dark:text-red-400 mr-3"
          />
          <div>
            <h3 class="text-lg font-medium text-red-800 dark:text-red-200">
              Error al cargar el perfil
            </h3>
            <p class="text-red-700 dark:text-red-300 mt-1">
              {{ pageState.error }}
            </p>
          </div>
        </div>
        <button
          @click="retryLoad"
          class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Reintentar
        </button>
      </div>

      <!-- Profile Content -->
      <div v-else class="space-y-4 sm:space-y-6">
        <!-- Read-only Profile Display -->
        <div v-if="!pageState.isEditing" class="profile-view">
          <ModernCard
            variant="solid"
            :hover-effect="false"
            class="overflow-hidden"
          >
            <UserProfileDisplay />
            <div
              class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <BaseButton
                variant="primary"
                size="large"
                @click="startEditing"
                :disabled="pageState.isLoading"
                class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <BaseIcon name="edit" class="w-5 h-5 mr-2" />
                Editar Perfil
              </BaseButton>
            </div>
          </ModernCard>
        </div>

        <!-- Profile Edit Form -->
        <div v-else class="profile-edit">
          <ModernCard
            variant="solid"
            :hover-effect="false"
            class="overflow-hidden"
          >
            <ProfileEditForm
              v-if="initialFormData"
              @submit="handleSave"
              @cancel="handleCancel"
              @success="handleSaveSuccess"
              @error="handleSaveError"
              :initial-data="initialFormData"
            />
          </ModernCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { BaseIcon, ModernCard, BaseButton } from '@/components/common'
import { UserProfileDisplay, ProfileEditForm } from '@/modules/users/components'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { useError } from '@/composables/useError'
import type { ProfileFormData } from '@/types/api'

// Page meta for SEO and title
defineOptions({
  name: 'UserProfilePage'
})

// Composables
const userStore = useUserStore()
const authStore = useAuthStore()
const { handleError, errorMessage } = useError()

// Page state interface
interface PageState {
  isLoading: boolean
  isEditing: boolean
  error: string | null
  hasUnsavedChanges: boolean
}

// Reactive page state
const pageState = reactive<PageState>({
  isLoading: false,
  isEditing: false,
  error: null,
  hasUnsavedChanges: false
})

// Computed properties
const initialFormData = computed((): Partial<ProfileFormData> | undefined => {
  const profile = userStore.currentProfile
  const user = authStore.user

  if (!profile || !user) {
    return undefined
  }

  return {
    firstName: profile.firstName ?? '',
    lastName: profile.lastName ?? '',
    phone: '', // No disponible en UserProfile actual
    address: '', // No disponible en UserProfile actual
    city: '', // No disponible en UserProfile actual
    state: '', // No disponible en UserProfile actual
    zipCode: '', // No disponible en UserProfile actual
    country: '', // No disponible en UserProfile actual
    bio: profile.bio ?? '',
    dateOfBirth: '', // No disponible en UserProfile actual
    gender: '', // No disponible en UserProfile actual
    occupation: '', // No disponible en UserProfile actual
    website: '', // No disponible en UserProfile actual
    socialLinks: {}, // No disponible en UserProfile actual
    preferences: profile.preferences ?? {},
    photoURL: profile.photoURL ?? ''
  }
})

// Methods
const startEditing = (): void => {
  pageState.isEditing = true
  pageState.hasUnsavedChanges = false
}

const handleCancel = (): void => {
  pageState.isEditing = false
  pageState.hasUnsavedChanges = false
}

const handleSave = async (_formData: ProfileFormData): Promise<void> => {
  try {
    pageState.isLoading = true
    pageState.error = null

    // The ProfileEditForm component handles the actual saving
    // We just need to handle the success/error states
  } catch (error) {
    handleError(error)
    pageState.error = errorMessage.value || 'Error desconocido'
  } finally {
    pageState.isLoading = false
  }
}

const handleSaveSuccess = (): void => {
  pageState.isEditing = false
  pageState.hasUnsavedChanges = false
  pageState.error = null
}

const handleSaveError = (error: string): void => {
  pageState.error = error
}

const retryLoad = async (): Promise<void> => {
  try {
    pageState.isLoading = true
    pageState.error = null

    // Reload user profile data
    if (authStore.user?.id) {
      await userStore.loadProfile(authStore.user.id)
    }
  } catch (error) {
    handleError(error)
    pageState.error = errorMessage.value || 'Error al recargar el perfil'
  } finally {
    pageState.isLoading = false
  }
}

// Lifecycle
onMounted(async () => {
  try {
    pageState.isLoading = true
    pageState.error = null

    // Ensure we have the latest profile data
    if (!userStore.currentProfile && authStore.user?.id) {
      await userStore.loadProfile(authStore.user.id)
    }
  } catch (error) {
    handleError(error)
    pageState.error =
      errorMessage.value || 'Error al cargar la página de perfil'
  } finally {
    pageState.isLoading = false
  }
})
</script>
