import Router from 'express';

// importing all other api routes
import tasksRoute from './tasks.routes.js';

// initialize router
const router = Router();

// For scalable purpose, all the other api routes can be centralized and managed here and exported to main entry server file
// @example:
// router.use('/tasks', tasksRoute);
// router.use('/users', tasksRoute);
// router.use('/auth', tasksRoute);

// api routes
router.use('/tasks', tasksRoute);

export default router;
