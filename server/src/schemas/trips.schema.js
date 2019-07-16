import Joi from '@hapi/joi';
import moment from 'moment';
import { authSchema } from './users.schema';

const now = moment().format('YYYY-MM-DD');


export const createTripSchema = Joi.object().keys({
  origin: Joi.string().required().regex(/^[a-zA-Z\s]+$/).min(2)
    .max(30),
  destination: Joi.string().required().regex(/^[a-zA-Z\s]+$/).min(2)
    .max(30),
  bus_id: Joi.number().min(1).max(300).required(),
  fare: Joi.number().required(),
  trip_date: Joi.date().greater(now).less('2029-12-31')
    .required()
    .error((err) => {
      err.forEach((error) => {
        switch (error.type) {
          case 'date.greater':
            error.message = '"trip_date" must be a date after today';
            break;
          case 'date.less':
            error.message = '"trip_date" must be a date before "2029-12-31"';
            break;
          default:
            error.message = '"trip_date" is required';
        }
      });
      return err;
    })
}).concat(authSchema);

export const getSingleTripSchema = Joi.object().keys({
  id: Joi.number().integer().min(1)
}).concat(authSchema);

export const cancelTripSchema = Joi.object().keys({
  id: Joi.number().integer().min(1)
}).concat(authSchema);

export const getAllTripsSchema = Joi.object().keys({
  origin: Joi.string().regex(/^[a-zA-Z\s]+$/).min(2)
    .max(30),
  destination: Joi.string().regex(/^[a-zA-Z\s]+$/).min(2)
    .max(30),
}).concat(authSchema);

export default{
  createTripSchema,
  getSingleTripSchema,
  cancelTripSchema
};
