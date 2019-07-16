import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import { createBookingSchema, deleteBookingSchema } from '../schemas/bookings.schema';
import BookingController from '../controllers/Booking.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization.middleware';
import { authSchema } from '../schemas/users.schema';

const createBookingValidation = new Validation(createBookingSchema).validate;
const deleteBookingValidation = new Validation(deleteBookingSchema).validate;
const getAllBookingsValidation = new Validation(authSchema).validate;

const { verifyToken, authorizeRole } = Authorization;
const { createBooking, getAllBookings, deleteBooking } = BookingController;

const router = Router();
router.post('/', verifyToken, authorizeRole('user'), createBookingValidation, asyncErrorHandler(createBooking));
router.get('/', verifyToken, getAllBookingsValidation, asyncErrorHandler(getAllBookings));
router.delete('/:id', verifyToken, authorizeRole('user'), deleteBookingValidation, asyncErrorHandler(deleteBooking));

export default router;
