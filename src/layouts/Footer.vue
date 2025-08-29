<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo y descripción -->
        <div class="col-span-1 lg:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="w-8 h-8 bg-gradient-to-r from-lacherada-green to-lacherada-blue rounded-lg flex items-center justify-center"
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
              <component :is="social.icon" class="h-6 w-6" />
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
                +57 300 123 4567
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
              <span class="text-gray-300"> Bogotá, Colombia </span>
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
    icon: 'FacebookIcon'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/lacherada',
    icon: 'TwitterIcon'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/lacherada',
    icon: 'InstagramIcon'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/lacherada',
    icon: 'LinkedInIcon'
  }
]
</script>

<script lang="ts">
// Iconos de redes sociales como componentes inline
const FacebookIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  `
}

const TwitterIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  `
}

const InstagramIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-9.469c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-3.718 9.469c-2.26 0-4.094-1.834-4.094-4.094s1.834-4.094 4.094-4.094 4.094 1.834 4.094 4.094-1.834 4.094-4.094 4.094z"/>
    </svg>
  `
}

const LinkedInIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `
}

export default {
  components: {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedInIcon
  }
}
</script>
