import { useLocalStorage } from './useLocalStorage';
import type { Task } from '../types/task';

export function useChecklist() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('nakkahwin_tasks', []);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: `${Date.now()}-${Math.random()}` };
    setTasks(prev => [...prev, newTask]);
  };

  const addTasks = (newTasks: Omit<Task, 'id'>[]) => {
    const withIds: Task[] = newTasks.map((t, i) => ({
      ...t,
      id: `${Date.now()}-${i}`,
    }));
    setTasks(prev => [...prev, ...withIds]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return { tasks, addTask, addTasks, updateTask, deleteTask, toggleTask, progress, completedCount };
}
