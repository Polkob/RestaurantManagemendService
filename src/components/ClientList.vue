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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.client_id">
            <td>{{ client.client_id }}</td>
            <td>
              <input
                v-if="client.isEditing"
                v-model="client.fullname"
                @blur="updateClient(client)"
              />
              <span v-else>{{ client.fullname }}</span>
            </td>
            <td>
              <input
                v-if="client.isEditing"
                v-model="client.age"
                type="number"
                @blur="updateClient(client)"
              />
              <span v-else>{{ client.age }}</span>
            </td>
            <td>
              <input
                v-if="client.isEditing"
                v-model="client.phone_number"
                @blur="updateClient(client)"
              />
              <span v-else>{{ client.phone_number }}</span>
            </td>
            <td>
              <button v-if="!client.isEditing" @click="editClient(client)">Редактировать</button>
              <button v-else @click="updateClient(client)">Сохранить</button>
              <button @click="removeClient(client.client_id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h2>Добавление нового клиента</h2>
      <form @submit.prevent="addClient">
        <input v-model="newClient.client_id" placeholder="ID" required />
        <input v-model="newClient.fullname" placeholder="ФИО" required />
        <input v-model="newClient.age" type="number" placeholder="Возраст" required />
        <input v-model="newClient.phone_number" placeholder="Телефон" required />
        <button type="submit">Добавить клиента</button>
      </form>
    </div>
  </template>
  
  <script>
  import ClientService from '../services/ClientService';
  
  export default {
    data() {
      return {
        clients: [],
        newClient: {
          client_id:'',
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
      editClient(client) {
        client.isEditing = true; // Включаем режим редактирования
      },
      async updateClient(client) {
        try {
          await ClientService.updateClient(client.client_id, client);
          client.isEditing = false; // Выключаем режим редактирования после сохранения
        } catch (error) {
          console.error("Ошибка при обновлении клиента:", error);
        }
      },
      async removeClient(clientId) {
        if (confirm("Вы уверены, что хотите удалить этого клиента?")) {
          try {
            await ClientService.deleteClient(clientId);
            this.fetchClients(); // Обновляем список клиентов после удаления
          } catch (error) {
            console.error("Ошибка при удалении клиента:", error);
          }
        }
      },
      async addClient() {
        try {
          await ClientService.createClient(this.newClient);
          this.fetchClients(); // Обновляем список клиентов после добавления
          this.newClient = {
            client_id:'',
            phone_number: '',
            fullname: '',
            age: '',
          };
        } catch (error) {
          console.error("Ошибка при добавлении клиента:", error);
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
    gap: 5px; /* Отступы между элементами формы */
  }
  
  form input {
    width: 100%; /* Полная ширина для лучшего отображения */
    max-width: 200px; /* Ограничение максимальной ширины */
    padding: 10px; /* Отступы внутри поля ввода */
    border: 2px solid #b8b1b1; /* Основной цвет границы */
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
  button {
    margin: 0px 2px;
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
  </style>