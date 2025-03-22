import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNewTask, updateExistingTask } from "../store/slices/taskSlice";
import { Task } from "../types/Task";
import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
} from "@mui/material";

interface TaskFormProps {
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState<Task["priority"]>(
    task?.priority || "LOW"
  );
  const [status, setStatus] = useState<Task["status"]>(
    task?.status || "NOT_DONE"
  );
  const [recurrence, setRecurrence] = useState<Task["recurrence"]>(
    task?.recurrence || undefined
  );
  const [dependencies, setDependencies] = useState<string[]>(
    task?.dependencies || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setStatus(task.status);
      setRecurrence(task.recurrence);
      setDependencies(task.dependencies || []);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const taskData: Omit<Task, "id"> = {
        title,
        priority,
        status,
        recurrence,
        dependencies,
      };

      if (task) {
        await dispatch(
          updateExistingTask({ id: task.id, task: taskData })
        ).unwrap();
      } else {
        await dispatch(addNewTask(taskData)).unwrap();
        setTitle("");
        setPriority("LOW");
        setStatus("NOT_DONE");
        setRecurrence(undefined);
        setDependencies([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ boxShadow: 0 }}>
      <CardContent>
        <Typography variant="h6">New To-Do</Typography>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Let's begin
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
            >
              <MenuItem value="NOT_DONE">Not Done</MenuItem>
              <MenuItem value="DONE">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Recurrence</InputLabel>
            <Select
              value={recurrence || ""}
              onChange={(e) =>
                setRecurrence(
                  (e.target.value as Task["recurrence"]) || undefined
                )
              }
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="DAILY">Daily</MenuItem>
              <MenuItem value="WEEKLY">Weekly</MenuItem>
              <MenuItem value="MONTHLY">Monthly</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Dependencies</InputLabel>
            <Select
              multiple
              value={dependencies}
              onChange={(e) => setDependencies(e.target.value as string[])}
            >
              {tasks
                .filter((t) => t.id !== task?.id)
                .map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ textTransform: "none", mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Add To-Do"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
