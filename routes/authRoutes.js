import passport from 'passport';
import express from 'express';
import { validateUser } from '../middleware/validationMiddleware.js';
import * as authController from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/signup', validateUser, authController.signUp);
userRouter.post('/login', validateUser,  authController.login);

export default userRouter;
