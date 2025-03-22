import { NextFunction, Request, Response } from "express";
import { TaskStatus } from "../types/enums";

import {
  Task,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../models/Task";

let tasks: Task[] = [];

export const getAllTasks = (req: Request, res: Response) => {
  res.json(getTasks());
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTask: Omit<Task, "id"> = req.body;

    if (!newTask.title || !newTask.priority || !newTask.status) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const taskWithId: Task = {
      id: `${Date.now()}`,
      ...newTask,
    };

    addTask(taskWithId);
    res.status(201).json({
      message: "Task created successfully",
      body: taskWithId,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const modifyTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { id } = req.params;
    const updatedTask: Partial<Task> = req.body;

    // Update the task
    updateTask(id, updatedTask);

    // Return the full updated task
    const tasks = getTasks();
    const updatedTaskFull = tasks.find((task) => task.id === id);

    if (!updatedTaskFull) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json({
      message: "Task updated successfully",
      body: updatedTaskFull,
    });
  } catch (error) {
    next(error); // Pass errors to Express error handler
  }
};

export const removeTask = (req: Request, res: Response) => {
  const { id } = req.params;

  deleteTask(id);

  res.status(200).json({
    message: "Task deleted successfully",
  });
};

export const completeTask = (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tasks = getTasks();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.dependencies?.length) {
      const incompleteDeps = task.dependencies.filter((depId) => {
        const depTask = tasks.find((t) => t.id === depId);
        return depTask?.status !== "DONE";
      });

      if (incompleteDeps.length > 0) {
        return res.status(400).json({
          error: "Cannot complete task: dependencies are not done",
          incompleteDependencies: incompleteDeps,
        });
      }
    }

    // Update the task
    updateTask(id, { status: TaskStatus.DONE });

    // Return the full updated task
    const updatedTaskFull = tasks.find((task) => task.id === id);
    res.status(200).json({
      message: "Task marked as done successfully",
      body: updatedTaskFull,
    });
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
