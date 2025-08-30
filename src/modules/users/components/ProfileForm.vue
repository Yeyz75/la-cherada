<template>
  <div class="profile-form-container">
    <form @submit.prevent="handleSubmit" class="profile-form space-y-4">
      <!-- Form Header -->
      <div class="form-header mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ $t('profile.editProfile') }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t('profile.updateYourInformation') }}
        </p>
      </div>

      <!-- First Name Field -->
      <BaseInput
        v-model="formData.firstName"
        type="text"
        :label="$t('profile.firstName')"
        :placeholder="$t('profile.firstNamePlaceholder')"
        :error="
          formErrors.firstName && formState.touched.firstName
            ? formErrors.firstName
            : ''
        "
        :required="true"
        @blur="markFieldAsTouched('firstName')"
        @input="handleFieldChange"
      />

      <!-- Last Name Field -->
      <BaseInput
        v-model="formData.lastName"
        type="text"
        :label="$t('profile.lastName')"
        :placeholder="$t('profile.lastNamePlaceholder')"
        :error="
          formErrors.lastName && formState.touched.lastName
            ? formErrors.lastName
            : ''
        "
        :required="true"
        @blur="markFieldAsTouched('lastName')"
        @input="handleFieldChange"
      />

      <!-- Display Name Field -->
      <BaseInput
        v-model="formData.displayName"
        type="text"
        :label="$t('profile.displayName')"
        :placeholder="$t('profile.displayNamePlaceholder')"
        :error="
          formErrors.displayName && formState.touched.displayName
            ? formErrors.displayName
            : ''
        "
        :required="true"
        @blur="markFieldAsTouched('displayName')"
        @input="handleFieldChange"
      />

      <!-- Bio Field -->
      <div class="form-field">
        <label
          for="bio"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t('profile.bio') }}
          <span class="text-gray-500 text-xs ml-1"
            >({{ $t('profile.optional') }})</span
          >
        </label>
        <textarea
          id="bio"
          :value="formData.bio ?? ''"
          :placeholder="$t('profile.bioPlaceholder')"
          rows="4"
          maxlength="500"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
          :class="{
            'border-red-500 focus:ring-red-500 focus:border-red-500':
              formErrors.bio && formState.touched.bio
          }"
          @blur="markFieldAsTouched('bio')"
          @input="
            event => {
              formData.bio = (event.target as HTMLTextAreaElement).value
              handleFieldChange()
            }
          "
        ></textarea>
        <div class="flex justify-between items-center mt-1">
          <span
            v-if="formErrors.bio && formState.touched.bio"
            class="text-sm text-red-600 dark:text-red-400"
          >
            {{ formErrors.bio }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {{ (formData?.bio ?? '').length }}/500
          </span>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions flex flex-col sm:flex-row gap-3 pt-4">
        <BaseButton
          type="submit"
          :loading="formState.isLoading"
          :disabled="!isFormValid || formState.isLoading || !hasChanges"
          variant="primary"
          class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <template #icon>
            <BaseIcon name="save" class="w-4 h-4" />
          </template>
          {{ $t('profile.saveChanges') }}
        </BaseButton>

        <BaseButton
          type="button"
          variant="secondary"
          :outlined="true"
          :disabled="formState.isLoading"
          class="flex-1 sm:flex-initial px-6 py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
          @click="handleCancel"
        >
          <template #icon>
            <BaseIcon name="x" class="w-4 h-4" />
          </template>
          {{ $t('profile.cancel') }}
        </BaseButton>
      </div>

      <!-- Success Message -->
      <div
        v-if="props.showSuccessMessage"
        class="success-message bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4"
      >
        <div class="flex items-center">
          <BaseIcon
            name="check-circle"
            class="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
          />
          <span class="text-sm text-green-800 dark:text-green-200">
            {{ $t('profile.profileUpdatedSuccessfully') }}
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { useError } from '@/composables/useError'
import type { ProfileFormData, FormError } from '@/types/api'
import { BaseInput, BaseButton, BaseIcon } from '@/components/common'

// Props
interface Props {
  initialData?: Partial<ProfileFormData>
  autoSave?: boolean
  showSuccessMessage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoSave: false,
  showSuccessMessage: true
})

