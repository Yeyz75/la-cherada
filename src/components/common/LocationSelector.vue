<template>
  <div class="w-full space-y-3">
    <!-- Header más compacto con título y opción omitir -->
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {{ $t('location.selectLocation') }}
          <span v-if="required && !canSkip" class="text-red-500 ml-1">*</span>
        </label>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {{ $t('location.selectLocationDescription') }}
        </p>
      </div>

      <BaseButton
        v-if="canSkip"
        variant="secondary"
        size="small"
        text
        class="flex-shrink-0 ml-3"
        :class="
          skipped ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500'
        "
        @click="toggleSkip"
      >
        <BaseIcon
          :name="skipped ? 'eye-slash' : 'x-mark'"
          class="w-4 h-4 mr-1"
        />
        {{ skipped ? $t('location.configure') : $t('location.skip') }}
      </BaseButton>
    </div>

    <!-- Contenedor de selecciones más compacto -->
    <div
      class="space-y-3 transition-all duration-300"
      :class="skipped ? 'opacity-50 pointer-events-none' : 'opacity-100'"
    >
      <!-- Selector de Departamento -->
      <div class="w-full">
        <label
          :for="departmentId"
          class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
        >
          {{ $t('location.department') }}
          <span
            v-if="required && !canSkip && !skipped"
            class="text-red-500 ml-1"
            >*</span
          >
        </label>

        <Dropdown
          :id="departmentId"
          v-model="selectedDepartment"
          :options="departments"
          option-label="name"
          option-value="id"
          :placeholder="$t('location.selectDepartment')"
          :disabled="disabled || skipped"
          :class="departmentClasses"
          :pt="{
            root: 'w-full',
            input:
              'w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
            trigger: 'hidden',
            panel:
              'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1',
            list: 'max-h-40 overflow-auto py-1',
            item: 'px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
          }"
          @change="onDepartmentChange"
        />

        <p
          v-if="departmentError && !skipped"
          class="mt-1.5 text-xs text-red-600 dark:text-red-400"
        >
          {{ departmentError }}
        </p>
      </div>

      <!-- Selector de Municipio -->
      <div class="w-full">
        <label
          :for="municipalityId"
          class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
        >
          {{ $t('location.municipality') }}
          <span
            v-if="required && !canSkip && !skipped"
            class="text-red-500 ml-1"
            >*</span
          >
        </label>

        <Dropdown
          :id="municipalityId"
          v-model="selectedMunicipality"
          :options="availableMunicipalities"
          option-label="name"
          option-value="id"
          :placeholder="
            selectedDepartment
              ? $t('location.selectMunicipality')
              : $t('location.selectDepartmentFirst')
          "
          :disabled="
            disabled ||
            skipped ||
            !selectedDepartment ||
            availableMunicipalities.length === 0
          "
          :class="municipalityClasses"
          :pt="{
            root: 'w-full',
            input:
              'w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
            trigger: 'hidden',
            panel:
              'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1',
            list: 'max-h-40 overflow-auto py-1',
            item: 'px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
          }"
          @change="onMunicipalityChange"
        />

        <p
          v-if="municipalityError && !skipped"
          class="mt-1.5 text-xs text-red-600 dark:text-red-400"
        >
          {{ municipalityError }}
        </p>
      </div>

      <!-- Información de ubicación seleccionada - más compacta -->
      <div
        v-if="selectedDepartment && selectedMunicipality && !skipped"
        class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2.5 mt-2"
      >
        <div class="flex items-center space-x-2">
          <BaseIcon
            name="map-pin"
            class="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-green-800 dark:text-green-200">
              {{ $t('location.selectedLocation') }}
            </p>
            <p class="text-xs text-green-700 dark:text-green-300 truncate">
              {{ selectedMunicipalityName }}, {{ selectedDepartmentName }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje cuando está omitido - más compacto -->
    <div
      v-if="skipped"
      class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-2.5"
    >
      <div class="flex items-center space-x-2">
        <BaseIcon
          name="information-circle"
          class="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-orange-800 dark:text-orange-200">
            {{ $t('location.skippedTitle') }}
          </p>
          <p class="text-xs text-orange-700 dark:text-orange-300">
            {{ $t('location.skippedDescription') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { EL_SALVADOR_DEPARTMENTS } from '@/data/elsalvador-locations'
import type { Department, Municipality } from '@/types/location'

interface LocationSelection {
  departmentId: string | null
  municipalityId: string | null
  departmentName: string | null
  municipalityName: string | null
}

interface Props {
  modelValue?: LocationSelection | null
  disabled?: boolean
  required?: boolean
  canSkip?: boolean
  departmentError?: string
  municipalityError?: string
}

interface Emits {
  'update:modelValue': [value: LocationSelection | null]
  'skip-changed': [skipped: boolean]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  canSkip: true,
  departmentError: '',
  municipalityError: ''
})

const emit = defineEmits<Emits>()

// IDs únicos para los campos
const departmentId = `department-${Math.random().toString(36).substring(2, 9)}`
const municipalityId = `municipality-${Math.random().toString(36).substring(2, 9)}`

// Estado local
const selectedDepartment = ref<string>('')
const selectedMunicipality = ref<string>('')
const skipped = ref<boolean>(false)

// Datos
const departments = computed(() => EL_SALVADOR_DEPARTMENTS)

// Municipios disponibles basados en el departamento seleccionado
const availableMunicipalities = computed((): Municipality[] => {
  if (!selectedDepartment.value) {
    return []
  }

  const department = departments.value.find(
    d => d.id === selectedDepartment.value
  )
  return department ? department.municipalities : []
})

// Nombres para mostrar
const selectedDepartmentName = computed((): string => {
  if (!selectedDepartment.value) {
    return ''
  }
  const department = departments.value.find(
    d => d.id === selectedDepartment.value
  )
  return department?.name ?? ''
})

const selectedMunicipalityName = computed((): string => {
  if (!selectedMunicipality.value) {
    return ''
  }
  const municipality = availableMunicipalities.value.find(
    m => m.id === selectedMunicipality.value
  )
  return municipality?.name ?? ''
})

// Clases dinámicas
const departmentClasses = computed(() => ({
  'border-red-300 dark:border-red-600': props.departmentError && !skipped.value,
  'border-gray-300 dark:border-gray-600':
    !props.departmentError || skipped.value
}))

const municipalityClasses = computed(() => ({
  'border-red-300 dark:border-red-600':
    props.municipalityError && !skipped.value,
  'border-gray-300 dark:border-gray-600':
    !props.municipalityError || skipped.value
}))

// Métodos
const toggleSkip = () => {
  skipped.value = !skipped.value

  if (skipped.value) {
    // Si se omite, limpiar selecciones
    selectedDepartment.value = ''
    selectedMunicipality.value = ''
  }

  emit('skip-changed', skipped.value)
  updateModelValue()
}

const onDepartmentChange = () => {
  // Limpiar municipio cuando cambia el departamento
  selectedMunicipality.value = ''
  updateModelValue()
}

const onMunicipalityChange = () => {
  updateModelValue()
}

const updateModelValue = () => {
  if (skipped.value) {
    emit('update:modelValue', null)
    return
  }

  const location: LocationSelection = {
    departmentId: selectedDepartment.value || null,
    municipalityId: selectedMunicipality.value || null,
    departmentName: selectedDepartmentName.value || null,
    municipalityName: selectedMunicipalityName.value || null
  }

  emit('update:modelValue', location)
}

// Sincronizar con el valor externo
watch(
  () => props.modelValue,
  newValue => {
    if (newValue === null) {
      skipped.value = true
      selectedDepartment.value = ''
      selectedMunicipality.value = ''
    } else if (newValue) {
      skipped.value = false
      selectedDepartment.value = newValue.departmentId ?? ''
      selectedMunicipality.value = newValue.municipalityId ?? ''
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* Ocultar la flecha del dropdown de PrimeVue */
:deep(.p-dropdown-trigger) {
  display: none !important;
}

/* Mejorar el cursor para indicar que es clickeable */
:deep(.p-dropdown-label) {
  cursor: pointer;
}

/* Ajustar el padding para compensar la ausencia de la flecha */
:deep(.p-dropdown .p-inputtext) {
  padding-right: 0.75rem !important;
}

/* Mejor espaciado vertical */
:deep(.p-dropdown) {
  line-height: 1.5;
}

/* Estilos para placeholders más visibles */
:deep(.p-dropdown-label) {
  color: rgb(156, 163, 175); /* gray-400 */
}

:deep(.p-dropdown-label.p-placeholder) {
  color: rgb(156, 163, 175); /* gray-400 */
  opacity: 1;
}

/* Transición suave para los estados */
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
