<template>
  <div class="auth-container max-w-6xl mx-auto">
    <div
      class="auth-wrapper bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden"
    >
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
            class="register-form max-w-md mx-auto w-full space-y-2"
          >
            <!-- Header del formulario -->
            <div class="mb-3">
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

            <!-- Accept Terms - Diseño mejorado y simétrico -->
            <div class="mb-4">
              <div
                class="group relative bg-gradient-to-br from-gray-50/90 to-gray-100/50 dark:from-gray-700/60 dark:to-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/80 dark:border-gray-600/50 hover:shadow-lg hover:border-blue-300/60 dark:hover:border-blue-500/40 transition-all duration-300 ease-out"
                :class="{
                  '!border-red-300 dark:!border-red-500 !bg-gradient-to-br !from-red-50/80 !to-red-100/40 dark:!from-red-900/20 dark:!to-red-800/10 shadow-red-100 dark:shadow-red-900/20':
                    formErrors.acceptTerms && formState.touched.acceptTerms,
                  'shadow-md hover:shadow-xl border-blue-200/60 dark:border-blue-600/40':
                    formData.acceptTerms && !formErrors.acceptTerms
                }"
              >
                <!-- Decoración de fondo -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>

                <div class="relative flex items-start space-x-4">
                  <!-- Custom Checkbox mejorado -->
                  <div
                    class="terms-checkbox-container relative flex-shrink-0 mt-1"
                  >
                    <input
                      v-model="formData.acceptTerms"
                      type="checkbox"
                      id="acceptTerms"
                      class="peer sr-only"
                      @change="markFieldAsTouched('acceptTerms')"
                    />
                    <label
                      for="acceptTerms"
                      class="relative flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-lg cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-blue-500 peer-checked:border-transparent peer-checked:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
                      :class="{
                        '!border-red-400 dark:!border-red-500 shadow-red-200 dark:shadow-red-800':
                          formErrors.acceptTerms &&
                          formState.touched.acceptTerms,
                        'ring-4 ring-blue-500/20 dark:ring-blue-400/20':
                          formData.acceptTerms && !formErrors.acceptTerms
                      }"
                    >
                      <!-- Checkmark Icon con animación -->
                      <BaseIcon
                        name="check"
                        class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-all duration-200 transform peer-checked:scale-100 scale-75"
                      />

                      <!-- Efecto de ripple -->
                      <div
                        class="absolute inset-0 rounded-lg opacity-0 peer-checked:animate-ping peer-checked:opacity-75 bg-gradient-to-r from-green-500/30 to-blue-500/30"
                      ></div>
                    </label>
                  </div>

                  <!-- Terms Text mejorado -->
                  <div class="flex-1 min-w-0">
                    <label
                      for="acceptTerms"
                      class="block text-sm text-gray-700 dark:text-gray-200 leading-relaxed cursor-pointer select-none"
                    >
                      <span class="font-medium">{{
                        $t('auth.acceptTerms')
                      }}</span>
                      <router-link
                        to="/terms"
                        class="terms-link-animation inline-flex items-center ml-1 px-2 py-0.5 text-blue-600 hover:text-white dark:text-blue-400 dark:hover:text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
                        target="_blank"
                        @click.stop
                      >
                        {{ $t('auth.termsAndConditions') }}
                        <BaseIcon
                          name="external-link"
                          class="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </router-link>
                      <span class="text-red-500 ml-1 font-bold text-base">
                        *
                      </span>
                    </label>

                    <!-- Descripción adicional mejorada -->
                    <p
                      class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed"
                    >
                      {{ $t('auth.termsDescription') }}
                    </p>

                    <!-- Indicador visual de estado -->
                    <div
                      v-if="formData.acceptTerms && !formErrors.acceptTerms"
                      class="flex items-center mt-2 space-x-2 text-green-600 dark:text-green-400"
                    >
                      <BaseIcon name="check-circle" class="w-3 h-3" />
                      <span class="text-xs font-medium">
                        Términos aceptados
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Error message mejorado -->
                <div
                  v-if="formErrors.acceptTerms && formState.touched.acceptTerms"
                  class="mt-3 flex items-center space-x-2 p-2 bg-red-50/80 dark:bg-red-900/20 rounded-lg border border-red-200/50 dark:border-red-800/30"
                >
                  <BaseIcon
                    name="alert-circle"
                    class="w-4 h-4 text-red-500 flex-shrink-0 animate-pulse"
                  />
                  <p class="text-sm text-red-600 dark:text-red-400 font-medium">
                    {{ formErrors.acceptTerms }}
                  </p>
                </div>
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

/* Custom Terms Checkbox Styles */
.terms-checkbox-container {
  position: relative;
}

.terms-checkbox-container input[type='checkbox']:checked + label {
  transform: scale(1.02);
}

.terms-checkbox-container label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.terms-checkbox-container label::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 6px;
  background: transparent;
  transition: all 0.2s ease;
}

.terms-checkbox-container input[type='checkbox']:checked + label::before {
  background: linear-gradient(45deg, #10b981, #3b82f6);
  opacity: 0.1;
}

.terms-checkbox-container:hover label::before {
  background: rgba(59, 130, 246, 0.05);
}

/* Terms link animation */
.terms-link-animation {
  position: relative;
  overflow: hidden;
}

.terms-link-animation::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  transition: width 0.3s ease;
}

.terms-link-animation:hover::after {
  width: 100%;
}
</style>
