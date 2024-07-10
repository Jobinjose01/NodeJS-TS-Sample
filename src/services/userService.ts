import { PrismaClient } from '@prisma/client';
import { User } from '../models/User';

const prisma = new PrismaClient();

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
