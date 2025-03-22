import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "../types/Task";

const API_URL = "http://localhost:3000/api";

// Function to show toast notifications
const showSuccess = (message: string) => toast.success(message);
const showError = (message: string) => toast.error(message);

// CRUD operations with notifications
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    showError("Failed to fetch tasks.");
    throw error;
  }
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    showSuccess("Task created successfully!");
    return response.data.body;
  } catch (error) {
    showError("Failed to create task.");
    throw error;
  }
};

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    showSuccess("Task updated successfully!");
    return response.data.body;
  } catch (error) {
    showError("Failed to update task.");
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
    showSuccess("Task deleted successfully!");
  } catch (error) {
    showError("Failed to delete task.");
    throw error;
  }
};
