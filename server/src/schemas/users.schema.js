import Joi from '@hapi/joi';

export const signupSchema = Joi.object().keys({
  first_name: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
    .required(),
  last_name: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).required()
});

export const signinSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).required()
});

export default{
  signupSchema,
  signinSchema
};
