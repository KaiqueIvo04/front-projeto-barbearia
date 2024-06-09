import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@pages/authPages/AuthPage.vue';
import RegisterPage from '@pages/authPages/RegisterPage.vue';
// import adminRoutes from '@router/adminRoutes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'',
            redirect: '/auth'
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthPage,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage
        },
        {
            path: '/admin',
            name: 'homeAdmin',
            component: () => import('@pages/adminPages/homeAdmin.vue'), //Lazy Load (só carrega quando clicar no link - sem preload),
            // meta: {
            //     requiresAdmin: true
            // }
            children: []
        }
        
    ]
})

export default router;