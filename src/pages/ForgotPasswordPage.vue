<template>
  <AuthLayout>
    <AuthContainer
      :title="$t('auth.resetPassword')"
      :subtitle="$t('auth.recoverAccount')"
      :show-back-button="true"
      back-route="/login"
    >
      <ForgotPasswordForm />
    </AuthContainer>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { AuthLayout } from '../layouts'
import { AuthContainer } from '../components'
import { ForgotPasswordForm } from '../modules/auth'

const router = useRouter()
const authStore = useAuthStore()

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace('/dashboard')
  }
})
</script>
