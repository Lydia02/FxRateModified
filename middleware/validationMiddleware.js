import Joi from 'joi';
import BadRequestError from '../errors/AppError.js';

const userValidationSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const fxPreferenceValidationSchema = Joi.object({
  userId: Joi.string(),
  currencyPair: Joi.string().required(),
  targetRate: Joi.number().required(),
});

const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  req.body.email = req.body?.email?.toLowerCase();

  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    // Create and pass a BadRequestError to the error handling middleware
    return next(new BadRequestError(validationErrors.join(', ')));
  }

  next();
};

const validateFxPreference = (req, res, next) => {
  const { error } = fxPreferenceValidationSchema.validate(req.body);

  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    // Create and pass a BadRequestError to the error handling middleware
    return next(new BadRequestError(validationErrors.join(', ')));
  }

  next();
};

export { validateUser, validateFxPreference };
