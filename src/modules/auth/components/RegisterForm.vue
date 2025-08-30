<template>
  <div class="auth-container max-w-6xl mx-auto">
    <div
      class="auth-wrapper bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden"
    >
      <div class="grid lg:grid-cols-5 h-[700px]">
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
            class="register-form max-w-md mx-auto w-full space-y-2"
          >
            <!-- Header del formulario -->
            <div class="mb-3">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {{ $t('auth.signUp') }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('auth.createAccount') }}
              </p>
            </div>

            <!-- Campo First Name -->
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

            <!-- Campo Last Name -->
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

            <!-- Campo Email -->
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

            <!-- Campo Password -->
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

            <!-- Campo Confirm Password -->
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

            <!-- Accept Terms -->
            <div class="mb-2">
              <div class="flex items-start space-x-2">
                <BaseCheckbox
                  v-model="formData.acceptTerms"
                  :binary="true"
                  :error="
                    formErrors.acceptTerms && formState.touched.acceptTerms
                      ? formErrors.acceptTerms
                      : ''
                  "
                  :required="true"
                  @change="markFieldAsTouched('acceptTerms')"
                />
                <label
                  class="text-xs text-gray-700 dark:text-gray-300 leading-tight flex-1"
                >
                  {{ $t('auth.acceptTerms') }}
                  <router-link
                    to="/terms"
                    class="terms-link text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    target="_blank"
                  >
                    {{ $t('auth.termsAndConditions') }}
                  </router-link>
                  <span class="required text-red-500 ml-1">*</span>
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <BaseButton
              type="submit"
              :loading="formState.isLoading"
              :disabled="!isFormValid || formState.isLoading"
              variant="primary"
              class="w-full mb-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-4 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <template #icon>
                <BaseIcon name="user-plus" class="w-4 h-4" />
              </template>
              {{ $t('auth.createAccount') }}
            </BaseButton>

            <!-- Divider -->
            <div class="divider flex items-center mb-2">
              <div
                class="flex-1 border-t border-gray-300/60 dark:border-gray-600/60"
              ></div>
              <span
                class="px-6 text-sm text-gray-500 dark:text-gray-400 font-medium bg-white/60 dark:bg-gray-800/60 rounded-full"
              >
                {{ $t('auth.orContinueWith') }}
              </span>
              <div
                class="flex-1 border-t border-gray-300/60 dark:border-gray-600/60"
              ></div>
            </div>

            <!-- Google Sign Up -->
            <BaseButton
              :loading="googleLoading"
              :disabled="googleLoading"
              variant="secondary"
              :outlined="true"
              class="w-full mb-2 !bg-white dark:!bg-gray-700 !text-gray-700 dark:!text-gray-200 !border-gray-300 dark:!border-gray-600 hover:!bg-gray-50 dark:hover:!bg-gray-600 hover:!border-gray-400 dark:hover:!border-gray-500 focus:!ring-2 focus:!ring-blue-500 focus:!ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 font-medium !py-2"
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

            <!-- Sign In Link -->
            <div class="signin-link text-center">
              <span class="text-gray-600 dark:text-gray-400">{{
                $t('auth.alreadyHaveAccount')
              }}</span>
              <router-link
                to="/login"
                class="link ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                {{ $t('auth.signIn') }}
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
  BaseIcon
} from '../../../components/common'

const authStore = useAuthStore()
const router = useRouter()
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
  timestamp: new Date()
})

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
    errors.push({ field: 'firstName', message: 'El nombre es obligatorio' })
  } else if (formData.firstName.trim().length < 2) {
    errors.push({
      field: 'firstName',
      message: 'El nombre debe tener al menos 2 caracteres'
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
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.push({ field: 'email', message: 'El email es obligatorio' })
  } else if (!isValidEmail(formData.email)) {
    errors.push({ field: 'email', message: 'El email no es válido' })
  }

  // Password validation
  if (!formData.password.trim()) {
    errors.push({ field: 'password', message: 'La contraseña es obligatoria' })
  } else if (formData.password.length < 6) {
    errors.push({
      field: 'password',
      message: 'La contraseña debe tener al menos 6 caracteres'
    })
  }

  // Confirm password validation
  if (!formData.confirmPassword.trim()) {
    errors.push({
      field: 'confirmPassword',
      message: 'Confirma tu contraseña'
    })
  } else if (formData.password !== formData.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: 'Las contraseñas no coinciden'
    })
  }

  // Terms acceptance validation
  if (!formData.acceptTerms) {
    errors.push({
      field: 'acceptTerms',
      message: 'Debes aceptar los términos y condiciones'
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
    // Redirect to dashboard or previous route
    router.push('/dashboard')
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
      router.push('/dashboard')
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

.auth-wrapper {
  @apply relative;
}

.register-form {
  @apply space-y-2;
}

.divider {
  @apply relative text-center;
}

.signin-link {
  @apply text-center text-sm;
}

.terms-link {
  @apply font-medium transition-colors duration-200;
}

/* Responsive design */
@media (max-width: 1024px) {
  .auth-wrapper {
    @apply rounded-2xl;
  }

  .auth-wrapper .grid {
    @apply grid-cols-1 h-auto;
  }

  .auth-wrapper .lg\:col-span-2 {
    @apply h-[350px] p-6;
  }
  .auth-wrapper .lg\:col-span-3 {
    @apply p-6;
  }

  .auth-wrapper h1 {
    @apply text-3xl;
  }

  .register-form {
    @apply max-w-sm;
  }
}

@media (max-width: 640px) {
  .auth-wrapper .lg\:col-span-2 {
    @apply h-[300px] p-4;
  }

  .auth-wrapper .lg\:col-span-3 {
    @apply p-4;
  }

  .register-form {
    @apply space-y-1;
  }
}

/* Override PrimeVue styles */
:deep(.p-inputtext) {
  @apply bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-all duration-200;
}

:deep(.p-inputtext:focus) {
  @apply border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20 shadow-sm;
}

:deep(.p-password .p-inputtext) {
  @apply bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100;
}

:deep(.p-button) {
  @apply font-semibold transition-all duration-200;
}

:deep(.p-checkbox .p-checkbox-box) {
  @apply bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded transition-all duration-200;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  @apply bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500;
}

:deep(.p-error) {
  @apply text-red-600 dark:text-red-400 font-medium;
}

/* Animation for the left panel elements */
.auth-wrapper .lg\:col-span-2 h1,
.auth-wrapper .lg\:col-span-2 p,
.auth-wrapper .lg\:col-span-2 .space-y-4 {
  animation: slideInLeft 0.8s ease-out forwards;
}

.auth-wrapper .lg\:col-span-2 .inline-flex {
  animation: fadeInScale 0.6s ease-out forwards;
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

/* Form animation */
.register-form {
  animation: slideInRight 0.8s ease-out forwards;
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
