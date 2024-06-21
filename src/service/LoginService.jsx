import axios from 'axios';

const LoginService = axios.create({
  baseURL: 'http://localhost:3000/api-documentation#/auth/login',
});

LoginService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default LoginService;