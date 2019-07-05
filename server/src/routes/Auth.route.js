import { Router } from 'express';
import Validation from '../middlewares/Validation.middlewares';
import { signupSchema } from '../schemas/users.schema';
import AuthController from '../controllers/Auth.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();
const signUpValidation = new Validation(signupSchema).validate;
const { signup } = AuthController;

router.post('/signup', signUpValidation, asyncErrorHandler(signup));

export default router;
