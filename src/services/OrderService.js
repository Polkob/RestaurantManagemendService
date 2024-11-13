// // src/services/OrderService.js
// import apiClient from './api';

// export default {
//   getOrders() {
//     return apiClient.get('/orders');
//   },
//   getOrderById(orderId) {
//     return apiClient.get(`/orders/${orderId}`);
//   },
//   createOrder(orderData) {
//     return apiClient.post('/orders', orderData);
//   },
//   updateOrder(orderId, orderData) {
//     return apiClient.put(`/orders/${orderId}`, orderData);
//   },
//   deleteOrder(orderId) {
//     return apiClient.delete(`/orders/${orderId}`);
//   },
// };
// src/services/OrderService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default {
  getOrders() {
    return axios.get(`${API_URL}/orders`);
  },
  getOrderById(orderId) {
    return axios.get(`${API_URL}/orders/${orderId}`);
  },
  createOrder(orderData) {
    return axios.post(`${API_URL}/orders`, orderData);
  },
  updateOrder(orderId, orderData) {
    return axios.put(`${API_URL}/orders/${orderId}`, orderData);
  },
  deleteOrder(orderId) {
    return axios.delete(`${API_URL}/orders/${orderId}`);
  },
};
