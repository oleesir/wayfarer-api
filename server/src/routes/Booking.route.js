import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import { createBookingSchema } from '../schemas/bookings.schema';
import BookingController from '../controllers/Booking.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization.middleware';

const createBookingValidation = new Validation(createBookingSchema).validate;
const { verifyToken, authorizeRole } = Authorization;
const { createBooking } = BookingController;

const router = Router();
router.post('/', verifyToken, authorizeRole('user'), createBookingValidation, asyncErrorHandler(createBooking));

export default router;
