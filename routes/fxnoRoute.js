import express from 'express';
const preferenceRouter = express.Router();

import { getPreferences } from '../controllers/preferencesController.js';

preferenceRouter.get('/preferences', getPreferences);

export default preferenceRouter;
