import { Router } from 'express';
import UserRoutes from './userRoutes';

const router = Router();

// Version 1 Routes
router.use('/api/v1/user', UserRoutes);

export default router;
