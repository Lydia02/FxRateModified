import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import  BadRequestError from "../errors/badRequest.js";
import NotFoundError from "../errors/notFound.js";

import {AppError} from "../errors/AppError.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import UnauthorisedError from "../errors/unauthorised.js";


dotenv.config();

// Set up the Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: 'ojoawolydia@gmail.com',
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: 'REFRESH_TOKEN', 
  },
});

// Function to send email notifications
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'xyz@gmail.com', 
    to, 
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully'); 
  } catch (error) {
    // Handle specific error types and throw custom errors
    switch (error.responseCode) {
      case 400:
        throw new BadRequestError('Bad request when sending email');
      case 401:
        throw new UnauthenticatedError('Unauthorized when sending email');
      case 403:
        throw new UnauthorisedError('Forbidden when sending email');
      case 404:
        throw new NotFoundError('Email recipient not found when sending email');
      default:
        // Handle other errors as a generic custom error
        throw new AppError(`Error sending email: ${error.message}`, 500);
    }
  }
};

export { sendEmail };
