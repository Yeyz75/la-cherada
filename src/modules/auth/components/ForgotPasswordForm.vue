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
            class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg mb-6"
          >
            <BaseIcon name="key" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">
          ¿Olvidaste tu contraseña?
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Te enviaremos un enlace para restablecer tu contraseña
        </p>
        <div class="mt-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            ¿Recuerdas tu contraseña?
          </span>
          <router-link
            to="/login"
            class="ml-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Iniciar sesión
          </router-link>
        </div>
      </div>

      <!-- Form -->
      <BaseCard class="p-8 shadow-xl border-0">
        <div v-if="!emailSent">
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

            <!-- Info message -->
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg p-4"
            >
              <div class="flex items-start">
                <BaseIcon
                  name="info"
                  class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                />
                <div class="text-sm text-blue-700 dark:text-blue-300">
                  Te enviaremos un correo con las instrucciones para restablecer
                  tu contraseña de forma segura.
                </div>
              </div>
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
                <BaseIcon name="mail" class="w-5 h-5" />
              </template>
              Enviar correo de recuperación
            </BaseButton>
          </form>
        </div>

        <!-- Success state -->
        <div v-else class="text-center space-y-4">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full"
          >
            <BaseIcon
              name="check"
              class="w-8 h-8 text-green-600 dark:text-green-400"
            />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            ¡Correo enviado!
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Revisa tu bandeja de entrada en
            <strong>{{ formData.email }}</strong> y sigue las instrucciones.
          </p>
          <BaseButton variant="secondary" @click="resetForm" class="w-full">
            Enviar de nuevo
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/authStore'
import { useError } from '../../../composables/useError'
import type { FormError, AuthFormState } from '../../../types/api'
import {
  BaseInput,
  BaseButton,
  BaseIcon,
  BaseCard
} from '../../../components/common'

const authStore = useAuthStore()
const router = useRouter()
const { handleError } = useError()

// Form data
const formData = reactive({
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
const emailSent = ref(false)

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
  } catch (error: unknown) {
    handleError(error)
  } finally {
    formState.isLoading = false
  }
}

const resetForm = (): void => {
  emailSent.value = false
  formData.email = ''
  formState.touched = {}
  formState.errors = []
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
