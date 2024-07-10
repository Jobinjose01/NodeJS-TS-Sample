import { User } from '../models/User';
import { UserDTO } from '../dtos/UserDTO';

export function handleUserResponse(user: User): UserDTO {

    const userDTO: UserDTO = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    
    return userDTO;
}
