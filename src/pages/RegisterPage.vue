<template>
  <AuthLayout>
    <div
      class="min-h-screen flex items-center justify-center relative bg-gray-50 dark:bg-gray-900"
    >
      <!-- Fondo animado -->
      <AnimatedBackground />

      <!-- Botón de volver flotante -->
      <div class="fixed top-6 left-6 z-20">
        <button
          @click="() => $router.push('/')"
          class="group inline-flex items-center justify-center w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 hover:bg-white dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <BaseIcon
            name="arrow-left"
            class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 group-hover:-translate-x-0.5 transition-all duration-200"
          />
        </button>
      </div>

      <!-- Contenido principal -->
      <div class="relative z-10 w-full px-4">
        <RegisterForm />
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { AuthLayout } from '../layouts'
import { RegisterForm } from '../modules/auth'
import { AnimatedBackground, BaseIcon } from '../components/common'

const router = useRouter()
const authStore = useAuthStore()

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace('/dashboard')
  }
})
</script>
