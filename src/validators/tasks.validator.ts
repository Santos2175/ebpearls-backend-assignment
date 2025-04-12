import Joi from 'joi';
import { TaskStatus } from '../interface/tasks.js';

// validator schema for task input
export const taskInputSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 100 characters',
    } as Record<string, string>),
  description: Joi.string()
    .trim()
    .min(5)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 5 characters long',
    } as Record<string, string>),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional()
    .messages({
      'any.only': `Status must be one of: ${Object.values(TaskStatus).join(
        ', '
      )}`,
    } as Record<string, string>),
});

// validator schema for task update
export const taskUpdateSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 100 characters',
    } as Record<string, string>),
  description: Joi.string()
    .trim()
    .min(5)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 5 characters long',
    } as Record<string, string>),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .required()
    .messages({
      'any.only': `Status must be one of: ${Object.values(TaskStatus).join(
        ', '
      )}`,
      'any.required': 'Status is required',
    } as Record<string, string>),
});

// validator schema for task status update
export const taskStatusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .required()
    .messages({
      'any.only': `Status must be one of: ${Object.values(TaskStatus).join(
        ', '
      )}`,
      'any.required': 'Status is required',
    } as Record<string, string>),
});
