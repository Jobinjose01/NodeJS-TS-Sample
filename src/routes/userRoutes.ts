import { Router,Request,Response } from 'express';
import { UserController } from '../controllers/userController';
import { userValidationRules } from '../validators/userValidator';
import { validate } from '../middlewares/validate';
import container from "../config/inversify.config"

const router = Router();
const userController = container.get<UserController>(UserController);

router.post('/register', userValidationRules(), validate, async (req : Request, res : Response) => {
  await userController.createUser(req, res);
});

router.get('/:id', async (req : Request, res : Response) => {
  await userController.getUserById(req, res);
});

export default router;
