<template>
  <AuthLayout>
    <div
      class="min-h-screen flex items-center justify-center relative bg-gray-50 dark:bg-gray-900"
    >
      <!-- Fondo animado -->
      <AnimatedBackground />

      <!-- Contenido principal -->
      <div class="relative z-10 w-full px-4">
        <LoginForm />
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { AuthLayout } from '../layouts'
import { LoginForm } from '../modules/auth'
import { AnimatedBackground, BaseIcon } from '../components/common'

const router = useRouter()
const authStore = useAuthStore()

// Redirect if already authenticated
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await router.replace('/')
  }
})
</script>
