<template>
  <div>
    <h1>Заказы</h1>
    <table>
      <thead>
        <tr>
          <th>ID Заказа</th>
          <th>Дата Заказа</th>
          <th>Статус</th>
          <th>Цена</th>
          <th>ID клиента</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order_id">
          <td>{{ order.order_id }}</td>
          <td>
            <input
              v-if="order.isEditing"
              v-model="order.order_date"
              type="datetime-local"
              @blur="updateOrder(order)"
            />
            <span v-else>{{ order.order_date }}</span>
          </td>
          <td>
            <input
              v-if="order.isEditing"
              v-model="order.status"
              @blur="updateOrder(order)"
            />
            <span v-else>{{ order.status }}</span>
          </td>
          <td>
            <input
              v-if="order.isEditing"
              v-model="order.price"
              type="number"
              @blur="updateOrder(order)"
            />
            <span v-else>{{ order.price }}</span>
          </td>
          <td>
            <input
              v-if="order.isEditing"
              v-model="order.client_id"
              type="number"
              @blur="updateOrder(order)"
            />
            <span v-else>{{ order.client_id }}</span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import OrderService from '../services/OrderService';

export default {
  data() {
    return {
      orders: [],
      newOrder: {
        order_date: '',
        price: '',
        status: '',
        client_id: '',
      },
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await OrderService.getOrders();
        // Добавляем поле isEditing для каждой записи
        this.orders = response.data.map(order => ({
          ...order,
          isEditing: false,
        }));
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
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