import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/errors/CustomError.js';
import ValidationError from '../utils/errors/ValidationError.js';

const errorMiddleware = (
  error: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof CustomError) {
    const { statusCode = 500, message = 'Internal Server Error' } = error;
    res.status(statusCode).json({ message });
  } else if (error instanceof ValidationError) {
    // Handle validation error
    res.status(400).json({ errors: error.validationErrors });
  } else {
    const { message = 'Internal Server Error' } = error;
    res.status(500).json({ message });
  }
};

export default errorMiddleware;
