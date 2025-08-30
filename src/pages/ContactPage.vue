<template>
  <div class="min-h-screen">
    <!-- Fondo animado -->
    <AnimatedBackground />

    <!-- Hero Section -->
    <AnimatedSection class="relative py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium backdrop-blur-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
              />
              <path
                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
              />
            </svg>
            {{ $t('contact.badge') }}
          </div>

          <!-- Título principal -->
          <h1 class="text-4xl md:text-6xl font-bold">
            <span
              class="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent"
            >
              {{ $t('contact.title') }}
            </span>
          </h1>

          <!-- Subtítulo -->
          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            {{ $t('contact.subtitle') }}
          </p>
        </div>
      </div>
    </AnimatedSection>

    <!-- Opciones de contacto -->
    <AnimatedSection class="relative py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Información de contacto -->
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {{ $t('contact.getInTouch.title') }}
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {{ $t('contact.getInTouch.description') }}
              </p>
            </div>

            <!-- Métodos de contacto -->
            <div class="space-y-6">
              <ModernCard
                v-for="method in contactMethods"
                :key="method.id"
                variant="glass"
                :hover-effect="true"
                class="flex items-center space-x-4"
                padding="p-6"
              >
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                  >
                    <component :is="method.icon" class="w-6 h-6 text-white" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {{ method.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ method.description }}
                  </p>
                  <p
                    class="text-purple-600 dark:text-purple-400 font-medium mt-1"
                  >
                    {{ method.value }}
                  </p>
                </div>
              </ModernCard>
            </div>

            <!-- Redes sociales -->
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {{ $t('contact.social.title') }}
              </h3>
              <div class="flex space-x-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transform transition-all duration-200"
                >
                  <component :is="social.icon" class="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <!-- Formulario de contacto -->
          <div>
            <ModernCard variant="solid" :glow-effect="true" padding="p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {{ $t('contact.form.title') }}
              </h3>

              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Nombre -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {{ $t('contact.form.name') }}
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    :placeholder="$t('contact.form.namePlaceholder')"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <!-- Email -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {{ $t('contact.form.email') }}
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    :placeholder="$t('contact.form.emailPlaceholder')"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <!-- Asunto -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {{ $t('contact.form.subject') }}
                  </label>
                  <select
                    v-model="form.subject"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">
                      {{ $t('contact.form.selectSubject') }}
                    </option>
                    <option value="general">
                      {{ $t('contact.form.subjects.general') }}
                    </option>
                    <option value="support">
                      {{ $t('contact.form.subjects.support') }}
                    </option>
                    <option value="business">
                      {{ $t('contact.form.subjects.business') }}
                    </option>
                    <option value="feedback">
                      {{ $t('contact.form.subjects.feedback') }}
                    </option>
                  </select>
                </div>

                <!-- Mensaje -->
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {{ $t('contact.form.message') }}
                  </label>
                  <textarea
                    v-model="form.message"
                    rows="6"
                    :placeholder="$t('contact.form.messagePlaceholder')"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>

                <!-- Botón de envío -->
                <BaseButton
                  type="submit"
                  variant="primary"
                  size="large"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <span v-if="!isSubmitting">{{
                    $t('contact.form.send')
                  }}</span>
                  <span v-else class="flex items-center justify-center">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {{ $t('contact.form.sending') }}
                  </span>
                </BaseButton>
              </form>
            </ModernCard>
          </div>
        </div>
      </div>
    </AnimatedSection>

    <!-- Estadísticas de contacto -->
    <AnimatedSection
      class="relative py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16"
        >
          {{ $t('contact.stats.title') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedCounter
            v-for="stat in contactStats"
            :key="stat.label"
            :target-value="stat.value"
            :suffix="stat.suffix"
            :label="stat.label"
            :is-visible="statsVisible"
          />
        </div>
      </div>
    </AnimatedSection>

    <!-- FAQ rápido -->
    <AnimatedSection class="relative py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16"
        >
          {{ $t('contact.faq.title') }}
        </h2>

        <div class="space-y-4">
          <ModernCard
            v-for="(faq, index) in faqs"
            :key="index"
            variant="glass"
            :hover-effect="true"
            padding="p-6"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full text-left flex justify-between items-center"
            >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ faq.question }}
              </h3>
              <svg
                :class="[
                  'w-5 h-5 text-gray-500 transition-transform duration-200',
                  openFaq === index ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              v-show="openFaq === index"
              class="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </ModernCard>
        </div>
      </div>
    </AnimatedSection>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTranslation } from '@/composables/useTranslation'
import {
  AnimatedSection,
  ModernCard,
  AnimatedBackground,
  AnimatedCounter,
  BaseButton
} from '@/components/common'

// Composables
const { t } = useTranslation()

// Estado reactivo
const statsVisible = ref(false)
const isSubmitting = ref(false)
const openFaq = ref<number | null>(null)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Datos estáticos
const contactMethods = [
  {
    id: 1,
    title: t('contact.methods.email.title'),
    description: t('contact.methods.email.description'),
    value: 'contacto@lacherada.com',
    icon: 'MailIcon'
  },
  {
    id: 2,
    title: t('contact.methods.phone.title'),
    description: t('contact.methods.phone.description'),
    value: '+1 (555) 123-4567',
    icon: 'PhoneIcon'
  },
  {
    id: 3,
    title: t('contact.methods.address.title'),
    description: t('contact.methods.address.description'),
    value: 'Calle Principal 123, Ciudad',
    icon: 'LocationMarkerIcon'
  }
]

const socialLinks = [
  { name: 'Facebook', url: '#', icon: 'FacebookIcon' },
  { name: 'Twitter', url: '#', icon: 'TwitterIcon' },
  { name: 'Instagram', url: '#', icon: 'InstagramIcon' },
  { name: 'LinkedIn', url: '#', icon: 'LinkedInIcon' }
]

const contactStats = [
  { value: 24, suffix: 'h', label: t('contact.stats.responseTime') },
  { value: 98, suffix: '%', label: t('contact.stats.satisfaction') },
  { value: 1000, suffix: '+', label: t('contact.stats.dailyMessages') }
]

const faqs = [
  {
    question: t('contact.faq.items.0.question'),
    answer: t('contact.faq.items.0.answer')
  },
  {
    question: t('contact.faq.items.1.question'),
    answer: t('contact.faq.items.1.answer')
  },
  {
    question: t('contact.faq.items.2.question'),
    answer: t('contact.faq.items.2.answer')
  }
]

// Métodos
const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    // TODO: Mostrar mensaje de éxito
  } catch (error) {
    // TODO: Mostrar mensaje de error
  } finally {
    isSubmitting.value = false
  }
}

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    statsVisible.value = true
  }, 500)
})
</script>
