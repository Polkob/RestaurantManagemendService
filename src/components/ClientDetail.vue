<template>
    <div>
      <h1>Клиенты</h1>
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
          <tr v-for="client in clients" :key="client.client_id">
            <td>{{ client.client_id }}</td>
            <td>
              {{ client.fullname }}
            </td>
            <td>
              {{ client.age }}
            </td>
            <td>
              {{ client.phone_number }}
            </td>
          </tr>
        </tbody>
      </table>
  
    </div>
  </template>
  
  <script>
  import ClientService from '../services/ClientService';
  
  export default {
    data() {
      return {
        clients: [],
        newClient: {
          phone_number: '',
          fullname: '',
          age: '',
        },
      };
    },
    created() {
      this.fetchClients();
    },
    methods: {
      async fetchClients() {
        try {
          const response = await ClientService.getClients();
          this.clients = response.data.map(client => ({
            ...client,
            isEditing: false,
          }));
        } catch (error) {
          console.error("Ошибка при получении клиентов:", error);
        }
      },
      
    },
  };
  </script>
  
  <style scoped>
  /* Стили для таблицы и формы */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    margin-right: 5px;
  }
  
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px; /* Отступы между элементами формы */
  }
  
  form input {
    width: 100%; /* Полная ширина для лучшего отображения */
    max-width: 300px; /* Ограничение максимальной ширины */
    padding: 10px; /* Отступы внутри поля ввода */
    border: 2px solid #686060; /* Основной цвет границы */
    border-radius: 5px; /* Закругленные углы */
    transition: border-color 0.3s, box-shadow 0.3s; /* Плавные переходы */
  }
  
  form input:focus {
    border-color: #4a90e2; /* Цвет границы при фокусе */
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5); /* Тень при фокусе */
    outline: none; /* Убираем стандартный контур */
  }
  
  form input:hover {
    border-color: #4a90e2; /* Цвет границы при наведении */
  }
  </style>