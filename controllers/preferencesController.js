import dotenv from 'dotenv';
import UserPreference from '../models/fxModel.js';

dotenv.config();

export const getPreferences = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const preferences = await UserPreference.find({ })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(preferences);
  } catch (error) {
    next(error);
  }
};
