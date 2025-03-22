import cron from "node-cron";
import { Task, getTasks, addTask } from "../models/Task";

const scheduleRecurrence = (task: Task) => {
  if (!task.recurrence) return;

  const scheduleMap = {
    DAILY: "0 0 * * *", // Daily at midnight
    WEEKLY: "0 0 * * 1", // Weekly on Monday
    MONTHLY: "0 0 1 * *", // Monthly on 1st
  };

  cron.schedule(scheduleMap[task.recurrence], () => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      recurrence: undefined,
      nextRecurrence: undefined,
      createdAt: new Date(),
    };
    addTask(newTask);
  });
};

export const initializeRecurringTasks = () => {
  const tasks = getTasks().filter((t) => t.recurrence);
  tasks.forEach(scheduleRecurrence);
};
