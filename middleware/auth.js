import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
// import { AppError } from "../errors/AppError";

dotenv.config();

export default function configurePassport(passport) {
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { firstname, lastname } = req.body;
          const user = await userModel.create({
            email,
            firstname,
            lastname,
            password,
          });
        
          return done(null, user);
        } catch (error) {
          error.message = "This user exists";
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }
  
          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          console.log(error)
          // return done(new AppError("Error", 500));
        }
      }
    )
  );
  
}
