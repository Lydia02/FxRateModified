import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import { handleError } from './errors/AppError.js';
import preferenceRouter from './routes/fxnoRoute.js';
import userRoute from './routes/authRoutes.js';
// import configureRateLimit from './utils/rateLimit.js';
import fxRouter from './routes/fxRoute.js';
// import './middleware/auth.js'; // Assuming that this file exports and configures passport
import configurePassport from './middleware/auth.js';

// Initialize Passport with the defined strategies
configurePassport(passport);

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

// const limiter = configureRateLimit();
// app.use(limiter);

app.use('/api', preferenceRouter);
app.use('/', userRoute);
app.use('/api', fxRouter);

app.use((err, req, res, next) => {
  console.log('[onRequest] error', err);
  handleError(err, res);
});

export default app;
