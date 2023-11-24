import jwt from 'jsonwebtoken';
import passport from 'passport';
import CustomAPIError from '../errors/badRequest.js';

export const signUp = async (req, res, next) => {
  try {
    const body = { _id: req.user._id, email: req.user.email };
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  } catch (error) {
    // Handle the error here
    next(new CustomAPIError('User already exists'));
  }
};

export const login = async (req, res) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) throw err;

      if (!user) {
        // Use your custom BadRequestError here
        throw new CustomAPIError('Username or password is incorrect');
      }

      req.login(user, { session: false }, async (error) => {
        if (error) throw error;

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: '1hr',
        });

        res.json({
          token: token,
          userID: req.user._id,
        });
      });
    } catch (error) {
      // Handle the error here
      res.status(500).json({ error: error.message });
    }
  })(req, res);
};
