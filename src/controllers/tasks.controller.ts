import { Request, Response } from 'express';
import { Task } from '../models/tasks.model';

// controller to get all tasks
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.find();

    // check if tasks are there
    if (!tasks?.length) {
      res.status(404).json({ success: false, error: `No tasks found` });
      return;
    }

    res.status(200).json({ success: true, tasks: tasks });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
