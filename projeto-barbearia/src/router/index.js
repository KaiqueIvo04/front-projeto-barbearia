import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@pages/authPages/AuthPage.vue';
import RegisterPage from '@pages/authPages/RegisterPage.vue';
import store from '@/store'; // Assumindo que você está usando Vuex para gerenciar o estado do usuário
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
            meta: { requiresAuth: true, type: 'admin' },
            children: []
        },
        // {
        //     path: '/employee',
        //     name: 'homeEmployee',
        //     component: homeEmployee,
        //     meta: { requiresAuth: true, type: 'employee' },
        //     children: []
        //   },
        //   {
        //     path: '/client',
        //     name: 'homeClient',
        //     component: homeEmployee,
        //     meta: { requiresAuth: true, type: 'client' },
        //     children: []
        //   },
        
    ]
})

// router.beforeEach((to, from, next) => {
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     const userRole = store.getters['auth/role']; // Supondo que você tenha um getter no Vuex para pegar o papel do usuário
//     const isAuthenticated = store.getters['auth/isAuthenticated']; // Supondo que você tenha um getter no Vuex para verificar a autenticação
  
//     if (requiresAuth && !isAuthenticated) {
//       next({ name: 'auth' });
//     } else if (requiresAuth && to.meta.role !== userRole) {
//       next({ name: 'NotFound' }); // Ou você pode redirecionar para uma página de 'Acesso Negado'
//     } else {
//       next();
//     }
//   });

export default router;