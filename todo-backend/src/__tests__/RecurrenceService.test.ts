import { ScheduledTask } from 'node-cron';
import cron from 'node-cron';
import { Task } from '../models/Task';
import { initializeRecurringTasks } from '../services/RecurringTaskService';
import { addTask, getTasks } from '../models/Task';
import { TaskPriority, TaskRecurrence, TaskStatus } from '../types/enums';

jest.mock('node-cron');
jest.mock('../models/Task', () => ({
  addTask: jest.fn(),
  getTasks: jest.fn(),
}));

describe('RecurrenceService', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    status: TaskStatus.NOT_DONE,  
    priority: TaskPriority.MEDIUM,  
    recurrence: TaskRecurrence.DAILY  
  };

  beforeEach(() => {
    (getTasks as jest.Mock).mockReturnValue([mockTask]);
    (cron.schedule as jest.Mock).mockReturnValue({
      stop: jest.fn(),
      start: jest.fn(),
    } as unknown as ScheduledTask);
  });

  it('should schedule recurring tasks', () => {
    initializeRecurringTasks();
    expect(cron.schedule).toHaveBeenCalled();
  });
});