<template>
  <div class="location-settings">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center"
          >
            <BaseIcon name="map-pin" class="w-5 h-5 mr-2 text-blue-500" />
            Mi Ubicación
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Configura tu ubicación para ver productos relevantes de tu zona
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium',
              currentLocation?.isConfigured
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            ]"
          >
            <div
              :class="[
                'w-2 h-2 rounded-full mr-2',
                currentLocation?.isConfigured ? 'bg-green-500' : 'bg-yellow-500'
              ]"
            ></div>
            {{
              currentLocation?.isConfigured ? 'Configurado' : 'Sin configurar'
            }}
          </span>
        </div>
      </div>
    </div>

    <!-- Current Location Display -->
    <div v-if="currentLocation?.isConfigured" class="mb-6">
      <div
        class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h4
              class="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1"
            >
              Ubicación actual
            </h4>
            <p class="text-blue-700 dark:text-blue-300 text-sm">
              {{ currentLocationDisplay }}
            </p>
            <p
              v-if="lastUpdated"
              class="text-blue-600 dark:text-blue-400 text-xs mt-1"
            >
              Última actualización: {{ formatDate(lastUpdated) }}
            </p>
          </div>
          <BaseButton
            variant="secondary"
            size="small"
            @click="toggleEdit"
            class="flex items-center"
          >
            <BaseIcon name="edit" class="w-4 h-4 mr-1" />
            Cambiar
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="mb-6">
      <div
        class="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center"
      >
        <BaseIcon name="map-pin" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No has configurado tu ubicación
        </h4>
        <p class="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
          Configura tu ubicación para ver productos y servicios relevantes de tu
          zona
        </p>
        <BaseButton
          variant="primary"
          @click="toggleEdit"
          class="flex items-center mx-auto"
        >
          <BaseIcon name="plus" class="w-4 h-4 mr-2" />
          Configurar ubicación
        </BaseButton>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-if="isEditing" class="mb-6">
      <div
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{
              currentLocation?.isConfigured
                ? 'Cambiar ubicación'
                : 'Configurar ubicación'
            }}
          </h4>
          <BaseButton
            variant="secondary"
            size="small"
            @click="cancelEdit"
            class="text-gray-600 hover:text-gray-800"
          >
            <BaseIcon name="x" class="w-4 h-4" />
          </BaseButton>
        </div>

        <LocationSelector
          v-model="editingLocation"
          title=""
          description=""
          :required="false"
          :show-skip-option="true"
          skip-text="Eliminar ubicación"
          skip-help-text="No mostrar productos por ubicación"
          :show-auto-detect="true"
          @skip="handleLocationRemove"
          @change="handleLocationChange"
          @valid="handleValidationChange"
        />

        <div
          class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <BaseButton
            variant="secondary"
            @click="cancelEdit"
            :disabled="isSaving"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="saveLocation"
            :loading="isSaving"
            :disabled="!canSave || isSaving"
          >
            {{
              currentLocation?.isConfigured
                ? 'Actualizar ubicación'
                : 'Guardar ubicación'
            }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Privacy Settings -->
    <div v-if="currentLocation?.isConfigured && !isEditing" class="mb-6">
      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <h4
          class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center"
        >
          <BaseIcon name="shield" class="w-4 h-4 mr-2 text-gray-500" />
          Privacidad de ubicación
        </h4>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              v-model="privacySettings.showMunicipality"
              type="radio"
              name="locationPrivacy"
              :value="true"
              class="mr-3 text-blue-600"
              @change="handlePrivacyChange"
            />
            <div>
              <span
                class="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Mostrar municipio específico
              </span>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Ej: "Mejicanos, San Salvador"
              </p>
            </div>
          </label>
          <label class="flex items-center">
            <input
              v-model="privacySettings.showMunicipality"
              type="radio"
              name="locationPrivacy"
              :value="false"
              class="mr-3 text-blue-600"
              @change="handlePrivacyChange"
            />
            <div>
              <span
                class="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Solo mostrar departamento
              </span>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Ej: "San Salvador"
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="showSuccessMessage"
      class="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
    >
      <div class="flex items-center">
        <BaseIcon name="check-circle" class="w-5 h-5 text-green-500 mr-2" />
        <span class="text-sm text-green-700 dark:text-green-400">
          Tu ubicación se ha actualizado correctamente
        </span>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <div class="flex items-center">
        <BaseIcon name="alert-circle" class="w-5 h-5 text-red-500 mr-2" />
        <span class="text-sm text-red-700 dark:text-red-400">
          {{ errorMessage }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import LocationSelector from '@/components/common/LocationSelector.vue'
import { getFullLocationName } from '@/data/elsalvador-locations'
import { useUserStore } from '@/stores/userStore'
import { formatDate } from '@/utils/dateUtils'
import type { UserLocation, LocationSelection } from '@/types/location'
import type { UserProfile } from '@/types/api'

interface Props {
  /** Current user location */
  modelValue?: UserLocation | null
}

interface Emits {
  (e: 'update:modelValue', value: UserLocation | null): void
  (e: 'saved', location: UserLocation | null): void
  (e: 'error', error: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null
})

const emit = defineEmits<Emits>()

// Store
const userStore = useUserStore()

// State
const isEditing = ref(false)
const isSaving = ref(false)
const editingLocation = ref<UserLocation | null>(null)
const isLocationValid = ref(false)
const showSuccessMessage = ref(false)
const errorMessage = ref<string>('')
const privacySettings = ref({
  showMunicipality: true
})

// Computed
const currentLocation = computed(() => props.modelValue)

const currentLocationDisplay = computed(() => {
  if (!currentLocation.value?.isConfigured) {
    return ''
  }
  if (!currentLocation.value.departmentId) {
    return ''
  }

  if (
    privacySettings.value.showMunicipality &&
    currentLocation.value.municipalityId
  ) {
    return getFullLocationName(
      currentLocation.value.departmentId,
      currentLocation.value.municipalityId
    )
  }

  return getFullLocationName(currentLocation.value.departmentId)
})

const lastUpdated = computed(() => {
  return currentLocation.value?.updatedAt
})

const canSave = computed(() => {
  return editingLocation.value === null || isLocationValid.value
})

// Methods
const toggleEdit = (): void => {
  isEditing.value = !isEditing.value
  if (isEditing.value) {
    editingLocation.value = currentLocation.value
      ? { ...currentLocation.value }
      : null
  }
}

const cancelEdit = (): void => {
  isEditing.value = false
  editingLocation.value = null
  isLocationValid.value = false
  errorMessage.value = ''
}

const handleLocationChange = (selection: LocationSelection): void => {
  if (selection.isSkipped) {
    editingLocation.value = null
    isLocationValid.value = true
  } else if (
    selection.isValid &&
    selection.selectedDepartment &&
    selection.selectedMunicipality
  ) {
    editingLocation.value = {
      departmentId: selection.selectedDepartment.id,
      municipalityId: selection.selectedMunicipality.id,
      isConfigured: true,
      updatedAt: new Date()
    }
  }
}

const handleLocationRemove = (): void => {
  editingLocation.value = null
  isLocationValid.value = true
}

const handleValidationChange = (isValid: boolean): void => {
  isLocationValid.value = isValid
}

const handlePrivacyChange = async (): Promise<void> => {
  // Auto-save privacy changes
  try {
    // TODO: Save privacy settings to user profile
    showSuccess()
  } catch (error) {
    showError('Error al actualizar configuración de privacidad')
  }
}

const saveLocation = async (): Promise<void> => {
  if (!canSave.value) {
    return
  }

  isSaving.value = true
  errorMessage.value = ''

  try {
    const userId = userStore.currentProfile?.userId
    if (!userId) {
      showError('No hay usuario autenticado')
      return
    }

    // Update user profile with new location
    const updateData: Partial<UserProfile> = {}
    if (editingLocation.value) {
      updateData.location = editingLocation.value
    }

    await userStore.updateProfile(userId, updateData)

    emit('update:modelValue', editingLocation.value)
    emit('saved', editingLocation.value)

    isEditing.value = false
    showSuccess()
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error al guardar ubicación'
    showError(message)
    emit('error', message)
  } finally {
    isSaving.value = false
  }
}

const showSuccess = (): void => {
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

const showError = (message: string): void => {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 5000)
}

// Watchers
watch(
  () => props.modelValue,
  newValue => {
    if (newValue?.isConfigured) {
      // Initialize privacy settings based on current location data
      privacySettings.value.showMunicipality = !!newValue.municipalityId
    }
  },
  { immediate: true }
)

// Lifecycle
onMounted(() => {
  if (
    currentLocation.value?.isConfigured &&
    currentLocation.value.municipalityId
  ) {
    privacySettings.value.showMunicipality = true
  }
})
</script>

<style scoped>
.location-settings {
  @apply space-y-1;
}

/* Custom radio button styling */
input[type='radio'] {
  @apply w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600;
}

/* Transition animations */
.location-settings > div {
  @apply transition-all duration-200 ease-in-out;
}
</style>
