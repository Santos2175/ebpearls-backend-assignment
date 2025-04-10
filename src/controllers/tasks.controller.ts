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

// controller to add task
export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;

    // adding new task
    await Task.create({
      title,
      description,
      status,
    });

    res.status(201).json({ success: true, message: `Task added successfully` });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
