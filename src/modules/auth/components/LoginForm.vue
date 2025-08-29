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
  @apply space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300;
}

.required {
  @apply text-red-500;
}

.form-options {
  @apply flex justify-between items-center;
}

.checkbox-wrapper {
  @apply flex items-center space-x-2;
}

.checkbox-label {
  @apply text-sm text-gray-600 dark:text-gray-400 cursor-pointer;
}

.forgot-password-link {
  @apply text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors;
}

.login-btn {
  @apply mt-6;
}

.divider {
  @apply relative text-center my-6;
}

.divider::before {
  @apply absolute inset-0 flex items-center;
  content: '';
}

.divider::before::after {
  @apply flex-1 border-t border-gray-300 dark:border-gray-600;
  content: '';
}

.divider span {
  @apply bg-white dark:bg-gray-800 px-3 text-sm text-gray-500 dark:text-gray-400;
}

.signup-link {
  @apply text-center text-sm text-gray-600 dark:text-gray-400 mt-6;
}

.signup-link .link {
  @apply text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium ml-1 transition-colors;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .form-options {
    @apply flex-col space-y-3 items-start;
  }

  .forgot-password-link {
    @apply self-end;
  }
}
</style>
