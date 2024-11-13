<template>
    <div>
      <h1>Блюда</h1>
      <table>
        <thead>
          <tr>
            <th>ID Блюда</th>
            <th>Название</th>
            <th>Тип блюда</th>
            <th>Цена</th>
            <th>ID Повора</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in dishes" :key="dish.dish_id">
            <td>{{ dish.dish_id }}</td>
            <td>
              {{ dish.name }}
            </td>
            <td>
              {{ dish.type_of_dish }}
            </td>
            <td>
              {{ dish.price }}
            </td>
            <td>
             {{ dish.cook_id }}
            </td>
          </tr>
        </tbody>
      </table>
  
    </div>
  </template>
  
  <script>
  import DishService from '../services/DishService';
  
  export default {
    data() {
      return {
        dishes: [],
        newDish: {
          name: '',
          type_of_dish: '',
          price: '',
          cook_id: '',
        },
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
            isEditing: false,
          }));
        } catch (error) {
          console.error("Ошибка при получении блюд:", error);
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