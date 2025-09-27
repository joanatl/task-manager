import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

export const login = async (email: string, password: string) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data; // retorna { token, user }
};

export const fetchTasks = async () => {
  const res = await API.get('/tasks');
  return res.data; // retorna array de tasks
};

export const createTask = async (task: { title: string, description: string }) => {
  const res = await API.post('/tasks', task);
  return res.data; // retorna a task criada
};

export const updateTask = async (taskId: string, updates: Partial<{ title: string; completed: boolean }>) => {
  const res = await API.put(`/tasks/${taskId}`, updates);
  return res.data; // retorna a task atualizada
};

export const deleteTask = async (taskId: string) => {
  const res = await API.delete(`/tasks/${taskId}`);
  return res.data; // retorna msg
};
