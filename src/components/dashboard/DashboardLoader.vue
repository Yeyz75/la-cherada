<template>
  <!-- Loader principal para transiciones de sección -->
  <div
    v-if="isVisible"
    class="dashboard-loader"
    :class="{
      'dashboard-loader--fullscreen': fullscreen,
      'dashboard-loader--overlay': overlay,
      'dashboard-loader--inline': !fullscreen && !overlay
    }"
  >
    <!-- Backdrop para fullscreen/overlay -->
    <div
      v-if="fullscreen || overlay"
      class="dashboard-loader__backdrop"
      :class="{
        'backdrop--dark': backdropType === 'dark',
        'backdrop--light': backdropType === 'light',
        'backdrop--blur': backdropType === 'blur'
      }"
    />

    <!-- Contenido del loader -->
    <div class="dashboard-loader__content">
      <!-- Spinner animado -->
      <div
        class="dashboard-loader__spinner"
        :class="`dashboard-loader__spinner--${spinnerType}`"
      >
        <!-- Spinner tipo ring -->
        <div v-if="spinnerType === 'ring'" class="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <!-- Spinner tipo dots -->
        <div v-else-if="spinnerType === 'dots'" class="spinner-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <!-- Spinner tipo pulse -->
        <div v-else-if="spinnerType === 'pulse'" class="spinner-pulse">
          <div></div>
          <div></div>
        </div>

        <!-- Spinner tipo default (circle) -->
        <div v-else class="spinner-circle">
          <div></div>
        </div>
      </div>

      <!-- Mensaje de carga -->
      <div
        v-if="message"
        class="dashboard-loader__message"
        :class="`text--${messageVariant}`"
      >
        {{ message }}
      </div>

      <!-- Indicador de progreso -->
      <div
        v-if="showProgress && progress !== null"
        class="dashboard-loader__progress"
      >
        <div class="progress-bar">
          <div
            class="progress-bar__fill"
            :style="{ width: `${Math.min(progress || 0, 100)}%` }"
          ></div>
        </div>
        <div class="progress-text">{{ Math.round(progress || 0) }}%</div>
      </div>

      <!-- Botón de cancelar (opcional) -->
      <BaseButton
        v-if="showCancel"
        variant="secondary"
        size="small"
        :outlined="true"
        @click="handleCancel"
        class="dashboard-loader__cancel mt-4"
      >
        <i class="pi pi-times mr-2" />
        {{ cancelText || t('dashboard.loading.cancel') }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTranslation } from '@/composables/useTranslation'
import BaseButton from '@/components/common/BaseButton.vue'

interface Props {
  /** Mostrar el loader */
  isVisible?: boolean
  /** Modo fullscreen */
  fullscreen?: boolean
  /** Modo overlay sobre contenido */
  overlay?: boolean
  /** Tipo de spinner */
  spinnerType?: 'ring' | 'dots' | 'pulse' | 'circle'
  /** Mensaje de carga */
  message?: string
  /** Variante del mensaje */
  messageVariant?: 'primary' | 'secondary' | 'muted'
  /** Tipo de backdrop */
  backdropType?: 'dark' | 'light' | 'blur'
  /** Mostrar indicador de progreso */
  showProgress?: boolean
  /** Progreso actual (0-100) */
  progress?: number | null
  /** Mostrar botón cancelar */
  showCancel?: boolean
  /** Texto del botón cancelar */
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  fullscreen: false,
  overlay: false,
  spinnerType: 'ring',
  message: '',
  messageVariant: 'primary',
  backdropType: 'dark',
  showProgress: false,
  progress: null,
  showCancel: false,
  cancelText: ''
})

const emit = defineEmits<{
  cancel: []
}>()

// Composables
const { t } = useTranslation()

// Handlers
const handleCancel = (): void => {
  emit('cancel')
}
</script>

<style scoped>
/* Contenedor principal */
.dashboard-loader {
  @apply flex items-center justify-center;
  z-index: 1000;
}

.dashboard-loader--fullscreen {
  @apply fixed inset-0;
  z-index: 9999;
}

.dashboard-loader--overlay {
  @apply absolute inset-0;
  z-index: 100;
}

.dashboard-loader--inline {
  @apply relative w-full h-32;
}

/* Backdrop */
.dashboard-loader__backdrop {
  @apply absolute inset-0 transition-opacity duration-300;
}

.backdrop--dark {
  @apply bg-black/60;
}

.backdrop--light {
  @apply bg-white/80;
}

.backdrop--blur {
  @apply bg-gray-900/20 backdrop-blur-sm;
}

/* Contenido del loader */
.dashboard-loader__content {
  @apply relative flex flex-col items-center justify-center p-6 rounded-lg;
  @apply bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm;
  @apply border border-gray-200/50 dark:border-gray-700/50;
  @apply shadow-lg;
  min-width: 200px;
}

.dashboard-loader__message {
  @apply mt-4 text-sm font-medium text-center;
  @apply transition-colors duration-200;
}

.text--primary {
  @apply text-gray-900 dark:text-gray-100;
}

.text--secondary {
  @apply text-gray-700 dark:text-gray-300;
}

.text--muted {
  @apply text-gray-500 dark:text-gray-400;
}

/* Indicador de progreso */
.dashboard-loader__progress {
  @apply mt-4 w-full;
}

.progress-bar {
  @apply w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden;
}

.progress-bar__fill {
  @apply h-full bg-blue-500 rounded-full transition-all duration-300 ease-out;
  @apply bg-gradient-to-r from-blue-400 to-blue-600;
}

.progress-text {
  @apply mt-2 text-xs text-center text-gray-600 dark:text-gray-400;
}

/* Botón cancelar */
.dashboard-loader__cancel {
  @apply opacity-80 hover:opacity-100 transition-opacity duration-200;
}

/* Spinners */
.dashboard-loader__spinner {
  @apply relative;
}

/* Spinner Ring */
.spinner-ring {
  @apply relative w-12 h-12;
}

.spinner-ring div {
  @apply absolute border-4 rounded-full;
  @apply border-blue-200 dark:border-blue-800;
  @apply border-t-blue-500;
  width: 48px;
  height: 48px;
  animation: ring-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.spinner-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.spinner-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes ring-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Spinner Dots */
.spinner-dots {
  @apply flex space-x-2;
}

.spinner-dots div {
  @apply w-3 h-3 rounded-full bg-blue-500;
  animation: dots-bounce 1.4s ease-in-out infinite both;
}

.spinner-dots div:nth-child(1) {
  animation-delay: -0.32s;
}

.spinner-dots div:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dots-bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Spinner Pulse */
.spinner-pulse {
  @apply relative w-12 h-12;
}

.spinner-pulse div {
  @apply absolute w-full h-full rounded-full bg-blue-500;
  animation: pulse-scale 2s ease-in-out infinite;
}

.spinner-pulse div:nth-child(2) {
  animation-delay: -1s;
}

@keyframes pulse-scale {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Spinner Circle */
.spinner-circle div {
  @apply w-12 h-12 rounded-full border-4;
  @apply border-gray-200 dark:border-gray-700;
  @apply border-t-blue-500;
  animation: circle-spin 1s linear infinite;
}

@keyframes circle-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animaciones de entrada/salida */
.dashboard-loader {
  animation: loader-fade-in 0.3s ease-out;
}

@keyframes loader-fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .dashboard-loader__content {
    @apply mx-4 p-4;
    min-width: auto;
  }

  .dashboard-loader__message {
    @apply text-xs;
  }
}
</style>
