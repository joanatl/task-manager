import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Task } from '../types/Task'
import * as API from '../api/api'

interface TaskContextType {
  userToken: string | null
  tasks: Task[]
  loginUser: (email: string, password: string) => Promise<void>
  logoutUser: () => void
  loadTasks: () => Promise<void>
  addTask: (title: string, description: string) => Promise<void>
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

  const loginUser = async (email: string, password: string) => {
    const data = await API.login(email, password)
    setUserToken(data.token)
    await loadTasks()
  }

  const logoutUser = () => {
    setUserToken(null)
    setTasks([])
  }

  const loadTasks = async () => {
    if (!userToken) return
    const data = await API.fetchTasks(userToken)
    setTasks(data.tasks)
  }

  const addTask = async (title: string, description: string) => {
    if (!userToken) return
    const newTask = await API.createTask({ title, description }, userToken)
    setTasks(prev => [...prev, newTask.task])
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!userToken) return
    const updated = await API.updateTask(taskId, updates, userToken)
    setTasks(prev => prev.map(t => (t._id === taskId ? updated.task : t)))
  }

  const deleteTask = async (taskId: string) => {
    if (!userToken) return
    await API.deleteTask(taskId, userToken)
    setTasks(prev => prev.filter(t => t._id !== taskId))
  }

  return (
    <TaskContext.Provider
      value={{ userToken, tasks, loginUser, logoutUser, loadTasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider')
  return context
}
