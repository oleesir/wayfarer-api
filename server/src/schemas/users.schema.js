import Joi from '@hapi/joi';

export const signupSchema = Joi.object().keys({
  firstname: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
    .required(),
  lastname: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).required()
});

export default{
  signupSchema
};
