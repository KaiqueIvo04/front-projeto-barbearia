<template>
    <form class="p-4 p-md-5 rounded-4" id="form-login" @submit.prevent="login">
        <div id="login-logo" class="container-fluid d-flex p-0 justify-content-center">
            <p class="text-center">Kaique <br> BarberShop</p>
            <div class="d-flex align-items-center">
                <img class="img-fluid " src="@svg/barberShop.svg" alt="Logo Barber Shop">
            </div>
        </div>
        <div class="container-fluid p-0">
            <div id="login-field" class="d-flex mb-5">
                <img src="@svg/Email.svg" alt="E-mail">
                <input v-model="userData.email" type="email" id="input-email" class="form-control" placeholder="E-mail" required>
            </div>
            <div id="login-field" class="d-flex mb-5 position-relative">
                <img src="@svg/Password.svg" alt="Senha">
                <input :type="passwordFieldType" v-model="userData.password" id="input-senha" class="form-control" placeholder="Senha" required>
                <button type="button" class="btn-show-password" @click="togglePasswordVisibility">
                    <img :src="passwordIcon" alt="Mostrar/Esconder Senha">
                </button>
            </div>
            <input id="login-button" type="submit" class="btn col-12" value="Entrar">
        </div>
        <RouterLink to="/register">Criar Conta</RouterLink>
    </form>
</template>


<script setup>
import axios from '../../services/http.js';
import { reactive, ref, computed } from 'vue';
import { useAuth } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

import showPasswordIcon from '@svg/show.svg';
import hidePasswordIcon from '@svg/hide.svg';

const auth = useAuth();
const router = useRouter();

const userData = reactive({
    email: '',
    password: ''
});

const passwordFieldType = ref('password');
const passwordIcon = computed(() => (passwordFieldType.value === 'password' ? showPasswordIcon : hidePasswordIcon));

function togglePasswordVisibility() {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}

async function login() {
    try {
        const { data } = await axios.post('/auth/login', userData);
        auth.setToken(data.token);

        await auth.checkToken();

        if (auth.userType === 'admin') router.push({ name: 'homeAdmin' });
        else if (auth.userType === 'employee') router.push({ name: 'homeEmployee' });
        else if (auth.userType === 'client') router.push({ name: 'homeClient' });

    } catch (error) {
        alert(error?.response?.data.message);
        console.log(error?.response?.data);
    }
}
</script>
<style scoped lang="scss">
@import "@css/styles.scss";

#form-login {
    background-color: map-get($background-colors, amarelo);

    a {
        color: #2C2C2C;
    }
}

#login-logo {
    font-family: "Italianno", cursive;
    font-size: 5vw;

    img {
        max-width: 100%;
        max-height: 100px;
    }
}

#login-field {
    gap: 5px;
    border-bottom: 0.5px solid black;

    img {
        max-width: 32px;
        max-height: 32px;
    }

    input {
        background: none;
        border: none;
    }

    input:focus {
        box-shadow: none;
    }

    .btn-show-password {
        position: absolute;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .btn-show-password img {
        width: 20px;
        height: 20px;
    }
}

#login-button {
    background-color: map-get($background-colors, claro);
}
</style>
