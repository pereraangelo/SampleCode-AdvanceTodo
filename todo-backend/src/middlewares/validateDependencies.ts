import { Request, Response, NextFunction } from "express";
import { getTasks } from "../models/Task";

export const validateDependencies = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const { status } = req.body;
  const tasks = getTasks();

  const taskToUpdate = tasks.find((t) => t.id === id);

  if (!taskToUpdate) {
    res.status(404).json({ error: "Task not found" });
    return; // Exit early
  }

  if (status === "DONE" && taskToUpdate.dependencies?.length) {
    const incompleteDependencies = taskToUpdate.dependencies.filter((depId) => {
      const dependency = tasks.find((t) => t.id === depId);
      return !dependency || dependency.status !== "DONE";
    });

    if (incompleteDependencies.length > 0) {
      res.status(400).json({
        error: "Cannot complete task: dependencies are not done",
        incompleteDependencies: incompleteDependencies.map(
          (id) => tasks.find((t) => t.id === id)?.title || id
        ),
      });
      return; // Exit early
    }
  }

  next(); // Don't return next() call
};
