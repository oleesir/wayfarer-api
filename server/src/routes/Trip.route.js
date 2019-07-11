import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import { createTripSchema } from '../schemas/trips.schema';
import TripController from '../controllers/Trip.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization.middleware';

const createTripValidation = new Validation(createTripSchema).validate;
const { verifyToken, authorizeRole } = Authorization;
const { createTrip, getAllTrips } = TripController;

const router = Router();
router.post('/', verifyToken, authorizeRole('admin'), createTripValidation, asyncErrorHandler(createTrip));
router.get('/', verifyToken, asyncErrorHandler(getAllTrips));
export default router;
