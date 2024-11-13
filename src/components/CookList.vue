<template>
    <div>
      <h1>Повары</h1>
      <table>
        <thead>
          <tr>
            <th>ID Повора</th>
            <th>Имя</th>
            <th>Специализация</th>
            <th>Телефон</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cook in cooks" :key="cook.cook_id">
            <td>{{ cook.cook_id }}</td>
            <td>
              <input
                v-if="cook.isEditing"
                v-model="cook.name"
                @blur="updateCook(cook)"
              />
              <span v-else>{{ cook.name }}</span>
            </td>
            <td>
              <input
                v-if="cook.isEditing"
                v-model="cook.specialization"
                @blur="updateCook(cook)"
              />
              <span v-else>{{ cook.specialization }}</span>
            </td>
            <td>
              <input
                v-if="cook.isEditing"
                v-model="cook.phone_number"
                @blur="updateCook(cook)"
              />
              <span v-else>{{ cook.phone_number }}</span>
            </td>
            <td>
              <button v-if="!cook.isEditing" @click="editCook(cook)">Редактировать</button>
              <button v-else @click="updateCook(cook)">Сохранить</button>
              <button @click="removeCook(cook.cook_id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h2>Добавление нового повара</h2>
      <form @submit.prevent="addCook">
        <input v-model="newCook.cook_id" placeholder="ID" required />
        <input v-model="newCook.name" placeholder="Имя" required />
        <input v-model="newCook.specialization" placeholder="Специализация" required />
        <input v-model="newCook.phone_number" placeholder="Телефон" required />
        <button type="submit">Добавить повара</button>
      </form>
    </div>
  </template>
  
  <script>
  import CookService from '../services/CookService';
  
  export default {
    data() {
      return {
        cooks: [],
        newCook: {
          cook_id:'',
          phone_number: '',
          name: '',
          specialization: '',
        },
      };
    },
    created() {
      this.fetchCooks();
    },
    methods: {
      async fetchCooks() {
        try {
          const response = await CookService.getCooks();
          this.cooks = response.data.map(cook => ({
            ...cook,
            isEditing: false,
          }));
        } catch (error) {
          console.error("Ошибка при получении поваров:", error);
        }
      },
      editCook(cook) {
        cook.isEditing = true; // Включаем режим редактирования
      },
      async updateCook(cook) {
        try {
          await CookService.updateCook(cook.cook_id, cook);
          cook.isEditing = false; // Выключаем режим редактирования после сохранения
        } catch (error) {
          console.error("Ошибка при обновлении повара:", error);
        }
      },
      async removeCook(cookId) {
        if (confirm("Вы уверены, что хотите удалить этого повара?")) {
          try {
            await CookService.deleteCook(cookId);
            this.fetchCooks(); // Обновляем список поваров после удаления
          } catch (error) {
            console.error("Ошибка при удалении повара:", error);
          }
        }
      },
      async addCook() {
        try {
          await CookService.createCook(this.newCook);
          this.fetchCooks(); // Обновляем список поваров после добавления
          this.newCook = {
            cook_id:'',
            phone_number: '',
            name: '',
            specialization: '',
          };
        } catch (error) {
          console.error("Ошибка при добавлении повара:", error);
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