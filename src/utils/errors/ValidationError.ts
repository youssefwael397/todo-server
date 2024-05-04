import { Response } from 'express';
import Joi from 'joi';

class ValidationError extends Error {
  validationErrors: { [key: string]: string };

  constructor(validationErrors: { [key: string]: string }) {
    super('Validation error');
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
  }

  public static handleValidationError(
    error: Joi.ValidationError | undefined,
    res: Response
  ): void {
    if (error) {
      const validationErrors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context?.key ?? ''] = detail.message;
      });

      throw new ValidationError(validationErrors);
    }
  }
}

export default ValidationError;
