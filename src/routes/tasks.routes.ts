import Router from 'express';

import { validateInput } from '../middlewares/validateInput.js';
import {
  getAllTasks,
  addTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  updateStatusByTaskId,
} from '../controllers/tasks.controller.js';

import {
  taskInputSchema,
  taskUpdateSchema,
  taskStatusUpdateSchema,
} from '../validators/tasks.validator.js';

// router initialization
const router = Router();

// api routes for task
router
  .route('/')
  .get(getAllTasks)
  .post(validateInput(taskInputSchema), addTask);

router
  .route('/:id')
  .get(getTaskById)
  .put(validateInput(taskUpdateSchema), updateTaskById)
  .delete(deleteTaskById);

router
  .route('/:id/status')
  .patch(validateInput(taskStatusUpdateSchema), updateStatusByTaskId);

export default router;
