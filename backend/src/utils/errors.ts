import type { ApiError } from '../middleware/errorHandler';

export class AppError extends Error implements ApiError {
  statusCode: number;
  status: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode;
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const createError = (message: string, statusCode: number = 500): AppError => {
  return new AppError(message, statusCode);
};

export const NotFoundError = (message: string = 'Resource not found'): AppError => {
  return new AppError(message, 404);
};

export const BadRequestError = (message: string = 'Bad request'): AppError => {
  return new AppError(message, 400);
};

export const UnauthorizedError = (message: string = 'Unauthorized'): AppError => {
  return new AppError(message, 401);
};

export const ForbiddenError = (message: string = 'Forbidden'): AppError => {
  return new AppError(message, 403);
};

