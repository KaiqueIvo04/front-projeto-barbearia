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
                    <td>{{ request.clientName }}</td>
                    <td>{{ request.serviceName }}</td>
                    <td>{{ formatDate(request.date_schedule) }}</td>
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
        <button class="btn btn-danger" @click="rejectSelected">Não <br>aceitar</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../services/http.js';
import { useAuth } from '@/stores/auth.js';
import { formatDate } from '../../services/utils.js';

const auth = useAuth()

const serviceRequests = ref([]);
const selectedRequests = ref([]);
const loggedInEmployeeId = ref([]); // Supondo que você tenha o ID do funcionário logado


//Pegar token e trazer dados do usuário para pegar id
const getUserData = async () => {
    const tokenAuth = 'Bearer ' + auth.getToken();
    const response = await axios.get("/auth/me", {
        headers: {
            Authorization: tokenAuth,
        }
    });

    loggedInEmployeeId.value = response.data.employee._id;
}

const fetchServiceRequests = async () => {
    await getUserData();
    try {
        const response = await axios.get(`/schedules?responsible_employee=${loggedInEmployeeId.value}`);
        const schedules = response.data.schedules;

        // Montar os dados que serão exibidos na tabela
        const requests = [];
        for (const schedule of schedules) {
            const serviceResponse = await axios.get(`/serviceschedules?related_schedule=${schedule._id}`);
            const serviceSchedule = serviceResponse.data.serviceSchedules[0];

            // Buscar nome do cliente utilizando seu ID
            const clientNameResponse = await axios.get(`/clients/${schedule.responsible_client}`);
            const clientName = clientNameResponse.data.client.name;

            // Buscar nome do serviço utilizando seu ID
            const serviceNameResponse = await axios.get(`/services/${serviceSchedule.related_service}`);
            const serviceName = serviceNameResponse.data.service.name_service;

            requests.push({
                id: schedule._id,
                clientName: clientName, // Exemplo, ajuste conforme sua estrutura de dados
                serviceName: serviceName, // Exemplo, ajuste conforme sua estrutura de dados
                date_schedule: schedule.date_schedule,
                status: schedule.status
            });
        }

        serviceRequests.value = requests;
        console.log(serviceRequests.value)
    } catch (error) {
        console.error('Erro ao buscar solicitações de serviço:', error);
    }
};


onMounted(fetchServiceRequests);


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
