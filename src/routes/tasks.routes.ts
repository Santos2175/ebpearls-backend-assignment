import Router from 'express';

import {
  getAllTasks,
  addTask,
  getTaskById,
} from '../controllers/tasks.controller';

const router = Router();

// api routes
router.route('/').get(getAllTasks).post(addTask);

router.route('/:id').get(getTaskById);

// router.route('/:id/status').patch();

export default router;
