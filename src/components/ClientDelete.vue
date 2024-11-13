<template>
  <div>
    <h1>Клиенты</h1>
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="toggleSelectAll" /></th>
          <th>ID Клиента</th>
          <th>ФИО</th>
          <th>Возраст</th>
          <th>Телефон</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.client_id">
          <td>
            <input type="checkbox" v-model="client.isSelected" />
          </td>
          <td>{{ client.client_id }}</td>
          <td>{{ client.fullname }}</td>
          <td>{{ client.age }}</td>
          <td>{{ client.phone_number }}</td>
          <td>
            <button @click="removeClient(client.client_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="removeSelectedClients">Удалить выбранные</button>
  </div>
</template>
<script>
import ClientService from "../services/ClientService";

export default {
  data() {
    return {
      clients: [],
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
    async removeSelectedClients() {
      const selectedClients = this.clients.filter(
        (client) => client.isSelected
      );
      if (selectedClients.length === 0) {
        alert("Пожалуйста, выберите хотя бы одного клиента для удаления.");
        return;
      }
      if (confirm("Вы уверены, что хотите удалить выбранные клиенты?")) {
        try {
          await Promise.all(
            selectedClients.map((client) =>
              ClientService.deleteClient(client.client_id)
            )
          );
          this.fetchClients(); // Обновляем список клиентов после удаления
        } catch (error) {
          console.error("Ошибка при удалении клиентов:", error);
        }
      }
    },
    toggleSelectAll(event) {
      const isChecked = event.target.checked;
      this.clients.forEach((client) => {
        client.isSelected = isChecked;
      });
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

button {
  background-color: #4caf50; /* Green background */
  border: none; /* No border */
  color: white; /* White text */
  padding: 10px 20px; /* Some padding */
  text-align: center; /* Centered text */
  text-decoration: none; /* No underline */
  display: inline-block; /* Inline block for spacing */
  font-size: 16px; /* Text size */
  margin: 5px 2px; /* Margins */
  cursor: pointer; /* Pointer cursor on hover */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth background color transition */
}

button:hover {
  background-color: #45a049; /* Darker green on hover */
}
</style>
