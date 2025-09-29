import React, { useEffect, useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token"); 

  // Buscar tarefas do usuário
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setTasks(json.data); 
      }
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  };

  // Criar nova tarefa
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const json = await res.json();
      if (json.success) {
        setTitle("");
        setDescription("");
        setTasks(prev => [...prev, json.data]); // adiciona a nova tarefa na lista
      }
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  // Excluir tarefa
  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
    }
  };

  // Marcar tarefa como concluída
  const completeTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: true }),
      });
      const json = await res.json();
      if (json.success) {
        setTasks(tasks.map(task =>
          task._id === id ? { ...task, completed: true } : task
        ));
      }
    } catch (err) {
      console.error("Erro ao concluir tarefa:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      {/* Formulário de adicionar tarefa */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-400 hover:bg-blue-500 p-2 rounded font-bold"
        >
          Adicionar tarefa
        </button>
      </div>

      {/* Lista de tarefas */}
      <div className="w-full max-w-md space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md relative"
          >
            <h3 className="font-bold text-lg">
              {task.completed ? <s>{task.title}</s> : task.title}
            </h3>
            <p className="text-gray-300">{task.description}</p>

            <div className="absolute bottom-2 right-2 flex space-x-3">
              {!task.completed && (
                <button
                  onClick={() => completeTask(task._id)}
                  className="text-green-400 hover:text-green-300"
                >
                  <FaCheck />
                </button>
              )}
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-400 hover:text-red-300"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

