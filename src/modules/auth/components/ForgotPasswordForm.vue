<template>
  <form @submit.prevent="handleSubmit" class="forgot-password-form">
    <!-- Descripción -->
    <div class="description">
      <p class="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
        {{ $t('auth.forgotPasswordDescription') }}
      </p>
    </div>

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

    <!-- Success Message -->
    <div v-if="emailSent" class="success-message">
      <div class="success-card">
        <BaseIcon name="check-circle" class="success-icon" />
        <h3 class="success-title">
          {{ $t('auth.emailSentTitle') }}
        </h3>
        <p class="success-description">
          {{ $t('auth.emailSentDescription') }}
        </p>
      </div>
    </div>

    <!-- Submit Button -->
    <Button
      v-if="!emailSent"
      type="submit"
      :label="$t('auth.sendResetEmail')"
      :loading="formState.isLoading"
      :disabled="!isFormValid || formState.isLoading"
      class="w-full reset-btn"
      icon="pi pi-envelope"
    />

    <!-- Resend Button -->
    <Button
      v-if="emailSent"
      :label="$t('auth.resendEmail')"
      :loading="formState.isLoading"
      :disabled="formState.isLoading || !canResend"
      @click="handleResend"
      class="w-full resend-btn"
      severity="secondary"
      icon="pi pi-refresh"
    />

    <!-- Countdown Timer -->
    <div v-if="emailSent && !canResend" class="resend-timer">
      <small class="text-gray-500">
        {{ $t('auth.resendIn') }} {{ resendCountdown }}s
      </small>
    </div>

    <!-- Back to Login -->
    <div class="back-to-login">
      <router-link to="/login" class="link">
        <BaseIcon name="arrow-left" class="inline mr-2" />
        {{ $t('auth.backToLogin') }}
      </router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/authStore'
import { useError } from '../../../composables/useError'
import type {
  ForgotPasswordRequest,
  FormError,
  AuthFormState
} from '../../../types/api'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { BaseIcon } from '../../../components/common'

const authStore = useAuthStore()
const router = useRouter()
const { handleError } = useError()

// Form data
const formData = reactive<ForgotPasswordRequest>({
  email: '',
  timestamp: new Date()
})

// Form state
const formState = reactive<AuthFormState>({
  isLoading: false,
  errors: [],
  touched: {}
})

// Email sent state
const emailSent = ref<boolean>(false)
const canResend = ref<boolean>(false)
const resendCountdown = ref<number>(60)
let countdownTimer: NodeJS.Timeout | null = null

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

  return errors
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isFormValid = computed(() => {
  return formData.email.trim() !== '' && formState.errors.length === 0
})

// Form methods
const markFieldAsTouched = (field: string): void => {
  formState.touched[field] = true
  // Re-validate when field is touched
  formState.errors = validateForm()
}

const startResendCountdown = (): void => {
  canResend.value = false
  resendCountdown.value = 60

  countdownTimer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      canResend.value = true
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }
  }, 1000)
}

const handleSubmit = async (): Promise<void> => {
  // Mark all fields as touched
  formState.touched = {
    email: true
  }

  // Validate form
  formState.errors = validateForm()

  if (formState.errors.length > 0) {
    return
  }

  formState.isLoading = true

  try {
    await authStore.resetPassword(formData.email)
    emailSent.value = true
    startResendCountdown()
  } catch (error: unknown) {
    handleError(error)
  } finally {
    formState.isLoading = false
  }
}

const handleResend = async (): Promise<void> => {
  if (!canResend.value) {
    return
  }

  formState.isLoading = true

  try {
    await authStore.resetPassword(formData.email)
    startResendCountdown()
  } catch (error: unknown) {
    handleError(error)
  } finally {
    formState.isLoading = false
  }
}

// Cleanup
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
})
</script>

<style scoped>
.forgot-password-form {
  @apply space-y-6;
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

.success-message {
  @apply my-6;
}

.success-card {
  @apply bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center;
}

.success-icon {
  @apply w-12 h-12 text-green-500 mx-auto mb-4;
}

.success-title {
  @apply text-lg font-semibold text-green-800 dark:text-green-200 mb-2;
}

.success-description {
  @apply text-sm text-green-600 dark:text-green-300;
}

.reset-btn {
  @apply mt-6;
}

.resend-btn {
  @apply mt-4;
}

.resend-timer {
  @apply text-center mt-3;
}

.back-to-login {
  @apply text-center mt-6;
}

.back-to-login .link {
  @apply text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors inline-flex items-center;
}

/* Animation for success message */
.success-message {
  animation: fadeInUp 0.5s ease-out;
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
</style>
