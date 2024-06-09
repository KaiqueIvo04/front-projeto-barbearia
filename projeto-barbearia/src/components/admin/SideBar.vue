<template>
    <div class="offcanvas offcanvas-start show p-0" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header p-4 mt-4 justify-content-center">
            <img src="@svg/Admin.svg" alt="Admin">

        </div>
        <div class="offcanvas-body p-0">
            <div class="text-center">
                <hr>
                <p>Acessando como:<br><strong>Administrador</strong></p>
                <hr>
            </div>
            <div class="list-group">
                <RouterLink to="/admins/employees">
                    <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                        <img src="@svg/Group.svg" alt="Grupo">
                        <li>Funcionários</li>
                    </div>
                </RouterLink>
                <RouterLink to="/admins/employees">
                    <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                        <img src="@svg/Scissors.svg" alt="Serviços">
                        <li>Serviços</li>
                    </div>
                </RouterLink>
                <RouterLink to="/admins/employees">
                    <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                        <img src="@svg/Clock.svg" alt="Horário">
                        <li>Horário</li>
                    </div>
                </RouterLink>
                <RouterLink to="/admins/employees">
                    <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                        <img src="@svg/Schedule.svg" alt="Agendamentos">
                        <li>Agendamentos</li>
                    </div>
                </RouterLink>
                <RouterLink to="/admins/employees">
                    <div class="d-flex ps-4 gap-3 list-group-item list-group-item-dark p-1">
                        <img src="@svg/User.svg" alt="Minha conta">
                        <li>Minha conta</li>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup></script>

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