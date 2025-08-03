import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL da sua API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;