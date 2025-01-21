import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { guardian } from './guardian.js'

createApp(App).use(guardian, {
    messages: {
        required: 'test required ok!',
        email: 'test eamil ok!'
    }
}).mount('#app')
