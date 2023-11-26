import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
// import { handleError } from './errors/AppError';
// import preferenceRouter from './routes/fxnoRoute';
import userRoute from './routes/authRoutes.js';
// import configureRateLimit from './utils/rateLimit';
// import fxRatesRoutes from './routes/fxRoute';
import './middleware/auth.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// const limiter = configureRateLimit();
// app.use(limiter);

// app.use('/api', preferenceRouter);

// app.use('/api', passport.authenticate('jwt', { session: false }), fxRatesRoutes);

app.use('/', userRoute);
// app.use('/api', fxRatesRoutes);
// app.use(errorHandler);
// app.use((err, req, res, next) => {
//   console.log('[onRequest] error', err);
//   handleError(err, res);
// });

export default app;
