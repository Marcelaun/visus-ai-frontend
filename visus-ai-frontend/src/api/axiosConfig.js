import axios from 'axios';

const apiClient = axios.create({
  // O Vite expõe as variáveis .env através de import.meta.env
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001', 
  
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default apiClient;