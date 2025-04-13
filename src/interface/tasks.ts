// enum types for status
export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
  InProgress = 'in-progress',
}

// interface types for task
export interface ITask {
  title: string;
  description: string;
  status: TaskStatus;
}

// interface types for task response
export interface ITaskResponse extends ITask {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
