<template>
  <div class="location-selector" :class="{ compact: compact }">
    <!-- Title (only show in non-compact mode) -->
    <div v-if="!compact" class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="text-sm text-gray-600 dark:text-gray-400 mt-1"
      >
        {{ description }}
      </p>
    </div>

    <!-- Department Selector -->
    <div :class="compact ? 'mb-4' : 'mb-4'">
      <label
        for="department-select"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {{ compact ? label || 'Ubicación' : 'Departamento' }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <Dropdown
        id="department-select"
        v-model="selectedDepartment"
        :options="departments"
        option-label="name"
        option-value="id"
        placeholder="Seleccionar departamento"
        class="w-full"
        :class="{
          'border-red-500 focus:ring-red-500': validationErrors.department
        }"
        @change="onDepartmentChange"
      />
      <small
        v-if="validationErrors.department"
        class="text-red-500 text-xs mt-1"
      >
        {{ validationErrors.department }}
      </small>
    </div>

    <!-- Municipality Selector -->
    <div :class="compact ? 'mb-4' : 'mb-4'">
      <label
        for="municipality-select"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Municipio
        <span v-if="required && selectedDepartment" class="text-red-500"
          >*</span
        >
      </label>
      <Dropdown
        id="municipality-select"
        v-model="selectedMunicipality"
        :options="availableMunicipalities"
        option-label="name"
        option-value="id"
        placeholder="Seleccionar municipio"
        :disabled="!selectedDepartment"
        class="w-full"
        :class="{
          'border-red-500 focus:ring-red-500': validationErrors.municipality
        }"
        @change="onMunicipalityChange"
      />
      <small
        v-if="validationErrors.municipality"
        class="text-red-500 text-xs mt-1"
      >
        {{ validationErrors.municipality }}
      </small>
      <small v-else-if="!selectedDepartment" class="text-gray-500 text-xs mt-1">
        Primero selecciona un departamento
      </small>
    </div>

    <!-- Current Selection Display (always show when there's a selection) -->
    <div
      v-if="currentSelection"
      class="mb-4 p-3 rounded-lg border"
      :class="
        compact
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      "
    >
      <div class="flex items-center">
        <BaseIcon name="map-pin" class="w-4 h-4 text-blue-500 mr-2" />
        <span class="text-sm text-blue-700 dark:text-blue-300">
          <strong>{{
            compact ? 'Ubicación:' : 'Ubicación seleccionada:'
          }}</strong>
          {{ currentSelection }}
        </span>
      </div>
    </div>

    <!-- Skip Option (only in non-compact mode) -->
    <div
      v-if="showSkipOption && !compact"
      class="flex justify-between items-center"
    >
      <BaseButton
        variant="secondary"
        size="small"
        @click="onSkip"
        class="text-gray-600 hover:text-gray-800"
      >
        {{ skipText }}
      </BaseButton>
      <small class="text-gray-500 text-xs">
        {{ skipHelpText }}
      </small>
    </div>

    <!-- Auto-detect option (only in non-compact mode) -->
    <div
      v-if="showAutoDetect && !compact"
      class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
      <BaseButton
        variant="secondary"
        size="small"
        :disabled="isDetecting"
        @click="onAutoDetect"
        class="w-full flex items-center justify-center"
      >
        <BaseIcon
          v-if="isDetecting"
          name="loader"
          class="w-4 h-4 mr-2 animate-spin"
        />
        <BaseIcon v-else name="navigation" class="w-4 h-4 mr-2" />
        {{
          isDetecting
            ? 'Detectando ubicación...'
            : 'Detectar mi ubicación automáticamente'
        }}
      </BaseButton>
      <small class="text-gray-500 text-xs mt-2 block text-center">
        Usaremos tu ubicación para sugerir departamento y municipio
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import {
  EL_SALVADOR_DEPARTMENTS,
  getDepartmentById,
  getMunicipalitiesByDepartment,
  getFullLocationName
} from '@/data/elsalvador-locations'
import type { LocationSelection, UserLocation } from '@/types/location'

interface Props {
  /** Current location value */
  modelValue?: UserLocation | null
  /** Title for the selector */
  title?: string
  /** Description text */
  description?: string
  /** Label for compact mode */
  label?: string
  /** Whether location selection is required */
  required?: boolean
  /** Show skip/omit option */
  showSkipOption?: boolean
  /** Text for skip button */
  skipText?: string
  /** Help text for skip option */
  skipHelpText?: string
  /** Show auto-detect option */
  showAutoDetect?: boolean
  /** Compact mode for inline use */
  compact?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: UserLocation | null): void
  (e: 'skip'): void
  (e: 'change', selection: LocationSelection): void
  (e: 'valid', isValid: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '¿Desde dónde publicas principalmente?',
  description: 'Esto nos ayuda a mostrarte productos relevantes de tu zona',
  label: 'Ubicación',
  required: false,
  showSkipOption: false,
  skipText: 'Omitir por ahora',
  skipHelpText: 'Podrás configurarlo después en tu perfil',
  showAutoDetect: false,
  compact: false
})

const emit = defineEmits<Emits>()

