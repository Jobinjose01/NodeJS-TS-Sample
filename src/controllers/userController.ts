import { NextFunction, Request, Response } from 'express';
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


  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    
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
      res.status(201).json({ message: 'User created successfully', result: handleUserResponse(createdUser) });
    } catch (error) {
        next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = parseInt(req.params.id); // Extract user ID from request params
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDataToUpdate: Partial<User> = {
      firstName,
      lastName,
      email,
      phone,
      password : hashedPassword,
      updatedAt: new Date()
    };

    try {
      const updatedUser = await this.userService.updateUser(userId, userDataToUpdate);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User updated successfully', result: handleUserResponse(updatedUser) });
    } catch (error) {
        next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = parseInt(req.params.id);
    try {

      await this.userService.deleteUser(userId);     
      res.status(200).json({ message: 'User Deleted Successfully'});
      
    } catch (error) {
        next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = parseInt(req.params.id); 
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        res.status(200).json({ result: handleUserResponse(user) });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
        next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();      
      if (users) {
        res.status(200).json({ result: handleUserResponse(users) });
      } else {
        res.status(404).json({ message: 'No users available' });
      }
    } catch (error) {
        next(error);
    }
  }
  
}
