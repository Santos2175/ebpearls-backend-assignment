import Router from 'express';

import {
  getAllTasks,
  addTask,
  getTaskById,
  updateTaskById,
} from '../controllers/tasks.controller';

const router = Router();

// api routes
router.route('/').get(getAllTasks).post(addTask);

router.route('/:id').get(getTaskById).put(updateTaskById);

// router.route('/:id/status').patch();

export default router;
