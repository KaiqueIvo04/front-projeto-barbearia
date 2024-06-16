<template>
    <div class="row">
        <div class="col-12 text-center mb-3">
            <h2>Agendar Serviço</h2>
        </div>
        <div class="col-md-6">
            <form>
                <div class="form-group">
                    <label for="data">Selecione a data desejada:</label>
                    <select id="data" class="form-control" v-model="formData.data" @change="verifyWorkSchedule">
                        <option v-for="(day, index) in weekDays" :key="index" :value="day">{{ day }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="horario">Selecione o horário desejado:</label>
                    <select id="horario" class="form-control" v-model="formData.horario" @change="verifyWorkSchedule">
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
                <div class="card-body" v-if="selectedEmployee">
                    <h5 class="card-title">Informações do funcionário:</h5>
                    <p><strong>Nome:</strong> {{ selectedEmployee.name }}</p>
                    <p><strong>Cargo:</strong> {{ selectedEmployee.role }}</p>
                    <p><strong>Contato:</strong> {{ selectedEmployee.contact }}</p>
                    <p><strong>Disponibilidade:</strong> Disponível</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../services/http.js';

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
            workSchedules: [],
            selectedEmployee: null,
        };
    },
    mounted() {
        this.getWeekDays();
        this.getAvailableTimes();
        this.getServices();
        this.getWorkSchedules();
    },

    methods: {
        solicitarAgendamento() {
            // Lógica para solicitar agendamento
            alert('Agendamento solicitado!');
        },

        //Lista todos os dias da semana atual
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

        //Lista todos os horários em um dia
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

        //Pega todos os serviços registrados
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

        //Pega todos os agendamentos registrados
        async getWorkSchedules() {
            try {
                
                const response = await axios.get('http://localhost:8081/api/v1/workschedules');
                if (response.data.status === 'Success') {
                    this.workSchedules = response.data.workSchedules;
                }
            } catch (error) {
                console.error('Erro ao buscar horários de trabalho:', error);
            }
        },

        //Verificar qual horário encaixa com qual funcionário
        async verifyWorkSchedule() {
            if (this.formData.data && this.formData.horario) { //Se existir data e horario selecionado
                const selectedDate = this.formData.data.split(' | ')[1].split('/').reverse().join('/'); //Pega apenas a data do dia selecionado

                //Encontra o schedule que se encaixa no horário do barbeiro
                const workSchedule = this.workSchedules.find(schedule =>
                    schedule.day === selectedDate &&
                    this.formData.horario >= schedule.start_hour &&
                    this.formData.horario < schedule.finish_hour
                );

                if (workSchedule) { //Se existir um horário que se encaixa
                    try {
                        //Get com id do funcionário que encaixa o horário
                        const response = await axios.get(`http://localhost:8081/api/v1/employees/${workSchedule.responsible_employee}`);
                        if (response.data.status === 'Success') {
                            this.selectedEmployee = response.data.employee; //Pega os dados do funcionário e armazena para mostrar
                        }
                    } catch (error) {
                        console.error('Erro ao buscar dados do funcionário:', error);
                    }
                } else {
                    this.selectedEmployee = null;
                }
            } else {
                this.selectedEmployee = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@css/styles.scss";
</style>