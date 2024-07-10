import { ValidationError } from 'express-validator';

interface FormattedError {
  field: string;
  message: string;
  location: string;
}

export const formatErrors = (errors: any): FormattedError[] => {
  return errors.map((error: { [x: string]: any; }) => ({
    field: error['path'] || 'unknown',
    message: error['msg'] || 'Validation error',
    location: error['location'] || 'unknown'
  }));
};
