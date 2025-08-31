<template>
  <div class="auth-container max-w-6xl mx-auto">
    <div
      class="auth-wrapper bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden"
    >
      <div class="grid lg:grid-cols-5 min-h-[700px]">
        <!-- Panel izquierdo - Informac.login-form {
  @apply space-y-3;
} visual -->
        <div
          class="lg:col-span-2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden"
        >
          <!-- Decoración de fondo -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"
          ></div>
          <div
            class="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          ></div>
          <div
            class="absolute bottom-8 left-8 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"
          ></div>

          <div class="relative z-10">
            <!-- Icono principal -->
            <div class="mb-4">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg"
              >
                <BaseIcon name="user" class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Contenido -->
            <h1
              class="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight"
            >
              {{ $t('auth.welcomeBack') }}
            </h1>
            <p class="text-blue-100 text-sm mb-4 leading-relaxed">
              Accede a tu cuenta y continúa donde lo dejaste. Tu experiencia
              personalizada te está esperando.
            </p>

            <!-- Features -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-blue-100">Acceso seguro y cifrado</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-blue-100"
                  >Sincronización en todos tus dispositivos</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-blue-100">Experiencia personalizada</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel derecho - Formulario -->
        <div class="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
          <form
            @submit.prevent="handleSubmit"
            class="login-form max-w-md mx-auto w-full space-y-3"
          >
            <!-- Header del formulario -->
            <div class="mb-4">
              <!-- Botón de volver atrás integrado -->
              <div class="flex items-center justify-between mb-4">
                <button
                  @click="() => $router.push('/')"
                  class="group inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
                >
                  <BaseIcon
                    name="arrow-left"
                    class="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform duration-200"
                  />
                  {{ $t('common.back') }}
                </button>
                <div class="text-right">
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ $t('auth.noAccount') }}
                  </div>
                  <router-link
                    to="/register"
                    class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {{ $t('auth.signUp') }}
                  </router-link>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {{ $t('auth.signIn') }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('auth.signInToAccount') }}
              </p>
            </div>

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
              :feedback="false"
              :toggle-mask="true"
              @blur="markFieldAsTouched('password')"
            />

            <!-- Remember Me & Forgot Password - Diseño mejorado -->
            <div
              class="form-options flex justify-between items-start mb-6 space-y-2 sm:space-y-0 sm:flex-row flex-col"
            >
              <!-- Remember Me mejorado -->
              <div class="flex items-center">
                <BaseCheckbox
                  v-model="formData.rememberMe"
                  :label="$t('auth.rememberMe')"
                  :binary="true"
                  class="remember-me-enhanced"
                />
              </div>

              <!-- Forgot Password mejorado -->
              <div class="relative group">
                <router-link
                  to="/forgot-password"
                  class="forgot-password-link-enhanced inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white dark:hover:text-white rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:border-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <BaseIcon
                    name="key"
                    class="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  {{ $t('auth.forgotPassword') }}
                  <BaseIcon
                    name="arrow-right"
                    class="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                  />
                </router-link>

                <!-- Tooltip decorativo -->
                <div
                  class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10"
                >
                  Recuperar acceso
                  <div
                    class="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-200"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <BaseButton
              type="submit"
              :loading="formState.isLoading"
              :disabled="!isFormValid || formState.isLoading"
              variant="primary"
              class="w-full mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <template #icon>
                <BaseIcon name="sign-in" class="w-4 h-4" />
              </template>
              {{ $t('auth.signIn') }}
            </BaseButton>

            <!-- Divider -->
            <div class="divider flex items-center mb-6">
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

            <!-- Google Sign In -->
            <BaseButton
              :loading="googleLoading"
              :disabled="googleLoading"
              variant="secondary"
              :outlined="true"
              class="w-full mb-6 !bg-white dark:!bg-gray-700 !text-gray-700 dark:!text-gray-200 !border-gray-300 dark:!border-gray-600 hover:!bg-gray-50 dark:hover:!bg-gray-600 hover:!border-gray-400 dark:hover:!border-gray-500 focus:!ring-2 focus:!ring-blue-500 focus:!ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 font-medium !py-3"
              @click="handleGoogleSignIn"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../stores/authStore'
import { useError } from '../../../composables/useError'
import { useLoading } from '../../../composables/useLoading'
import type { LoginRequest, FormError, AuthFormState } from '../../../types/api'
import {
  BaseInput,
  BasePasswordInput,
  BaseButton,
  BaseCheckbox,
  BaseIcon
} from '../../../components/common'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()
const { handleError } = useError()
const { isLoading: googleLoading, withLoading } = useLoading()

// Form data
const formData = reactive<LoginRequest>({
  email: '',
  password: '',
  rememberMe: false,
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

  return errors
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isFormValid = computed(() => {
  return (
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
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
    email: true,
    password: true
  }

  // Validate form
  formState.errors = validateForm()

  if (formState.errors.length > 0) {
    return
  }

  formState.isLoading = true

  try {
    await authStore.login(formData.email, formData.password)
    // Redirect to home page after login
    await router.push('/')
  } catch (error: unknown) {
    handleError(error)
  } finally {
    formState.isLoading = false
  }
}

const handleGoogleSignIn = async (): Promise<void> => {
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

.auth-wrapper {
  @apply relative;
}

.login-form {
  @apply space-y-6;
}

.form-options {
  @apply flex justify-between items-center;
}

.forgot-password-link {
  @apply text-sm font-medium transition-colors duration-200;
}

.divider {
  @apply relative text-center;
}

.signup-link {
  @apply text-center text-sm;
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

  .login-form {
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

  .login-form {
    @apply space-y-2;
  }

  .form-options {
    @apply flex-col space-y-3 items-start;
  }

  .forgot-password-link {
    @apply self-end;
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
.login-form {
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
