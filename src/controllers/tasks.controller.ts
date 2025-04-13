import { Request, Response } from 'express';
import { isValidObjectId, SortOrder } from 'mongoose';

import { Task } from '../models/tasks.model.js';
import { ITaskResponse, TaskStatus } from '../interface/tasks.js';
import { ITaskQuery } from '../interface/query.js';
import { formatDate } from '../utilities/dateFormatter.js';

// controller to get all tasks
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // query params
    const {
      page = '1',
      limit = '10',
      sort = 'desc',
      status,
    }: ITaskQuery = req.query;

    // parsing pagination parameters
    const pageNumberRaw = Number(page);
    const limitNumberRaw = Number(limit);

    // checks if page number or limit number is valid number or not
    if (isNaN(pageNumberRaw) || isNaN(limitNumberRaw)) {
      res.status(400).json({
        success: false,
        message: 'Invalid page or limit parameter',
      });
      return;
    }

    // setting for pagination
    const pageNumber = Math.max(pageNumberRaw, 1);
    const limitNumber = Math.max(limitNumberRaw, 1);
    const offset = (pageNumber - 1) * limitNumber;

    // search query for filtering data
    const searchQuery: Record<string, any> = {};
    if (status) {
      // checks if status value is correct
      if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
        res.status(400).json({ success: false, error: `Invalid status value` });
        return;
      }
      searchQuery.status = status;
    }

    // for sorting the tasks
    const sortOrder: SortOrder = sort === 'asc' ? 1 : -1;
    const sortBy: { [key: string]: SortOrder } = { createdAt: sortOrder };

    // counting total tasks and total pages
    const totalTasks = await Task.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalTasks / limitNumber);

    // retrieving tasks from database
    const rawTasks = await Task.find(searchQuery)
      .sort(sortBy)
      .limit(limitNumber)
      .skip(offset)
      .lean<ITaskResponse[]>({ getters: true })
      .exec();

    // pagination object containing details about page and tasks
    const pagination = {
      currentPage: pageNumber,
      totalPages,
      totalTasks,
      limit: limitNumber,
    };

    // check if tasks are there
    if (!rawTasks?.length) {
      res.status(200).json({
        success: true,
        message: `No tasks found`,
        data: {
          tasks: [],
          pagination,
        },
      });
      return;
    }

    // map tasks to match ITaskResponse
    const tasks: ITaskResponse[] = rawTasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: formatDate(task.createdAt),
      updatedAt: formatDate(task.updatedAt),
    }));

    // successful response of tasks
    res.status(200).json({
      success: true,
      message: `Tasks retrieved successfully`,
      data: {
        tasks,
        pagination,
      },
    });
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
    if (!isValidObjectId(id)) {
      res.status(400).json({ success: false, error: `Invalid Task ID` });
      return;
    }

    // check if task with given id is present
    const task: ITaskResponse | null = await Task.findById(id);

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

// update task by id
export const updateTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // validate task id
    if (!isValidObjectId(id)) {
      res.status(400).json({ success: false, error: `Invalid Task ID` });
      return;
    }

    // check if task with given id exists
    const task: ITaskResponse | null = await Task.findById(id);
    if (!task) {
      res
        .status(404)
        .json({ success: false, error: `Task with given ID not found` });
      return;
    }

    // update the task with respective id
    const updatedTask: ITaskResponse | null = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
      },
      { new: true }
    );

    // response success
    res.status(200).json({
      success: true,
      message: `Task updated successfully`,
      data: updatedTask,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete task by id
export const deleteTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // validate task id
    if (!isValidObjectId(id)) {
      res.status(400).json({ success: false, error: `Invalid Task ID` });
      return;
    }

    // check if the task with given id exists
    const task: ITaskResponse | null = await Task.findById(id);

    if (!task) {
      res
        .status(404)
        .json({ success: false, error: `Task with given ID not found` });
      return;
    }

    // delete task
    await Task.findByIdAndDelete(id);

    // response success deletion
    res
      .status(200)
      .json({ success: true, message: `Task deleted successfully` });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// controller to update task status by id
export const updateStatusByTaskId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate task id
    if (!isValidObjectId(id)) {
      res.status(400).json({ success: false, error: `Invalid Task ID` });
      return;
    }

    // check if task with given id exists
    const task: ITaskResponse | null = await Task.findById(id);

    if (!task) {
      res
        .status(404)
        .json({ success: false, error: `Task with given ID not found` });
      return;
    }

    // update the status of given task id
    const updatedTask: ITaskResponse | null = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    // response status update
    res.status(200).json({
      success: true,
      message: `Task status updated successfully`,
      data: updatedTask,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
