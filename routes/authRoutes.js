import passport from 'passport';
import express from 'express';
import { validateUser } from '../middleware/validationMiddleware.js';
import * as authController from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/signup', validateUser, passport.authenticate('signup', { session: false }), authController.signUp);
userRouter.post('/login', validateUser, passport.authenticate('login', { session: false }), authController.login);

export default userRouter;
