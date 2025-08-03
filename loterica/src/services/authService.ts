import api from './api';

interface LoginPayload {
  nome: string;
  senha: string;
}

export async function login(payload: LoginPayload) {
  const response = await api.post('/auth/login', payload);
  return response.data; // { token, msg }
}