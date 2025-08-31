<template>
  <div class="settings-section space-y-6">
    <!-- Header de la sección -->
    <div class="section-header">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        {{ $t('dashboard.sections.settings.title') }}
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ $t('dashboard.sections.settings.subtitle') }}
      </p>
    </div>

    <!-- Configuraciones de cuenta -->
    <BaseCard
      :title="$t('dashboard.settings.account.title')"
      shadow="sm"
      padding="lg"
    >
      <div class="space-y-4">
        <!-- Tema -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.theme') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.themeDescription') }}
            </p>
          </div>
          <ThemeToggle />
        </div>

        <!-- Idioma -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.language') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.languageDescription') }}
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        <!-- Notificaciones push -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.pushNotifications') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.pushNotificationsDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.pushNotifications"
            @change="
              updateSetting('pushNotifications', settings.pushNotifications)
            "
          />
        </div>

        <!-- Localización automática -->
        <div class="flex items-center justify-between py-3">
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.autoLocation') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.autoLocationDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.autoLocation"
            @change="updateSetting('autoLocation', settings.autoLocation)"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Configuraciones de privacidad -->
    <BaseCard
      :title="$t('dashboard.settings.privacy.title')"
      shadow="sm"
      padding="lg"
    >
      <div class="space-y-4">
        <!-- Perfil público -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.publicProfile') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.publicProfileDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.publicProfile"
            @change="updateSetting('publicProfile', settings.publicProfile)"
          />
        </div>

        <!-- Mostrar estadísticas -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.showStats') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.showStatsDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.showStats"
            @change="updateSetting('showStats', settings.showStats)"
          />
        </div>

        <!-- Actividad pública -->
        <div class="flex items-center justify-between py-3">
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.publicActivity') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.publicActivityDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.publicActivity"
            @change="updateSetting('publicActivity', settings.publicActivity)"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Configuraciones de comunicación -->
    <BaseCard
      :title="$t('dashboard.settings.communication.title')"
      shadow="sm"
      padding="lg"
    >
      <div class="space-y-4">
        <!-- Email de notificaciones -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.emailNotifications') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.emailNotificationsDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.emailNotifications"
            @change="
              updateSetting('emailNotifications', settings.emailNotifications)
            "
          />
        </div>

        <!-- Email de marketing -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.marketingEmails') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.marketingEmailsDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.marketingEmails"
            @change="updateSetting('marketingEmails', settings.marketingEmails)"
          />
        </div>

        <!-- SMS notifications -->
        <div class="flex items-center justify-between py-3">
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.smsNotifications') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.smsNotificationsDescription') }}
            </p>
          </div>
          <BaseCheckbox
            v-model="settings.smsNotifications"
            @change="
              updateSetting('smsNotifications', settings.smsNotifications)
            "
          />
        </div>
      </div>
    </BaseCard>

    <!-- Acciones de cuenta -->
    <BaseCard
      :title="$t('dashboard.settings.account.actions')"
      shadow="sm"
      padding="lg"
    >
      <div class="space-y-4">
        <!-- Exportar datos -->
        <div
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700"
        >
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ $t('dashboard.settings.exportData') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.exportDataDescription') }}
            </p>
          </div>
          <BaseButton
            variant="secondary"
            size="small"
            @click="exportUserData"
            :disabled="isExporting"
          >
            <BaseLoader v-if="isExporting" size="sm" class="mr-2" />
            {{
              isExporting
                ? $t('dashboard.settings.exporting')
                : $t('dashboard.settings.export')
            }}
          </BaseButton>
        </div>

        <!-- Eliminar cuenta -->
        <div class="flex items-center justify-between py-3">
          <div>
            <h4 class="text-sm font-medium text-red-600 dark:text-red-400">
              {{ $t('dashboard.settings.deleteAccount') }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('dashboard.settings.deleteAccountDescription') }}
            </p>
          </div>
          <BaseButton
            variant="danger"
            size="small"
            @click="confirmDeleteAccount"
          >
            {{ $t('dashboard.settings.delete') }}
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Modal de confirmación para eliminar cuenta -->
    <BaseModal
      :show="showDeleteModal"
      :title="$t('dashboard.settings.confirmDelete')"
      @close="showDeleteModal = false"
    >
      <template #content>
        <div class="p-6">
          <div class="flex items-start space-x-3">
            <BaseIcon
              name="exclamation-triangle"
              class="w-6 h-6 text-red-500 mt-1"
            />
            <div>
              <h3
                class="text-lg font-medium text-gray-900 dark:text-white mb-2"
              >
                {{ $t('dashboard.settings.deleteWarning') }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t('dashboard.settings.deleteWarningDescription') }}
              </p>
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        <div class="flex space-x-3">
          <BaseButton variant="secondary" @click="showDeleteModal = false">
            {{ $t('common.cancel') }}
          </BaseButton>
          <BaseButton
            variant="danger"
            @click="deleteAccount"
            :disabled="isDeleting"
          >
            <BaseLoader v-if="isDeleting" size="sm" class="mr-2" />
            {{
              isDeleting
                ? $t('dashboard.settings.deleting')
                : $t('dashboard.settings.confirmDeleteButton')
            }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Components
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
import BaseLoader from '@/components/common/BaseLoader.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

// Composables
const { t } = useI18n()

// Estado reactivo
const settings = reactive({
  pushNotifications: true,
  autoLocation: false,
  publicProfile: true,
  showStats: true,
  publicActivity: false,
  emailNotifications: true,
  marketingEmails: false,
  smsNotifications: false
})

const showDeleteModal = ref(false)
const isExporting = ref(false)
const isDeleting = ref(false)

// Methods
const updateSetting = (key: keyof typeof settings, value: boolean): void => {
  settings[key] = value
  // TODO: Enviar actualización al backend
  console.log(`Updated setting ${key}:`, value)
}

const exportUserData = async (): Promise<void> => {
  isExporting.value = true
  try {
    // TODO: Implementar exportación real
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Simular descarga de archivo
    alert(t('dashboard.settings.exportSuccess'))
  } catch (error) {
    alert(t('dashboard.settings.exportError'))
  } finally {
    isExporting.value = false
  }
}

const confirmDeleteAccount = (): void => {
  showDeleteModal.value = true
}

const deleteAccount = async (): Promise<void> => {
  isDeleting.value = true
  try {
    // TODO: Implementar eliminación real de cuenta
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert(t('dashboard.settings.deleteSuccess'))
    showDeleteModal.value = false
  } catch (error) {
    alert(t('dashboard.settings.deleteError'))
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.settings-section {
  max-width: 4xl;
  margin: 0 auto;
}

.section-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid theme('colors.gray.200');
}

.dark .section-header {
  border-bottom-color: theme('colors.gray.700');
}

/* Animaciones de entrada */
.settings-section > * {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
