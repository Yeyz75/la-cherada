import { createI18n } from 'vue-i18n'
import es from '../locales/es.json'
import en from '../locales/en.json'

const messages = {
  es,
  en
}

const i18n = createI18n({
  legacy: false,
  locale: 'es', // idioma por defecto
  fallbackLocale: 'en',
  messages
})

export default i18n
