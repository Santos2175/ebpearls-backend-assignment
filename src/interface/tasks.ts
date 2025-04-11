// enum types for status
export enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  INPROGRESS = 'in-progress',
}

// interface types for task
export interface ITask {
  title: string;
  description: string;
  status: Status;
}

// interface types for task response
export interface ITaskResponse extends ITask {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
