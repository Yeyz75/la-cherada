<template>
  <AuthLayout>
    <div
      class="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <!-- Fondo animado -->
      <AnimatedBackground />

      <!-- Contenido principal -->
      <div class="relative z-10 w-full px-4">
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
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await router.replace('/')
  }
})
</script>
