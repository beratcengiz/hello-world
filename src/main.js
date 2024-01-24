import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'
const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
