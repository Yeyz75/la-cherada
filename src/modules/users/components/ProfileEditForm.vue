<template>
  <div class="profile-edit-form-container">
    <!-- Confirmation Modal for Unsaved Changes -->
    <BaseModal
      v-model="showUnsavedChangesModal"
      title="Cambios sin guardar"
      :closable="false"
      size="sm"
    >
      <div class="text-center">
        <BaseIcon
          name="exclamation-triangle"
          class="w-12 h-12 text-amber-500 mx-auto mb-4"
        />
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin
          guardar?
        </p>
        <div class="flex justify-center space-x-4">
          <BaseButton variant="secondary" @click="confirmCancel">
            Salir sin guardar
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="showUnsavedChangesModal = false"
          >
            Continuar editando
          </BaseButton>
        </div>
      </div>
    </BaseModal>

    <form @submit.prevent="handleSubmit" class="profile-edit-form space-y-6">
      <!-- Form Header -->
      <div class="form-header mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ $t('profile.editProfile') }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t('profile.updateYourInformation') }}
        </p>
      </div>

      <!-- Profile Image Upload -->
      <div class="profile-image-section mb-6">
        <ProfileImageUpload
          :current-image-url="userStore.currentProfile?.photoURL || ''"
          :disabled="formState.isLoading || imageState.isLoading"
          :auto-upload="false"
          :show-actions="false"
          @upload="handleImageUpload"
          @remove="handleImageRemove"
          @error="handleImageError"
          @progress="handleImageProgress"
        />

        <!-- Image Upload Status -->
        <div v-if="imageState.isLoading" class="image-status mt-3">
          <div
            class="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400"
          >
            <BaseIcon name="loader" class="w-4 h-4 mr-2 animate-spin" />
            Subiendo imagen... {{ imageState.progress }}%
          </div>
        </div>

        <div v-if="imageState.error" class="image-status error mt-3">
          <div class="flex items-center text-sm text-red-600 dark:text-red-400">
            <BaseIcon name="alert-circle" class="w-4 h-4 mr-2" />
            {{ imageState.error }}
          </div>
        </div>

        <div
          v-if="imageState.success && !imageState.isLoading"
          class="image-status success mt-3"
        >
          <div
            class="flex items-center text-sm text-green-600 dark:text-green-400"
          >
            <BaseIcon name="check-circle" class="w-4 h-4 mr-2" />
            Imagen actualizada exitosamente
          </div>
        </div>
      </div>

      <!-- First Name Field -->
      <BaseInput
        v-model="formData.firstName"
        type="text"
        :label="$t('profile.firstName')"
        :placeholder="$t('profile.firstNamePlaceholder')"
        :error="
          shouldShowError('firstName')
            ? getFieldError('firstName')?.message || ''
            : ''
        "
        :required="true"
        :disabled="isFormLoading || imageState.isLoading"
        @blur="handleFieldBlur('firstName')"
        @update:model-value="handleEnhancedFieldChange('firstName', $event)"
      />

      <!-- Last Name Field -->
      <BaseInput
        v-model="formData.lastName"
        type="text"
        :label="$t('profile.lastName')"
        :placeholder="$t('profile.lastNamePlaceholder')"
        :error="
          shouldShowError('lastName')
            ? getFieldError('lastName')?.message || ''
            : ''
        "
        :required="true"
        :disabled="isFormLoading || imageState.isLoading"
        @blur="handleFieldBlur('lastName')"
        @update:model-value="handleEnhancedFieldChange('lastName', $event)"
      />

      <!-- Display Name Field -->
      <BaseInput
        v-model="formData.displayName"
        type="text"
        :label="$t('profile.displayName')"
        :placeholder="$t('profile.displayNamePlaceholder')"
        :error="
          shouldShowError('displayName')
            ? getFieldError('displayName')?.message || ''
            : ''
        "
        :required="true"
        :disabled="isFormLoading || imageState.isLoading"
        @blur="handleFieldBlur('displayName')"
        @update:model-value="handleEnhancedFieldChange('displayName', $event)"
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
          :value="formData.bio || ''"
          :placeholder="$t('profile.bioPlaceholder')"
          rows="4"
          maxlength="500"
          class="w-full px-3 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-base sm:text-sm"
          :class="{
            'border-red-500 focus:ring-red-500 focus:border-red-500':
              shouldShowError('bio')
          }"
          :disabled="isFormLoading || imageState.isLoading"
          @blur="handleFieldBlur('bio')"
          @input="
            handleEnhancedFieldChange(
              'bio',
              ($event.target as HTMLTextAreaElement).value
            )
          "
        ></textarea>
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 space-y-1 sm:space-y-0"
        >
          <span
            v-if="shouldShowError('bio')"
            class="text-sm text-red-600 dark:text-red-400 order-2 sm:order-1"
          >
            {{ getFieldError('bio')?.message }}
          </span>
          <span
            class="text-xs text-gray-500 dark:text-gray-400 order-1 sm:order-2 sm:ml-auto"
          >
            {{ (formData.bio || '').length }}/500
          </span>
        </div>
      </div>

      <!-- Form Actions -->
      <div
        class="form-actions flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <BaseButton
          type="button"
          variant="secondary"
          size="large"
          :disabled="isFormLoading || isValidating"
          class="w-full sm:w-32 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 font-medium shadow-md hover:shadow-lg transition-all duration-300"
          @click="handleCancel"
        >
          <template #icon>
            <BaseIcon name="x" class="w-5 h-5" />
          </template>
          {{ $t('profile.cancel') }}
        </BaseButton>

        <BaseButton
          type="submit"
          :loading="isFormLoading || isValidating"
          :disabled="
            !isFormValid || isFormLoading || !hasChanges || isValidating
          "
          variant="primary"
          size="large"
          class="w-full sm:flex-1 sm:min-w-48 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl dark:shadow-blue-500/25 dark:hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
        >
          <template #icon>
            <BaseIcon name="save" class="w-5 h-5" />
          </template>
          {{ $t('profile.saveChanges') }}
        </BaseButton>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccessMessage"
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
import { ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { useError } from '@/composables/useError'
import {
  useFormValidation,
  validationRules,
  sanitizers
} from '@/composables/useFormValidation'
import { userService } from '@/modules/users/services/userService'
import type { ProfileFormData } from '@/types/api'
import {
  BaseInput,
  BaseButton,
  BaseIcon,
  BaseModal,
  ProfileImageUpload
} from '@/components/common'

// Props
interface Props {
  initialData?: Partial<ProfileFormData>
  autoSave?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoSave: false
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

// Composables
const userStore = useUserStore()
const authStore = useAuthStore()
const { handleError } = useError()

// Enhanced form validation setup
const initialFormData: ProfileFormData = {
  firstName: '',
  lastName: '',
  displayName: '',
  bio: ''
}

const fieldConfigs = {
  firstName: {
    required: true,
    rules: [
      validationRules.required('El nombre es obligatorio'),
      validationRules.profileField('firstName')
    ],
    sanitizer: sanitizers.text,
    validateOnChange: true,
    debounceMs: 300
  },
  lastName: {
    required: true,
    rules: [
      validationRules.required('El apellido es obligatorio'),
      validationRules.profileField('lastName')
    ],
    sanitizer: sanitizers.text,
    validateOnChange: true,
    debounceMs: 300
  },
  displayName: {
    required: true,
    rules: [
      validationRules.required('El nombre a mostrar es obligatorio'),
      validationRules.profileField('displayName')
    ],
    sanitizer: sanitizers.text,
    validateOnChange: true,
    debounceMs: 300
  },
  bio: {
    required: false,
    rules: [validationRules.profileField('bio')],
    sanitizer: sanitizers.text,
    validateOnChange: true,
    debounceMs: 500
  }
}

const {
  formData,
  validationState,
  isFormValid,
  hasErrors,
  isValidating,
  handleFieldChange,
  handleFieldBlur,
  validateForm,
  resetForm: resetValidationForm,
  touchAllFields,
  getSanitizedData,
  getFieldError,
  shouldShowError
} = useFormValidation<ProfileFormData>(initialFormData, fieldConfigs)

// Form state for template access
const formState = computed(() => ({
  isLoading: isFormLoading.value,
  isValid: isFormValid.value,
  hasErrors: hasErrors.value,
  isValidating: isValidating.value
}))

// Form loading state
const isFormLoading = ref(false)

// Modal state for unsaved changes confirmation
const showUnsavedChangesModal = ref(false)

// Success message state
const showSuccessMessage = ref(false)

// Image upload state
interface ImageUploadState {
  isLoading: boolean
  progress: number
  error: string | null
  success: boolean
}

const imageState = reactive<ImageUploadState>({
  isLoading: false,
  progress: 0,
  error: null,
  success: false
})

// Original data for change detection
const originalData = ref<ProfileFormData>({
  firstName: '',
  lastName: '',
  displayName: '',
  bio: ''
})

// Computed properties
const hasChanges = computed((): boolean => {
  return (
    formData.firstName !== originalData.value.firstName ||
    formData.lastName !== originalData.value.lastName ||
    formData.displayName !== originalData.value.displayName ||
    (formData.bio ?? '') !== (originalData.value.bio ?? '')
  )
})

// Enhanced field change handler with auto-generation of displayName
const handleEnhancedFieldChange = (
  fieldName: keyof ProfileFormData,
  value: string | number
): void => {
  // Convert to string
  const stringValue = String(value)

  // Handle the validation
  handleFieldChange(fieldName, stringValue)

  // Auto-generate displayName if it matches the pattern "firstName lastName"
  if (fieldName === 'firstName' || fieldName === 'lastName') {
    const expectedDisplayName =
      `${(formData.firstName || '').trim()} ${(formData.lastName || '').trim()}`.trim()
    if (
      formData.displayName === originalData.value.displayName ||
      formData.displayName === expectedDisplayName
    ) {
      formData.displayName = expectedDisplayName
    }
  }

  // Emit change event
  emit('change', formData)
}

// Image handling methods
const handleImageUpload = async (file: File): Promise<void> => {
  if (!authStore.currentUser?.id) {
    handleError(new Error('Usuario no autenticado'))
    return
  }

  try {
    imageState.isLoading = true
    imageState.error = null
    imageState.progress = 0

    // Upload image using userService
    const result = await userService.uploadProfileImage(
      authStore.currentUser.id,
      file,
      {
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.8,
        format: 'jpeg'
      },
      (progress: { bytesTransferred: number; totalBytes: number }) => {
        imageState.progress = Math.round(
          (progress.bytesTransferred / progress.totalBytes) * 100
        )
      }
    )

    if (!result.success) {
      throw new Error(result.error?.message ?? 'Error al subir imagen')
    }

    // Update user profile in store
    await userStore.refreshProfile(authStore.currentUser.id)

    imageState.success = true
    emit('success')

    // Clear success state after 3 seconds
    setTimeout(() => {
      imageState.success = false
    }, 3000)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error al subir imagen'
    imageState.error = errorMessage
    handleError(error)
    emit('error', errorMessage)
  } finally {
    imageState.isLoading = false
  }
}

const handleImageRemove = async (): Promise<void> => {
  if (!authStore.currentUser?.id) {
    handleError(new Error('Usuario no autenticado'))
    return
  }

  try {
    imageState.isLoading = true
    imageState.error = null

    // Delete image using userService
    const result = await userService.deleteProfileImage(
      authStore.currentUser.id
    )

    if (!result.success) {
      throw new Error(result.error?.message ?? 'Error al eliminar imagen')
    }

    // Update user profile in store
    await userStore.refreshProfile(authStore.currentUser.id)

    emit('success')
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error al eliminar imagen'
    imageState.error = errorMessage
    handleError(error)
    emit('error', errorMessage)
  } finally {
    imageState.isLoading = false
  }
}

const handleImageError = (error: string): void => {
  imageState.error = error
  emit('error', error)
}

const handleImageProgress = (progress: number): void => {
  imageState.progress = progress
}

const handleSubmit = async (): Promise<void> => {
  // Mark all fields as touched
  touchAllFields()

  // Validate form
  const errors = await validateForm()
  const hasValidationErrors = Object.values(errors).some(
    error => error !== null
  )

  if (hasValidationErrors) {
    return
  }

  if (!authStore.currentUser?.id) {
    handleError(new Error('Usuario no autenticado'))
    return
  }

  isFormLoading.value = true

  try {
    // Get sanitized form data
    const sanitizedData = getSanitizedData()

    await userStore.updateProfileFromForm(
      authStore.currentUser.id,
      sanitizedData
    )

    // Update original data to reflect saved state
    originalData.value = { ...sanitizedData }

    // Update form data with sanitized values
    Object.assign(formData, sanitizedData)

    // Show success message
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)

    emit('submit', sanitizedData)
    emit('success')
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error al actualizar perfil'
    handleError(error)
    emit('error', errorMessage)
  } finally {
    isFormLoading.value = false
  }
}

const handleCancel = (): void => {
  if (hasChanges.value) {
    showUnsavedChangesModal.value = true
  } else {
    performCancel()
  }
}

const confirmCancel = (): void => {
  showUnsavedChangesModal.value = false
  performCancel()
}

const performCancel = (): void => {
  // Reset form to original data
  Object.assign(formData, originalData.value)

  // Reset validation state
  resetValidationForm()

  emit('cancel')
}

const initializeForm = (): void => {
  // Initialize from props or current profile
  const currentProfile = userStore.currentProfile
  const initialData = props.initialData ?? currentProfile

  if (initialData) {
    formData.firstName = initialData.firstName ?? ''
    formData.lastName = initialData.lastName ?? ''
    // Auto-generate displayName if not provided
    formData.displayName =
      initialData.displayName ??
      `${initialData.firstName ?? ''} ${initialData.lastName ?? ''}`.trim()
    formData.bio = initialData.bio ?? ''
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
    void handleSubmit()
  }, 2000) // Auto-save after 2 seconds of inactivity
}

