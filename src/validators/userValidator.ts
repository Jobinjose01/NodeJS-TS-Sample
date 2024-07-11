import { body, param, ValidationChain } from 'express-validator';
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

export const userUpdateValidationRules = () => {
  return [
    param('id').isInt().withMessage('User ID must be a valid number'),
    body('firstName').isString().withMessage('First name must be a string'),
    body('lastName').isString().withMessage('Last name must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email')
      .custom(async (email, { req }) => {
        if (!req.params || !req.params.id) {
          throw new Error('User ID is required');
        }
        const userId = parseInt(req.params.id, 10);
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (user && user.id !== userId) {
          throw new Error('Email is already in use');
        }
      }),
    body('phone').isString().withMessage('Phone number must be a string'),
  ];
}
