import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import { createBusSchema } from '../schemas/buses.schema';
import BusController from '../controllers/Bus.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization.middleware';

const createBusValidation = new Validation(createBusSchema).validate;
const { verifyToken, authorizeRole } = Authorization;
const { createBus } = BusController;

const router = Router();
router.post('/', verifyToken, authorizeRole('admin'), createBusValidation, asyncErrorHandler(createBus));

export default router;
