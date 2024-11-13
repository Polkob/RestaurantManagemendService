<template>
    <div>
      <h1>Заказы</h1>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" /></th>
            <th>ID Заказа</th>
            <th>Дата Заказа</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.order_id">
            <td>
              <input type="checkbox" v-model="order.isSelected" />
            </td>
            <td>{{ order.order_id }}</td>
            <td>{{ order.order_date }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="viewSelectedOrders">Посмотреть детали выбранных</button>
  
      <div v-if="selectedOrders.length > 0" class="details">
        <h2>Детали выбранных заказов</h2>
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
            <tr v-for="order in selectedOrders" :key="order.order_id">
              <td>{{ order.order_id }}</td>
              <td>{{ order.order_date }}</td>
              <td>{{ order.status }}</td>
              <td>{{ order.price }}</td>
              <td>{{ order.client_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import OrderService from '../services/OrderService';
  
  export default {
    data() {
      return {
        orders: [],
        selectedOrders: [], // Состояние для хранения выбранных заказов
      };
    },
    created() {
      this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await OrderService.getOrders();
          this.orders = response.data.map(order => ({
            ...order,
            isSelected: false,
          }));
        } catch (error) {
          console.error("Ошибка при получении заказов:", error);
        }
      },
      toggleSelectAll(event) {
        const isChecked = event.target.checked;
        this.orders.forEach(order => {
          order.isSelected = isChecked;
        });
      },
      viewSelectedOrders() {
        this.selectedOrders = this.orders.filter(order => order.isSelected);
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
  
  th, td {
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
  </style>