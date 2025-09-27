import React from 'react';
import { useTaskContext } from '../context/TaskContext';

export const TaskList = () => {
  const { tasks, deleteTask, updateTask } = useTaskContext();

  if (tasks.length === 0) {
    return <p className="text-gray-700 dark:text-gray-300">Nenhuma tarefa criada ainda.</p>;
  }

  const toggleComplete = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed: !completed });
  };

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-white"
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.title}
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleComplete(task._id, task.completed)}
              className="text-green-500 hover:text-green-700"
            >
              ✓
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
