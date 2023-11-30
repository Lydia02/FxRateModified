import passport from 'passport';
import express from 'express';
const userRouter = express.Router();
import { validateUser } from '../middleware/validationMiddleware.js';
import {signUp, login} from '../controllers/authController.js';

userRouter.post('/signup', validateUser, passport.authenticate('signup', { session: false }), signUp);
// userRouter.post('/login', validateUser, passport.authenticate('login', { session: false }), login);
userRouter.post('/login', validateUser, passport.authenticate('login', { session: false }), login);

export default userRouter;
