<template>
    <form class="p-4 p-md-5 rounded-4" id="form-register" @submit.prevent="registerUser">
        <div id="register-logo" class="container-fluid d-flex p-0 justify-content-center">
            <p class="text-center">Kaique <br> BarberShop</p>
            <div class="d-flex align-items-center">
                <img class="img-fluid " src="@svg/barberShop.svg" alt="Logo Barber Shop">
            </div>
        </div>
        <div class="container-fluid p-0">
            <div id="register-field" class="d-flex mb-4">
                <img src="@svg/Profile_user.svg" alt="Person">
                <input type="text" id="input-nome" class="form-control" v-model="form.nome" placeholder="Nome" required>
            </div>
            <div id="register-field" class="d-flex mb-4">
                <img src="@svg/Email.svg" alt="E-mail">
                <input type="email" id="input-email" class="form-control" v-model="form.email" placeholder="E-mail" required>
            </div>
            <div id="register-field" class="d-flex mb-4">
                <img src="@svg/Password.svg" alt="Senha">
                <input type="password" id="input-senha" class="form-control" v-model="form.senha" placeholder="Senha" required>
            </div>
            <div id="register-field" class="d-flex mb-4">
                <img src="@svg/Reset_password.svg" alt="Confirme_senha">
                <input type="password" id="input-confirm-senha" class="form-control" v-model="form.confirmSenha" placeholder="Confirmar senha" required>
            </div>
            <input id="register-button" type="submit" class="btn col-12" value="Criar conta">
        </div>
        Já possui uma conta? <RouterLink to="/">Entrar</RouterLink>
    </form>
</template>

<script setup>
import { reactive } from 'vue';
import axios from '../../services/http.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: ''
});

const registerUser = async () => {
    if (form.senha !== form.confirmSenha) {
        alert('As senhas não coincidem');
        return;
    }

    try {
        axios.post('/auth/register', {
            name: form.nome,
            email: form.email,
            password: form.senha,
            confirmPassword: form.confirmSenha,
            userType: "client"
        });
        alert('Registro bem-sucedido!');
        router.push('/');
    } catch (error) {
        alert('Erro ao registrar. Tente novamente.');
    }
};
</script>

<style scoped lang="scss">
@import "@css/styles.scss";

#form-register {
    background-color: map-get($background-colors, amarelo);

    a {
        color: #2C2C2C;
    }
}

#register-logo {
    font-family: "Italianno", cursive;
    font-size: 5vw;

    img {
        max-width: 100%;
        max-height: 100px;
    }
}

#register-field {
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
}

#register-button {
    background-color: map-get($background-colors, claro);
}
</style>
