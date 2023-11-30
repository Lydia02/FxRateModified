import axios from 'axios';
import { google } from 'googleapis';
import { AppError } from '../errors/AppError.js';

import { config } from '../config.js';

const { OAuth2 } = google.auth;

import dotenv from 'dotenv';
dotenv.config();


// Endpoint for fetching FX rates
export const getFxrates = async () => {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${config.fixerApiKey}`
    );

    if (response.data.success !== true) {
      throw new AppError('Error fetching FX rates');
    }

    const fxRates = response.data.rates;
    return fxRates;
  } catch (error) {
    console.error('Error fetching FX rates:', error);
    throw new AppError('Error fetching FX rates', 500);
  }
};

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const oauth2Client = new OAuth2(clientId, clientSecret, 'urn:ietf:wg:oauth:2.0:oob');

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: 'https://www.googleapis.com/auth/gmail.send',
});

export { oauth2Client, authUrl };