const emit = defineEmits<Emits>()

// Emits
interface Emits {
  (e: 'submit', data: ProfileFormData): void
  (e: 'cancel'): void
  (e: 'change', data: ProfileFormData): void
  (e: 'success'): void
  (e: 'error', error: string): void
}

// Stores and composables
const userStore = useUserStore()
const authStore = useAuthStore()
const { handleError } = useError()

// Form state
interface ProfileFormState {
  isLoading: boolean
  errors: FormError[]
  touched: Record<string, boolean>
}

const formState = reactive<ProfileFormState>({
  isLoading: false,
  errors: [],
  touched: {}
})

// Form data
const formData = reactive<ProfileFormData>({
  firstName: '',
  lastName: '',
  displayName: '',
  bio: ''
})

// Original data for change detection
const originalData = ref<ProfileFormData>({
  firstName: '',
  lastName: '',
  displayName: '',
  bio: ''
})

// Computed properties
const formErrors = computed(() => {
  const errors: Record<string, string> = {}
  formState.errors.forEach((error: FormError) => {
    errors[error.field] = error.message
  })
  return errors
})

const isFormValid = computed(() => {
  return (
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.displayName.trim() !== '' &&
    formState.errors.length === 0
  )
})

const hasChanges = computed(() => {
  return (
    formData.firstName !== originalData.value.firstName ||
    formData.lastName !== originalData.value.lastName ||
    formData.displayName !== originalData.value.displayName ||
    formData.bio !== originalData.value.bio
  )
})

// Validation functions
const validateForm = (): FormError[] => {
  const errors: FormError[] = []

  // First name validation
  if (!formData.firstName.trim()) {
    errors.push({ field: 'firstName', message: 'El nombre es obligatorio' })
  } else if (formData.firstName.trim().length < 2) {
    errors.push({
      field: 'firstName',
      message: 'El nombre debe tener al menos 2 caracteres'
    })
  } else if (formData.firstName.trim().length > 50) {
    errors.push({
      field: 'firstName',
      message: 'El nombre no puede exceder 50 caracteres'
    })
  }

  // Last name validation
  if (!formData.lastName.trim()) {
    errors.push({ field: 'lastName', message: 'El apellido es obligatorio' })
  } else if (formData.lastName.trim().length < 2) {
    errors.push({
      field: 'lastName',
      message: 'El apellido debe tener al menos 2 caracteres'
    })
  } else if (formData.lastName.trim().length > 50) {
    errors.push({
      field: 'lastName',
      message: 'El apellido no puede exceder 50 caracteres'
    })
  }

  // Display name validation
  if (!formData.displayName.trim()) {
    errors.push({
      field: 'displayName',
      message: 'El nombre para mostrar es obligatorio'
    })
  } else if (formData.displayName.trim().length < 2) {
    errors.push({
      field: 'displayName',
      message: 'El nombre para mostrar debe tener al menos 2 caracteres'
    })
  } else if (formData.displayName.trim().length > 100) {
    errors.push({
      field: 'displayName',
      message: 'El nombre para mostrar no puede exceder 100 caracteres'
    })
  }

  // Bio validation (optional field)
  if (formData.bio && formData.bio.length > 500) {
    errors.push({
      field: 'bio',
      message: 'La biografía no puede exceder 500 caracteres'
    })
  }

  return errors
}

// Form methods
const markFieldAsTouched = (field: string): void => {
  formState.touched[field] = true
  formState.errors = validateForm()
}

