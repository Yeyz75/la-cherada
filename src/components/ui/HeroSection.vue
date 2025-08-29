<template>
  <section
    class="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-24"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Hero Headline -->
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
        >
          {{ $t('homePage.hero.headline') }}
          <span class="text-blue-600">{{
            $t('homePage.hero.headlineHighlight')
          }}</span>
          {{ $t('homePage.hero.headlineEnd') }}
        </h1>

        <!-- Hero Subtitle -->
        <p class="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {{ $t('homePage.hero.subtitle') }}
        </p>

        <!-- Call to Action Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <BaseButton variant="primary" size="lg" @click="handleGetStarted">
            {{ $t('homePage.hero.getStarted') }}
          </BaseButton>

          <BaseButton variant="outline" size="lg" @click="handleLearnMore">
            {{ $t('homePage.hero.learnMore') }}
          </BaseButton>
        </div>

        <!-- Hero Cards - Benefits Preview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <BaseCard
            :title="$t('homePage.hero.benefits.lendBorrow.title')"
            :subtitle="$t('homePage.hero.benefits.lendBorrow.subtitle')"
            :hoverable="true"
            class="text-center"
          >
            <div class="flex justify-center mb-4">
              <!-- Placeholder for icon -->
              <div
                class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  ></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600">
              {{ $t('homePage.hero.benefits.lendBorrow.description') }}
            </p>
          </BaseCard>

          <BaseCard
            :title="$t('homePage.hero.benefits.donate.title')"
            :subtitle="$t('homePage.hero.benefits.donate.subtitle')"
            :hoverable="true"
            class="text-center"
          >
            <div class="flex justify-center mb-4">
              <!-- Placeholder for icon -->
              <div
                class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600">
              {{ $t('homePage.hero.benefits.donate.description') }}
            </p>
          </BaseCard>

          <BaseCard
            :title="$t('homePage.hero.benefits.sell.title')"
            :subtitle="$t('homePage.hero.benefits.sell.subtitle')"
            :hoverable="true"
            class="text-center"
          >
            <div class="flex justify-center mb-4">
              <!-- Placeholder for icon -->
              <div
                class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600">
              {{ $t('homePage.hero.benefits.sell.description') }}
            </p>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Background decoration -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'

const handleGetStarted = (): void => {
  // TODO: Navigate to registration or main app
  // eslint-disable-next-line no-console
  console.log('Get started clicked')
}

const handleLearnMore = (): void => {
  // TODO: Scroll to how it works section or navigate to about page
  // eslint-disable-next-line no-console
  console.log('Learn more clicked')
}
</script>
