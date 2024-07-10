import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/register', async (req, res) => {
  await userController.registerUser(req, res);
});

export default router;
