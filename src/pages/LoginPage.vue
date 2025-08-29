<template>
  <MainLayout>
    <AuthContainer
      :title="$t('auth.welcomeBack')"
      :subtitle="$t('auth.signInToAccount')"
      :show-back-button="true"
      back-route="/"
    >
      <LoginForm />
    </AuthContainer>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import MainLayout from '../layouts/MainLayout.vue'
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
