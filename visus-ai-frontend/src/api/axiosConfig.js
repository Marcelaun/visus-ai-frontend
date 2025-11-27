import axios from 'axios';

const apiClient = axios.create({
  // Use a variável de ambiente ou a URL direta do Render
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001', //'https://backend-laravel-gb88.onrender.com',
  withCredentials: false, // <--- TEM QUE SER FALSE
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor: Antes de cada requisição, pega o token e anexa
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;