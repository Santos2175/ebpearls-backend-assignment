import { Request, Response } from 'express';
import { Task } from '../models/tasks.model';
import { isValidObjectId } from 'mongoose';

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
    const newTask = await Task.create({
      title,
      description,
      status,
    });

    res.status(201).json({
      success: true,
      message: `Task added successfully`,
      data: newTask,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// controller to get task by id
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // validate object id
    if (!isValidObjectId) {
      res.status(400).json({ success: false, error: `Invalid Task ID` });
      return;
    }

    // check if task with given id is present
    const task = await Task.findById(id);

    if (!task) {
      res
        .status(404)
        .json({ success: false, error: `Task with given ID not found` });
      return;
    }

    // response success
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
