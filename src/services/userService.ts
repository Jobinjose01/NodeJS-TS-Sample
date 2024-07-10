import { PrismaClient } from '@prisma/client';
import { User } from '../models/User';
import { injectable } from 'inversify';

const prisma = new PrismaClient();

@injectable()
export class UserService {

  async createUser(data: User): Promise<User> {
    try {
      const createdUser = await prisma.user.create({ data });
      return createdUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  
  async getUserById(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user by ID');
    }
  }
  
  
}
