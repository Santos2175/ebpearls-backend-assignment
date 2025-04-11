import { Request, Response, NextFunction } from 'express';

// defining app error to define error instances
export class AppError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string | string[], statusCode: number) {
    super(Array.isArray(message) ? message.join(', ') : message);

    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.errors = Array.isArray(message) ? message : [message];

    // useful for debugging errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// global error handler
export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const errors = err.errors || [err.message] || 'Internal Server Error';

  res.status(statusCode).json({ success: false, error: errors });
  return;
};
