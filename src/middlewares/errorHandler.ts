import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { formatErrors } from '../utils/errorFormatter';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error for debugging

  if (err instanceof Error) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: formatErrors(errors.array())
    });
  }

  next();
};
