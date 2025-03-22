import { Request, Response } from "express";
import { Task, getTasks, updateTask } from "../models/Task";
import { completeTask } from "../controllers/TaskController";
import { TaskStatus, TaskPriority } from "../types/enums";

jest.mock("../models/Task", () => ({
  getTasks: jest.fn(),
  updateTask: jest.fn(),
}));

describe("completeTask", () => {
  const taskId = "1";
  const dependencyId = "2";

  const mockRequest = (params: any = {}, body: any = {}) =>
    ({
      params,
      body,
    } as Request);

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  };

  beforeEach(() => {
    (getTasks as jest.Mock).mockClear();
    (updateTask as jest.Mock).mockClear();
  });
  it("should complete task with no dependencies", () => {
    // Arrange
    const mockTask: Task = {
      id: taskId,
      title: "Test Task",
      status: TaskStatus.NOT_DONE,
      priority: TaskPriority.MEDIUM,
      dependencies: [],
    };
    (getTasks as jest.Mock).mockReturnValue([mockTask]);
  
    // Act
    const req = mockRequest({ id: taskId });
    const res = mockResponse();

    completeTask(req, res);
    // Assert
    expect(updateTask).toHaveBeenCalledWith(taskId, {
      status: TaskStatus.DONE,
    });
  });

  it("should return 400 for incomplete dependencies", () => {
    const mainTask: Task = {
      id: taskId,
      title: "Main Task",
      status: TaskStatus.NOT_DONE,
      priority: TaskPriority.HIGH,
      dependencies: [dependencyId],
    };

    const dependencyTask: Task = {
      id: dependencyId,
      title: "Dependency Task",
      status: TaskStatus.NOT_DONE,
      priority: TaskPriority.LOW,
    };

    (getTasks as jest.Mock).mockReturnValue([mainTask, dependencyTask]);

    const req = mockRequest({ id: taskId });
    const res = mockResponse();

    completeTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Cannot complete task: dependencies are not done",
      incompleteDependencies: [dependencyId],
    });
  });

  it("should return 404 if task is not found", () => {
    (getTasks as jest.Mock).mockReturnValue([]);

    const req = mockRequest({ id: taskId });
    const res = mockResponse();

    completeTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Task not found" });
  });

  it("should complete task when dependencies are done", () => {
    const mainTask: Task = {
      id: taskId,
      title: "Main Task",
      status: TaskStatus.NOT_DONE,
      priority: TaskPriority.HIGH,
      dependencies: [dependencyId],
    };

    const dependencyTask: Task = {
      id: dependencyId,
      title: "Dependency Task",
      status: TaskStatus.DONE,
      priority: TaskPriority.LOW,
    };

    (getTasks as jest.Mock).mockReturnValue([mainTask, dependencyTask]);

    const req = mockRequest({ id: taskId });
    const res = mockResponse();

    completeTask(req, res);

    expect(updateTask).toHaveBeenCalledWith(taskId, {
      status: TaskStatus.DONE,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task marked as done successfully",
      body: mainTask,
    });
  });
});
