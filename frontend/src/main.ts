import { createApp } from 'vue'
import Router from './router';
import './style.css'
import App from './App.vue'

const app = createApp(App);
app.use(Router);
app.mount("#app");
