import { Schema, model } from 'mongoose';
import { ITask, TaskStatus } from '../interface/tasks';

// task schema definition
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.Pending,
    },
  },

  // this returns the createdAt and updatedAt fields
  { timestamps: true }
);

// task model for communicating with db
export const Task = model('Task', taskSchema);
