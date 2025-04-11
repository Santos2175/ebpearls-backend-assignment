import express from 'express';
import dotenv from 'dotenv';

import { connectToMongoDB } from './config/db.config';
import tasksRoutes from './routes/tasks.routes';
import { globalErrorHandler } from './middlewares/errorHandler';
import { undefinedRouteHandler } from './middlewares/routesHandler';

dotenv.config();

// port initialization
const PORT = process.env.PORT || 5000;

// app initialization
const app = express();

// middlewares
app.use(express.json());

// api routes
app.use('/api/tasks', tasksRoutes);

// check undefined route error handler
app.use(undefinedRouteHandler);

// global error handler middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server started at PORT: ${PORT}`);
});
