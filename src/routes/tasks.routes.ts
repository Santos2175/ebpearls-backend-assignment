import Router from 'express';

import { getAllTasks } from '../controllers/tasks.controller';

const router = Router();

// api routes
router.route('/').get(getAllTasks);

// router.route('/:id').get().put().delete();

// router.route('/:id/status').patch();

export default router;
