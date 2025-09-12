import React from 'react'
import { useTaskContext } from '../context/TaskContext'

export const TaskList = () => {
  const { tasks, deleteTask } = useTaskContext()

  if (tasks.length === 0) {
    return <p className="text-gray-700 dark:text-gray-300">Nenhuma tarefa criada ainda.</p>
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
          </div>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500 hover:text-red-700"
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  )
}
