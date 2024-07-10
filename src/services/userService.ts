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
}
