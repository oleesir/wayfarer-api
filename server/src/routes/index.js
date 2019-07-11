import { Router } from 'express';
import authRoutes from './Auth.route';
import tripRoutes from './Trip.route';
import busRoutes from './Bus.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);
router.use('/buses', busRoutes);

export default router;
