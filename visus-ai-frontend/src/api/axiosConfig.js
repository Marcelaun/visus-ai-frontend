// src/api/axiosConfig.js
import axios from 'axios';

// 1. Define a URL base da sua API Laravel
const apiClient = axios.create({
  baseURL: 'http://localhost:8001', // A porta do seu Laravel
  withCredentials: true, // 2. A MÁGICA: Diz ao axios para enviar cookies
});

export default apiClient;