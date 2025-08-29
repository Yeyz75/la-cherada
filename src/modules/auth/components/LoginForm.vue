<template>
  <div class="max-w-md mx-auto">
    <form
      @submit.prevent="handleSubmit"
      class="login-form bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
    >
      <!-- Título del formulario -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg"
        >
          <BaseIcon name="user" class="w-8 h-8 text-white" />
        </div>
        <h2
          class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          {{ $t('auth.signIn') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mt-2">
          {{ $t('auth.welcomeBack') }}
        </p>
      </div>

      <!-- Campo Email -->
      <BaseInput
        v-model="formData.email"
        type="email"
        :label="$t('auth.email')"
        :placeholder="$t('auth.emailPlaceholder')"
        :error="
          formErrors.email && formState.touched.email ? formErrors.email : ''
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

      <!-- Remember Me & Forgot Password -->
      <div class="form-options flex justify-between items-center mb-6">
        <BaseCheckbox
          v-model="formData.rememberMe"
          :label="$t('auth.rememberMe')"
          :binary="true"
        />

        <router-link
          to="/forgot-password"
          class="forgot-password-link text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          {{ $t('auth.forgotPassword') }}
        </router-link>
      </div>

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        :loading="formState.isLoading"
        :disabled="!isFormValid || formState.isLoading"
        variant="primary"
        class="w-full mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 text-white font-semibold rounded-xl"
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
        class="w-full mb-4 !bg-white !text-gray-700 !border-gray-300 hover:!bg-gray-50 hover:!border-gray-400 focus:!ring-2 focus:!ring-blue-500 focus:!ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 font-medium !py-3"
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

      <!-- Sign Up Link -->
      <div class="signup-link text-center">
        <span class="text-gray-600 dark:text-gray-300">{{
          $t('auth.noAccount')
        }}</span>
        <router-link
          to="/register"
          class="link ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
        >
          {{ $t('auth.signUp') }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
    // Redirect to dashboard or previous route
    router.push('/dashboard')
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
      router.push('/dashboard')
    } catch (error: unknown) {
      handleError(error)
    }
  })
}
</script>

<style scoped>
.login-form {
  @apply space-y-5;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-semibold text-slate-700 dark:text-slate-200;
}

.required {
  @apply text-red-600 dark:text-red-400;
}

.form-options {
  @apply flex justify-between items-center mt-4 mb-6;
}

.checkbox-wrapper {
  @apply flex items-center space-x-2;
}

.checkbox-label {
  @apply text-sm text-slate-600 dark:text-slate-300 cursor-pointer;
}

.forgot-password-link {
  @apply text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium;
}

.login-btn {
  @apply mt-6 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 focus:ring-blue-500;
}

.divider {
  @apply relative text-center my-6;
}

.divider::before {
  @apply absolute inset-0 flex items-center;
  content: '';
}

.divider::before::after {
  @apply flex-1 border-t border-slate-300 dark:border-slate-600;
  content: '';
}

.divider span {
  @apply bg-white dark:bg-slate-800 px-4 text-sm text-slate-500 dark:text-slate-400 font-medium;
}

.signup-link {
  @apply text-center text-sm text-slate-600 dark:text-slate-300 mt-6;
}

.signup-link .link {
  @apply text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold ml-1 transition-colors;
}

/* Override PrimeVue styles for better dark mode support */
:deep(.p-inputtext) {
  @apply bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100;
}

:deep(.p-inputtext:focus) {
  @apply border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20;
}

:deep(.p-password .p-inputtext) {
  @apply bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100;
}

:deep(.p-button) {
  @apply font-semibold;
}

:deep(.p-checkbox .p-checkbox-box) {
  @apply bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  @apply bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500;
}

:deep(.p-error) {
  @apply text-red-600 dark:text-red-400 font-medium;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .form-options {
    @apply flex-col space-y-3 items-start;
  }

  .forgot-password-link {
    @apply self-end;
  }

  .login-form {
    @apply space-y-4;
  }
}
</style>
