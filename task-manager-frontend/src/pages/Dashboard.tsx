import { useEffect, useState } from 'react';
import API from '../api/api';
import type { Task } from '../types/Task';
import { useAuth } from '../auth/AuthProvider';
import React from 'react';
import { TaskForm } from '../tasks/TaskForm';
import { TaskList } from '../components/TaskList';

export default function Dashboard() {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const Dashboard = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <TaskForm />
      <TaskList />
    </div>
  )
}


  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const createTask = async () => {
    await API.post('/tasks', { title, description });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      await API.put(`/tasks/${id}`, { completed: !task.completed });
      fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Sair</button>

      <h2>Nova Tarefa</h2>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={createTask}>Adicionar</button>

      <h2>Tarefas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </strong>
            <button onClick={() => toggleComplete(task._id)}>✓</button>
            <button onClick={() => deleteTask(task._id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

