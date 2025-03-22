import express from "express";
import {
  createTask,
  modifyTask,
  removeTask,
} from "../controllers/TaskController";
import { validateDependencies } from "../middlewares/validateDependencies";

import { handleTaskSorting } from "../middlewares/handleTaskSorting";

const router = express.Router();
router.put("/tasks/:id", validateDependencies, modifyTask);

router.get("/tasks", handleTaskSorting, (req, res) => {
  res.json(res.locals.sortedTasks);
});

router.post("/tasks", createTask);
router.delete("/tasks/:id", removeTask);

export default router;
