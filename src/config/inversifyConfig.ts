import { Container } from 'inversify';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';

const container = new Container();

container.bind<UserController>(UserController).toSelf();
container.bind<UserService>(UserService).toSelf();

export default container;