const handleFieldChange = (): void => {
  // Real-time validation
  formState.errors = validateForm()

  // Auto-generate displayName if it matches the pattern "firstName lastName"
  const expectedDisplayName =
    `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim()
  if (
    formData.displayName === originalData.value.displayName ||
    formData.displayName === expectedDisplayName
  ) {
    formData.displayName = expectedDisplayName
  }

  // Emit change event
  emit('change', { ...formData })
}

const handleSubmit = async (): Promise<void> => {
  // Mark all fields as touched
  formState.touched = {
    firstName: true,
    lastName: true,
    displayName: true,
    bio: true
  }

  // Validate form
  formState.errors = validateForm()

  if (formState.errors.length > 0) {
    return
  }

  if (!authStore.currentUser?.id) {
    handleError(new Error('Usuario no autenticado'))
    return
  }

  formState.isLoading = true

  try {
    await userStore.updateProfileFromForm(authStore.currentUser.id, formData)

    // Update original data to reflect saved state
    originalData.value = { ...formData }

    emit('submit', { ...formData })
    emit('success')
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error al actualizar perfil'
    handleError(error)
    emit('error', errorMessage)
  } finally {
    formState.isLoading = false
  }
}

const handleCancel = (): void => {
  // Reset form to original data
  Object.assign(formData, originalData.value)

  // Clear touched state and errors
  formState.touched = {}
  formState.errors = []

  emit('cancel')
}

const initializeForm = (): void => {
  // Initialize from props or current profile
  const currentProfile = userStore.currentProfile
  const initialData = props.initialData || currentProfile

  if (initialData) {
    formData.firstName = initialData.firstName || ''
    formData.lastName = initialData.lastName || ''
    formData.displayName = initialData.displayName || ''
    formData.bio = initialData.bio || ''
  }

  // Store original data for change detection
  originalData.value = { ...formData }
}

// Auto-save functionality
let autoSaveTimeout: NodeJS.Timeout | null = null

const handleAutoSave = (): void => {
  if (!props.autoSave || !hasChanges.value || !isFormValid.value) {
    return
  }

  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }

  autoSaveTimeout = setTimeout(() => {
    handleSubmit()
  }, 2000) // Auto-save after 2 seconds of inactivity
}

// Watchers
watch(
  () => [
    formData.firstName,
    formData.lastName,
    formData.displayName,
    formData.bio
  ],
  () => {
    if (props.autoSave) {
      handleAutoSave()
    }
  },
  { deep: true }
)

watch(
  () => userStore.currentProfile,
  newProfile => {
    if (newProfile && !hasChanges.value) {
      initializeForm()
    }
  },
  { deep: true }
)

// Lifecycle
onMounted(() => {
  initializeForm()
})

// Expose methods for parent components
defineExpose({
  validateForm,
  resetForm: handleCancel,
  submitForm: handleSubmit,
  hasChanges,
  isValid: isFormValid
})
</script>

<style scoped>
.profile-form-container {
  @apply w-full max-w-2xl mx-auto;
}

.profile-form {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6;
}

.form-header {
  @apply border-b border-gray-200 dark:border-gray-700 pb-4;
}

.form-field {
  @apply space-y-2;
}

.form-actions {
  @apply border-t border-gray-200 dark:border-gray-700 pt-4;
}

.success-message {
  @apply animate-fade-in;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

/* Responsive design */
@media (max-width: 640px) {
  .profile-form {
    @apply p-4 rounded-lg;
  }

  .form-actions {
    @apply flex-col;
  }
}

/* Override PrimeVue styles */
:deep(.p-inputtext) {
  @apply bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-all duration-200;
}

:deep(.p-inputtext:focus) {
  @apply border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20 shadow-sm;
}

:deep(.p-button) {
  @apply font-semibold transition-all duration-200;
}

:deep(.p-error) {
  @apply text-red-600 dark:text-red-400 font-medium;
}

/* Textarea styles */
textarea:focus {
  outline: none;
}

/* Loading state */
.profile-form.loading {
  @apply opacity-75 pointer-events-none;
}
</style>
