import { User } from '../models/User';
import { UserDTO } from '../dtos/UserDTO';

export function handleUserResponse(user: User | User[]): UserDTO | UserDTO[] {
  const usersArray = Array.isArray(user) ? user : [user];

  const userDTOs = usersArray.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    phone: u.phone,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }));

  return Array.isArray(user) ? userDTOs : userDTOs[0];
}
