<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Fondo animado -->
    <AnimatedBackground />

    <!-- Hero Section -->
    <AnimatedSection class="relative py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-8">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium backdrop-blur-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              />
            </svg>
            {{ $t('explore.badge') }}
          </div>

          <!-- Título principal -->
          <h1 class="text-4xl md:text-6xl font-bold">
            <span
              class="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            >
              {{ $t('explore.title') }}
            </span>
          </h1>

          <!-- Subtítulo -->
          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            {{ $t('explore.subtitle') }}
          </p>

          <!-- Barra de búsqueda -->
          <div class="max-w-2xl mx-auto">
            <ModernCard variant="glass" padding="p-2">
              <div class="flex items-center space-x-4">
                <div class="flex-1">
                  <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="$t('explore.searchPlaceholder')"
                    class="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <BaseButton variant="primary" size="sm" class="!px-6">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </BaseButton>
              </div>
            </ModernCard>
          </div>
        </div>
      </div>
    </AnimatedSection>

    <!-- Filtros y Categorías -->
    <AnimatedSection class="relative py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Pestañas de categorías -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105',
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
            ]"
            @click="selectedCategory = category.id"
          >
            <span class="mr-2">{{ category.emoji }}</span>
            {{ category.name }}
          </button>
        </div>

        <!-- Filtros adicionales -->
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <ModernCard variant="glass" padding="p-3">
            <select
              v-model="selectedFilter"
              class="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="all">{{ $t('explore.filters.all') }}</option>
              <option value="lend">{{ $t('explore.filters.lend') }}</option>
              <option value="sell">{{ $t('explore.filters.sell') }}</option>
              <option value="donate">{{ $t('explore.filters.donate') }}</option>
            </select>
          </ModernCard>

          <ModernCard variant="glass" padding="p-3">
            <select
              v-model="selectedLocation"
              class="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="all">
                {{ $t('explore.filters.allLocations') }}
              </option>
              <option value="nearby">{{ $t('explore.filters.nearby') }}</option>
              <option value="city">{{ $t('explore.filters.myCity') }}</option>
            </select>
          </ModernCard>
        </div>
      </div>
    </AnimatedSection>

    <!-- Grid de Items -->
    <AnimatedSection class="relative py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ModernCard
            v-for="item in filteredItems"
            :key="item.id"
            variant="solid"
            :hover-effect="true"
            :glow-effect="true"
            class="group cursor-pointer"
            padding="p-0"
            @click="openItemDetails(item)"
          >
            <!-- Imagen del item -->
            <div
              class="relative overflow-hidden rounded-t-2xl h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
            >
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-4xl">{{ item.emoji }}</div>
              </div>

              <!-- Badge de tipo -->
              <div class="absolute top-3 left-3">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm',
                    item.type === 'lend' && 'bg-blue-100/90 text-blue-700',
                    item.type === 'sell' && 'bg-green-100/90 text-green-700',
                    item.type === 'donate' && 'bg-purple-100/90 text-purple-700'
                  ]"
                >
                  {{ $t(`explore.types.${item.type}`) }}
                </span>
              </div>

              <!-- Badge de ubicación -->
              <div class="absolute top-3 right-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium bg-black/20 text-white backdrop-blur-sm"
                >
                  📍 {{ item.location }}
                </span>
              </div>
            </div>

            <!-- Contenido del item -->
            <div class="p-6 space-y-4">
              <div>
                <h3
                  class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  {{ item.title }}
                </h3>
                <p
                  class="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2"
                >
                  {{ item.description }}
                </p>
              </div>

              <!-- Usuario -->
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-sm font-medium">{{
                    item.user.initials
                  }}</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ item.user.name }}
                  </p>
                  <div class="flex items-center text-xs text-gray-500">
                    <svg
                      class="w-3 h-3 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    {{ item.user.rating }}
                  </div>
                </div>
              </div>

              <!-- Precio/Info adicional -->
              <div v-if="item.price" class="text-right">
                <span
                  class="text-lg font-bold text-green-600 dark:text-green-400"
                >
                  ${{ item.price }}
                </span>
              </div>
            </div>
          </ModernCard>
        </div>

        <!-- Estado de carga o sin resultados -->
        <div v-if="filteredItems.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ $t('explore.noResults.title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('explore.noResults.message') }}
          </p>
        </div>
      </div>
    </AnimatedSection>

    <!-- CTA para publicar -->
    <AnimatedSection
      class="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8">
          <h2 class="text-3xl md:text-4xl font-bold text-white">
            {{ $t('explore.cta.title') }}
          </h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            {{ $t('explore.cta.subtitle') }}
          </p>
          <BaseButton
            variant="secondary"
            size="lg"
            class="bg-white text-blue-600 hover:bg-gray-50"
          >
            {{ $t('explore.cta.publish') }}
          </BaseButton>
        </div>
      </div>
    </AnimatedSection>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTranslation } from '@/composables/useTranslation'
