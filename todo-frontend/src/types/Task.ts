export interface Task {
    id: string;
    title: string;
    status: 'DONE' | 'NOT_DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    recurrence?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    dependencies?: string[];
  }

  