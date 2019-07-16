import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import TripController from '../controllers/Trip.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization.middleware';
import {
  createTripSchema,
  getSingleTripSchema,
  cancelTripSchema,
  getAllTripsSchema
} from '../schemas/trips.schema';

const createTripValidation = new Validation(createTripSchema).validate;
const getSingleTripValidation = new Validation(getSingleTripSchema).validate;
const cancelTripValidation = new Validation(cancelTripSchema).validate;
const getAllTripsValidation = new Validation(getAllTripsSchema).validate;

const {
  verifyToken,
  authorizeRole
} = Authorization;

const {
  createTrip,
  getAllTrips,
  getSingleTrip,
  cancelTrip
} = TripController;

const router = Router();
router.post('/', verifyToken,
  authorizeRole('admin'),
  createTripValidation,
  asyncErrorHandler(createTrip));

router.get('/', verifyToken, getAllTripsValidation, asyncErrorHandler(getAllTrips));

router.get('/:id', verifyToken,
  getSingleTripValidation,
  asyncErrorHandler(getSingleTrip));

router.patch('/:id',
  verifyToken,
  authorizeRole('admin'),
  cancelTripValidation,
  asyncErrorHandler(cancelTrip));

export default router;
