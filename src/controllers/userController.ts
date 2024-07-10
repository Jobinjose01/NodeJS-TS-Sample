import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { controller} from 'inversify-express-utils';
import { handleUserResponse } from '../responseHandlers/UserResponseHandler';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';

@injectable()
export class UserController {
  
  
  private userService: UserService;

  constructor(@inject(UserService) userService: UserService) {
    this.userService = userService;
  }


  async createUser(req: Request, res: Response): Promise<void> {
    
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
      const createdUser = await this.userService.createUser(userData);
      res.status(201).json({ message: 'User created successfully', user: handleUserResponse(createdUser) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id, 10); 
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        res.status(200).json({ user: handleUserResponse(user) });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
}
