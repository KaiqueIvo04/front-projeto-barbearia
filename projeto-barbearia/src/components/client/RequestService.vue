<template>
    <div class="row">
        <div class="col-12 text-center mb-3">
            <h2>Agendar Serviço</h2>
        </div>
        <div class="col-md-6">
            <form>
                <div class="form-group">
                    <label for="data">Selecione a data desejada:</label>
                    <select id="data" class="form-control" v-model="formData.data">
                        <option v-for="(day, index) in weekDays" :key="index" :value="day">{{ day }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="horario">Selecione o horário desejado:</label>
                    <select id="horario" class="form-control" v-model="formData.horario">
                        <option v-for="(time, index) in availableTimes" :key="index" :value="time">{{ time }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="servico">Selecione o serviço desejado:</label>
                    <select id="servico" class="form-control" v-model="formData.servico">
                        <option v-for="(service, index) in services" :key="index" :value="service._id">{{
                            service.name_service }}</option>
                    </select>
                </div>
                <div class="w-100 d-flex justify-content-center mt-4">
                    <button type="button" class="btn btn-secondary" @click="solicitarAgendamento">Solicitar
                        Agendamento
                    </button>
                </div>
            </form>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Informações do funcionário:</h5>
                    <p><strong>Nome:</strong> Funcionário 1</p>
                    <p><strong>Cargo:</strong> Barbeiro</p>
                    <p><strong>Contato:</strong> (83) 99999-9999</p>
                    <p><strong>Disponibilidade:</strong> Disponível</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../services/http.js'

export default {
    data() {
        return {
            formData: {
                data: '',
                horario: '',
                servico: '',
            },
            weekDays: [],
            availableTimes: [],
            services: [],
        };
    },
    mounted() {
        this.getWeekDays();
        this.getAvailableTimes();
        this.getServices();
    },

    methods: {
        solicitarAgendamento() {
            // Lógica para solicitar agendamento
            alert('Agendamento solicitado!');
        },

        getWeekDays() {
            const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            const today = new Date();
            const weekDays = [];

            for (let i = 0; i < 7; i++) {
                const currentDay = new Date(today);
                currentDay.setDate(today.getDate() + i);
                const dayName = daysOfWeek[currentDay.getDay()];
                const formattedDate = `${dayName} | ${currentDay.getDate().toString().padStart(2, '0')}/${(currentDay.getMonth() + 1).toString().padStart(2, '0')}/${currentDay.getFullYear()}`;
                weekDays.push(formattedDate);
            }

            this.weekDays = weekDays;
        },

        getAvailableTimes() {
            const startTime = new Date();
            startTime.setHours(7, 30, 0); // 7:30 AM
            const endTime = new Date();
            endTime.setHours(17, 0, 0); // 5:00 PM

            const times = [];
            while (startTime < endTime) {
                const hours = startTime.getHours().toString().padStart(2, '0');
                const minutes = startTime.getMinutes().toString().padStart(2, '0');
                const time = `${hours}:${minutes}`;
                if (time !== "12:00" && time !== "12:30") {
                    times.push(time);
                }
                startTime.setMinutes(startTime.getMinutes() + 30);
            }

            this.availableTimes = times;
        },

        async getServices() {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/services');
                if (response.data.status === 'Success') {
                    this.services = response.data.services;
                }
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/styles.scss";
</style>