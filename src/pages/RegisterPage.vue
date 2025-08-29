<template>
  <AuthLayout>
    <AuthContainer
      :title="$t('auth.createAccount')"
      :subtitle="$t('auth.joinCommunity')"
      :show-back-button="true"
      back-route="/"
    >
      <RegisterForm />
    </AuthContainer>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { AuthLayout } from '../layouts'
import { AuthContainer } from '../components'
import { RegisterForm } from '../modules/auth'

const router = useRouter()
const authStore = useAuthStore()

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace('/dashboard')
  }
})
</script>
