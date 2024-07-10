import { Router,Request,Response } from 'express';
import { UserController } from '../controllers/userController';
import { userValidationRules } from '../validators/userValidator';
import { validate } from '../middlewares/validate';

const router = Router();
const userController = new UserController();

router.post('/register', userValidationRules(), validate, async (req : Request, res : Response) => {
  await userController.registerUser(req, res);
});

export default router;
