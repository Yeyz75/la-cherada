import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

// PrimeVue CSS - using styled mode with custom theme
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Solo registramos los componentes más críticos globalmente
// Los otros se importarán dinámicamente donde se necesiten
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ProgressSpinner from 'primevue/progressspinner'

export default function setupPrimeVue(app: App) {
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
      weekHeader: 'Sm',
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
}
