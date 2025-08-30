<template>
  <div class="profile-image-upload">
    <!-- Current Image Display -->
    <div class="image-preview-section mb-4">
      <div class="image-container">
        <div
          v-if="previewUrl || currentImageUrl"
          class="image-preview"
          :class="{ loading: uploadState.isLoading }"
        >
          <img
            :src="previewUrl || currentImageUrl || ''"
            :alt="alt || 'Profile Image'"
            class="profile-image"
            @load="handleImageLoad"
            @error="handleImageError"
          />
          <div v-if="uploadState.isLoading" class="upload-overlay">
            <BaseLoader size="sm" />
            <span class="upload-progress-text">
              {{ uploadState.progress }}% completado
            </span>
          </div>
        </div>

        <div v-else class="image-placeholder">
          <BaseIcon
            name="user"
            class="w-16 h-16 text-gray-400 dark:text-gray-500"
          />
          <span class="placeholder-text">Sin imagen de perfil</span>
        </div>

        <!-- Remove Image Button -->
        <button
          v-if="(previewUrl || currentImageUrl) && !uploadState.isLoading"
          type="button"
          class="remove-image-btn"
          @click="handleRemoveImage"
        >
          <BaseIcon name="x" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Upload Area -->
    <div
      class="upload-area"
      :class="{
        'drag-over': isDragOver,
        'has-error': uploadState.error,
        disabled: disabled || uploadState.isLoading
      }"
      @click="!disabled && !uploadState.isLoading && triggerFileInput()"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
    >
      <div class="upload-content">
        <BaseIcon
          name="upload"
          class="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2"
        />
        <p class="upload-text">
          <span class="font-medium">Haz clic para subir</span>
          <span class="text-gray-500 dark:text-gray-400">
            o arrastra y suelta
          </span>
        </p>
        <p class="upload-hint">PNG, JPG, WebP hasta 5MB</p>
      </div>

      <!-- Progress Bar -->
      <div v-if="uploadState.isLoading" class="upload-progress">
        <div
          class="progress-bar"
          :style="{ width: `${uploadState.progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="uploadState.error" class="error-message">
      <BaseIcon name="alert-circle" class="w-4 h-4 text-red-500 mr-2" />
      <span class="text-sm text-red-600 dark:text-red-400">
        {{ uploadState.error }}
      </span>
    </div>

    <!-- Success Message -->
    <div
      v-if="uploadState.success && !uploadState.isLoading"
      class="success-message"
    >
      <BaseIcon name="check-circle" class="w-4 h-4 text-green-500 mr-2" />
      <span class="text-sm text-green-600 dark:text-green-400">
        Imagen subida exitosamente
      </span>
    </div>

    <!-- File Input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      class="hidden"
      @change="handleFileSelect"
    />

    <!-- Action Buttons -->
    <div v-if="showActions" class="action-buttons">
      <BaseButton
        v-if="selectedFile && !uploadState.isLoading"
        type="button"
        variant="primary"
        :disabled="disabled"
        @click="handleUpload"
      >
        <template #icon>
          <BaseIcon name="upload" class="w-4 h-4" />
        </template>
        Subir Imagen
      </BaseButton>

      <BaseButton
        v-if="selectedFile"
        type="button"
        variant="secondary"
        :outlined="true"
        :disabled="uploadState.isLoading"
        @click="handleClearSelection"
      >
        <template #icon>
          <BaseIcon name="x" class="w-4 h-4" />
        </template>
        Cancelar
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick, onUnmounted } from 'vue'
import { BaseButton, BaseIcon, BaseLoader } from '@/components/common'
import {
  validateFile,
  compressImage,
  createImagePreview,
  revokeImagePreview,
  getFileInfo,
  type ImageCompressionOptions,
  type FileValidationOptions,
  MAX_FILE_SIZE,
  SUPPORTED_IMAGE_TYPES
} from '@/utils'
import type { ValidationResult } from '@/utils'

// Props
interface Props {
  modelValue?: File | string | null
  currentImageUrl?: string
  alt?: string
  disabled?: boolean
  showActions?: boolean
  autoUpload?: boolean
  maxSize?: number
  compressionOptions?: ImageCompressionOptions
  validationOptions?: FileValidationOptions
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: File | null): void
  (e: 'upload', file: File): void
  (e: 'remove'): void
  (e: 'error', error: string): void
  (e: 'success', file: File): void
  (e: 'progress', progress: number): void
}

const props = withDefaults(defineProps<Props>(), {
  showActions: false,
  autoUpload: true,
  maxSize: MAX_FILE_SIZE,
  compressionOptions: () => ({
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.8,
    format: 'jpeg' as const
  }),
  validationOptions: () => ({
    maxSize: MAX_FILE_SIZE,
    allowedTypes: [...SUPPORTED_IMAGE_TYPES]
  })
})

const emit = defineEmits<Emits>()

// Refs
const fileInput = ref<HTMLInputElement>()
const previewUrl = ref<string>('')
const selectedFile = ref<File | null>(null)
const isDragOver = ref(false)
const dragCounter = ref(0)

// Upload state
interface UploadState {
  isLoading: boolean
  progress: number
  error: string | null
  success: boolean
}

const uploadState = reactive<UploadState>({
  isLoading: false,
  progress: 0,
  error: null,
  success: false
})

