import { Request, Response } from "express";
import { getTasks } from "../models/Task";
import { sortByPriority, sortByStatus } from "../utils/sortTasks";

declare module "express" {
  interface Response {
    locals: {
      sortedTasks?: ReturnType<typeof getTasks>;
    };
  }
}

interface SortQuery {
  sortBy?: "PRIORITY" | "STATUS";
}

export const handleTaskSorting = (
  req: Request<{}, {}, {}, SortQuery>,
  res: Response,
  next: () => void
) => {
  const { sortBy } = req.query;
  const tasks = getTasks();

  let sortedTasks = [...tasks];

  if (sortBy === "PRIORITY") {
    sortedTasks = sortByPriority(tasks);
  } else if (sortBy === "STATUS") {
    sortedTasks = sortByStatus(tasks);
  }

  res.locals.sortedTasks = sortedTasks;
  next();
};
