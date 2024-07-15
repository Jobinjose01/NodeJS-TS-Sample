import { PrismaClient } from '@prisma/client';
import { User } from '../models/User';
import { injectable } from 'inversify';

const prisma = new PrismaClient();

@injectable()
export class UserService {

  async createUser(data: User): Promise<User> {
      const createdUser = await prisma.user.create({ data });
      return createdUser;
  }

  
  async getUserById(userId: number) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
  }

  async getAllUsers(): Promise<User[]> {
      const users = await prisma.user.findMany();
      return users;
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User | null> {
    try{
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: data,          
      });
      return updatedUser;
    }catch(error){
      throw(error);
    }
  }

  async deleteUser(userId: number): Promise<void> {

      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
  }
  
  
}
