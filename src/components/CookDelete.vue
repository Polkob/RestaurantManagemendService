<template>
  <div>
    <h1>Повары</h1>
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="toggleSelectAll" /></th>
          <th>ID Повора</th>
          <th>Имя</th>
          <th>Специализация</th>
          <th>Телефон</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cook in cooks" :key="cook.cook_id">
          <td>
            <input type="checkbox" v-model="cook.isSelected" />
          </td>
          <td>{{ cook.cook_id }}</td>
          <td>{{ cook.name }}</td>
          <td>{{ cook.specialization }}</td>
          <td>{{ cook.phone_number }}</td>
          <td>
            <button @click="removeCook(cook.cook_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="removeSelectedCooks">Удалить выбранные</button>
  </div>
</template>

<script>
import CookService from "../services/CookService";

export default {
  data() {
    return {
      cooks: [],
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
    async removeSelectedCooks() {
      const selectedCooks = this.cooks.filter((cook) => cook.isSelected);
      if (selectedCooks.length === 0) {
        alert("Пожалуйста, выберите хотя бы одного повара для удаления.");
        return;
      }
      if (confirm("Вы уверены, что хотите удалить выбранные повара?")) {
        try {
          await Promise.all(
            selectedCooks.map((cook) => CookService.deleteCook(cook.cook_id))
          );
          this.fetchCooks(); // Обновляем список поваров после удаления
        } catch (error) {
          console.error("Ошибка при удалении поваров:", error);
        }
      }
    },
    toggleSelectAll(event) {
      const isChecked = event.target.checked;
      this.cooks.forEach((cook) => {
        cook.isSelected = isChecked;
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
