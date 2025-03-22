import { TaskStatus, TaskPriority, TaskRecurrence } from "../types/enums";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  recurrence?: TaskRecurrence;
  dependencies?: string[];
}

let tasks: Task[] = [];

export const clearTasks = () => {
  tasks = [];
};
export const getTasks = (): Task[] => [...tasks];

export const addTask = (task: Task) => tasks.push(task);
// src/models/Task.ts
export const updateTask = (id: string, updatedTask: Partial<Task>) => {
  tasks = tasks.map(
    (task) => (task.id === id ? { ...task, ...updatedTask } : task) // Leave other tasks unchanged
  );
};

export const deleteTask = (id: string) => {
  // Delete the task
  tasks = tasks.filter((task) => task.id !== id);

  // Clean up dependencies without converting undefined to empty array
  tasks = tasks.map((task) => ({
    ...task,
    dependencies: task.dependencies
      ? task.dependencies.filter((depId) => depId !== id)
      : undefined,
  }));
};