// Methods
const triggerFileInput = (): void => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const clearPreview = (): void => {
  if (previewUrl.value) {
    revokeImagePreview(previewUrl.value)
    previewUrl.value = ''
  }
}

const clearState = (): void => {
  uploadState.isLoading = false
  uploadState.progress = 0
  uploadState.error = null
  uploadState.success = false
}

const setError = (error: string): void => {
  clearState()
  uploadState.error = error
  emit('error', error)
}

const validateFileInput = async (file: File): Promise<ValidationResult> => {
  return await validateFile(file, {
    ...props.validationOptions,
    maxSize: props.maxSize
  })
}

const processAndSetFile = async (file: File): Promise<void> => {
  try {
    clearState()

    const validation = await validateFileInput(file)
    if (!validation.isValid) {
      setError(validation.message || 'Archivo no válido')
      return
    }

    await getFileInfo(file)

    let processedFile = file
    if (
      props.compressionOptions &&
      Object.keys(props.compressionOptions).length > 0
    ) {
      try {
        processedFile = await compressImage(file, props.compressionOptions)
      } catch {
        processedFile = file
      }
    }

    selectedFile.value = processedFile
    clearPreview()
    previewUrl.value = createImagePreview(processedFile)
    emit('update:modelValue', processedFile)

    if (props.autoUpload) {
      await handleUpload()
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error al procesar archivo'
    setError(message)
  }
}

const handleFileSelect = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    await processAndSetFile(file)
  }

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleDragEnter = (e: DragEvent): void => {
  e.preventDefault()
  e.stopPropagation()
  dragCounter.value++
  isDragOver.value = true
}

const handleDragLeave = (e: DragEvent): void => {
  e.preventDefault()
  e.stopPropagation()
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragOver.value = false
  }
}

const handleDragOver = (e: DragEvent): void => {
  e.preventDefault()
  e.stopPropagation()
}

const handleDrop = async (e: DragEvent): Promise<void> => {
  e.preventDefault()
  e.stopPropagation()

  isDragOver.value = false
  dragCounter.value = 0

  if (props.disabled || uploadState.isLoading) {
    return
  }

  const files = e.dataTransfer?.files
  if (files && files.length > 0 && files[0]) {
    await processAndSetFile(files[0])
  }
}

const handleUpload = async (): Promise<void> => {
  if (!selectedFile.value || uploadState.isLoading) {
    return
  }

  try {
    uploadState.isLoading = true
    uploadState.progress = 0
    uploadState.error = null

    const progressInterval = setInterval(() => {
      if (uploadState.progress < 90) {
        uploadState.progress += Math.random() * 10
        emit('progress', uploadState.progress)
      }
    }, 200)

    emit('upload', selectedFile.value)

    clearInterval(progressInterval)
    uploadState.progress = 100
    emit('progress', 100)

    await nextTick()

    uploadState.isLoading = false
    uploadState.success = true
    emit('success', selectedFile.value)

    setTimeout(() => {
      uploadState.success = false
    }, 3000)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error al subir imagen'
    setError(message)
  }
}

const handleRemoveImage = (): void => {
  clearPreview()
  selectedFile.value = null
  emit('update:modelValue', null)
  emit('remove')
  clearState()
}

const handleClearSelection = (): void => {
  clearPreview()
  selectedFile.value = null
  emit('update:modelValue', null)
  clearState()
}

const handleImageLoad = (): void => {
  // Image loaded successfully
}

const handleImageError = (): void => {
  setError('Error al cargar la imagen')
}

// Watch for external changes
watch(
  () => props.modelValue,
  newValue => {
    if (!newValue && selectedFile.value) {
      handleClearSelection()
    }
  }
)

// Cleanup on unmount
const cleanup = (): void => {
  clearPreview()
}

onUnmounted(cleanup)
</script>

<style scoped>
.profile-image-upload {
  @apply w-full max-w-md mx-auto;
}

.image-preview-section {
  @apply flex justify-center;
}

.image-container {
  @apply relative;
}

.image-preview {
  @apply relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg;
}

.image-preview.loading {
  @apply opacity-75;
}

.profile-image {
  @apply w-full h-full object-cover;
}

.upload-overlay {
  @apply absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white rounded-full;
}

.upload-progress-text {
  @apply text-xs mt-2 font-medium;
}

.image-placeholder {
  @apply w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center;
}

.placeholder-text {
  @apply text-xs text-gray-500 dark:text-gray-400 mt-2 text-center;
}

.remove-image-btn {
  @apply absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200;
}

.upload-area {
  @apply relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20;
}

.upload-area.drag-over {
  @apply border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20;
}

.upload-area.has-error {
  @apply border-red-300 dark:border-red-600 bg-red-50/50 dark:bg-red-900/20;
}

.upload-area.disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

.upload-content {
  @apply flex flex-col items-center;
}

.upload-text {
  @apply text-sm text-gray-600 dark:text-gray-400 mb-1;
}

.upload-hint {
  @apply text-xs text-gray-500 dark:text-gray-500;
}

.upload-progress {
  @apply absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out;
}

.error-message {
  @apply flex items-center mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg;
}

.success-message {
  @apply flex items-center mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in;
}

.action-buttons {
  @apply flex gap-3 mt-4 justify-center;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

/* Responsive design */
@media (max-width: 640px) {
  .profile-image-upload {
    @apply max-w-none;
  }

  .action-buttons {
    @apply flex-col;
  }
}
</style>
