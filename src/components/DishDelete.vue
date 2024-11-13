<template>
    <div>
      <h1>Блюдаотуаоуцт</h1>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" /></th>
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
            <td><input type="checkbox" v-model="dish.isSelected" /></td>
            <td>{{ dish.dish_id }}</td>
            <td>{{ dish.name }}</td>
            <td>{{ dish.type_of_dish }}</td>
            <td>{{ dish.price }}</td>
            <td>{{ dish.cook_id }}</td>
            <td><button @click="removeDish(dish.dish_id)">Удалить</button></td>
          </tr>
        </tbody>
      </table>
      <button @click="removeSelectedDishes">Удалить выбранные</button>
    </div>
  </template>
  
  <script>
  import DishService from '../services/DishService';
  
  export default {
    data() {
      return {
        dishes: [],
        newDish: {
          dish_id: '',
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
            isSelected: false,
          }));
        } catch (error) {
          console.error("Ошибка при получении блюд:", error);
        }
      },
      async removeDish(dishId) {
        if (confirm("Вы уверены, что хотите удалить это блюдо?")) {
          try {
            await DishService.deleteDish(dishId);
            this.fetchDishes();
          } catch (error) {
            console.error("Ошибка при удалении блюда:", error);
          }
        }
      },
      async removeSelectedDishes() {
        const selectedDishes = this.dishes.filter(dish => dish.isSelected);
        if (selectedDishes.length === 0) {
          alert("Пожалуйста, выберите хотя бы одно блюдо для удаления.");
          return;
        }
        if (confirm("Вы уверены, что хотите удалить выбранные блюда?")) {
          try {
            await Promise.all(selectedDishes.map(dish => DishService.deleteDish(dish.dish_id)));
            this.fetchDishes();
          } catch (error) {
            console.error("Ошибка при удалении блюд:", error);
          }
        }
      },
      toggleSelectAll(event) {
        const isChecked = event.target.checked;
        this.dishes.forEach(dish => {
          dish.isSelected = isChecked;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
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