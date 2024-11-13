import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default {
  getCooks() {
    return axios.get(`${API_URL}/cooks`);
  },
  getCookById(cookId) {
    return axios.get(`${API_URL}/cooks/${cookId}`);
  },
  createCook(cookData) {
    return axios.post(`${API_URL}/cooks`, cookData);
  },
  updateCook(cookId, cookData) {
    return axios.put(`${API_URL}/cooks/${cookId}`, cookData);
  },
  deleteCook(cookId) {
    return axios.delete(`${API_URL}/cooks/${cookId}`);
  },
};
