<template>
    <div>
      <h1>Клиенты</h1>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" /></th>
            <th>ID Клиента</th>
            <th>ФИО</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.client_id">
            <td>
              <input type="checkbox" v-model="client.isSelected" />
            </td>
            <td>{{ client.client_id }}</td>
            <td>{{ client.fullname }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="viewSelectedClients">Посмотреть детали выбранных</button>
  
      <div v-if="selectedClients.length > 0" class="details">
        <h2>Детали выбранных клиентов</h2>
        <table>
          <thead>
            <tr>
              <th>ID Клиента</th>
              <th>ФИО</th>
              <th>Возраст</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in selectedClients" :key="client.client_id">
              <td>{{ client.client_id }}</td>
              <td>{{ client.fullname }}</td>
              <td>{{ client.age }}</td>
              <td>{{ client.phone_number }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import ClientService from "../services/ClientService";
  
  export default {
    data() {
      return {
        clients: [],
        selectedClients: [], // Состояние для хранения выбранных клиентов
      };
    },
    created() {
      this.fetchClients();
    },
    methods: {
      async fetchClients() {
        try {
          const response = await ClientService.getClients();
          this.clients = response.data.map((client) => ({
            ...client,
            isSelected: false, // Добавляем поле для чекбокса
          }));
        } catch (error) {
          console.error("Ошибка при получении клиентов:", error);
        }
      },
      toggleSelectAll(event) {
        const isChecked = event.target.checked;
        this.clients.forEach((client) => {
          client.isSelected = isChecked;
        });
      },
      viewSelectedClients() {
        this.selectedClients = this.clients.filter(client => client.isSelected);
        if (this.selectedClients.length === 0) {
          alert("Пожалуйста, выберите хотя бы одного клиента для просмотра деталей.");
        }
      },
    },
  };
  </script>
  <style scoped>
  table {
    margin-left: 25%;
    width: 50%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    margin: 20px 2px;
    background-color: #4caf50; /* Зеленый фон */
    border: none; /* Без рамки */
    color: white; /* Белый текст */
    padding: 10px 20px; /* Отступы */
    text-align: center; /* Центрировать текст */
    cursor: pointer; /* Курсор в виде указателя */
    border-radius: 5px; /* Закругленные углы */
    transition: background-color 0.3s; /* Плавный переход фона */
  }
  
  button:hover {
    background-color: #45a049; /* Темно-зеленый при наведении */
  }
  
  .details {
    margin-top: 20px;
  }
  </style>