import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import userRoute from './routes/authRoutes.js';
import configureRateLimit from './middleware/auth.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

const limiter = configureRateLimit();
app.use(limiter);

app.use('/', userRoute);

export default app;
