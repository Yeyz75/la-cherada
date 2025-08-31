<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center relative">
        <!-- Back button in top left -->
        <div class="absolute left-0 top-0">
          <BaseButton
            variant="secondary"
            size="small"
            @click="() => $router.push('/')"
          >
            <template #icon>
              <BaseIcon name="arrow-left" class="w-4 h-4" />
            </template>
            {{ $t('common.back') }}
          </BaseButton>
        </div>

        <div class="flex justify-center">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg mb-6"
          >
            <BaseIcon name="user-plus" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ $t('auth.signUp') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ $t('auth.createAccount') }}
        </p>
        <div class="mt-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ $t('auth.alreadyHaveAccount') }}
          </span>
          <router-link
            to="/login"
            class="ml-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {{ $t('auth.signIn') }}
          </router-link>
        </div>
      </div>

      <!-- Form -->
      <BaseCard class="p-8 shadow-xl border-0">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="formData.firstName"
              type="text"
              :label="$t('auth.firstName')"
              :placeholder="$t('auth.firstNamePlaceholder')"
              :error="
                formErrors.firstName && formState.touched.firstName
                  ? formErrors.firstName
                  : ''
              "
              :required="true"
              @blur="markFieldAsTouched('firstName')"
            />
            <BaseInput
              v-model="formData.lastName"
              type="text"
              :label="$t('auth.lastName')"
              :placeholder="$t('auth.lastNamePlaceholder')"
              :error="
                formErrors.lastName && formState.touched.lastName
                  ? formErrors.lastName
                  : ''
              "
              :required="true"
              @blur="markFieldAsTouched('lastName')"
            />
          </div>

          <!-- Email -->
          <BaseInput
            v-model="formData.email"
            type="email"
            :label="$t('auth.email')"
            :placeholder="$t('auth.emailPlaceholder')"
            :error="
              formErrors.email && formState.touched.email
                ? formErrors.email
                : ''
            "
            :required="true"
            @blur="markFieldAsTouched('email')"
          />

          <!-- Passwords -->
          <div class="space-y-4">
            <BasePasswordInput
              v-model="formData.password"
              :label="$t('auth.password')"
              :placeholder="$t('auth.passwordPlaceholder')"
              :error="
                formErrors.password && formState.touched.password
                  ? formErrors.password
                  : ''
              "
              :required="true"
              :feedback="true"
              :strength-meter="true"
              :toggle-mask="true"
              @blur="markFieldAsTouched('password')"
            />
            <BasePasswordInput
              v-model="formData.confirmPassword"
              :label="$t('auth.confirmPassword')"
              :placeholder="$t('auth.confirmPasswordPlaceholder')"
              :error="
                formErrors.confirmPassword && formState.touched.confirmPassword
                  ? formErrors.confirmPassword
                  : ''
              "
              :required="true"
              :feedback="false"
              :toggle-mask="true"
              @blur="markFieldAsTouched('confirmPassword')"
            />
          </div>

          <!-- Location Selector -->
          <LocationSelector
            v-model="locationSelection"
            :can-skip="true"
            :required="false"
            @skip-changed="onLocationSkipChanged"
          />

          <!-- Terms and Conditions -->
          <div class="space-y-2">
            <BaseCheckbox
              v-model="formData.acceptTerms"
              :binary="true"
              :invalid="
                !!(formErrors.acceptTerms && formState.touched.acceptTerms)
              "
              @change="markFieldAsTouched('acceptTerms')"
            >
              <template #label>
                <span class="text-sm">
                  {{ $t('auth.acceptTerms') }}
                  <router-link
                    to="/terms"
                    class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
                    target="_blank"
                  >
                    {{ $t('auth.termsAndConditions') }}
                  </router-link>
                  <span class="text-red-500 ml-1">*</span>
                </span>
              </template>
            </BaseCheckbox>
            <p
              v-if="formErrors.acceptTerms && formState.touched.acceptTerms"
              class="text-sm text-red-600 dark:text-red-400"
            >
              {{ formErrors.acceptTerms }}
            </p>
          </div>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            :loading="formState.isLoading"
            :disabled="!isFormValid || formState.isLoading"
            variant="primary"
            class="w-full py-3"
          >
            <template #icon>
              <BaseIcon name="user-plus" class="w-5 h-5" />
            </template>
            {{ $t('auth.createAccount') }}
          </BaseButton>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-600"
              ></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span
                class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                {{ $t('auth.orContinueWith') }}
              </span>
            </div>
          </div>

          <!-- Google Sign Up -->
          <BaseButton
            :loading="googleLoading"
            :disabled="googleLoading"
            variant="secondary"
            outlined
            class="w-full py-3"
            @click="handleGoogleSignUp"
          >
            <template #icon>
              <BaseIcon
                name="google"
                class="w-5 h-5 text-red-500"
                v-if="!googleLoading"
              />
            </template>
            {{ $t('auth.continueWithGoogle') }}
          </BaseButton>
        </form>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../stores/authStore'
