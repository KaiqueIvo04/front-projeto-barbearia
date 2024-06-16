<template>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead class="table-dark" id="t-head">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Data/Hora</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody class="table-dark" v-if="serviceRequests.length">
                <tr v-for="(request, index) in serviceRequests" :key="index">
                    <td><input type="checkbox" v-model="selectedRequests" :value="request.id"></td>
                    <td>{{ request.cliente }}</td>
                    <td>{{ request.servico }}</td>
                    <td>{{ request.data }} | {{ request.hora }}</td>
                    <td>{{ request.status }}</td>
                </tr>
            </tbody>
            <tbody class="table-dark" v-else>
                <tr>
                    <td colspan="5" class="empty-row">Nenhuma solicitação de serviço</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="btn-container">
        <button class="btn btn-primary" @click="acceptSelected">Aceitar</button>
        <button class="btn btn-danger" @click="rejectSelected">Não aceitar</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../../services/http.js';

const serviceRequests = ref([]);
const selectedRequests = ref([]);

// Função para buscar as solicitações de serviço
const fetchServiceRequests = async () => {
    try {
        const response = await axios.get('/service-requests');
        serviceRequests.value = response.data.requests; // Ajuste conforme a estrutura dos dados da API
    } catch (error) {
        console.error('Erro ao buscar solicitações de serviço:', error);
    }
};

// Chamando a função para buscar os dados ao montar o componente
fetchServiceRequests();

const acceptSelected = () => {
    alert('Aceitar: ' + selectedRequests.value.join(', '));
    // Lógica para aceitar os serviços selecionados
};

const rejectSelected = () => {
    alert('Rejeitar: ' + selectedRequests.value.join(', '));
    // Lógica para rejeitar os serviços selecionados
};
</script>

<style lang="scss" scoped>
@import "@css/styles.scss";

.table {
    background-color: map-get($background-colors, claro);
}

.table-responsive {
    background-color: #212529;
    max-height: 50vh;
    min-height: 50vh;
    overflow-y: auto;
}

.table.empty {
    min-height: 50vh;
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
