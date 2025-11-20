// src/api/axiosConfig.js
import axios from 'axios';

// 1. Define a URL base da sua API Laravel
const apiClient = axios.create({
  baseURL: 'https://backend-laravel-gb88.onrender.com', // A porta do seu Laravel
  withCredentials: true, // 2. A MÁGICA: Diz ao axios para enviar cookies
});

export default apiClient;