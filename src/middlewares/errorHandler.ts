import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { formatErrors } from '../utils/errorFormatter';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.APP_DEBUG) {
    console.error(err); // Log the error for debugging
  }
  if (process.env.ERROR_LOG) {
    logger.error(err);
  }

  if (err instanceof Error) {
    return res.status(500).json({
      status: 'error',
      error: err.message,
      message: res.__('user.RECORD_NOT_FOUND'),
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: formatErrors(errors.array()),
    });
  }

  next();
};
