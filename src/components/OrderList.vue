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
          <th>Действия</th>
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
          <td>
            <button v-if="!order.isEditing" @click="editOrder(order)">Редактировать</button>
            <button v-else @click="updateOrder(order)">Сохранить</button>
            <button @click="removeOrder(order.order_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Создание нового заказа</h2>
    <form @submit.prevent="addOrder">
      <input v-model="newOrder.order_id" placeholder="ID" required />
      <input v-model="newOrder.order_date" placeholder="Дата заказа" />
      <input v-model="newOrder.price" placeholder="Цена" type="number" required />
      <input v-model="newOrder.status" placeholder="Статус" required />
      <input v-model="newOrder.client_id" placeholder="ID клиента" type="number" required />
      <button type="submit">Добавить заказ</button>
    </form>
  </div>
</template>

<script>
import OrderService from '../services/OrderService';

export default {
  data() {
    return {
      orders: [],
      newOrder: {
        order_id:'',
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
    editOrder(order) {
      order.isEditing = true; // Включаем режим редактирования
    },
    async updateOrder(order) {
      try {
        await OrderService.updateOrder(order.order_id, order);
        order.isEditing = false; // Выключаем режим редактирования после сохранения
      } catch (error) {
        console.error("Ошибка при обновлении заказа:", error);
      }
    },
    async removeOrder(orderId) {
      if (confirm("Вы уверены, что хотите удалить этот заказ?")) {
        try {
          await OrderService.deleteOrder(orderId);
          this.fetchOrders(); // Обновляем список заказов после удаления
        } catch (error) {
          console.error("Ошибка при удалении заказа:", error);
        }
      }
    },
    async addOrder() {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        this.newOrder.order_date = formattedDate;

        await OrderService.createOrder(this.newOrder);
        this.fetchOrders(); // Обновляем список заказов после добавления
        this.newOrder = {
          order_id:'',
          order_date: '',
          price: '',
          status: '',
          client_id: '',
        };
      } catch (error) {
        console.error("Ошибка при добавлении заказа:", error);
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