//Módulo Create app
import { createApp } from 'vue'
import { createPinia } from 'pinia'

//Importar
import App from './App.vue'
import router from './router/index.js'
import './services/http.js'

//Renderizar aplicação
const app = createApp(App);

app.use(router);
app.use(createPinia())
// app.use(store); // Usando o store

app.mount('#app')