// Cleanup function
const cleanup = (): void => {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }
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

onUnmounted(() => {
  cleanup()
})

// Expose methods for parent components
defineExpose({
  validateForm,
  resetForm: handleCancel,
  submitForm: handleSubmit,
  hasChanges,
  isValid: isFormValid,
  formData,
  validationState
})
</script>

<style scoped>
.profile-edit-form-container {
  width: 100%;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.profile-edit-form {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(229 231 235);
  padding: 1.5rem;
}

.dark .profile-edit-form {
  background-color: rgb(31 41 55);
  border-color: rgb(55 65 81);
}

.form-header {
  border-bottom: 1px solid rgb(229 231 235);
  padding-bottom: 1rem;
}

.dark .form-header {
  border-bottom-color: rgb(55 65 81);
}

.form-field {
  margin-bottom: 1.5rem;
}

.form-actions {
  border-top: 1px solid rgb(229 231 235);
  padding-top: 1rem;
}

.dark .form-actions {
  border-top-color: rgb(55 65 81);
}

.success-message {
  animation: fade-in 0.3s ease-out forwards;
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
  .profile-edit-form {
    padding: 1rem;
    border-radius: 0.75rem;
    margin: 0;
  }

  .profile-edit-form-container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
    padding-top: 1rem;
  }

  .form-field {
    margin-bottom: 1rem;
  }

  /* Reducir padding en los headers del formulario */
  .form-header {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
  }

  .form-header h2 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .form-header p {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  /* Ajustar inputs en móviles */
  .form-field input,
  .form-field textarea {
    font-size: 16px; /* Prevent zoom on iOS */
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
  }

  /* Ajustar botones en móviles */
  .form-actions button {
    width: 100%;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
  }

  /* Mejorar espaciado de labels */
  .form-field label {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  /* Ajustar imagen de perfil en móviles */
  .profile-image-section {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .profile-edit-form-container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  /* Botones stack verticalmente en tablet */
  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }

  .form-field input,
  .form-field textarea {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}

/* Large screen optimizations */
@media (min-width: 1024px) {
  .profile-edit-form {
    padding: 2rem;
  }

  .form-header {
    margin-bottom: 1.5rem;
  }

  .form-actions {
    padding-top: 2rem;
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
.profile-edit-form.loading {
  @apply opacity-75 pointer-events-none;
}
</style>
