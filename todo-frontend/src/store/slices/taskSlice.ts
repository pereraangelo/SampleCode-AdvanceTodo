import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await getTasks();
  return response;
});

export const addNewTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "id">) => {
    const response = await createTask(task);
    return response;
  }
);

export const updateExistingTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, task }: { id: string; task: Partial<Task> }) => {
    const response = await updateTask(id, task);
    return response;
  }
);

export const deleteExistingTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(
        updateExistingTask.fulfilled,
        (state, action: PayloadAction<Task>) => {
          // Update the target task
          state.tasks = state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          );
        }
      )
      .addCase(
        deleteExistingTask.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        }
      );
  },
});

export default taskSlice.reducer;
