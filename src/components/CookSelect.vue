<template>
    <div>
      <h1>Повары</h1>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" /></th>
            <th>ID Повора</th>
            <th>Имя</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cook in cooks" :key="cook.cook_id">
            <td>
              <input type="checkbox" v-model="cook.isSelected" />
            </td>
            <td>{{ cook.cook_id }}</td>
            <td>{{ cook.name }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="viewSelectedCooks">Посмотреть детали выбранных</button>
  
      <div v-if="selectedCooks.length > 0" class="details">
        <h2>Детали выбранных поваров</h2>
        <table>
          <thead>
            <tr>
              <th>ID Повора</th>
              <th>Имя</th>
              <th>Специализация</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cook in selectedCooks" :key="cook.cook_id">
              <td>{{ cook.cook_id }}</td>
              <td>{{ cook.name }}</td>
              <td>{{ cook.specialization }}</td>
              <td>{{ cook.phone_number }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import CookService from "../services/CookService";
  
  export default {
    data() {
      return {
        cooks: [],
        selectedCooks: [], // Состояние для хранения выбранных поваров
      };
    },
    created() {
      this.fetchCooks();
    },
    methods: {
      async fetchCooks() {
        try {
          const response = await CookService.getCooks();
          this.cooks = response.data.map((cook) => ({
            ...cook,
            isSelected: false, // Добавляем поле для чекбокса
          }));
        } catch (error) {
          console.error("Ошибка при получении поваров:", error);
        }
      },
      toggleSelectAll(event) {
        const isChecked = event.target.checked;
        this.cooks.forEach((cook) => {
          cook.isSelected = isChecked;
        });
      },
      viewSelectedCooks() {
        this.selectedCooks = this.cooks.filter(cook => cook.isSelected);
        if (this.selectedCooks.length === 0) {
          alert("Пожалуйста, выберите хотя бы одного повара для просмотра деталей.");
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