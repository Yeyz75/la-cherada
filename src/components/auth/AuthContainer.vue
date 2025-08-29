<template>
  <div class="auth-container">
    <!-- Background decorativo -->
    <div class="auth-background">
      <div class="auth-background-pattern"></div>
    </div>

    <!-- Container principal -->
    <div class="auth-content">
      <!-- Botón de volver -->
      <div class="auth-back-button" v-if="showBackButton">
        <Button
          icon="pi pi-arrow-left"
          :label="$t('common.back')"
          severity="secondary"
          text
          @click="handleBack"
          class="back-btn"
        />
      </div>

      <!-- Card principal -->
      <Card class="auth-card">
        <!-- Header con logo -->
        <template #header>
          <div class="auth-header">
            <div class="auth-logo">
              <BaseIcon name="logo" size="48" />
            </div>
            <h2 class="auth-title">{{ title }}</h2>
            <p class="auth-subtitle" v-if="subtitle">{{ subtitle }}</p>
          </div>
        </template>

        <!-- Contenido del formulario -->
        <template #content>
          <div class="auth-form">
            <slot />
          </div>
        </template>

        <!-- Footer con enlaces adicionales -->
        <template #footer>
          <div class="auth-footer" v-if="$slots.footer">
            <slot name="footer" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { BaseIcon } from '../common'

interface Props {
  title: string
  subtitle?: string
  showBackButton?: boolean
  backRoute?: string
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: true,
  backRoute: '/'
})

const router = useRouter()

const handleBack = (): void => {
  router.push(props.backRoute)
}
</script>

<style scoped>
.auth-container {
  @apply min-h-screen flex items-center justify-center relative;
  background: linear-gradient(
    135deg,
    var(--primary-50) 0%,
    var(--primary-100) 100%
  );
}

.auth-background {
  @apply absolute inset-0 overflow-hidden;
}

.auth-background-pattern {
  @apply absolute inset-0 opacity-10;
  background-image:
    radial-gradient(circle at 25% 25%, var(--primary-400) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, var(--primary-300) 0%, transparent 50%);
}

.auth-content {
  @apply relative z-10 w-full max-w-md px-4;
}

.auth-back-button {
  @apply mb-6;
}

.back-btn {
  @apply text-blue-700 hover:text-blue-800 transition-colors;
}

.auth-card {
  @apply shadow-2xl backdrop-blur-sm;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-header {
  @apply text-center py-6 px-6 border-b border-blue-100;
}

.auth-logo {
  @apply flex justify-center mb-4;
}

.auth-title {
  @apply text-2xl font-bold text-gray-800 mb-2;
}

.auth-subtitle {
  @apply text-gray-600 text-sm;
}

.auth-form {
  @apply p-6;
}

.auth-footer {
  @apply px-6 pb-6 pt-0 border-t border-gray-100 text-center;
}

/* Responsive */
@media (max-width: 640px) {
  .auth-card {
    @apply mx-4;
  }

  .auth-title {
    @apply text-xl;
  }

  .auth-form {
    @apply p-4;
  }

  .auth-header {
    @apply px-4 py-4;
  }

  .auth-footer {
    @apply px-4;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .auth-container {
    background: linear-gradient(
      135deg,
      var(--primary-900) 0%,
      var(--primary-800) 100%
    );
  }

  .auth-card {
    background: rgba(30, 30, 30, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .auth-title {
    @apply text-gray-100;
  }

  .auth-subtitle {
    @apply text-gray-300;
  }
}
</style>
