<template>
    <div>
      <h1>Блюда</h1>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" /></th>
            <th>ID Блюда</th>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in dishes" :key="dish.dish_id">
            <td><input type="checkbox" v-model="dish.isSelected" /></td>
            <td>{{ dish.dish_id }}</td>
            <td>{{ dish.name }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="viewSelectedDishes">Посмотреть детали выбранных</button>
  
      <div v-if="selectedDishes.length > 0" class="details">
        <h2>Детали выбранных блюд</h2>
        <table>
          <thead>
            <tr>
              <th>ID Блюда</th>
              <th>Название</th>
              <th>Тип</th>
              <th>Цена</th>
              <th>ID Повора</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dish in selectedDishes" :key="dish.dish_id">
              <td>{{ dish.dish_id }}</td>
              <td>{{ dish.name }}</td>
              <td>{{ dish.type_of_dish }}</td>
              <td>{{ dish.price }}</td>
              <td>{{ dish.cook_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import DishService from '../services/DishService';
  
  export default {
    data() {
      return {
        dishes: [],
        selectedDishes: [], // Состояние для хранения выбранных блюд
      };
    },
    created() {
      this.fetchDishes();
    },
    methods: {
      async fetchDishes() {
        try {
          const response = await DishService.getDishes();
          this.dishes = response.data.map(dish => ({
            ...dish,
            isSelected: false,
          }));
        } catch (error) {
          console.error("Ошибка при получении блюд:", error);
        }
      },
      toggleSelectAll(event) {
        const isChecked = event.target.checked;
        this.dishes.forEach(dish => {
          dish.isSelected = isChecked;
        });
      },
      viewSelectedDishes() {
        this.selectedDishes = this.dishes.filter(dish => dish.isSelected);
        if (this.selectedDishes.length === 0) {
          alert("Пожалуйста, выберите хотя бы одно блюдо для просмотра деталей.");
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