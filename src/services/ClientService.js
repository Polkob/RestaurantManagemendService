import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default {
  getClients() {
    return axios.get(`${API_URL}/clients`);
  },
  getClientById(clientId) {
    return axios.get(`${API_URL}/clients/${clientId}`);
  },
  createClient(clientData) {
    return axios.post(`${API_URL}/clients`, clientData);
  },
  updateClient(clientId, clientData) {
    return axios.put(`${API_URL}/clients/${clientId}`, clientData);
  },
  deleteClient(clientId) {
    return axios.delete(`${API_URL}/clients/${clientId}`);
  },
};
