import Joi from '@hapi/joi';
import moment from 'moment';
import { authSchema } from './users.schema';

const now = moment().format('YYYY-MM-DD');


export const createTripSchema = Joi.object().keys({
  origin: Joi.string().required().regex(/^[a-zA-Z]+$/).min(2)
    .max(30),
  destination: Joi.string().required().regex(/^[a-zA-Z]+$/).min(2)
    .max(30),
  bus_id: Joi.number().min(1).max(300).required(),
  fare: Joi.number().required(),
  trip_date: Joi.date().iso().greater(now).less('2029-12-31')
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
          case 'date.isoDate':
            error.message = '"trip_date" must be in ISO 8601 (YYYY-MM-DD) date format e.g "2019-07-21"';
            break;
          default:
            error.message = '"trip_date" is required';
        }
      });
      return err;
    }),
  trip_time: Joi.string().required().regex(/^([0-9]{2}):([0-9]{2})$/)
    .error((err) => {
      err.forEach((error) => {
        switch (error.type) {
          case 'string.regex.base':
            error.message = '"trip_time" must be in the 24 hour format e.g "08:30", "23:00" etc';
            break;
          default:
            error.message = '"trip_time" is required';
        }
      });
      return err;
    }),
  duration: Joi.number().integer().min(30).max(2880)
    .required()
    .error((err) => {
      err.forEach((error) => {
        switch (error.type) {
          case 'number.base':
            error.message = '"duration" must be a number';
            break;
          case 'number.min':
          case 'number.max':
          case 'number.integer':
            error.message = '"duration" must be minutes greater than 30 and less than 2880 (i.e. 2 days) e.g "45", "180" etc';
            break;
          default:
            error.message = '"duration" is required';
        }
      });
      return err;
    })
}).concat(authSchema);

export const getSingleTripSchema = Joi.object().keys({
  id: Joi.number().integer().min(1)
}).concat(authSchema);

export const cancelTripSchema = Joi.object().keys({
  id: Joi.number().integer().min(1),
  status: Joi.string().valid(['done', 'active', 'pending', 'cancelled']).required()
}).concat(authSchema);

export default{
  createTripSchema,
  getSingleTripSchema,
  cancelTripSchema
};
