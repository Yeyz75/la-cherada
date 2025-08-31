<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center relative">
        <!-- Back button in top left -->
        <div class="absolute left-0 top-0">
          <BaseButton
            variant="secondary"
            size="small"
            @click="() => $router.push('/')"
          >
            <template #icon>
              <BaseIcon name="arrow-left" class="w-4 h-4" />
            </template>
            Volver
          </BaseButton>
        </div>

        <div class="flex justify-center">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg mb-6"
          >
            <BaseIcon name="user" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
          Bienvenido de vuelta
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Inicia sesión en tu cuenta
        </p>
        <div class="mt-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            ¿No tienes una cuenta?
          </span>
          <router-link
            to="/register"
            class="ml-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Regístrate
          </router-link>
        </div>
      </div>

      <!-- Form -->
      <BaseCard class="p-8 shadow-xl border-0">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <BaseInput
            v-model="formData.email"
            type="email"
            label="Correo electrónico"
            placeholder="tu@ejemplo.com"
            :error="
              formErrors.email && formState.touched.email
                ? formErrors.email
                : ''
            "
            :required="true"
            @blur="markFieldAsTouched('email')"
          />

          <!-- Password -->
          <BasePasswordInput
            v-model="formData.password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
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

          <!-- Remember me and Forgot password -->
          <div class="flex items-center justify-between">
            <BaseCheckbox v-model="formData.rememberMe" :binary="true">
              <template #label>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  Recordarme
                </span>
              </template>
            </BaseCheckbox>
            <router-link
              to="/forgot-password"
              class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            :loading="formState.isLoading"
            :disabled="!isFormValid || formState.isLoading"
            variant="primary"
            class="w-full py-3"
          >
            <template #icon>
              <BaseIcon name="login" class="w-5 h-5" />
            </template>
            Iniciar sesión
          </BaseButton>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-600"
              ></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span
                class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                O continúa con
              </span>
            </div>
          </div>

          <!-- Google Sign In -->
          <BaseButton
            :loading="googleLoading"
            :disabled="googleLoading"
            variant="secondary"
            outlined
            class="w-full py-3"
            @click="handleGoogleSignIn"
          >
            <template #icon>
              <BaseIcon
                name="google"
                class="w-5 h-5 text-red-500"
                v-if="!googleLoading"
              />
            </template>
            Continuar con Google
          </BaseButton>
        </form>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
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
  BaseIcon,
  BaseCard
} from '../../../components/common'

const authStore = useAuthStore()
const router = useRouter()
const { handleError } = useError()
const { isLoading: googleLoading, withLoading } = useLoading()

// Form data
const formData = reactive<LoginRequest & { rememberMe: boolean }>({
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
      message: 'El correo electrónico es requerido'
    })
  } else if (!isValidEmail(formData.email)) {
    errors.push({
      field: 'email',
      message: 'El correo electrónico no es válido'
    })
  }

  // Password validation
  if (!formData.password.trim()) {
    errors.push({
      field: 'password',
      message: 'La contraseña es requerida'
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
/* Animaciones suaves para el formulario */
.max-w-md {
  animation: fadeInUp 0.6s ease-out;
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

/* Hover effects para el icono principal */
.inline-flex:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>
