<template>
    <div class="table-responsive">
        <table class="table table-hover" :class="{ empty: !funcionarios.length }">
            <thead class="table-dark" id="t-head">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Data de criação</th>
                </tr>
            </thead>
            <tbody class="table-dark">
                <tr v-for="funcionario in funcionarios" :key="funcionario.email">
                    <td>{{ funcionario.nome }}</td>
                    <td>{{ funcionario.email }}</td>
                    <td>{{ funcionario.dataCriacao }}</td>
                </tr>
                <tr v-if="!funcionarios.length">
                    <td colspan="3" class="empty-row">Nenhum funcionário</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="btn-container">
        <button class="btn btn-primary">Criar funcionário</button>
        <button class="btn btn-danger">Apagar funcionário</button>
    </div>
</template>

<script setup>

import { ref } from 'vue';

const funcionarios = ref([
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
    { nome: 'Funcionário', email: 'funcionario@gmail.com', dataCriacao: '01/01/2021' },
]);

</script>

<style lang="scss" scoped>
@import "@css/styles.scss";

.table {
    background-color: map-get($background-colors, claro);
}

.table-responsive {
    background-color: #212529;
    max-height: 50vh;
    /* Defina a altura máxima que desejar */
    min-height: 50vh;
    overflow-y: auto;
}

/* Estilos para quando a tabela estiver vazia */
.table.empty {
    min-height: 50vh;
    /* Defina a altura mínima que desejar */
}

.btn-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.btn {
    width: 150px;
}

.empty-row {
    text-align: center;
    font-style: italic;
}
</style>