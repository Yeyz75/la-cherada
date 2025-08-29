import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

// PrimeVue components - commonly used ones registered globally
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ProgressSpinner from 'primevue/progressspinner'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Chip from 'primevue/chip'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'
import Image from 'primevue/image'

// PrimeVue CSS - using styled mode with custom theme
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Custom styles
import './styles/main.css'
import './styles/primevue-theme.css'

const app = createApp(App)

// Configure PrimeVue with unstyled mode for better TailwindCSS integration
app.use(PrimeVue, {
  unstyled: false, // Keep styled for now, can be changed to true later for full Tailwind integration
  ripple: true,
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

// Configure PrimeVue services
app.use(ToastService)
app.use(ConfirmationService)

// Register commonly used PrimeVue components globally
app.component('PButton', Button)
app.component('PCard', Card)
app.component('PInputText', InputText)
app.component('PPassword', Password)
app.component('PDropdown', Dropdown)
app.component('PCalendar', Calendar)
app.component('PDataTable', DataTable)
app.component('PColumn', Column)
app.component('PDialog', Dialog)
app.component('PToast', Toast)
app.component('PConfirmDialog', ConfirmDialog)
app.component('PProgressSpinner', ProgressSpinner)
app.component('PMenu', Menu)
app.component('PMenubar', Menubar)
app.component('PAvatar', Avatar)
app.component('PBadge', Badge)
app.component('PChip', Chip)
app.component('PTag', Tag)
app.component('PDivider', Divider)
app.component('PImage', Image)

// Configure Pinia for state management
app.use(createPinia())

// Configure Vue Router
app.use(router)

// Configure i18n
app.use(i18n)

app.mount('#app')
