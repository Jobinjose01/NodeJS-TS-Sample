import { body, ValidationChain } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userValidationRules = (): ValidationChain[] => {
  return [
    body('firstName')
      .isString()
      .withMessage('First name must be a string')
      .isLength({ max: 190 })
      .withMessage('First name must be less than 191 characters'),
    body('lastName')
      .isString()
      .withMessage('Last name must be a string')
      .isLength({ max: 190 })
      .withMessage('Last name must be less than 191 characters'),
    body('email')
      .isEmail()
      .withMessage('Email must be a valid email address')
      .custom(async (email) => {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (user) {
          throw new Error('Email is already in use');
        }
        return true;
      }),
    body('phone')
      .isString()
      .withMessage('Phone number must be a string')
      .notEmpty()
      .withMessage('Phone number is required'),
    body('password')
      .isString()
      .withMessage('Password must be a string')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];
};
