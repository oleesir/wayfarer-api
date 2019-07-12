import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import { createTripSchema, getSingleTripSchema } from '../schemas/trips.schema';
import TripController from '../controllers/Trip.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization.middleware';

const createTripValidation = new Validation(createTripSchema).validate;
const getSingleTripValidation = new Validation(getSingleTripSchema).validate;
const { verifyToken, authorizeRole } = Authorization;
const { createTrip, getAllTrips, getSingleTrip } = TripController;

const router = Router();
router.post('/', verifyToken, authorizeRole('admin'), createTripValidation, asyncErrorHandler(createTrip));
router.get('/', verifyToken, asyncErrorHandler(getAllTrips));
router.get('/:id', verifyToken, getSingleTripValidation, asyncErrorHandler(getSingleTrip));

export default router;
