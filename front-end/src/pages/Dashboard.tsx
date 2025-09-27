import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskList } from '../components/TaskList';

const Dashboard: React.FC = () => {
  const { addTask, logoutUser } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Task Manager
        </h1>
        <button
          onClick={logoutUser}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Sair
        </button>
      </header>

      {/* Formulário de nova tarefa */}
      <form onSubmit={handleAddTask} className="flex space-x-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa"
          className="flex-1 border rounded px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="w-full border rounded px-3py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </form>

      {/* Lista de tarefas */}
      <TaskList />
    </div>
  );
};

export default Dashboard;

