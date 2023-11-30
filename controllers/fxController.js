import UserPreference from "../models/fxModel.js";
import { getFxrates } from '../utils/utilis.js';

import userModel from "../models/userModel.js"; 
import {sendEmail} from './emailNotificationController.js';
import { oauth2Client } from '../utils/utilis.js';
import mongoose from 'mongoose';
import  BadRequestError from "../errors/badRequest.js";
import NotFoundError from "../errors/notFound.js";

const { Types: { ObjectId } } = mongoose;

// Save user's FX rate preference
export async function savePreference(req, res, next) {
  try {
    const { currencyPair, targetRate } = req.body || {};
    
    if (!currencyPair || !targetRate) {
      throw new BadRequestError('Invalid request body');
    }

    const preference = new UserPreference({
      userId: req.userId,
      currencyPair,
      targetRate,
    });

    const newPreference = await preference.save();

    // Check and notify if the target rate is already met
    // await checkAndNotify(req.userId, currencyPair, targetRate, res, next);

    res.status(201).json({
      status: true,
      message: 'Preference saved successfully',
      data: newPreference,
    });
  } catch (error) {
    console.log(error);
    next(error); 
  }
}

// Get user's FX rate preferences by ID
export async function getPreferencesById(req, res, next) {
  try {
    const userId = req.userId;
    console.log('User ID:', userId);

    if (!ObjectId.isValid(userId)) {
      throw new BadRequestError('Invalid ID format');
    }

    const preferencesById = await UserPreference.findOne({ userId:  userId });

    console.log(preferencesById);
    if (!preferencesById) {
      throw new NotFoundError('Preference not found');
    }

    res.status(200).json(preferencesById);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Update user's FX rate preference
export async function updatePreference(req, res, next) {
  try {
    const userId = req.userId;
    const { currencyPair, targetRate } = req.body;

    // Check if the preference exists
    const existingPreference = await UserPreference.findOne({userId: userId});

    if (!existingPreference) {
      throw new NotFoundError('Preference not found');
    }

    // Update the preference fields
    existingPreference.currencyPair = currencyPair || existingPreference.currencyPair;
    existingPreference.targetRate = targetRate || existingPreference.targetRate;

    // Save the updated preference
    const updatedPreference = await existingPreference.save();

    res.status(200).json(updatedPreference);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Delete user's FX rate preference by ID
export async function deletePreferenceById(req, res, next) {
  try {
    const userId = req.userId;

    if (!ObjectId.isValid(userId)) {
      throw new BadRequestError('Invalid ID format');
    }

    // Check if the preference exists
    const existingPreference = await UserPreference.findOne({ userId });

    if (!existingPreference) {
      throw new NotFoundError('Preference not found');
    }

    // Delete the preference
    await UserPreference.findOneAndDelete({ userId });

    res.status(201).json('Deleted successfully');
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Function to check FX rates and send email notifications
export async function checkAndNotify(userId, currencyPair, targetRate, res, next) {
  try {
    // Fetch current FX rates from your third-party source
    const fxRates = await getFxrates.getFxrates();
    const currentRate = fxRates[currencyPair]; 

    if (currentRate >= targetRate) {
      const user = await userModel.findById(userId);
      if (user) {
        const userEmail = user.email;

        // Set up OAuth2 credentials for sending email
        oauth2Client.setCredentials({
          refresh_token: 'REFRESH_TOKEN' // Ensure this is correctly set
        });

        const subject = 'FX Rate Notification';
        const message = `The ${currencyPair} rate has reached ${currentRate}.`;
        sendEmail.sendEmail(userEmail, subject, message);
      }
    }
  } catch (error) {
    next(new NotFoundError('Error checking and notifying'));
  }
}
