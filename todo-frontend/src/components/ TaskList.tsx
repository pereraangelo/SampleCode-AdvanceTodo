import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTasks, deleteExistingTask } from "../store/slices/taskSlice";
import TaskItem from "./TaskItem";
import { selectFilteredAndSortedTasks } from "../store/selectors";
import { Box, Typography } from "@mui/material";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredAndSortedTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteExistingTask(id));
  };

  return (
    <div>
      <Typography
        variant="h4"
        color="textSecondary"
        sx={{ textAlign: "start", mx: 2, mt: 2, fontWeight: "bold" }}
      >
        Your <span style={{ color: "orange" }}>To-Do</span> List
      </Typography>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        sx={{ textAlign: "start", mx: 2, mb: 2 }}
      >
        Let's organize your day.
      </Typography>

      <div className="task-list-container">
        {tasks.length > 0 ? (
          tasks.map((task: any) => (
            <TaskItem key={task.id} task={task} onDelete={handleDelete} />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh", 
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="textSecondary">
              Success begins with a single task.
              <br /> Let’s make it happen! 🚀
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default TaskList;
