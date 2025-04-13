import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { connectToMongoDB } from './config/db.config.js';
import apiRoutes from './routes/index.routes.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import { undefinedRouteHandler } from './middlewares/routesHandler.js';

dotenv.config();

// Environment variables initialization
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// app initialization
const app = express();

// middlewares
app.use(cors()); // Default: allows to access backend url from all
app.use(express.json());

// morgan package to log the requests
if (NODE_ENV === 'development') {
  app.use(morgan('dev')); //logs requests in development
} else {
  app.use(morgan('combined')); //logs requests in production
}

// api routes
app.use('/api', apiRoutes);

// check undefined route error handler
app.use(undefinedRouteHandler);

// global error handler middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running in ${NODE_ENV} mode at PORT: ${PORT}`);
});
