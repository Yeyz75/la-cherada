import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useAuthStore } from '@/stores/authStore'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

// Solo los componentes más críticos registrados globalmente
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ProgressSpinner from 'primevue/progressspinner'

// PrimeVue CSS
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Custom styles
import './styles/main.css'
import './styles/primevue-theme.css'

const app = createApp(App)

// Custom components - registrar globalmente
import { BaseIcon } from '@/components/common'

// Configure PrimeVue
app.use(PrimeVue, {
  unstyled: false,
  ripple: false,
  locale: {
    accept: 'Aceptar',
    reject: 'Cancelar',
    choose: 'Elegir',
    upload: 'Subir',
    cancel: 'Cancelar',
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    today: 'Hoy',
    clear: 'Limpiar',
    weekHeader: 'Sem',
    firstDayOfWeek: 1
  }
})

// Services
app.use(ToastService)
app.use(ConfirmationService)

// Register critical components globally
app.component('PButton', Button)
app.component('PInputText', InputText)
app.component('PPassword', Password)
app.component('PToast', Toast)
app.component('PConfirmDialog', ConfirmDialog)
app.component('PProgressSpinner', ProgressSpinner)

// Register custom components globally
app.component('BaseIcon', BaseIcon)

// Configure Pinia for state management
app.use(createPinia())

// Configure Vue Router
app.use(router)

// Configure i18n
app.use(i18n)

// Initialize authentication
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
