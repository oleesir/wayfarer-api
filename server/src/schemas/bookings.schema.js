import Joi from '@hapi/joi';
import { authSchema } from './users.schema';

export const createBookingSchema = Joi.object().keys({
  trip_id: Joi.number().integer().min(1).required(),
  seat_number: Joi.number().integer().min(1).max(17)
    .required()
}).concat(authSchema);

export default {
  createBookingSchema
};
