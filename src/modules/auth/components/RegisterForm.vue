<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <!-- Campo Display Name -->
    <div class="form-group">
      <label for="displayName" class="form-label">
        {{ $t('auth.displayName') }} <span class="required">*</span>
      </label>
      <InputText
        id="displayName"
        v-model="formData.displayName"
        type="text"
        :placeholder="$t('auth.displayNamePlaceholder')"
        :class="{
          'p-invalid': formErrors.displayName && formState.touched.displayName
        }"
        @blur="markFieldAsTouched('displayName')"
        class="w-full"
        autocomplete="name"
      />
      <small
        v-if="formErrors.displayName && formState.touched.displayName"
        class="p-error"
      >
        {{ formErrors.displayName }}
      </small>
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
        :feedback="true"
        :strength-meter="true"
        toggle-mask
        class="w-full"
        input-class="w-full"
        autocomplete="new-password"
      />
      <small
        v-if="formErrors.password && formState.touched.password"
        class="p-error"
      >
        {{ formErrors.password }}
      </small>
    </div>

    <!-- Campo Confirm Password -->
    <div class="form-group">
      <label for="confirmPassword" class="form-label">
        {{ $t('auth.confirmPassword') }} <span class="required">*</span>
      </label>
      <Password
        id="confirmPassword"
        v-model="formData.confirmPassword"
        :placeholder="$t('auth.confirmPasswordPlaceholder')"
        :class="{
          'p-invalid':
            formErrors.confirmPassword && formState.touched.confirmPassword
        }"
        @blur="markFieldAsTouched('confirmPassword')"
        :feedback="false"
        toggle-mask
        class="w-full"
        input-class="w-full"
        autocomplete="new-password"
      />
      <small
        v-if="formErrors.confirmPassword && formState.touched.confirmPassword"
        class="p-error"
      >
        {{ formErrors.confirmPassword }}
      </small>
    </div>

    <!-- Accept Terms -->
    <div class="form-group">
      <div class="checkbox-wrapper">
        <Checkbox
          id="acceptTerms"
          v-model="formData.acceptTerms"
          :binary="true"
          :class="{
            'p-invalid': formErrors.acceptTerms && formState.touched.acceptTerms
          }"
          @change="markFieldAsTouched('acceptTerms')"
        />
        <label for="acceptTerms" class="checkbox-label">
          {{ $t('auth.acceptTerms') }}
          <router-link to="/terms" class="terms-link" target="_blank">
            {{ $t('auth.termsAndConditions') }}
          </router-link>
          <span class="required">*</span>
        </label>
      </div>
      <small
        v-if="formErrors.acceptTerms && formState.touched.acceptTerms"
        class="p-error block mt-2"
      >
        {{ formErrors.acceptTerms }}
      </small>
    </div>

    <!-- Submit Button -->
    <Button
      type="submit"
      :label="$t('auth.createAccount')"
      :loading="formState.isLoading"
      :disabled="!isFormValid || formState.isLoading"
      class="w-full register-btn"
      icon="pi pi-user-plus"
    />

    <!-- Divider -->
    <div class="divider">
      <span>{{ $t('auth.orContinueWith') }}</span>
    </div>

    <!-- Google Sign Up -->
    <GoogleAuthButton :loading="googleLoading" @click="handleGoogleSignUp" />

    <!-- Sign In Link -->
    <div class="signin-link">
      <span>{{ $t('auth.alreadyHaveAccount') }}</span>
      <router-link to="/login" class="link">
        {{ $t('auth.signIn') }}
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
import type {
  RegisterRequest,
  FormError,
  AuthFormState
} from '../../../types/api'
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
const formData = reactive<RegisterRequest>({
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

  // Display name validation
  if (!formData.displayName.trim()) {
    errors.push({ field: 'displayName', message: 'El nombre es obligatorio' })
  } else if (formData.displayName.trim().length < 2) {
    errors.push({
      field: 'displayName',
      message: 'El nombre debe tener al menos 2 caracteres'
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
    formData.displayName.trim() !== '' &&
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
    displayName: true,
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
    await authStore.register(
      formData.email,
      formData.password,
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
.register-form {
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

.checkbox-wrapper {
  @apply flex items-start space-x-2;
}

.checkbox-label {
  @apply text-sm text-gray-600 dark:text-gray-400 cursor-pointer leading-relaxed;
}

.terms-link {
  @apply text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors mx-1;
}

.register-btn {
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

.signin-link {
  @apply text-center text-sm text-gray-600 dark:text-gray-400 mt-6;
}

.signin-link .link {
  @apply text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium ml-1 transition-colors;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .checkbox-wrapper {
    @apply items-start;
  }

  .checkbox-label {
    @apply text-xs leading-relaxed;
  }
}
</style>
