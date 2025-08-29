<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <!-- Campo Email -->
    <div class="form-group">
      <label for="email" class="form-label">
        {{ $t('auth.email') }} <span class="required">*</span>
      </label>
      <InputText
        id="email"
        v-model="formData.email"
        type="email"
        :placeholder="$t('auth.emailPlaceholder')"
        :class="{ 'p-invalid': formErrors.email && formState.touched.email }"
        @blur="markFieldAsTouched('email')"
        class="w-full"
        autocomplete="email"
      />
      <small v-if="formErrors.email && formState.touched.email" class="p-error">
        {{ formErrors.email }}
      </small>
    </div>

    <!-- Campo Password -->
    <div class="form-group">
      <label for="password" class="form-label">
        {{ $t('auth.password') }} <span class="required">*</span>
      </label>
      <Password
        id="password"
        v-model="formData.password"
        :placeholder="$t('auth.passwordPlaceholder')"
        :class="{
          'p-invalid': formErrors.password && formState.touched.password
        }"
        @blur="markFieldAsTouched('password')"
        :feedback="false"
        toggle-mask
        class="w-full"
        input-class="w-full"
        autocomplete="current-password"
      />
      <small
        v-if="formErrors.password && formState.touched.password"
        class="p-error"
      >
        {{ formErrors.password }}
      </small>
    </div>

    <!-- Remember Me & Forgot Password -->
    <div class="form-options">
      <div class="checkbox-wrapper">
        <Checkbox
          id="rememberMe"
          v-model="formData.rememberMe"
          :binary="true"
        />
        <label for="rememberMe" class="checkbox-label">
          {{ $t('auth.rememberMe') }}
        </label>
      </div>

      <router-link to="/forgot-password" class="forgot-password-link">
        {{ $t('auth.forgotPassword') }}
      </router-link>
    </div>

    <!-- Submit Button -->
    <Button
      type="submit"
      :label="$t('auth.signIn')"
      :loading="formState.isLoading"
      :disabled="!isFormValid || formState.isLoading"
      class="w-full login-btn"
      icon="pi pi-sign-in"
    />

    <!-- Divider -->
    <div class="divider">
      <span>{{ $t('auth.orContinueWith') }}</span>
    </div>

    <!-- Google Sign In -->
    <GoogleAuthButton :loading="googleLoading" @click="handleGoogleSignIn" />

    <!-- Sign Up Link -->
    <div class="signup-link">
      <span>{{ $t('auth.noAccount') }}</span>
      <router-link to="/register" class="link">
        {{ $t('auth.signUp') }}
      </router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/authStore'
import { useError } from '../../../composables/useError'
import { useLoading } from '../../../composables/useLoading'
import type { LoginRequest, FormError, AuthFormState } from '../../../types/api'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import GoogleAuthButton from '../../../components/auth/GoogleAuthButton.vue'

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
