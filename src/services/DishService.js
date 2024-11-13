import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default {
  getDishes() {
    return axios.get(`${API_URL}/dishes`);
  },
  getDishById(dishId) {
    return axios.get(`${API_URL}/dishes/${dishId}`);
  },
  createDish(dishData) {
    return axios.post(`${API_URL}/dishes`, dishData);
  },
  updateDish(dishId, dishData) {
    return axios.put(`${API_URL}/dishes/${dishId}`, dishData);
  },
  deleteDish(dishId) {
    return axios.delete(`${API_URL}/dishes/${dishId}`);
  },
};
