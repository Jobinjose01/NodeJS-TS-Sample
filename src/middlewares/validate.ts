import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { formatErrors } from '../utils/errorFormatter';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: formatErrors(errors.array()),
    });
  }
  next();
};
