import { addTask, deleteTask, getTasks, Task } from "../models/Task";
import { TaskPriority, TaskStatus } from "../types/enums";

describe("Task Model", () => {
  beforeEach(() => {
    // Reset tasks before each test
    while (getTasks().length) {
      deleteTask(getTasks()[0].id);
    }
  });

  describe("deleteTask", () => {
    it("should remove task and clean up dependencies in other tasks", () => {
      // Create test tasks
      const task1: Task = {
        id: "1",
        title: "Test 1",
        status: TaskStatus.NOT_DONE,
        priority: TaskPriority.MEDIUM,
        // No dependencies field
      };

      const task2: Task = {
        id: "2",
        title: "Test 2",
        status: TaskStatus.NOT_DONE,
        priority: TaskPriority.HIGH,
        dependencies: ["1"],
      };

      const task3: Task = {
        id: "3",
        title: "Test 3",
        status: TaskStatus.NOT_DONE,
        priority: TaskPriority.LOW,
        dependencies: ["2"],
      };

      addTask(task1);
      addTask(task2);
      addTask(task3);

      deleteTask("2");

      const remainingTasks = getTasks();

      expect(remainingTasks).toHaveLength(2);

      const updatedTask1 = remainingTasks.find((t) => t.id === "1");
      expect(updatedTask1?.dependencies).toBeUndefined();  

      const updatedTask3 = remainingTasks.find((t) => t.id === "3");
      expect(updatedTask3?.dependencies).toEqual([]);
    });

    it("should handle multiple dependency references", () => {
      const task1: Task = {
        id: "1",
        title: "Task 1",
        status: TaskStatus.NOT_DONE,
        priority: TaskPriority.MEDIUM,
        dependencies: ["2"],
      };

      const task2: Task = {
        id: "2",
        title: "Task 2",
        status: TaskStatus.NOT_DONE,
        priority: TaskPriority.HIGH,
        dependencies: ["1"],
      };

      addTask(task1);
      addTask(task2);

      // Delete Task 1
      deleteTask("1");

      const remainingTasks = getTasks();

      expect(remainingTasks).toHaveLength(1);

      const updatedTask2 = remainingTasks.find((t) => t.id === "2");
      expect(updatedTask2?.dependencies).toEqual([]);
    });
  });
});
