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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in dishes" :key="dish.dish_id">
            <td>{{ dish.dish_id }}</td>
            <td>
              <input
                v-if="dish.isEditing"
                v-model="dish.name"
                @blur="updateDish(dish)"
              />
              <span v-else>{{ dish.name }}</span>
            </td>
            <td>
              <input
                v-if="dish.isEditing"
                v-model="dish.type_of_dish"
                @blur="updateDish(dish)"
              />
              <span v-else>{{ dish.type_of_dish }}</span>
            </td>
            <td>
              <input
                v-if="dish.isEditing"
                v-model="dish.price"
                type="number"
                @blur="updateDish(dish)"
              />
              <span v-else>{{ dish.price }}</span>
            </td>
            <td>
              <input
                v-if="dish.isEditing"
                v-model="dish.cook_id"
                type="number"
                @blur="updateDish(dish)"
              />
              <span v-else>{{ dish.cook_id }}</span>
            </td>
            <td>
              <button v-if="!dish.isEditing" @click="editDish(dish)">Редактировать</button>
              <button v-else @click="updateDish(dish)">Сохранить</button>
              <button @click="removeDish(dish.dish_id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h2>Добавление нового блюда</h2>
      <form @submit.prevent="addDish">
        <input v-model="newDish.dish_id" placeholder="ID" required />
        <input v-model="newDish.name" placeholder="Название" required />
        <input v-model="newDish.type_of_dish" placeholder="Тип блюда" required />
        <input v-model="newDish.price" type="number" placeholder="Цена" required />
        <input v-model="newDish.cook_id" type="number" placeholder="ID Повора" required />
        <button type="submit">Добавить блюдо</button>
      </form>
    </div>
  </template>
  
  <script>
  import DishService from '../services/DishService';
  
  export default {
    data() {
      return {
        dishes: [],
        newDish: {
          dish_id:'',
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
      editDish(dish) {
        dish.isEditing = true; // Включаем режим редактирования
      },
      async updateDish(dish) {
        try {
          await DishService.updateDish(dish.dish_id, dish);
          dish.isEditing = false; // Выключаем режим редактирования после сохранения
        } catch (error) {
          console.error("Ошибка при обновлении блюда:", error);
        }
      },
      async removeDish(dishId) {
        if (confirm("Вы уверены, что хотите удалить это блюдо?")) {
          try {
            await DishService.deleteDish(dishId);
            this.fetchDishes(); // Обновляем список блюд после удаления
          } catch (error) {
            console.error("Ошибка при удалении блюда:", error);
          }
        }
      },
      async addDish() {
        try {
          await DishService.createDish(this.newDish);
          this.fetchDishes(); // Обновляем список блюд после добавления
          this.newDish = {
            dish_id:'',
            name: '',
            type_of_dish: '',
            price: '',
            cook_id: '',
          };
        } catch (error) {
          console.error("Ошибка при добавлении блюда:", error);
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