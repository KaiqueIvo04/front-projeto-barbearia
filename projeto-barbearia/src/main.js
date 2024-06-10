//Módulo Create app
import { createApp } from 'vue'

//Importar
import App from './App.vue'
import router from './router/index.js'
import store from './store'; // Importando o store

//Renderizar aplicação
const app = createApp(App);

app.use(router);
app.use(store); // Usando o store

app.mount('#app')
