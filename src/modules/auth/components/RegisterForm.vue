<template>
  <div class="auth-container max-w-6xl mx-auto">
    <BaseCard shadow="lg" padding="none" class="overflow-hidden">
      <div class="grid lg:grid-cols-5 min-h-[700px]">
        <!-- Panel izquierdo - Información visual -->
        <div
          class="lg:col-span-2 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden"
        >
          <!-- Decoración de fondo -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-600/20"
          ></div>
          <div
            class="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          ></div>
          <div
            class="absolute bottom-8 left-8 w-24 h-24 bg-green-400/20 rounded-full blur-xl"
          ></div>

          <div class="relative z-10">
            <!-- Icono principal -->
            <div class="mb-4">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg"
              >
                <BaseIcon name="user-plus" class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Contenido -->
            <h1
              class="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight"
            >
              Únete a nosotros
            </h1>
            <p class="text-green-100 text-sm mb-4 leading-relaxed">
              Crea tu cuenta y descubre todas las posibilidades que tenemos para
              ti. ¡Es rápido y gratuito!
            </p>

            <!-- Features -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-green-100">Registro rápido y seguro</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-green-100">Acceso a todas las funciones</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-green-100">Soporte 24/7</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-green-100"
                  >Sin compromisos ni costos ocultos</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Panel derecho - Formulario -->
        <div class="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
          <form
            @submit.prevent="handleSubmit"
            class="register-form max-w-2xl mx-auto w-full space-y-4"
          >
            <!-- Header del formulario -->
            <div class="mb-6">
              <!-- Botón de volver atrás -->
              <div class="flex items-center justify-between mb-4">
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
                <div class="text-right">
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ $t('auth.alreadyHaveAccount') }}
                  </div>
                  <router-link
                    to="/login"
                    class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {{ $t('auth.signIn') }}
                  </router-link>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ $t('auth.signUp') }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('auth.createAccount') }}
              </p>
            </div>

            <!-- Campos del formulario usando componentes base -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  formErrors.confirmPassword &&
                  formState.touched.confirmPassword
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

            <!-- Accept Terms usando BaseCheckbox -->
            <div class="space-y-3">
              <BaseCheckbox
                v-model="formData.acceptTerms"
                :binary="true"
                :invalid="
                  !!(formErrors.acceptTerms && formState.touched.acceptTerms)
                "
                @change="markFieldAsTouched('acceptTerms')"
              >
                <template #label>
                  <span class="ml-3">
                    {{ $t('auth.acceptTerms') }}
                    <router-link
                      to="/terms"
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline ml-1"
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
                class="text-sm text-red-600 dark:text-red-400 ml-6"
              >
                {{ formErrors.acceptTerms }}
              </p>
            </div>

            <!-- Botones de acción -->
            <div class="space-y-4 pt-6">
              <BaseButton
                type="submit"
                :loading="formState.isLoading"
                :disabled="!isFormValid || formState.isLoading"
                variant="primary"
                class="w-full"
              >
                <template #icon>
                  <BaseIcon name="user-plus" class="w-4 h-4" />
                </template>
                {{ $t('auth.createAccount') }}
              </BaseButton>

              <div class="text-center text-sm text-gray-500 dark:text-gray-400">
                {{ $t('auth.orContinueWith') }}
              </div>

              <BaseButton
                :loading="googleLoading"
                :disabled="googleLoading"
                variant="secondary"
                outlined
                class="w-full"
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
            </div>
          </form>
        </div>
      </div>
    </BaseCard>
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
    // Redirect to home page after registration
    await router.push('/')
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
      await router.push('/')
    } catch (error: unknown) {
      handleError(error)
    }
  })
}
</script>

<style scoped>
.auth-container {
  @apply w-full;
}

.register-form {
  @apply space-y-4;
}

/* Responsive design básico */
@media (max-width: 1024px) {
  .register-form {
    @apply max-w-xl space-y-4;
  }
}

@media (max-width: 768px) {
  .register-form {
    @apply max-w-full;
  }

  .grid.grid-cols-1.md\\:grid-cols-2 {
    @apply gap-4;
  }

  .grid.grid-cols-1.lg\\:grid-cols-2 {
    @apply gap-4;
  }
}

/* Animaciones para el panel izquierdo */
.auth-container :deep(.lg\\:col-span-2) h1,
.auth-container :deep(.lg\\:col-span-2) p,
.auth-container :deep(.lg\\:col-span-2) .space-y-2 {
  animation: slideInLeft 0.8s ease-out forwards;
}

.auth-container :deep(.lg\\:col-span-2) .inline-flex {
  animation: fadeInScale 0.6s ease-out forwards;
}

.register-form {
  animation: slideInRight 0.8s ease-out forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
