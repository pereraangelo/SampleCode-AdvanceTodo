import { Request, Response, NextFunction } from "express";
import { modifyTask } from "../controllers/TaskController";
import { Task, getTasks, updateTask } from "../models/Task";
import { TaskPriority, TaskStatus } from "../types/enums";

jest.mock("../models/Task");

const mockRequest = (body: any = {}, params: any = {}) =>
  ({
    body,
    params,
  } as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  return res;
};

describe("TaskController", () => {
  let mockTasks: Task[];
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockTasks = [
      {
        id: "test-id-123",
        title: "Test Task",
        status: TaskStatus.NOT_DONE,
        priority: TaskPriority.MEDIUM,
      },
    ];

    mockNext = jest.fn();
    (getTasks as jest.Mock).mockReturnValue(mockTasks);
    jest.spyOn(Date, "now").mockImplementation(() => 123456789);
  });

  describe("modifyTask", () => {
    it("should update an existing task", () => {
      const updates = { title: "Updated Task" };
      const req = mockRequest(updates, { id: "1" });
      const res = mockResponse();

      // Mock getTasks to return updated task
      const updatedTask = {
        id: "1",
        title: "Updated Task",
        status: TaskStatus.NOT_DONE,
        priority: TaskPriority.MEDIUM,
      };
      (getTasks as jest.Mock).mockReturnValue([updatedTask]);

      modifyTask(req, res, mockNext);

      expect(updateTask).toHaveBeenCalledWith("1", updates);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task updated successfully",
        body: updatedTask,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle non-existent task", () => {
      const req = mockRequest({}, { id: "999" });
      const res = mockResponse();

      modifyTask(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Task not found" });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should pass errors to next", () => {
      const req = mockRequest({}, { id: "1" });
      const res = mockResponse();
      const error = new Error("Test error");

      (updateTask as jest.Mock).mockImplementation(() => {
        throw error;
      });

      modifyTask(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
