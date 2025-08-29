<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('homePage.howItWorks.title') }}
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ $t('homePage.howItWorks.subtitle') }}
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <!-- Step 1 -->
        <BaseCard
          :title="$t('homePage.howItWorks.steps.register.title')"
          :subtitle="$t('homePage.howItWorks.steps.register.subtitle')"
          :hoverable="true"
          class="text-center relative"
        >
          <div class="flex justify-center mb-6">
            <!-- Placeholder for illustration -->
            <div
              class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-600 mb-4">
            {{ $t('homePage.howItWorks.steps.register.description') }}
          </p>
          <ul class="text-sm text-gray-500 space-y-1">
            <li
              v-for="feature in $t(
                'homePage.howItWorks.steps.register.features'
              )"
              :key="feature"
            >
              • {{ feature }}
            </li>
          </ul>

          <!-- Step connector arrow (hidden on mobile) -->
          <div
            class="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2"
          >
            <svg
              class="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </BaseCard>

        <!-- Step 2 -->
        <BaseCard
          :title="$t('homePage.howItWorks.steps.publish.title')"
          :subtitle="$t('homePage.howItWorks.steps.publish.subtitle')"
          :hoverable="true"
          class="text-center relative"
        >
          <div class="flex justify-center mb-6">
            <!-- Placeholder for illustration -->
            <div
              class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-600 mb-4">
            {{ $t('homePage.howItWorks.steps.publish.description') }}
          </p>
          <ul class="text-sm text-gray-500 space-y-1">
            <li
              v-for="feature in $t(
                'homePage.howItWorks.steps.publish.features'
              )"
              :key="feature"
            >
              • {{ feature }}
            </li>
          </ul>

          <!-- Step connector arrow (hidden on mobile) -->
          <div
            class="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2"
          >
            <svg
              class="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </BaseCard>

        <!-- Step 3 -->
        <BaseCard
          :title="$t('homePage.howItWorks.steps.connect.title')"
          :subtitle="$t('homePage.howItWorks.steps.connect.subtitle')"
          :hoverable="true"
          class="text-center"
        >
          <div class="flex justify-center mb-6">
            <!-- Placeholder for illustration -->
            <div
              class="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                ></path>
              </svg>
            </div>
          </div>
          <p class="text-gray-600 mb-4">
            {{ $t('homePage.howItWorks.steps.connect.description') }}
          </p>
          <ul class="text-sm text-gray-500 space-y-1">
            <li
              v-for="feature in $t(
                'homePage.howItWorks.steps.connect.features'
              )"
              :key="feature"
            >
              • {{ feature }}
            </li>
          </ul>
        </BaseCard>
      </div>

      <!-- Additional Benefits Section -->
      <div class="mt-16 bg-gray-50 rounded-2xl p-8 sm:p-12">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            {{ $t('homePage.howItWorks.whyChoose.title') }}
          </h3>
          <p class="text-gray-600">
            {{ $t('homePage.howItWorks.whyChoose.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">
              {{ $t('homePage.howItWorks.whyChoose.benefits.secure.title') }}
            </h4>
            <p class="text-sm text-gray-600">
              {{
                $t('homePage.howItWorks.whyChoose.benefits.secure.description')
              }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3"
            >
              <svg
                class="w-6 h-6 text-green-600"
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
            <h4 class="font-semibold text-gray-900 mb-1">
              {{ $t('homePage.howItWorks.whyChoose.benefits.saveMoney.title') }}
            </h4>
            <p class="text-sm text-gray-600">
              {{
                $t(
                  'homePage.howItWorks.whyChoose.benefits.saveMoney.description'
                )
              }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3"
            >
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">
              {{ $t('homePage.howItWorks.whyChoose.benefits.community.title') }}
            </h4>
            <p class="text-sm text-gray-600">
              {{
                $t(
                  'homePage.howItWorks.whyChoose.benefits.community.description'
                )
              }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3"
            >
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">
              {{
                $t('homePage.howItWorks.whyChoose.benefits.ecoFriendly.title')
              }}
            </h4>
            <p class="text-sm text-gray-600">
              {{
                $t(
                  'homePage.howItWorks.whyChoose.benefits.ecoFriendly.description'
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue'
</script>
