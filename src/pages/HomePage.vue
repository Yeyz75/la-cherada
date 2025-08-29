<template>
  <div class="min-h-screen">
    <!-- Fondo animado -->
    <AnimatedBackground :overlay="false" />

    <!-- Hero Section Mejorado -->
    <AnimatedSection class="relative py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-8">
          <!-- Badge de bienvenida -->
          <div
            class="inline-flex items-center px-6 py-3 rounded-full bg-white/20 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 text-sm font-medium backdrop-blur-md border border-white/30 dark:border-gray-700/30"
          >
            <svg
              class="w-5 h-5 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            {{ $t('homePage.section.title') }}
          </div>

          <!-- Título principal con gradiente y animación -->
          <div class="space-y-6">
            <h1
              class="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
            >
              <span
                class="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-400 dark:via-purple-400 dark:to-green-400 bg-clip-text text-transparent animate-pulse"
              >
                {{ $t('homePage.hero.headline') }}
              </span>
              <span
                class="block bg-gradient-to-r from-green-600 via-yellow-500 to-orange-600 dark:from-green-400 dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent"
              >
                {{ $t('homePage.hero.headlineHighlight') }}
              </span>
              <span class="block text-gray-800 dark:text-gray-200">
                {{ $t('homePage.hero.headlineEnd') }}
              </span>
            </h1>

            <!-- Subtítulo elegante -->
            <p
              class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {{ $t('homePage.hero.subtitle') }}
            </p>
          </div>

          <!-- Botones CTA modernos -->
          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <BaseButton
              variant="primary"
              size="lg"
              @click="handleGetStarted"
              class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              {{ $t('homePage.hero.getStarted') }}
            </BaseButton>

            <BaseButton
              variant="outline"
              size="lg"
              @click="handleLearnMore"
              class="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 dark:bg-gray-800/10"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              {{ $t('homePage.hero.learnMore') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </AnimatedSection>

    <!-- Sección de Beneficios Modernizada -->
    <AnimatedSection class="relative py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Título de beneficios -->
        <div class="text-center mb-16">
          <h2
            class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {{ $t('homePage.benefits.title') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ $t('homePage.benefits.subtitle') }}
          </p>
        </div>

        <!-- Grid de beneficios con animaciones -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Beneficio 1: Prestar y Pedir -->
          <ModernCard
            variant="glass"
            :hover-effect="true"
            :glow-effect="true"
            class="text-center group"
            padding="p-8"
          >
            <!-- Icono animado -->
            <div class="relative mb-8">
              <div
                class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl"
              >
                <svg
                  class="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <!-- Efecto de pulso -->
              <div
                class="absolute inset-0 w-24 h-24 mx-auto bg-blue-500 rounded-2xl opacity-20 animate-ping"
              ></div>
            </div>

            <h3
              class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            >
              {{ $t('homePage.hero.benefits.lendBorrow.title') }}
            </h3>
            <p
              class="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4"
            >
              {{ $t('homePage.hero.benefits.lendBorrow.subtitle') }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ $t('homePage.hero.benefits.lendBorrow.description') }}
            </p>
          </ModernCard>

          <!-- Beneficio 2: Donar -->
          <ModernCard
            variant="glass"
            :hover-effect="true"
            :glow-effect="true"
            class="text-center group"
            padding="p-8"
          >
            <div class="relative mb-8">
              <div
                class="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl"
              >
                <svg
                  class="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div
                class="absolute inset-0 w-24 h-24 mx-auto bg-green-500 rounded-2xl opacity-20 animate-ping"
              ></div>
            </div>

            <h3
              class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"
            >
              {{ $t('homePage.hero.benefits.donate.title') }}
            </h3>
            <p
              class="text-lg text-green-600 dark:text-green-400 font-semibold mb-4"
            >
              {{ $t('homePage.hero.benefits.donate.subtitle') }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ $t('homePage.hero.benefits.donate.description') }}
            </p>
          </ModernCard>

          <!-- Beneficio 3: Vender -->
          <ModernCard
            variant="glass"
            :hover-effect="true"
            :glow-effect="true"
            class="text-center group"
            padding="p-8"
          >
            <div class="relative mb-8">
              <div
                class="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl"
              >
                <svg
                  class="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div
                class="absolute inset-0 w-24 h-24 mx-auto bg-orange-500 rounded-2xl opacity-20 animate-ping"
              ></div>
            </div>

            <h3
              class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
            >
              {{ $t('homePage.hero.benefits.sell.title') }}
            </h3>
            <p
              class="text-lg text-orange-600 dark:text-orange-400 font-semibold mb-4"
            >
              {{ $t('homePage.hero.benefits.sell.subtitle') }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ $t('homePage.hero.benefits.sell.description') }}
            </p>
          </ModernCard>
        </div>
      </div>
    </AnimatedSection>

    <!-- Sección Cómo Funciona Moderna -->
    <AnimatedSection
      class="relative py-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Título -->
        <div class="text-center mb-16">
          <h2
            class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {{ $t('homePage.howItWorks.title') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ $t('homePage.howItWorks.subtitle') }}
          </p>
        </div>

        <!-- Pasos con línea conectora -->
        <div class="relative">
          <!-- Línea conectora -->
          <div
            class="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-800 dark:via-purple-800 dark:to-green-800 transform -translate-y-1/2"
          ></div>

          <!-- Grid de pasos -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Paso 1 -->
            <ModernCard
              variant="solid"
              :hover-effect="true"
              :glow-effect="true"
              class="relative text-center group"
              padding="p-8"
            >
              <!-- Número del paso -->
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                >
                  1
                </div>
              </div>

              <!-- Icono -->
              <div class="mt-8 mb-6">
                <div
                  class="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-10 h-10 text-blue-600 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ $t('homePage.howItWorks.steps.register.title') }}
              </h3>
              <p
                class="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4"
              >
                {{ $t('homePage.howItWorks.steps.register.subtitle') }}
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t('homePage.howItWorks.steps.register.description') }}
              </p>
            </ModernCard>

            <!-- Paso 2 -->
            <ModernCard
              variant="solid"
              :hover-effect="true"
              :glow-effect="true"
              class="relative text-center group"
              padding="p-8"
            >
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                >
                  2
                </div>
              </div>

              <div class="mt-8 mb-6">
                <div
                  class="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-10 h-10 text-purple-600 dark:text-purple-300"
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
                </div>
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ $t('homePage.howItWorks.steps.publish.title') }}
              </h3>
              <p
                class="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-4"
              >
                {{ $t('homePage.howItWorks.steps.publish.subtitle') }}
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t('homePage.howItWorks.steps.publish.description') }}
              </p>
            </ModernCard>

            <!-- Paso 3 -->
            <ModernCard
              variant="solid"
              :hover-effect="true"
              :glow-effect="true"
              class="relative text-center group"
              padding="p-8"
            >
              <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                >
                  3
                </div>
              </div>

              <div class="mt-8 mb-6">
                <div
                  class="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-10 h-10 text-green-600 dark:text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ $t('homePage.howItWorks.steps.connect.title') }}
              </h3>
              <p
                class="text-lg text-green-600 dark:text-green-400 font-semibold mb-4"
              >
                {{ $t('homePage.howItWorks.steps.connect.subtitle') }}
              </p>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t('homePage.howItWorks.steps.connect.description') }}
              </p>
            </ModernCard>
          </div>
        </div>
      </div>
    </AnimatedSection>

    <!-- Estadísticas Impresionantes -->
    <AnimatedSection class="relative py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16"
        >
          {{ $t('homePage.howItWorks.whyChoose.title') }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <AnimatedCounter
            :target-value="25000"
            suffix="+"
            :label="$t('homePage.stats.users')"
            :is-visible="statsVisible"
          />
          <AnimatedCounter
            :target-value="8500"
            suffix="+"
            :label="$t('homePage.stats.exchanges')"
            :is-visible="statsVisible"
          />
          <AnimatedCounter
            :target-value="97"
            suffix="%"
            :label="$t('homePage.stats.satisfaction')"
            :is-visible="statsVisible"
          />
          <AnimatedCounter
            :target-value="150"
            suffix="+"
            :label="$t('homePage.stats.cities')"
            :is-visible="statsVisible"
          />
        </div>

        <!-- Razones para elegir -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {{ $t('homePage.howItWorks.whyChoose.benefits.secure.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{
                $t('homePage.howItWorks.whyChoose.benefits.secure.description')
              }}
            </p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {{ $t('homePage.howItWorks.whyChoose.benefits.saveMoney.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{
                $t(
                  'homePage.howItWorks.whyChoose.benefits.saveMoney.description'
                )
              }}
            </p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {{ $t('homePage.howItWorks.whyChoose.benefits.community.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{
                $t(
                  'homePage.howItWorks.whyChoose.benefits.community.description'
                )
              }}
            </p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {{
                $t('homePage.howItWorks.whyChoose.benefits.ecoFriendly.title')
              }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{
                $t(
                  'homePage.howItWorks.whyChoose.benefits.ecoFriendly.description'
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>

    <!-- CTA Final -->
    <AnimatedSection
      class="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="space-y-8">
          <h2 class="text-4xl md:text-5xl font-bold text-white">
            {{ $t('homePage.cta.title') }}
          </h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            {{ $t('homePage.cta.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <BaseButton
              variant="secondary"
              size="lg"
              @click="handleGetStarted"
              class="bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
            >
              {{ $t('homePage.cta.startNow') }}
            </BaseButton>
            <BaseButton
              variant="outline"
              size="lg"
              @click="$router.push('/como-funciona')"
              class="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
            >
              {{ $t('homePage.cta.learnMore') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
import {
  AnimatedSection,
  ModernCard,
  AnimatedBackground,
  AnimatedCounter,
  BaseButton
} from '@/components/common'

// Composables
const router = useRouter()
const { t } = useTranslation()

// Estado reactivo
const statsVisible = ref(false)

// Métodos
const handleGetStarted = () => {
  // TODO: Navegar a registro o implementar modal
  router.push('/explorar')
}

const handleLearnMore = () => {
  router.push('/como-funciona')
}

// Lifecycle
onMounted(() => {
  // Activar estadísticas con delay para animación
  setTimeout(() => {
    statsVisible.value = true
  }, 1000)
})
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
