import { defineStore } from 'pinia';
import axios from '../services/http.js';
import { computed, ref } from 'vue';

export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const userType = ref(null);
    
    function setToken(newToken) {
        localStorage.setItem('token', newToken);
        token.value = newToken;
    }

    const isAuthenticated = computed(() => {
        return token.value;
    })

    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value;
            const { data } = await axios.get("/auth/me", { //Também retorna dados do usuário
                headers: {
                    Authorization: tokenAuth,
                },
            });
            userType.value = data.userType;
            return true;
        } catch (error) {
            console.log(error.response.data);
            return false;
        }
    }
        
    return {
        checkToken,
        setToken,
        isAuthenticated,
        token,
        userType
    }
})