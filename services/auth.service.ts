import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  level: string;
}

export interface AuthResult {
  token: string;
  user: User;
}

export const AuthService = {
  async register(name: string, email: string, password: string): Promise<AuthResult> {
    const { data } = await api.post<AuthResult>('/auth/register', { name, email, password });
    await AsyncStorage.setItem('@sea:token', data.token);
    await AsyncStorage.setItem('@sea:user', JSON.stringify(data.user));
    return data;
  },

  async login(email: string, password: string): Promise<AuthResult> {
    const { data } = await api.post<AuthResult>('/auth/login', { email, password });
    await AsyncStorage.setItem('@sea:token', data.token);
    await AsyncStorage.setItem('@sea:user', JSON.stringify(data.user));
    return data;
  },

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove(['@sea:token', '@sea:user']);
  },

  async loadSession(): Promise<AuthResult | null> {
    const [token, raw] = await AsyncStorage.multiGet(['@sea:token', '@sea:user']);
    if (!token[1] || !raw[1]) return null;
    return { token: token[1], user: JSON.parse(raw[1]) };
  },
};
