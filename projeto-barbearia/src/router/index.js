import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@pages/authPages/AuthPage.vue';
import RegisterPage from '@pages/authPages/RegisterPage.vue';
import { useAuth } from '@/stores/auth.js';
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
            name: 'login',
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
            component: () => import('@pages/adminPages/HomeAdmin.vue'), //Lazy Load (só carrega quando clicar no link - sem preload),
            meta: { requiresAuth: true, type: 'admin' },
            children: []
        },
        {
            path: '/employee',
            name: 'homeEmployee',
            component: import('@pages/employeePages/HomeEmployee.vue'),
            meta: { requiresAuth: true, type: 'employee' },
            children: []
          },
          {
            path: '/client',
            name: 'homeClient',
            component: import('@pages/clientPages/HomeClient.vue'),
            meta: { requiresAuth: true, type: 'client' },
            children: []
          },
        
    ]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuth(); 
  //Falta verificar pq tá voltando pro login
    if (to.meta?.requiresAuth) {
        if (auth.token) {
            const isAuthenticated = await auth.checkToken();
            if (isAuthenticated) {
                const userType = auth.userType;
                if (to.meta.type && to.meta.type === userType) {
                    next(); // Tipo de usuário correspondente, pode acessar a rota
                } else {
                    next({ name: "login" }); // Tipo de usuário não correspondente, redireciona para login
                }
            } else {
                next({ name: "login" }); // Token inválido, redireciona para login
            }
        } else {
            next({ name: "login" }); // Sem token, redireciona para login
        }
    } else {
        next(); // Rota não precisa de autenticação, deixa acessar
    }
});

export default router;