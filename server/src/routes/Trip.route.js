import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import TripController from '../controllers/Trip.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization.middleware';
import {
  createTripSchema,
  getSingleTripSchema,
  cancelTripSchema
} from '../schemas/trips.schema';

const createTripValidation = new Validation(createTripSchema).validate;
const getSingleTripValidation = new Validation(getSingleTripSchema).validate;
const cancelTripValidation = new Validation(cancelTripSchema).validate;

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

router.get('/', verifyToken, asyncErrorHandler(getAllTrips));

router.get('/:id', verifyToken,
  getSingleTripValidation,
  asyncErrorHandler(getSingleTrip));

router.patch('/:id',
  verifyToken,
  authorizeRole('admin'),
  cancelTripValidation,
  asyncErrorHandler(cancelTrip));

export default router;
