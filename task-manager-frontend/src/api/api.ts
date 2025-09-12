import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authoriation = `Bearer ${token}`;
    }
    return config;
});

export default API;

const API_BASE_URL = 'http://localhost:5000/api'

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Login failed')
    return res.json()
}

export const fetchTasks = async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}`}
    })
    if (!res.ok) throw new Error('Failed to fetch tasks')
        return res.json()
}

export const createTask = async (task: { title: string; description: string }, token: string) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })
    if (!res.ok) throw new Error('Failed to create task')
    return res.json()
}

export const updateTask = async (taskId: string, updates: Partial<{title:string;description:string;completed:boolean}>, token: string) => {
    const res = await fetch (`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
    })
    if (!res.ok) throw new Error('Failed to update task') 
    return res.json()
}

export const deleteTask = async (taskId: string, token: string) => {
  const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete task')
  return res.json()
}
