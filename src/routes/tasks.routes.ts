import Router from 'express';

import {
  getAllTasks,
  addTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  updateStatusByTaskId,
} from '../controllers/tasks.controller';

const router = Router();

// api routes for task
router.route('/').get(getAllTasks).post(addTask);

router
  .route('/:id')
  .get(getTaskById)
  .put(updateTaskById)
  .delete(deleteTaskById);

router.route('/:id/status').patch(updateStatusByTaskId);

export default router;