import { useError } from '../../../composables/useError'
import { useLoading } from '../../../composables/useLoading'
import type {
  RegisterRequest,
  FormError,
  AuthFormState
} from '../../../types/api'
import {
  BaseInput,
  BasePasswordInput,
  BaseButton,
  BaseCheckbox,
  BaseIcon,
  BaseCard,
  LocationSelector
} from '../../../components/common'
import type { UserLocation } from '../../../types/location'

interface LocationSelection {
  departmentId: string | null
  municipalityId: string | null
  departmentName: string | null
  municipalityName: string | null
}

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()
const { handleError } = useError()
const { isLoading: googleLoading, withLoading } = useLoading()

// Form data
const formData = reactive<RegisterRequest>({
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  location: null,
  timestamp: new Date()
})

// Reactive ref for location selection
const locationSelection = ref<LocationSelection | null>(null)

// Form state
const formState = reactive<AuthFormState>({
  isLoading: false,
  errors: [],
  touched: {}
})

// Form errors computed
const formErrors = computed(() => {
  const errors: Record<string, string> = {}

  formState.errors.forEach((error: FormError) => {
    errors[error.field] = error.message
  })

  return errors
})

// Validation
const validateForm = (): FormError[] => {
  const errors: FormError[] = []

  // First name validation
  if (!formData.firstName.trim()) {
    errors.push({
      field: 'firstName',
      message: t('auth.validation.firstNameRequired')
    })
  } else if (formData.firstName.trim().length < 2) {
    errors.push({
      field: 'firstName',
      message: t('auth.validation.firstNameMinLength')
    })
  }

  // Last name validation
  if (!formData.lastName.trim()) {
    errors.push({
      field: 'lastName',
      message: t('auth.validation.lastNameRequired')
    })
  } else if (formData.lastName.trim().length < 2) {
    errors.push({
      field: 'lastName',
      message: t('auth.validation.lastNameMinLength')
    })
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.push({
      field: 'email',
      message: t('auth.validation.emailRequired')
    })
  } else if (!isValidEmail(formData.email)) {
    errors.push({
      field: 'email',
      message: t('auth.validation.emailInvalid')
    })
  }

  // Password validation
  if (!formData.password.trim()) {
    errors.push({
      field: 'password',
      message: t('auth.validation.passwordRequired')
    })
  } else if (formData.password.length < 6) {
    errors.push({
      field: 'password',
      message: t('auth.validation.passwordMinLength')
    })
  }

  // Confirm password validation
  if (!formData.confirmPassword.trim()) {
    errors.push({
      field: 'confirmPassword',
      message: t('auth.validation.confirmPasswordRequired')
    })
  } else if (formData.password !== formData.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: t('auth.validation.passwordsNotMatch')
    })
  }

  // Terms acceptance validation
  if (!formData.acceptTerms) {
    errors.push({
      field: 'acceptTerms',
      message: t('auth.validation.acceptTermsRequired')
    })
  }

  return errors
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isFormValid = computed(() => {
  return (
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    formData.acceptTerms &&
    formState.errors.length === 0
  )
})

// Form methods
const markFieldAsTouched = (field: string): void => {
  formState.touched[field] = true
  // Re-validate when field is touched
  formState.errors = validateForm()
}

// Location handling methods
const onLocationSkipChanged = (skipped: boolean): void => {
  if (skipped) {
    formData.location = null
  } else if (locationSelection.value) {
    // Convert location selection to UserLocation format
    formData.location = {
      departmentId: locationSelection.value.departmentId,
      municipalityId: locationSelection.value.municipalityId,
      isConfigured: Boolean(
        locationSelection.value.departmentId &&
          locationSelection.value.municipalityId
      ),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

// Watch for changes in location selection
watch(
  locationSelection,
  newSelection => {
    if (newSelection?.departmentId && newSelection?.municipalityId) {
      formData.location = {
        departmentId: newSelection.departmentId,
        municipalityId: newSelection.municipalityId,
        isConfigured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    } else {
      formData.location = null
    }
  },
  { deep: true }
)

const handleSubmit = async (): Promise<void> => {
  // Mark all fields as touched
  formState.touched = {
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true,
    acceptTerms: true
  }

  // Validate form
  formState.errors = validateForm()

  if (formState.errors.length > 0) {
    return
  }

  formState.isLoading = true

  try {
    // Generate displayName from firstName and lastName
    formData.displayName =
      `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim()

    await authStore.register(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.displayName
    )
    // Redirect to dashboard after registration
    await router.push('/dashboard')
  } catch (error: unknown) {
    handleError(error)
  } finally {
    formState.isLoading = false
  }
}

const handleGoogleSignUp = async (): Promise<void> => {
  await withLoading(async () => {
    try {
      await authStore.loginWithGoogle()
      await router.push('/dashboard')
    } catch (error: unknown) {
      handleError(error)
    }
  })
}
</script>

<style scoped>
/* Animaciones suaves para el formulario */
.max-w-md {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects para el icono principal */
.inline-flex:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>
