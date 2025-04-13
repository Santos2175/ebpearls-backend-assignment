import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToMongoDB } from './config/db.config.js';
import apiRoutes from './routes/index.routes.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import { undefinedRouteHandler } from './middlewares/routesHandler.js';

dotenv.config();

// port initialization
const PORT = process.env.PORT || 5000;

// app initialization
const app = express();

// middlewares
app.use(cors()); // Default: allows to access backend url from all
app.use(express.json());

// api routes
app.use('/api', apiRoutes);

// check undefined route error handler
app.use(undefinedRouteHandler);

// global error handler middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server started at PORT: ${PORT}`);
});
