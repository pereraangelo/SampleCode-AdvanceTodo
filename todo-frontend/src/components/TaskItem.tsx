import React from "react";
import { Task } from "../types/Task";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateExistingTask } from "../store/slices/taskSlice";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const handleComplete = async () => {
    try {
      await dispatch(
        updateExistingTask({ id: task.id, task: { status: "DONE" } })
      ).unwrap();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to complete task");
    }
  };

  const hasIncompleteDependencies = task.dependencies?.some((depId) => {
    const dependency = tasks.find((t) => t.id === depId);

    // If dependency is not found, consider it complete (return false)
    if (!dependency) return false;

    // If dependency is not done, return true
    return dependency.status !== "DONE";
  });

  return (
    <Card sx={{ paddingX: 1, margin: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            container
            direction="column"
            alignItems="start"
            justifyContent={"center"}
          >
            <Grid item marginBottom={2}>
              <Typography variant="subtitle1" component="h3">
                {task.title}
              </Typography>
            </Grid>

            <Grid item>
              <Tooltip title="Status">
                <Chip
                  label={task.status
                    .toLowerCase()
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  sx={{ paddingX: 1 }}
                  color={task.status === "DONE" ? "success" : "warning"}
                />
              </Tooltip>
              <Tooltip title="Priority">
                <Chip
                  label={task.priority
                    .toLowerCase()
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                  sx={{ marginLeft: 2, paddingX: 1 }}
                />
              </Tooltip>
              {task.recurrence && (
                <Tooltip title="Recurrence">
                  <Chip
                    icon={<RestartAltIcon />}
                    label={task.recurrence
                      .toLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                    sx={{ marginLeft: 2, paddingX: 1 }}
                  />
                </Tooltip>
              )}
            </Grid>

            <Grid item marginTop={2}>
              <Typography variant="subtitle2">
                <span style={{ color: "orange", fontWeight: "bold" }}>
                  ID:{" "}
                </span>
                {task.id}
              </Typography>
            </Grid>

            <Grid item>
              {hasIncompleteDependencies && (
                <Box
                  sx={{
                    mt: 2,
                    px: 2,
                    backgroundColor: "#ffcccb",
                    color: "#d32f2f",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  Alert: Complete dependencies first.
                  <br />
                  {task.dependencies?.map((t) => (
                    <div key={t}>{t}</div>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>

          <Grid
            item
            xs={4}
            display={"flex"}
            justifyContent={"center"}
            alignItems="end"
            direction="column"
          >
            <Tooltip title="Mark as complete">
              <IconButton
                aria-label="delete"
                color="success"
                onClick={handleComplete}
                disabled={task.status === "DONE" || hasIncompleteDependencies}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => onDelete(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
