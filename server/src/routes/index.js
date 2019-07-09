import { Router } from 'express';
import authRoutes from './Auth.route';
import tripRoutes from './Trip.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);

export default router;
