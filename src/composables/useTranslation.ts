import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

/**
 * Composable for translation utilities
 * Provides easy access to translation functions and common translations
 */
export const useTranslation = () => {
  const { t, locale } = useI18n()

  // Common translations that are used frequently
  const common = computed(() => ({
    loading: t('common.loading'),
    error: t('common.error'),
    close: t('common.close'),
    cancel: t('common.cancel'),
    save: t('common.save'),
    delete: t('common.delete'),
    edit: t('common.edit'),
    required: t('common.required')
  }))

  const auth = computed(() => ({
    login: t('auth.login'),
    logout: t('auth.logout'),
    register: t('auth.register'),
    email: t('auth.email'),
    password: t('auth.password'),
    name: t('auth.name'),
    loggingIn: t('auth.loggingIn'),
    loggingOut: t('auth.loggingOut'),
    registering: t('auth.registering'),
    checkingAuth: t('auth.checkingAuth')
  }))

  // Helper function to change language
  const changeLanguage = (newLocale: string) => {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  // Helper function to get current language
  const currentLanguage = computed(() => locale.value)

  return {
    t,
    locale,
    common,
    auth,
    changeLanguage,
    currentLanguage
  }
}
