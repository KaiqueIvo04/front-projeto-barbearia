<template>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead class="table-dark" id="t-head">
                <tr>
                    <th scope="col"><input type="checkbox" @change="toggleAll"></th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Data de criação</th>
                    <th scope="col">Cargo</th>
                </tr>
            </thead>
            <tbody class="table-dark" v-if="funcionarios.length">
                <tr v-for="(funcionario, index) in funcionarios" :key="index">
                    <td><input type="checkbox" v-model="selectedEmployees" :value="funcionario.id"></td>
                    <td>{{ funcionario.name }}</td>
                    <td>{{ funcionario.email }}</td>
                    <td>{{ formatDate(funcionario.createdAt) }}</td>
                    <td>{{ funcionario.role }}</td>
                </tr>
            </tbody>
            <tbody class="table-dark" v-else>
                <tr>
                    <td colspan="5" class="empty-row">Nenhum funcionário</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="btn-container">
        <button class="btn btn-primary">Criar funcionário</button>
        <button class="btn btn-danger" @click="deleteSelectedEmployees" :disabled="!selectedEmployees.length">Apagar funcionário</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../services/http.js';
import { formatDate } from '../../services/utils.js';

const funcionarios = ref([]);
const selectedEmployees = ref([]);

const fetchEmployees = async () => {
    try {
        const response = await axios.get('/employees');
        funcionarios.value = response.data.employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        funcionarios.value = [];
    }
};

const toggleAll = (event) => {
    if (event.target.checked) {
        selectedEmployees.value = funcionarios.value.map(emp => emp.id);
    } else {
        selectedEmployees.value = [];
    }
};

const deleteSelectedEmployees = async () => {
    const promises = selectedEmployees.value.map(id =>
        axios.delete(`/employees/${id}`)
    );

    try {
        await Promise.all(promises);
        alert('Funcionário(s) removido(s) com sucesso');
        fetchEmployees(); // Atualiza a lista de funcionários após a remoção
        selectedEmployees.value = [];
    } catch (error) {
        console.error('Error deleting employees:', error);
    }
};

onMounted(fetchEmployees);
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
