<template>
    <div>
      <h1>Заказы</h1>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" /></th>
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
            <td>
              <input type="checkbox" v-model="order.isSelected" />
            </td>
            <td>{{ order.order_id }}</td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.client_id }}</td>
            <td>
              <button @click="removeOrder(order.order_id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="removeSelectedOrders">Удалить выбранные</button>
    </div>
  </template>
  
  <script>
  import OrderService from '../services/OrderService';
  
  export default {
    data() {
      return {
        orders: [],
        newOrder: {
          order_id: '',
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
          this.orders = response.data.map(order => ({
            ...order,
            isEditing: false,
            isSelected: false, // Добавляем поле для чекбокса
          }));
        } catch (error) {
          console.error("Ошибка при получении заказов:", error);
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
      async removeSelectedOrders() {
        const selectedOrders = this.orders.filter(order => order.isSelected);
        if (selectedOrders.length === 0) {
          alert("Пожалуйста, выберите хотя бы один заказ для удаления.");
          return;
        }
        if (confirm("Вы уверены, что хотите удалить выбранные заказы?")) {
          try {
            await Promise.all(selectedOrders.map(order => OrderService.deleteOrder(order.order_id)));
            this.fetchOrders(); // Обновляем список заказов после удаления
          } catch (error) {
            console.error("Ошибка при удалении заказов:", error);
          }
        }
      },
      toggleSelectAll(event) {
        const isChecked = event.target.checked;
        this.orders.forEach(order => {
          order.isSelected = isChecked;
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
  button {
  background-color: #4CAF50; /* Green background */
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