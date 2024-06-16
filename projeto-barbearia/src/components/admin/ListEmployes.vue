<template>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead class="table-dark" id="t-head">
                <tr>
                    <th scope="col" class="col-name">Nome</th>
                    <th scope="col" class="col-email">Email</th>
                    <th scope="col" class="col-createdAt">Data de criação</th>
                </tr>
            </thead>

            <tbody class="table-dark" v-if="funcionarios && funcionarios.length">
                <tr v-for="funcionario in funcionarios" :key="funcionario.id">
                    <td class="col-name">{{ funcionario.name }}</td>
                    <td class="col-email">{{ funcionario.email }}</td>
                    <td class="col-createdAt">{{ formatDate(funcionario.createdAt) }}</td>
                </tr>
            </tbody>

            <tbody class="table-dark" v-else>
                <tr>
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
import axios from '../../services/http.js'
import { ref } from 'vue';
import { formatDate } from '../../services/utils.js';

const funcionarios = ref(null);

axios.get('/employees').then((response) => {
    funcionarios.value = response.data.employees;
}).catch(error => {
    console.error('Error fetching employees:', error);
    funcionarios.value = [];
});

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

.col-name, .col-email, .col-createdAt {
    width: 33.33%;
}
</style>
