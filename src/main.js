import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { guardian } from './guardian.js'

createApp(App).use(guardian, {
    
}).mount('#app')
