//Módulo Create app
import { createApp } from 'vue'

//Importar
import App from './App.vue'
import router from './router/index.js'

//Renderizar aplicação
const app = createApp(App);

app.use(router);

app.mount('#app')