import {
  AnimatedSection,
  ModernCard,
  AnimatedBackground,
  BaseButton
} from '@/components/common'

// Composables
const { t } = useTranslation()

// Estado reactivo
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedFilter = ref('all')
const selectedLocation = ref('all')

// Datos de ejemplo
const categories = [
  { id: 'all', name: t('explore.categories.all'), emoji: '🌟' },
  { id: 'electronics', name: t('explore.categories.electronics'), emoji: '📱' },
  { id: 'tools', name: t('explore.categories.tools'), emoji: '🔧' },
  { id: 'books', name: t('explore.categories.books'), emoji: '📚' },
  { id: 'home', name: t('explore.categories.home'), emoji: '🏠' },
  { id: 'sports', name: t('explore.categories.sports'), emoji: '⚽' },
  { id: 'clothing', name: t('explore.categories.clothing'), emoji: '👕' }
]

const mockItems = [
  {
    id: 1,
    title: 'iPhone 13 Pro',
    description: 'Excelente estado, incluye cargador y funda protectora',
    emoji: '📱',
    type: 'sell',
    category: 'electronics',
    location: 'Centro',
    price: 800,
    user: { name: 'María García', initials: 'MG', rating: 4.9 }
  },
  {
    id: 2,
    title: 'Taladro Inalámbrico',
    description: 'Perfecto para proyectos de bricolaje',
    emoji: '🔧',
    type: 'lend',
    category: 'tools',
    location: 'Norte',
    price: null,
    user: { name: 'Carlos López', initials: 'CL', rating: 4.7 }
  },
  {
    id: 3,
    title: 'Colección de Novelas',
    description: 'Más de 50 libros en perfecto estado',
    emoji: '📚',
    type: 'donate',
    category: 'books',
    location: 'Sur',
    price: null,
    user: { name: 'Ana Martínez', initials: 'AM', rating: 4.8 }
  },
  {
    id: 4,
    title: 'Bicicleta de Montaña',
    description: 'Ideal para aventuras al aire libre',
    emoji: '🚴',
    type: 'sell',
    category: 'sports',
    location: 'Este',
    price: 350,
    user: { name: 'Pedro Rodríguez', initials: 'PR', rating: 4.6 }
  },
  {
    id: 5,
    title: 'Cámara Fotográfica',
    description: 'Canon EOS R5, lente incluido',
    emoji: '📸',
    type: 'lend',
    category: 'electronics',
    location: 'Centro',
    price: null,
    user: { name: 'Elena Vásquez', initials: 'EV', rating: 5.0 }
  },
  {
    id: 6,
    title: 'Sofá de 3 Plazas',
    description: 'Muy cómodo, color gris',
    emoji: '🛋️',
    type: 'sell',
    category: 'home',
    location: 'Oeste',
    price: 200,
    user: { name: 'Diego Silva', initials: 'DS', rating: 4.5 }
  }
]

// Computed para filtrar items
const filteredItems = computed(() => {
  let items = mockItems

  // Filtrar por categoría
  if (selectedCategory.value !== 'all') {
    items = items.filter(item => item.category === selectedCategory.value)
  }

  // Filtrar por tipo
  if (selectedFilter.value !== 'all') {
    items = items.filter(item => item.type === selectedFilter.value)
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    items = items.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return items
})

// Métodos
const openItemDetails = item => {
  // TODO: Implementar modal o navegación a detalle
  // eslint-disable-next-line no-console
  console.log('Abrir detalles del item:', item)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
