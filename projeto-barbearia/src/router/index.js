import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../pages/AuthPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'auth',
            component: AuthPage
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage
        }
    ]
})

export default router;