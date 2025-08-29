import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './styles/main.css'

const app = createApp(App)

// Configure Pinia for state management
app.use(createPinia())

// Configure Vue Router
app.use(router)

// Configure i18n
app.use(i18n)

app.mount('#app')
