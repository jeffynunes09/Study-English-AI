import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Injeta o token JWT em todas as requisições autenticadas
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@sea:token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normaliza mensagens de erro
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error ??
      err.response?.data?.message ??
      err.message ??
      'Unexpected error';
    return Promise.reject(new Error(message));
  }
);
