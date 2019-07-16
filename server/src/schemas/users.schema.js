import Joi from '@hapi/joi';

export const signupSchema = Joi.object().keys({
  first_name: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
    .required(),
  last_name: Joi.string().regex(/^[a-zA-Z]+$/).min(2).max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  password: Joi.string().min(8).required()
});

export const signinSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
  password: Joi.string().min(8).required()
});

// user_id and is_admin not provided because token already contains them
export const authSchema = Joi.object().keys({
  Authorization: Joi.string(),
  token: Joi.string(),
});

export default{
  authSchema,
  signupSchema,
  signinSchema
};
