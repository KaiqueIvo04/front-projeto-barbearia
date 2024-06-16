<template>
    <div class="container-fluid">

        <div class="offcanvas offcanvas-start show p-0" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div class="offcanvas-header p-4 mt-4 justify-content-center">
                <img src="@svg/Barber.svg" alt="Barber">
            </div>
            <div class="offcanvas-body p-0">
                <div class="text-center">
                    <hr>
                    <p>Acessando como:<br><strong>Funcionário</strong></p>
                    <hr>
                </div>
                <div class="list-group">
                    <RouterLink to="/employees">
                        <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                            <img src="@svg/Interview.svg" alt="Grupo">
                            <li>Solicitações</li>
                        </div>
                    </RouterLink>
                    <RouterLink to="/employees/dayworkschedules">
                        <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                            <img src="@svg/Calendar.svg" alt="Serviços">
                            <li>Agendamentos do dia</li>
                        </div>
                    </RouterLink>
                    <RouterLink to="/employees/weekworkschedules">
                        <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                            <img src="@svg/Clock.svg" alt="Horário">
                            <li>Horário Semanal</li>
                        </div>
                    </RouterLink>
                    <RouterLink to="/employees/myaccount">
                        <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                            <img src="@svg/User.svg" alt="Minha conta">
                            <li>Minha conta</li>
                        </div>
                    </RouterLink>
                    <div class="d-flex justify-content-center pt-4">
                        <button @click="logout" id="button-logout" class="btn btn-secondary">
                            <div class="">
                                <img src="@svg/Logout.svg" alt="Minha conta">
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@/stores/auth.js';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

function logout() {
    auth.clear();
    router.push({ name: 'login' });
}
</script>


<style lang="scss" scoped>
@import "@css/styles.scss";



#offcanvas {
    background-color: map-get($background-colors, amarelo);
    width: 275px;
}

.offcanvas-body {
    hr {
        border: solid 1px;
        color: black;
        opacity: 1;
    }
}

.list-group {
    a {
        text-decoration: none;
    }
}

.list-group-item {
    background-color: map-get($background-colors, amarelo);
    border: none;
    cursor: pointer;

    li {
        list-style-type: none;
        position: relative;
        display: block;
        padding: var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x); //Bootstrap
        color: black;
    }

    &:hover {
        background-color: #919191;
        transition: ease-in-out 0.4s;
    }
}
</style>