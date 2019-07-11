import Joi from '@hapi/joi';

export const createBusSchema = Joi.object().keys({
  number_plate: Joi.string().regex(/^[A-Z]{3}[0-9]{2,3}[A-Z]{2}$/).length(8)
    .required()
    .error((err) => {
      err.forEach((error) => {
        switch (error.type) {
          case 'string.regex.base':
            error.message = '"number_plate" must be in this format e.g "JFK123PO", "KLM768TY" etc';
            break;
          case 'string.length':
            error.message = '"number_plate" must have a length of 8 characters';
            break;
          default:
            error.message = '"number_plate" is required';
        }
      });
      return err;
    }),
  manufacturer: Joi.string().regex(/^[a-zA-Z\s]+$/).min(2)
    .max(30)
    .required()
    .error((err) => {
      err.forEach((error) => {
        switch (error.type) {
          case 'string.regex.base':
            error.message = '"manufacturer" must be in this format e.g "General Motors", "Toyota" etc';
            break;
          case 'string.min':
            error.message = '"manufacturer" must not be less than 2 characters';
            break;
          case 'string.max':
            error.message = '"manufacturer" must not be more than 30 characters';
            break;
          default:
            error.message = '"manufacturer" is required';
        }
      });
      return err;
    }),
  model: Joi.string().required().regex(/^[a-zA-Z0-9\s]+$/).min(2)
    .max(20)
    .required()
    .error((err) => {
      err.forEach((error) => {
        switch (error.type) {
          case 'string.regex.base':
            error.message = '"model" must be in this format e.g "lexus350", "camry 2.4" etc';
            break;
          case 'string.min':
            error.message = '"model" must not be less than 2 characters';
            break;
          case 'string.max':
            error.message = '"model" must not be more than 20 characters';
            break;
          default:
            error.message = '"model" is required';
        }
      });
      return err;
    }),
  year: Joi.number().required(),
  capacity: Joi.number().min(6).max(17)
});

export default {
  createBusSchema
};
