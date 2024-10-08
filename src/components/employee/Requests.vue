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
        <button class="btn btn-secondary" @click="rejectSelected">Não <br>aceitar</button>
        <button class="btn btn-danger" @click="removeSelected">Remover</button>
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
    } catch (error) {
        console.error('Erro ao buscar solicitações de serviço:', error);
    }
};

const updateScheduleStatus = async (scheduleId, newStatus) => {
    try {
        const response = await axios.patch(`/schedules/${scheduleId}`, {
            status: newStatus
        });
        if (response.data.status === 'Success') {
            console.log(`Status do agendamento ${scheduleId} atualizado para ${newStatus}`);
        } else {
            console.error(`Erro ao atualizar status do agendamento ${scheduleId}`);
        }
    } catch (error) {
        console.error(`Erro ao atualizar status do agendamento ${scheduleId}:`, error);
    }
};

const removeSelected = async () => {
    for (const scheduleId of selectedRequests.value) {
        try {
            // Deletar o service schedule relacionado
            const serviceScheduleResponse = await axios.get(`/serviceschedules?related_schedule=${scheduleId}`);
            const serviceSchedule = serviceScheduleResponse.data.serviceSchedules[0];

            if (serviceSchedule) {
                await axios.delete(`/serviceschedules/${serviceSchedule._id}`);
            }

            // Deletar o schedule
            await axios.delete(`/schedules/${scheduleId}`);

        } catch (error) {
            console.error(`Erro ao remover o agendamento ${scheduleId}:`, error);
        }
    }
    alert('Agendamento(s) removido(s) com sucesso');
    fetchServiceRequests(); // Atualiza a lista de solicitações de serviço após a remoção
};

onMounted(fetchServiceRequests);

const acceptSelected = async () => {
    for (const scheduleId of selectedRequests.value) {
        await updateScheduleStatus(scheduleId, 'Aceitada');
    }
    alert('Status dos agendamentos aceitos foram atualizados');
    fetchServiceRequests(); // Atualiza a lista de solicitações de serviço após a atualização
};

const rejectSelected = async () => {
    for (const scheduleId of selectedRequests.value) {
        await updateScheduleStatus(scheduleId, 'Rejeitada');
    }
    alert('Status dos agendamentos rejeitados foram atualizados');
    fetchServiceRequests(); // Atualiza a lista de solicitações de serviço após a atualização
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
