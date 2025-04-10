import Router from 'express';

import { getAllTasks, addTask } from '../controllers/tasks.controller';

const router = Router();

// api routes
router.route('/').get(getAllTasks).post(addTask);

// router.route('/:id').get().put().delete();

// router.route('/:id/status').patch();

export default router;
