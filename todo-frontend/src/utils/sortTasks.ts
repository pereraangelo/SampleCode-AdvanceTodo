import { Task } from '../types/Task';

export const sortByPriority = (tasks: Task[]) => {
  const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
  return [...tasks].sort((a, b) => 
    priorityOrder[b.priority] - priorityOrder[a.priority]
  );
};

export const sortByStatus = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    if (a.status === 'DONE' && b.status !== 'DONE') return -1;
    if (b.status === 'DONE' && a.status !== 'DONE') return 1;
    return 0;
  });
};