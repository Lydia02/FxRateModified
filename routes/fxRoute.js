import express from 'express';
const fxRouter = express.Router();

import {savePreference,getPreferencesById,updatePreference,deletePreferenceById} from '../controllers/fxController.js';
import { validateFxPreference } from '../middleware/validationMiddleware.js';
import {verifyToken} from '../middleware/verifytoken.js';

fxRouter.use(verifyToken);

fxRouter.post('/user/preference', validateFxPreference, savePreference);

fxRouter.get('/user/preference', validateFxPreference, getPreferencesById);
fxRouter.put('/user/preference', validateFxPreference, updatePreference);
fxRouter.delete('/user/preference', validateFxPreference, deletePreferenceById);

export default fxRouter;
