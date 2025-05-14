import axios from 'axios';

const api = axios.create({
  baseURL: 'https://thapargptweb.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;