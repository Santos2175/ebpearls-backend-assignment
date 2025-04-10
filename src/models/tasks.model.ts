import { Schema, model } from 'mongoose';
import { ITask, Status } from '../interface/tasks';

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
      enum: Status,
      default: Status.PENDING,
    },
  },
  { timestamps: true }
);

// task model for communicating with db
export const task = model('Task', taskSchema);
