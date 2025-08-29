<template>
  <div class="min-h-screen">
    <!-- Fondo animado -->
    <AnimatedBackground :overlay="true" />

    <!-- Hero Section -->
    <AnimatedSection class="relative py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium backdrop-blur-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            {{ $t('howItWorks.badge') }}
          </div>

          <!-- Título principal -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span
              class="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
            >
              {{ $t('howItWorks.title') }}
            </span>
          </h1>

          <!-- Subtítulo -->
          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            {{ $t('howItWorks.subtitle') }}
          </p>
        </div>
      </div>
    </AnimatedSection>

    <!-- Pasos principales -->
    <AnimatedSection class="relative py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <ModernCard
            v-for="(step, index) in steps"
            :key="index"
            variant="glass"
            :hover-effect="true"
            :glow-effect="true"
            class="text-center"
            padding="p-8"
          >
            <!-- Número del paso -->
            <div class="relative mb-8">
              <div
                class="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300"
              >
                <span class="text-2xl font-bold text-white">{{
                  index + 1
                }}</span>
              </div>
              <!-- Línea conectora (excepto último elemento) -->
              <div
                v-if="index < steps.length - 1"
                class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800"
              />
            </div>

            <!-- Contenido -->
            <div class="space-y-4">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ step.title }}
              </h3>
              <p class="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                {{ step.subtitle }}
              </p>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ step.description }}
              </p>

              <!-- Lista de características -->
              <div class="pt-4">
                <ul class="space-y-3 text-sm">
                  <li
                    v-for="(feature, idx) in $tm(step.featuresKey)"
                    :key="idx"
                    class="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      class="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </AnimatedSection>

    <!-- Estadísticas impresionantes -->
    <AnimatedSection
      class="relative py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16"
        >
          {{ $t('howItWorks.stats.title') }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter
            v-for="stat in stats"
            :key="stat.label"
            :target-value="stat.value"
            :suffix="stat.suffix"
            :label="stat.label"
            :is-visible="statsVisible"
          />
        </div>
      </div>
    </AnimatedSection>

    <!-- Ventajas de elegir LaCherada -->
    <AnimatedSection class="relative py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Título de la sección -->
        <div class="text-center mb-16">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {{ $t('howItWorks.benefits.title') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ $t('howItWorks.benefits.subtitle') }}
          </p>
        </div>

        <!-- Grid de beneficios -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ModernCard
            v-for="(benefit, index) in benefits"
            :key="index"
            variant="gradient"
            :hover-effect="true"
            class="flex items-start space-x-6"
            padding="p-8"
          >
            <!-- Icono -->
            <div class="flex-shrink-0">
              <div
                class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <component :is="benefit.icon" class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Contenido -->
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {{ benefit.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ benefit.description }}
              </p>
            </div>
          </ModernCard>
        </div>
      </div>
    </AnimatedSection>

    <!-- CTA Final -->
    <AnimatedSection
      class="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8">
          <h2 class="text-3xl md:text-4xl font-bold text-white">
            {{ $t('howItWorks.cta.title') }}
          </h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            {{ $t('howItWorks.cta.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton variant="primary" size="lg" class="text-white">
              {{ $t('howItWorks.cta.startNow') }}
            </BaseButton>
            <BaseButton
              variant="outline"
              size="lg"
              class="text-white border-white hover:bg-white/10"
            >
              {{ $t('howItWorks.cta.learnMore') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTranslation } from '@/composables/useTranslation'
import { useI18n } from 'vue-i18n'
import {
  AnimatedSection,
  ModernCard,
  AnimatedBackground,
  AnimatedCounter,
  BaseButton
} from '@/components/common'

// Composables
const { t } = useI18n()

// Datos reactivos
const statsVisible = ref(false)

// Datos estáticos
const steps = [
  {
    title: t('howItWorks.steps.register.title'),
    subtitle: t('howItWorks.steps.register.subtitle'),
    description: t('howItWorks.steps.register.description'),
    featuresKey: 'howItWorks.steps.register.features'
  },
  {
    title: t('howItWorks.steps.publish.title'),
    subtitle: t('howItWorks.steps.publish.subtitle'),
    description: t('howItWorks.steps.publish.description'),
    featuresKey: 'howItWorks.steps.publish.features'
  },
  {
    title: t('howItWorks.steps.connect.title'),
    subtitle: t('howItWorks.steps.connect.subtitle'),
    description: t('howItWorks.steps.connect.description'),
    featuresKey: 'howItWorks.steps.connect.features'
  }
]

const stats = [
  { value: 50000, suffix: '+', label: t('howItWorks.stats.users') },
  { value: 15000, suffix: '+', label: t('howItWorks.stats.exchanges') },
  { value: 98, suffix: '%', label: t('howItWorks.stats.satisfaction') },
  { value: 200, suffix: '+', label: t('howItWorks.stats.cities') }
]

const benefits = [
  {
    title: t('howItWorks.benefits.secure.title'),
    description: t('howItWorks.benefits.secure.description'),
    icon: 'ShieldCheckIcon'
  },
  {
    title: t('howItWorks.benefits.saveMoney.title'),
    description: t('howItWorks.benefits.saveMoney.description'),
    icon: 'CurrencyDollarIcon'
  },
  {
    title: t('howItWorks.benefits.community.title'),
    description: t('howItWorks.benefits.community.description'),
    icon: 'UsersIcon'
  },
  {
    title: t('howItWorks.benefits.ecoFriendly.title'),
    description: t('howItWorks.benefits.ecoFriendly.description'),
    icon: 'GlobeAltIcon'
  }
]

// Lifecycle
onMounted(() => {
  // Activar las estadísticas después de un delay para el efecto de animación
  setTimeout(() => {
    statsVisible.value = true
  }, 500)
})
</script>
