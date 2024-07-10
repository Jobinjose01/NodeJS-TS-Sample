import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

const userService = new UserService();

export class UserController {
  async registerUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: User = {
      firstName,
      lastName,
      email,
      phone,
      password : hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const createdUser = await userService.createUser(userData);
      res.status(201).json({ message: 'User created successfully', user: createdUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
