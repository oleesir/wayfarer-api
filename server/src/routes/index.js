import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './Auth.route';
import tripRoutes from './Trip.route';
import busRoutes from './Bus.route';
import bookingsRoutes from './Booking.route';
import swaggerDocument from '../../../docs.json';

const router = Router();

router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);
router.use('/buses', busRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