// State
const selectedDepartment = ref<string>('')
const selectedMunicipality = ref<string>('')
const isDetecting = ref(false)
const validationErrors = ref<{
  department?: string
  municipality?: string
}>({})

// Computed
const departments = computed(() => EL_SALVADOR_DEPARTMENTS)

const availableMunicipalities = computed(() => {
  if (!selectedDepartment.value) {
    return []
  }
  return getMunicipalitiesByDepartment(selectedDepartment.value)
})

const currentSelection = computed(() => {
  if (selectedDepartment.value && selectedMunicipality.value) {
    return getFullLocationName(
      selectedDepartment.value,
      selectedMunicipality.value
    )
  } else if (selectedDepartment.value) {
    const dept = getDepartmentById(selectedDepartment.value)
    return dept?.name
  }
  return null
})

const isValid = computed(() => {
  if (!props.required) {
    return true
  }
  return !!(selectedDepartment.value && selectedMunicipality.value)
})

const currentLocationSelection = computed((): LocationSelection => {
  const selectedDept = selectedDepartment.value
    ? getDepartmentById(selectedDepartment.value)
    : null
  const selectedMuni =
    selectedMunicipality.value && selectedDept
      ? selectedDept.municipalities.find(
          m => m.id === selectedMunicipality.value
        )
      : null

  return {
    selectedDepartment: selectedDept ?? null,
    selectedMunicipality: selectedMuni ?? null,
    isValid: isValid.value,
    isSkipped: false
  }
})

// Methods
const validateField = (field: 'department' | 'municipality'): string | null => {
  if (!props.required) {
    return null
  }

  switch (field) {
    case 'department':
      if (!selectedDepartment.value) {
        return 'Debes seleccionar un departamento'
      }
      break
    case 'municipality':
      if (selectedDepartment.value && !selectedMunicipality.value) {
        return 'Debes seleccionar un municipio'
      }
      break
  }
  return null
}

const validate = (): boolean => {
  validationErrors.value = {}

  const departmentError = validateField('department')
  const municipalityError = validateField('municipality')

  if (departmentError) {
    validationErrors.value.department = departmentError
  }
  if (municipalityError) {
    validationErrors.value.municipality = municipalityError
  }

  return !departmentError && !municipalityError
}

const onDepartmentChange = (): void => {
  // Clear municipality when department changes
  selectedMunicipality.value = ''
  validationErrors.value = {}
  updateModelValue()
}

const onMunicipalityChange = (): void => {
  validationErrors.value = {}
  updateModelValue()
}

const updateModelValue = (): void => {
  const isComplete = !!(selectedDepartment.value && selectedMunicipality.value)

  const location: UserLocation = {
    departmentId: selectedDepartment.value || null,
    municipalityId: selectedMunicipality.value || null,
    isConfigured: isComplete,
    updatedAt: new Date()
  }

  emit('update:modelValue', isComplete ? location : null)
  emit('change', currentLocationSelection.value)
  emit('valid', isValid.value)
}

const onSkip = (): void => {
  selectedDepartment.value = ''
  selectedMunicipality.value = ''
  validationErrors.value = {}

  emit('update:modelValue', null)
  emit('skip')

  const skippedSelection: LocationSelection = {
    selectedDepartment: null,
    selectedMunicipality: null,
    isValid: false,
    isSkipped: true
  }
  emit('change', skippedSelection)
}

const onAutoDetect = async (): Promise<void> => {
  isDetecting.value = true

  try {
    // TODO: Implement geolocation detection
    // For now, simulate detection delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock: Set San Salvador as default for demo
    selectedDepartment.value = 'san-salvador'
    await new Promise(resolve => setTimeout(resolve, 500))
    selectedMunicipality.value = 'san-salvador-san-salvador'
    updateModelValue()
  } catch (error) {
    // Error detecting location - silently fail for now
    // TODO: Show user-friendly error message
  } finally {
    isDetecting.value = false
  }
}

// Initialize from modelValue
const initializeFromModelValue = (): void => {
  if (props.modelValue) {
    selectedDepartment.value = props.modelValue.departmentId ?? ''
    selectedMunicipality.value = props.modelValue.municipalityId ?? ''
  }
}

// Watchers
watch(() => props.modelValue, initializeFromModelValue, { immediate: true })

watch(isValid, newValue => {
  emit('valid', newValue)
})

// Lifecycle
onMounted(() => {
  initializeFromModelValue()
})
</script>

<style scoped>
.location-selector {
  @apply space-y-1;
}

/* Compact mode styles */
.location-selector.compact {
  @apply space-y-4;
}

/* Custom dropdown styles */
:deep(.p-dropdown) {
  @apply w-full border border-gray-300 dark:border-gray-600 rounded-lg;
}

:deep(.p-dropdown:not(.p-disabled):hover) {
  @apply border-gray-400 dark:border-gray-500;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
  @apply border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800;
}

:deep(.p-dropdown .p-dropdown-label) {
  @apply text-gray-900 dark:text-gray-100;
}

:deep(.p-dropdown .p-dropdown-label.p-placeholder) {
  @apply text-gray-500 dark:text-gray-400;
}

:deep(.p-dropdown.p-invalid) {
  @apply border-red-500;
}

:deep(.p-dropdown-panel) {
  @apply mt-1;
}
</style>
