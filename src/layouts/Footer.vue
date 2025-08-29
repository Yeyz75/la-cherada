<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo y descripción -->
        <div class="col-span-1 lg:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">LC</span>
            </div>
            <span class="text-xl font-bold">LaCherada</span>
          </div>
          <p class="text-gray-300 mb-6 max-w-md">
            La plataforma comunitaria donde puedes prestar, pedir prestado,
            donar, vender objetos o ofrecer servicios de forma sencilla y
            segura.
          </p>

          <!-- Redes sociales -->
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="`Síguenos en ${social.name}`"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BaseIcon :name="social.icon" size="1.5rem" />
            </a>
          </div>
        </div>

        <!-- Links institucionales -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4"
          >
            Empresa
          </h3>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.name">
              <router-link
                :to="link.href"
                class="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Información de contacto -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4"
          >
            Contacto
          </h3>
          <ul class="space-y-3">
            <li class="flex items-center space-x-3">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:contacto@lacherada.com"
                class="text-gray-300 hover:text-white transition-colors duration-200"
              >
                contacto@lacherada.com
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href="tel:+573001234567"
                class="text-gray-300 hover:text-white transition-colors duration-200"
              >
                +503 0000-1122
              </a>
            </li>
            <li class="flex items-start space-x-3">
              <svg
                class="h-5 w-5 text-gray-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-gray-300"> San Miguel, El Salvador </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Línea divisoria -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <!-- Copyright -->
          <div class="text-gray-400 text-sm">
            © {{ currentYear }} LaCherada. Todos los derechos reservados.
          </div>

          <!-- Links legales -->
          <div class="flex space-x-6">
            <router-link
              v-for="link in legalLinks"
              :key="link.name"
              :to="link.href"
              class="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FooterLink {
  name: string
  href: string
}

interface SocialLink {
  name: string
  href: string
  icon: string
}

const currentYear = computed<number>(() => new Date().getFullYear())

const companyLinks: FooterLink[] = [
  { name: 'Acerca de', href: '/acerca-de' },
  { name: 'Cómo funciona', href: '/como-funciona' },
  { name: 'Blog', href: '/blog' },
  { name: 'Carreras', href: '/carreras' },
  { name: 'Prensa', href: '/prensa' }
]

const legalLinks: FooterLink[] = [
  { name: 'Términos de Servicio', href: '/terminos' },
  { name: 'Política de Privacidad', href: '/privacidad' },
  { name: 'Cookies', href: '/cookies' }
]

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/lacherada',
    icon: 'pi-facebook'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/lacherada',
    icon: 'pi-twitter'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/lacherada',
    icon: 'pi-instagram'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/lacherada',
    icon: 'pi-linkedin'
  }
]
</script>
