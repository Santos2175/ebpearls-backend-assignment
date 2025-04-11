import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

// middleware to check for undefined routes
export const undefinedRouteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new AppError(`Route ${req.originalUrl} not found`, 404);
};
