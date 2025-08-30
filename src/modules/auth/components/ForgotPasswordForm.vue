<template>
  <div class="auth-container max-w-6xl mx-auto">
    <div
      class="auth-wrapper bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden"
    >
      <div class="grid lg:grid-cols-5 min-h-[700px]">
        <!-- Panel izquierdo - Información visual -->
        <div
          class="lg:col-span-2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden"
        >
          <!-- Decoración de fondo -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-600/20"
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
                <BaseIcon name="key" class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Contenido -->
            <h1
              class="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight"
            >
              {{ $t('auth.recoverAccessTitle') }}
            </h1>
            <p class="text-purple-100 text-sm mb-4 leading-relaxed">
              {{ $t('auth.recoverAccessDescription') }}
            </p>

            <!-- Features -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-purple-100">
                  {{ $t('auth.secureProcess') }}
                </span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-purple-100">
                  {{ $t('auth.clearInstructions') }}
                </span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-purple-100">{{ $t('auth.noDataLoss') }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-white rounded-full"></div>
                <span class="text-purple-100">{{ $t('auth.support24h') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel derecho - Formulario -->
        <div class="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
          <form
            @submit.prevent="handleSubmit"
            class="forgot-password-form max-w-md mx-auto w-full space-y-6"
          >
            <!-- Header del formulario -->
            <div class="mb-6">
              <!-- Botón de volver atrás integrado -->
              <div class="flex items-center justify-between mb-4">
                <button
                  @click="() => $router.push('/login')"
                  class="group inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
                >
                  <BaseIcon
                    name="arrow-left"
                    class="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform duration-200"
                  />
                  {{ $t('auth.backToLogin') }}
                </button>
                <div class="text-right">
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ $t('auth.rememberedPassword') }}
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
                {{ $t('auth.forgotPassword') }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('auth.forgotPasswordDescription') }}
              </p>
            </div>

            <!-- Campo Email mejorado -->
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

            <!-- Success Message mejorado -->
            <div v-if="emailSent" class="success-container animate-fade-in">
              <div
                class="group relative bg-gradient-to-br from-green-50/90 to-emerald-100/50 dark:from-green-900/60 dark:to-emerald-800/40 backdrop-blur-sm rounded-2xl p-6 border border-green-200/80 dark:border-green-700/50 shadow-lg"
              >
                <!-- Decoración de fondo -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>

                <div class="relative text-center">
                  <!-- Icono animado -->
                  <div class="mb-4">
                    <div
                      class="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl shadow-lg animate-bounce-subtle"
                    >
                      <BaseIcon
                        name="check-circle"
                        class="w-8 h-8 text-white"
                      />
                    </div>
                  </div>

                  <h3
                    class="text-xl font-bold text-green-800 dark:text-green-200 mb-2"
                  >
                    {{ $t('auth.emailSentTitle') }}
                  </h3>
                  <p
                    class="text-sm text-green-600 dark:text-green-300 leading-relaxed mb-4"
                  >
                    {{ $t('auth.emailSentDescription') }}
                  </p>

                  <!-- Email enviado a -->
                  <div
                    class="inline-flex items-center px-3 py-2 bg-green-100/80 dark:bg-green-800/30 rounded-lg"
                  >
                    <BaseIcon
                      name="mail"
                      class="w-4 h-4 text-green-600 dark:text-green-400 mr-2"
                    />
                    <span
                      class="text-sm font-medium text-green-700 dark:text-green-300"
                    >
                      {{ formData.email }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button mejorado -->
            <BaseButton
              v-if="!emailSent"
              type="submit"
              :loading="formState.isLoading"
              :disabled="!isFormValid || formState.isLoading"
              variant="primary"
              class="w-full mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <template #icon>
                <BaseIcon name="mail" class="w-4 h-4" />
              </template>
              {{ $t('auth.sendResetEmail') }}
            </BaseButton>

            <!-- Resend Button mejorado -->
            <BaseButton
              v-if="emailSent"
              :loading="formState.isLoading"
              :disabled="formState.isLoading || !canResend"
              @click="handleResend"
              variant="secondary"
              class="w-full mb-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-400 disabled:to-gray-500 px-4 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <template #icon>
                <BaseIcon name="refresh-cw" class="w-4 h-4" />
              </template>
              {{ $t('auth.resendEmail') }}
            </BaseButton>

            <!-- Countdown Timer mejorado -->
            <div v-if="emailSent && !canResend" class="resend-timer-container">
              <div
                class="flex items-center justify-center space-x-2 p-3 bg-gray-50/80 dark:bg-gray-700/40 rounded-lg border border-gray-200/60 dark:border-gray-600/40"
              >
                <BaseIcon
                  name="clock"
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                />
                <span class="text-sm text-gray-600 dark:text-gray-300">
                  {{ $t('auth.resendIn') }}
                  <strong class="text-purple-600 dark:text-purple-400">
                    {{ resendCountdown }}s
                  </strong>
                </span>
              </div>
            </div>

            <!-- Enlaces adicionales -->
            <div class="additional-links space-y-4">
              <!-- Divider -->
              <div class="divider flex items-center">
                <div
                  class="flex-1 border-t border-gray-300/60 dark:border-gray-600/60"
                ></div>
                <span
                  class="px-6 text-sm text-gray-500 dark:text-gray-400 font-medium bg-white/60 dark:bg-gray-800/60 rounded-full"
                >
                  {{ $t('auth.needHelp') }}
                </span>
                <div
                  class="flex-1 border-t border-gray-300/60 dark:border-gray-600/60"
                ></div>
              </div>

              <!-- Support links - Mejorados para mejor simetría -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <router-link
                  to="/register"
                  class="group flex items-center justify-center px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl border border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 min-h-[44px]"
                >
                  <BaseIcon
                    name="user-plus"
                    class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
                  />
                  <span class="text-center">
                    {{ $t('auth.createNewAccount') }}
                  </span>
                </router-link>
                <router-link
                  to="/contact"
                  class="group flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 min-h-[44px]"
                >
                  <BaseIcon
                    name="help-circle"
                    class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
                  />
                  <span class="text-center">
                    {{ $t('auth.technicalSupport') }}
                  </span>
                </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
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
import { BaseIcon, BaseInput, BaseButton } from '../../../components/common'

const router = useRouter()
const authStore = useAuthStore()
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
/* Animaciones personalizadas */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

/* Efectos de hover mejorados */
.auth-container {
  @apply transition-all duration-300 ease-out;
}

.auth-wrapper {
  @apply transition-all duration-300 ease-out;
}

.auth-wrapper:hover {
  @apply shadow-2xl;
}

/* Botones mejorados */
.forgot-password-form button {
  @apply transition-all duration-300 ease-out;
}

.forgot-password-form button:hover {
  @apply transform scale-[1.02];
}

.forgot-password-form button:active {
  @apply transform scale-[0.98];
}

/* Container de timer mejorado */
.resend-timer-container {
  @apply animate-fade-in;
}

/* Enlaces de soporte */
.additional-links a {
  @apply transition-all duration-200 ease-out;
}

.additional-links a:hover {
  @apply transform scale-[1.02] shadow-md;
}

/* Divider animado */
.divider {
  @apply animate-fade-in;
}

/* Efectos de glassmorphism */
.success-container {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Mejoras responsive */
@media (max-width: 768px) {
  .auth-wrapper {
    @apply mx-4 rounded-2xl;
  }

  .grid {
    @apply grid-cols-1;
  }

  .lg\:col-span-2 {
    @apply min-h-[200px] rounded-t-2xl;
  }

  .lg\:col-span-3 {
    @apply p-4 rounded-b-2xl;
  }
}

/* Animación de entrada para elementos */
.forgot-password-form > * {
  animation: fadeInUp 0.4s ease-out forwards;
  opacity: 0;
}

.forgot-password-form > *:nth-child(1) {
  animation-delay: 0.1s;
}
.forgot-password-form > *:nth-child(2) {
  animation-delay: 0.2s;
}
.forgot-password-form > *:nth-child(3) {
  animation-delay: 0.3s;
}
.forgot-password-form > *:nth-child(4) {
  animation-delay: 0.4s;
}
.forgot-password-form > *:nth-child(5) {
  animation-delay: 0.5s;
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
