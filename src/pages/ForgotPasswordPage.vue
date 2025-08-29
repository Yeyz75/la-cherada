<template>
  <AuthLayout>
    <div
      class="min-h-screen flex items-center justify-center relative bg-gray-50 dark:bg-gray-900"
    >
      <!-- Fondo animado -->
      <AnimatedBackground />

      <!-- Contenido principal -->
      <div class="relative z-10 w-full max-w-md px-4">
        <!-- Botón de volver mejorado -->
        <div class="mb-6 flex justify-start">
          <button
            @click="() => $router.push('/login')"
            class="group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <BaseIcon
              name="arrow-left"
              class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
            />
            {{ $t('common.back') }}
          </button>
        </div>

        <!-- Formulario de recuperación de contraseña -->
        <ForgotPasswordForm />
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { AuthLayout } from '../layouts'
import { ForgotPasswordForm } from '../modules/auth'
import { AnimatedBackground } from '../components/common'

const router = useRouter()
const authStore = useAuthStore()

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace('/dashboard')
  }
})
</script>
