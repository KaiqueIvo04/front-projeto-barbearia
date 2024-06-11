import { defineStore } from 'pinia';
import axios from '../services/http.js';
import { computed, ref } from 'vue';

export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    let userType = ref();
    
    //Inserir token no armazenamento local do navegador
    function setToken(newToken) {
        localStorage.setItem('token', newToken);
        token.value = newToken;
    }

    //Verificar se o usuário está logado
    const isAuthenticated = computed(() => {
        return token.value;
    })

    //Verificar validade do token e retornar dados do usuário logado
    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value;
            const { data } = await axios.get("/auth/me", { //Também retorna dados do usuário
                headers: {
                    Authorization: tokenAuth,
                },
            });
            userType.value = data.admin?.userType || data.employee?.userType || data.client?.userType; //(?) verifica se existe

            return true;
        } catch (error) {
            console.log(error.response.data);
            return false;
        }
    }

    //Apagar credenciais de autenticação no logout
    function clear() {
        localStorage.removeItem('token');
        token.value = '';
        userType.value = '';
    }
        
    return {
        checkToken,
        setToken,
        isAuthenticated,
        token,
        userType,
        clear
    }
})