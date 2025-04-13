import { Schema, model } from 'mongoose';
import { ITask, TaskStatus } from '../interface/tasks.js';
import { formatDate } from '../utilities/dateFormatter.js';

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

// formatting the timestamps date in 'YYYY-MM-DD HH:mm:ss' format
taskSchema.set('toJSON', {
  transform: function (_, ret) {
    // format createdAt and updatedAt
    ret.createdAt = formatDate(ret.createdAt);
    ret.updatedAt = formatDate(ret.updatedAt);

    return ret;
  },
});

// task model for communicating with db
export const Task = model('Task', taskSchema);
