import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import { signupSchema, signinSchema } from '../schemas/users.schema';
import AuthController from '../controllers/Auth.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();
const signupValidation = new Validation(signupSchema).validate;
const signinValidation = new Validation(signinSchema).validate;
const { signup, signin } = AuthController;

router.post('/signup', signupValidation, asyncErrorHandler(signup));
router.post('/signin', signinValidation, asyncErrorHandler(signin));
export default router;
