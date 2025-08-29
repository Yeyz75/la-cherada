import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/main.css'

const app = createApp(App)

// Configure Pinia for state management
app.use(createPinia())

// Configure Vue Router
app.use(router)

app.mount('#app')
