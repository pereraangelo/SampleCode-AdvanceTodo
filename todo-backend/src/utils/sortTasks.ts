import { Task } from "../models/Task";

// Explicit return types
export const sortByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3 };
  return [...tasks].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority] // Descending order
  );
};

export const sortByStatus = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    if (a.status === "DONE" && b.status !== "DONE") return -1;
    if (b.status === "DONE" && a.status !== "DONE") return 1;
    return 0;
  });
};
