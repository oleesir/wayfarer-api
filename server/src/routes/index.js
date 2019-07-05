import { Router } from 'express';
import authRoutes from './Auth.route';

const router = Router();

router.use('/auth', authRoutes);

export default router;
