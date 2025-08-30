<template>
  <BaseModal
    v-model="isVisible"
    :closable="false"
    size="md"
    @close="handleSkip"
  >
    <div class="welcome-wizard">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <BaseIcon name="user-plus" class="w-8 h-8 text-primary-600" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ $t('wizard.welcome') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          {{ $t('wizard.completeProfileMessage') }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- First Name -->
        <div class="form-group">
          <label
            for="firstName"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ $t('profile.firstName') }} *
          </label>
          <BaseInput
            id="firstName"
            v-model="formData.firstName"
            type="text"
            :placeholder="$t('profile.firstNamePlaceholder')"
            :error="errors.firstName"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label
            for="lastName"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ $t('profile.lastName') }} *
          </label>
          <BaseInput
            id="lastName"
            v-model="formData.lastName"
            type="text"
            :placeholder="$t('profile.lastNamePlaceholder')"
            :error="errors.lastName"
            required
          />
        </div>

        <!-- Display Name -->
        <div class="form-group">
          <label
            for="displayName"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ $t('profile.displayName') }}
          </label>
          <BaseInput
            id="displayName"
            v-model="formData.displayName"
            type="text"
            :placeholder="$t('profile.displayNamePlaceholder')"
            :error="errors.displayName"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ $t('wizard.displayNameNote') }}
          </p>
        </div>

        <!-- Bio -->
        <div class="form-group">
          <label
            for="bio"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ $t('profile.bio') }}
            <span class="text-gray-500 dark:text-gray-400 text-xs">
              ({{ $t('profile.optional') }})
            </span>
          </label>
          <textarea
            id="bio"
            v-model="formData.bio"
            rows="3"
            :placeholder="$t('profile.bioPlaceholder')"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            :maxlength="500"
          ></textarea>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ formData.bio?.length || 0 }}/500 {{ $t('common.characters') }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 pt-6">
          <BaseButton
            type="submit"
            variant="primary"
            class="flex-1"
            :loading="isLoading"
            :disabled="!isFormValid"
          >
            <BaseIcon name="check" class="w-4 h-4 mr-2" />
            {{ $t('wizard.completeProfile') }}
          </BaseButton>

          <BaseButton
            type="button"
            variant="secondary"
            @click="handleSkip"
            :disabled="isLoading"
          >
            {{ $t('wizard.skipForNow') }}
          </BaseButton>
        </div>
      </form>

      <!-- Footer Note -->
      <div
        class="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ $t('wizard.completeProfileLater') }}
        </p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import type { ProfileFormData } from '@/types/api'

// Components
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseInput from '@/components/common/BaseInput.vue'

interface Props {
  show?: boolean
}

interface Emits {
  (e: 'complete', data: ProfileFormData): void
  (e: 'skip'): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

const emit = defineEmits<Emits>()

// Composables
const { t } = useI18n()
const authStore = useAuthStore()
const userStore = useUserStore()

// State
const isVisible = ref(props.show)
const isLoading = ref(false)
const formData = ref({
  firstName: '',
  lastName: '',
  displayName: '',
  bio: ''
})

const errors = ref({
  firstName: '',
  lastName: '',
  displayName: ''
})

// Computed
const isFormValid = computed(() => {
  return (
    formData.value.firstName.trim().length >= 2 &&
    formData.value.lastName.trim().length >= 2 &&
    !errors.value.firstName &&
    !errors.value.lastName
  )
})

// Watchers
watch(
  () => props.show,
  newValue => {
    isVisible.value = newValue
    if (newValue) {
      initializeForm()
    }
  }
)

watch(
  () => formData.value.firstName,
  () => {
    validateFirstName()
    generateDisplayName()
  }
)

watch(
  () => formData.value.lastName,
  () => {
    validateLastName()
    generateDisplayName()
  }
)

// Methods
const initializeForm = (): void => {
  const user = authStore.currentFirebaseUser
  if (user && user.displayName) {
    // Try to parse displayName into first and last name
    const nameParts = user.displayName.split(' ')
    formData.value.firstName = nameParts[0] || ''
    formData.value.lastName = nameParts.slice(1).join(' ') || ''
    formData.value.displayName = user.displayName
  }

  // Clear errors
  errors.value = {
    firstName: '',
    lastName: '',
    displayName: ''
  }
}

const generateDisplayName = (): void => {
  if (formData.value.firstName && formData.value.lastName) {
    const generatedName =
      `${formData.value.firstName.trim()} ${formData.value.lastName.trim()}`.trim()
    if (
      !formData.value.displayName ||
      formData.value.displayName === generatedName
    ) {
      formData.value.displayName = generatedName
    }
  }
}

const validateFirstName = (): void => {
  const firstName = formData.value.firstName.trim()
  if (!firstName) {
    errors.value.firstName = t('validation.firstNameRequired')
  } else if (firstName.length < 2) {
    errors.value.firstName = t('validation.firstNameMinLength')
  } else if (firstName.length > 50) {
    errors.value.firstName = t('validation.firstNameMaxLength')
  } else {
    errors.value.firstName = ''
  }
}

const validateLastName = (): void => {
  const lastName = formData.value.lastName.trim()
  if (!lastName) {
    errors.value.lastName = t('validation.lastNameRequired')
  } else if (lastName.length < 2) {
    errors.value.lastName = t('validation.lastNameMinLength')
  } else if (lastName.length > 50) {
    errors.value.lastName = t('validation.lastNameMaxLength')
  } else {
    errors.value.lastName = ''
  }
}

const handleSubmit = async (): Promise<void> => {
  if (!isFormValid.value) {
    return
  }

  isLoading.value = true

  try {
    const user = authStore.currentUser
    if (!user?.id) {
      throw new Error('No authenticated user found')
    }

    // Update user profile in Firestore
    await userStore.updateProfileFromForm(user.id, formData.value)

    // Emit success event
    emit('complete', formData.value)
    isVisible.value = false
  } catch (error) {
    // Error is handled by the store, but we could show a toast here
    // console.error('Failed to complete profile:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSkip = (): void => {
  emit('skip')
  isVisible.value = false
}

// Expose close method for parent components
const close = (): void => {
  isVisible.value = false
  emit('close')
}

defineExpose({
  close
})
</script>

<style scoped>
.welcome-wizard {
  @apply p-6;
}

.form-group {
  @apply space-y-1;
}

@media (max-width: 640px) {
  .welcome-wizard {
    @apply p-4;
  }
}
</style>
