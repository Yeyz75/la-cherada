<template>
  <AuthLayout>
    <AuthContainer
      :title="$t('auth.welcomeBack')"
      :subtitle="$t('auth.signInToAccount')"
      :show-back-button="true"
      back-route="/"
    >
      <LoginForm />
    </AuthContainer>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { AuthLayout } from '../layouts'
import { AuthContainer } from '../components'
import { LoginForm } from '../modules/auth'

const router = useRouter()
const authStore = useAuthStore()

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace('/dashboard')
  }
})
</script>
